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
    let query = "SELECT id, action_type, publisher_id, other_data, last_update FROM records WHERE data_state = 'Old'";
    
    let type = 'action_type';

    if(req.query.tab === 'Patient') {
        query = `
          SELECT subscribers.id AS id, patients.id AS patient_id, fullname, sex, age, subscribers.phoneNumber AS phoneNumber, main_address, data_state, last_update, publish_date, descriptions, 
                 users.username AS publisher_name, editor.username AS editor_name, past_medical, past_surgical, drug_history, subscriber_id, COUNT(*) AS count, other_data
          FROM patients RIGHT JOIN subscribers ON(subscriber_id = subscribers.other_data) JOIN users ON(users.id = subscribers.publisher_id) JOIN users AS editor ON(editor.id = subscribers.editor_id)
          WHERE data_state = 'Old' GROUP BY other_data
        `
        type = 'sex';
    }

    if(req.query.minDate || req.query.maxDate) {
      if(req.query.minDate && req.query.maxDate && req.query.minDate !== '' &&  req.query.maxDate !== '') query += ` && publish_date BETWEEN ${database.escape(req.query.minDate)} AND ${database.escape(req.query.maxDate)}`;
      else if(req.query.minDate && req.query.minDate !== '') query += ` && publish_date > ${database.escape(req.query.minDate)}`
      else if(req.query.maxDate && req.query.maxDate !== '') query += ` && publish_date < ${database.escape(req.query.maxDate)}`
    }

    if(req.query.recordType && req.query.recordType !== 'All' && req.query.recordType !== '') query += ` && ${type} = ${database.escape(req.query.recordType)}`;
    if(req.query.user && req.query.user !== 'All' && req.query.user !== '') query += ` && publisher_id = ${database.escape(req.query.user)}`;

    query += ` ORDER BY publish_date DESC`;

    try {    
      const {data} = await database.query(query);
      res.status(200).json(data);
    } catch(err) {
      console.log(err);
      res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }
  }

  if (req.method === "DELETE") {
    try {
      if(req.body.tab === 'Patient') {
        await database.query("DELETE FROM subscribers WHERE id = ? AND data_state = 'Old'", [req.body.id]);
      }

      res.status(202).json({ type: "done", message: `The ${req.body.tab} Successfully Deleted`});
    } catch (err) {
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "PUT") {
    try {
      if (req.body.tab === "Patient") {
        await database.query("UPDATE subscribers SET ? WHERE id = ?", [{
          data_state: 'Restored Update',
          editor_id: session.user.name.id
        }, req.body.id]);

        await database.query("UPDATE subscribers SET ? WHERE id = ?", [{
          data_state: 'Old',
          other_data: req.body.id
        }, Number.parseInt(req.body.other_data)]);

        await database.query("UPDATE subscribers SET ? WHERE other_data = ? && data_state = 'Old'", [{other_data: req.body.id}, req.body.other_data])
      }

      res.status(202).json({ type: "done", message: `The ${req.body.tab} Successfully Restord` });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "PATCH") {
    try {
      if (req.body.tab === "Patient") {
        await database.query("DELETE FROM subscribers WHERE other_data = ? AND data_state = 'Old'", [req.body.other_data]);
      }

      res.status(202).json({ type: "done", message: `The ${req.body.tab} Successfully Deleted`});
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }
}
