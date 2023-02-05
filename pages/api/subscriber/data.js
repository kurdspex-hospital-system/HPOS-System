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
      let query = `
        SELECT subscribers.id AS id, patients.id AS patient_id, fullname, sex, age, subscribers.phoneNumber AS phoneNumber, main_address, data_state, last_update, publish_date, descriptions, 
               users.username AS publisher_name, editor.username AS editor_name, past_medical, past_surgical, drug_history
        FROM patients JOIN subscribers ON(subscriber_id = subscribers.id) JOIN users ON(users.id = subscribers.publisher_id) LEFT JOIN users AS editor ON(editor.id = subscribers.editor_id)
        WHERE data_state != 'Deleted' && data_state != 'Old' && subscribers.id = ${database.escape(req.query.id)}
      `;

      const { data: patient } = await database.query(query);

      let recordQuery = `
        SELECT records.id AS id, subscriber_id, fullname As subscriber_name, records.publish_date AS publish_date, records.descriptions AS descriptions, category, sub_category,
             users.username AS publisher_name, editor.username AS editor_name, records.data_state AS data_state, records.publisher_id AS publisher_id,
             data1, data2, data3, data4, data5, plan_date
        FROM records JOIN subscribers ON(subscriber_id = subscribers.id) JOIN diseases ON(records.id = record_id) JOIN users ON(users.id = records.publisher_id) LEFT JOIN users AS editor ON(editor.id = records.editor_id)
        WHERE records.data_state != 'Deleted' && records.data_state != 'Old' && subscriber_id = ${database.escape(req.query.id)} ORDER BY publish_date DESC
      `;

      const { data: records } = await database.query(recordQuery);
      res.status(200).json({patient: patient[0], records});
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
  }
}
