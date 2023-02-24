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
        SELECT records.id AS id, subscriber_id, fullname As subscriber_name, records.publish_date AS publish_date, records.descriptions AS descriptions, category, sub_category,
               users.username AS publisher_name, editor.username AS editor_name, records.data_state AS data_state, records.publisher_id AS publisher_id,
               data1, data2, data3, data4, data5, plan_date
        FROM records JOIN subscribers ON(subscriber_id = subscribers.id) JOIN diseases ON(records.id = record_id) JOIN users ON(users.id = records.publisher_id) LEFT JOIN users AS editor ON(editor.id = records.editor_id)
        WHERE records.data_state != 'Deleted' && records.data_state != 'Old'
      `;

      let pageNumQuery = "";
      let limit = 30;

      if(req.query.category) {
        query += ` && category = ${database.escape(req.query.category)}`;
      } 
      
      if(req.query.type && req.query.type !== 'All') {
        query += ` && sub_category = ${database.escape(req.query.type)}`;
      }

      if(req.query.minDate || req.query.maxDate) {
        if(req.query.minDate !== '' && req.query.maxDate !== '') query += " && records.publish_date BETWEEN " + database.escape(req.query.minDate) + " AND " + database.escape(req.query.maxDate);
        else if(req.query.minDate !== '') query += " && records.publish_date > " + database.escape(req.query.minDate);
        else if(req.query.maxDate !== '') query += " && records.publish_date < " + database.escape(req.query.maxDate);
      }

      if(req.query.user && req.query.user !== 'All' && req.query.user !== '') query += " && records.publisher_id = " + database.escape(req.query.user);
      if(req.query.receipt && req.query.receipt !== 0 && req.query.receipt !== '') query += ` && records.id = ${database.escape(req.query.receipt)}`;
      if(req.query.subscriber) query += " && subscriber_id = " + database.escape(req.query.subscriber);

      if(req.query.plan && req.query.plan !== 'All') query += ` && data5 LIKE '%${req.query.plan}%'`;
      if(req.query.state && req.query.state !== 'All') query += ` && data5 LIKE '%${req.query.state}%'`;
      if(req.query.planMinDate || req.query.planMaxDate) {
        if(req.query.planMinDate && req.query.planMaxDate) {
          query += " && plan_date BETWEEN " + database.escape(req.query.planMinDate) + " AND " + database.escape(req.query.planMaxDate);
        } else if(req.query.planMaxDate) {
          query += " && plan_date < " + database.escape(req.query.planMaxDate);
        } else {
          query += " && plan_date > " + database.escape(req.query.planMinDate);
        }
      } 

      if(req.query.category === 'Diseases' && req.query.type === 'Thyroid') {
        if(req.query.imaging && req.query.imaging !== 'All') query += ` && data1 LIKE '%${req.query.imaging}%'`;
        if(req.query.UST && req.query.UST !== 'All') query += ` && data3 LIKE '{"type":"${req.query.UST}%'`;
        if(req.query.FNAC && req.query.FNAC !== 'All') query += ` && data3 LIKE '%fnac":"${req.query.FNAC}%'`;
      }

      if(req.query.category === 'Diseases' && req.query.type === 'Breast') {
        if(req.query['complant[]'] && req.query['complant[]'].length > 0) {
          for(let option of req.query['complant[]']) {
            query += ` && data1 LIKE '%${option}%'`;
          }
        }

        if(req.query.imaging && req.query.imaging !== 'All') query += ` && data3 LIKE '%${req.query.imaging}%'`;
      }

      pageNumQuery = "SELECT count(*) AS num " + query.substring(query.indexOf('FROM'))
      query += " ORDER BY publish_date DESC LIMIT " + (req.query.page * limit - limit) + ", " + limit;

      const { data: pageNum } = await database.query(pageNumQuery);
      const { data: records } = await database.query(query);

      res.status(200).json({ records, pageNum: Math.ceil(pageNum[0].num / limit) });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "POST") {
    try {
      const reqData = {
        category: req.body.category,
        sub_category: req.body.sub_category,
        descriptions: req.body.descriptions,
        subscriber_id: req.body.subscriber.id,
        publisher_id: session.user.name.id,
        data_state: 'New',
        publish_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      };

      const { data } = await database.query("INSERT INTO records SET ?", [reqData]);

      if(req.body.category === 'Diseases') {
        let diseaseData = {};

        if(req.body.sub_category === 'Other') {
          diseaseData = {
            record_id: data.insertId,
            data1: req.body.data1,
            data2: req.body.data2,
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        } else if(req.body.sub_category === 'Breast') {
          diseaseData = {
            record_id: data.insertId,
            data1: JSON.stringify(req.body.data1),
            data2: req.body.data2,
            data3: JSON.stringify(req.body.data3),
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        } else if(req.body.sub_category === 'Thyroid') {
          diseaseData = {
            record_id: data.insertId,
            data1: req.body.data1,
            data2: JSON.stringify(req.body.data2),
            data3: JSON.stringify(req.body.data3),
            data4: JSON.stringify(req.body.data4),
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        }

        await database.query("INSERT INTO diseases SET ?", [diseaseData]);
        
        await database.query("UPDATE subscribers SET ? WHERE id = ?", [{
          last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, reqData.subscriber_id]);
      }

      res.status(201).json({ type: "done", message: "The Record Successfully Added", data });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }
    return;
  }

  if (req.method === "DELETE") {
    try {
      if(req.body.publisher_id === session.user.name.id || session.user.name.access === "SuperAdmin") {
        await database.query("UPDATE records SET ? WHERE id = ?", [{data_state: 'Deleted', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} , req.body.id]);
      } else {
        res.status(403).json({type: 'error', message: 'You Not Have Permission'});
        return;
      }

      res.status(202).json({ type: "done", message: "The record Successfully Deleted" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }

  if (req.method === "PUT") {
    try {
      const reqData = {
        category: req.body.category,
        sub_category: req.body.sub_category,
        descriptions: req.body.descriptions,
        subscriber_id: req.body.subscriber_id,
        data_state: 'Updated',
        editor_id: session.user.name.id,
        last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      };

      // const {data: oldPatient} = await database.query("SELECT * FROM records WHERE id = ?", [req.body.id]);
      // delete oldPatient[0].id;

      // await database.query("INSERT INTO records SET ?", [{
      //   ...oldPatient[0],
      //   data_state: 'Old',
      //   editor_id: session.user.name.id,
      //   other_data: req.body.id,
      //   last_update: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      // }]);

      await database.query("UPDATE records SET ? WHERE id = ?", [reqData, req.body.id]);

      if(req.body.category === 'Diseases') {
        let diseaseData = {};

        if(req.body.sub_category === 'Other') {
          diseaseData = {
            data1: req.body.data1,
            data2: req.body.data2,
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        } else if(req.body.sub_category === 'Breast') {
          diseaseData = {
            data1: JSON.stringify(req.body.data1),
            data2: req.body.data2,
            data3: JSON.stringify(req.body.data3),
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        } else if(req.body.sub_category === 'Thyroid') {
          diseaseData = {
            data1: req.body.data1,
            data2: JSON.stringify(req.body.data2),
            data3: JSON.stringify(req.body.data3),
            data4: JSON.stringify(req.body.data4),
            data5: JSON.stringify(req.body.data5),
            plan_date: moment(req.body.plan_date).format("YYYY-MM-DD HH:mm:ss")
          }
        }

        await database.query("UPDATE diseases SET ? WHERE record_id = ?", [diseaseData, req.body.id]);
      }

      res.status(202).json({ type: "done", message: "The record Successfully Updated" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ type: "error", message: "Some thing went wrong" });
    }

    return;
  }
}