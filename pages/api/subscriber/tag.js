import { getSession } from "next-auth/react";
const database = require("../../../scripts/mysqlAsyncPoolConnection");

import moment from "moment";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ type: "error", message: "You Not Authorized" });
    return;
  }

  if (req.method === "PUT") {
    try {
      await database.query("UPDATE subscribers SET ? WHERE id = ?", [{
        last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }, req.body.subscriber.id]);

      res.status(201).json({ type: "done", message: "The Patient Taged Successfully"});
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
  }
}
