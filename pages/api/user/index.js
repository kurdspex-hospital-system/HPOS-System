import { getSession } from "next-auth/react";
import database from "../../../scripts/mysqlAsyncPoolConnection";
import { hash } from "../../../scripts/auth";

export default async function handler (req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({type: 'error', message: 'You Not Authorized'});
    return;
  }

  if(session.user.name.access !== 'SuperAdmin') {
    res.status(403).json({type: 'error', message: 'You Not Have Permission'});
    return;
  }

  if (req.method === "GET") {
    let query = "SELECT id, username, phoneNumber, code FROM users WHERE id > 0";

    if(req.query.access && req.query.access !== 'All') {
      query += " && code = " + database.escape(req.query.access);
    }

    if(req.query.searchText && req.query.searchText !== '') {
      query += " && username LIKE " + database.escape(req.query.searchText + '%');
    }

    try {
      const {data: users} = await database.query(query);
      res.status(200).json(users);
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }

  if (req.method === "POST") {
    try {
      const {data: user} = await database.query("SELECT * FROM users WHERE username = ?", [req.body.username]);
      if(user.length === 0) {
        const hashPassword = await hash(req.body.user_password);
        await database.query("INSERT INTO users SET ?", [{...req.body, user_password: hashPassword}]);
        res.status(201).json({type: 'done', message: 'The Account Successfully Added'});
      } else {
        res.status(400).json({type: 'error', message: 'The Username Orady Used'});
      }
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }

  if (req.method === "DELETE") {
    try {
      await database.query("DELETE FROM users WHERE id = ?", [req.body]);
      res.status(202).json({type: 'done', message: 'The Account Successfully Deleted'});
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }

  if (req.method === "PUT") {
    let user = {
      username: req.body.user.username,
      phoneNumber: req.body.user.phoneNumber,
      code: req.body.user.code,
    };

    try {
      const {data: oldUsername} = await database.query('SELECT username FROM users where id = ?', [req.body.user.id]);

      if(oldUsername[0].username !== req.body.user.username) {
        const {data: userAccuned} = await database.query('SELECT * FROM users WHERE username = ?', [req.body.user.username]);

        if(userAccuned.length > 0) {
          res.status(400).json({type: 'error', message: 'The Username Orady Used'});
          return;
        } 
      }

      if(req.body.user.user_password !== '') {
        const hashPassword = await hash(req.body.user.user_password);
        user['user_password'] = hashPassword;
      }

      await database.query("UPDATE users SET ? WHERE id = ?", [user, req.body.user.id]);
      res.status(202).json({type: 'done', message: 'The User Successfully Updated'});
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }
};
