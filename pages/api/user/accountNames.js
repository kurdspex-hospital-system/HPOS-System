import { getSession } from "next-auth/react";

const database = require("../../../scripts/mysqlAsyncPoolConnection");

export default async function handler (req, res) {
    const session = await getSession({ req });
  
    if (!session) {
      res.status(401).json({type: 'error', message: 'You Not Authorized'});
      return;
    }

    if (req.method === "GET") {
        try{
          const {data: users} = await database.query("SELECT username, id FROM users");
          res.status(200).json(users);
        } catch(err) {
          res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }

        return;
    }
}