import { getSession } from "next-auth/react";
const database = require("../../../../scripts/mysqlAsyncPoolConnection");

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ type: "error", message: "You Not Authorized" });
    return;
  }

  if (session.user.name.access !== "SuperAdmin") {
    res.status(403).json({ type: "error", message: "You Not Have Permission" });
    return;
  }

  if (req.method === "GET") {
    let query = "SELECT * FROM records WHERE data_state = 'Old'";

    if (req.query.tab === "Patient") {
      query = `
        SELECT subscribers.id AS id, patients.id AS patient_id, fullname, sex, age, subscribers.phoneNumber AS phoneNumber, main_address, data_state, last_update, publish_date, descriptions, 
          users.username AS publisher_name, editor.username AS editor_name, past_medical, past_surgical, drug_history, other_data
        FROM patients JOIN subscribers ON(subscriber_id = subscribers.other_data) JOIN users ON(users.id = subscribers.publisher_id) JOIN users AS editor ON(editor.id = subscribers.editor_id)
        WHERE data_state = 'Old'
      `
    }

    query += ` && other_data = ${database.escape(req.query.id)} ORDER BY publish_date DESC`;

    try {
      const { data: body } = await database.query(query);
      res.status(200).json(body);
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
  }
}