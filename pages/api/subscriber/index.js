import { getSession } from "next-auth/react";
const database = require("../../../scripts/mysqlAsyncPoolConnection");

import moment from "moment";

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
        SELECT subscribers.id AS id, patients.id AS patient_id, fullname, sex, phoneNumber, main_address, publish_date, descriptions
        FROM patients JOIN subscribers ON(subscriber_id = subscribers.id)
        WHERE data_state != 'Deleted' && data_state != 'Old'
      `;

      let pageNumQuery = "";
      let limit = 30;

      if(req.query.tab && req.query.tab === 'Today') {
        query += ` && (publish_date > '${moment(Date.now()).format('YYYY-MM-DD')}' || last_update > '${moment(Date.now()).format('YYYY-MM-DD')}')`;
      }

      if (req.query.type && req.query.searchText && req.query.searchText !== "") {
        if(req.query.type === 'name') {
          query += ` && (fullname LIKE${database.escape(req.query.searchText + '%')})`;
        } else if(req.query.type === 'phone number') {
          query += ` && (phoneNumber LIKE${database.escape(req.query.searchText + '%')})`;
        } else if(req.query.type === 'id') {
          query += ` && patients.id = ${database.escape(req.query.searchText)}`;
        }
      }
      
      pageNumQuery = "SELECT count(*) AS num " + query.substring(query.indexOf('FROM'))
      query += " ORDER BY publish_date DESC LIMIT " + (req.query.page * limit - limit) + ", " + limit;

      const { data: pageNum } = await database.query(pageNumQuery);
      const { data: subscribers } = await database.query(query);

      res.status(200).json({ subscribers, pageNum: Math.ceil(pageNum[0].num / limit) });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
  }

  if (req.method === "POST") {
    try {
      const reqData = {
        fullname: req.body.fullname,
        sex: req.body.sex,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber.replace(' ', ''),
        main_address: req.body.main_address,
        descriptions: req.body.descriptions,
        publisher_id: session.user.name.id,
        data_state: 'New',
        publish_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      };

      const { data: subscriber } = await database.query(`
        SELECT * FROM subscribers WHERE data_state != 'Deleted' && data_state != 'Old' && 
        phoneNumber = ${database.escape(req.body.phoneNumber.replace(' ', ''))} && fullname = ${database.escape(req.body.fullname)}
      `);

      if(subscriber.length > 0) {
        res.status(200).json({ type: "warning", message: "The patient already exists" });
        return;
      }

      const { data } = await database.query("INSERT INTO subscribers SET ?", [reqData]);

      if(req.body.past_medical) {
        const patientData = {
          subscriber_id: data.insertId,
          past_medical: req.body.past_medical === 'No' ? req.body.past_medical : req.body.past_medical_text,
          past_surgical: req.body.past_surgical,
          drug_history: req.body.drug_history
        }

        await database.query("INSERT INTO patients SET ?", [patientData]);
      }

      res.status(201).json({ type: "done", message: "The Subscribers Successfully Added", data });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "DELETE") {
    try {
      if(req.body.publisher_id === session.user.name.id || session.user.name.access === "SuperAdmin") {
        await database.query("UPDATE subscribers SET ? WHERE id = ?", [{data_state: 'Deleted', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} , req.body.id]);
        await database.query("UPDATE records SET ? WHERE subscriber_id = ? && data_state != 'Deleted' && data_state != 'Old'", [{data_state: 'Deleted', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} , req.body.id]);
      } else {
        res.status(403).json({type: 'error', message: 'You Not Have Permission'});
        return;
      }

      res.status(202).json({ type: "done", message: "The Subscriber Successfully Deleted" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "PUT") {
    try {
      const reqData = {
        fullname: req.body.fullname,
        sex: req.body.sex,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber.replace(' ', ''),
        main_address: req.body.main_address,
        descriptions: req.body.descriptions,
        data_state: 'Updated',
        editor_id: session.user.name.id,
        last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      };

      // const {data: oldPatient} = await database.query("SELECT * FROM subscribers WHERE id = ?", [req.body.id]);
      // delete oldPatient[0].id;

      // await database.query("INSERT INTO subscribers SET ?", [{
      //   ...oldPatient[0],
      //   data_state: 'Old',
      //   editor_id: session.user.name.id,
      //   other_data: req.body.id,
      //   last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      // }]);

      await database.query("UPDATE subscribers SET ? WHERE id = ?", [reqData, req.body.id]);

      if(req.body.past_medical) {
        const patientData = {
          past_medical: req.body.past_medical === 'No' ? req.body.past_medical : req.body.past_medical_text,
          past_surgical: req.body.past_surgical,
          drug_history: req.body.drug_history
        }

        await database.query("UPDATE patients SET ? WHERE subscriber_id = ?", [patientData, req.body.id]);
      }

      res.status(202).json({ type: "done", message: "The Subscriber Successfully Updated" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }
}
