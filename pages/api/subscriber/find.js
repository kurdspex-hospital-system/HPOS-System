import { getSession } from "next-auth/react";
const database = require("../../../scripts/mysqlAsyncPoolConnection");

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ type: "error", message: "You Not Authorized" });
    return;
  }

  if (session.user.name.access !== "SuperAdmin" && session.user.name.access !== "Admin" && session.user.name.access !== "receptionAccess") {
    res.status(403).json({ type: "error", message: "You Not Have Permission" });
    return;
  }

  if (req.method === "GET") {
    try {
      const { data: subscribers } = await database.query(`SELECT * FROM subscribers WHERE data_state != 'Deleted' && data_state != 'Old' && phoneNumber = ${database.escape(req.query.searchText)}`);
      res.status(200).json({client: subscribers[0]});
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
  }
}