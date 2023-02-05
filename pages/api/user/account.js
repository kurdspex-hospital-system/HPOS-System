import { getSession } from "next-auth/react";

const database = require("../../../scripts/mysqlAsyncPoolConnection");
const { hash } = require("../../../scripts/auth");

export default async function handler (req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({type: 'error', message: 'You Not Authorized'});
    return;
  }

  if (req.method === "GET") {
    let query = "SELECT username, phoneNumber FROM users where id = ?";

    try{
      const {data: user} = await database.query(query, [session.user.name.id]);
      res.status(200).json(user[0]);
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }

  if (req.method === "PUT") {
    try{
      const hashPassword = await hash(req.body.password);
      await database.query("UPDATE users SET ? WHERE id = ?", [{ user_password: hashPassword }, session.user.name.id]);

      res.status(202).json({type: 'done', message: 'The Password Successfully Updated'});
    } catch(err) {
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }

    return;
  }
};
