import { getSession } from "next-auth/react";
const database = require('../../../scripts/mysqlAsyncPoolConnection')

import moment from "moment";

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

    if(req.method === 'GET') {
        let query = "SELECT * FROM records WHERE data_state = 'Deleted'";
        let pageNumQuery = "";
        let limit = 30;

        let type = 'action_type';

        if(req.query.tab === 'Patient') {
            query = `
                SELECT subscribers.id AS id, patients.id AS patient_id, fullname, sex, age, subscribers.phoneNumber AS phoneNumber, main_address, data_state, last_update, publish_date, descriptions, 
                    users.username AS publisher_name, editor.username ASeditor_name, past_medical, past_surgical, drug_history
                FROM patients JOIN subscribers ON(subscriber_id = subscribers.id) JOIN users ON(users.id = subscribers.publisher_id) LEFT JOIN users AS editor ON(editor.id = subscribers.editor_id)
                WHERE data_state = 'Deleted'
            `
            type = 'sex';
        } else if(req.query.tab === 'Record') {
            query = `
            SELECT records.id AS id, subscriber_id, fullname As subscriber_name, records.publish_date AS publish_date, records.descriptions AS descriptions, category, sub_category,
                   users.username AS publisher_name, editor.username AS editor_name, records.data_state AS data_state, records.publisher_id AS publisher_id,
                   data1, data2, data3, data4, data5, plan_date
                FROM records JOIN subscribers ON(subscriber_id = subscribers.id) JOIN diseases ON(records.id = record_id) JOIN users ON(users.id = records.publisher_id) LEFT JOIN users AS editor ON(editor.id = records.editor_id)
                WHERE records.data_state = 'Deleted'
            `
            type = 'sub_category';
        }

        if(req.query.minDate || req.query.maxDate) {
            if(req.query.minDate && req.query.maxDate && req.query.minDate !== '' &&  req.query.maxDate !== '') query += ` && publish_date BETWEEN ${database.escape(req.query.minDate)} AND ${database.escape(req.query.maxDate)}`;
            else if(req.query.minDate && req.query.minDate !== '') query += ` && publish_date > ${database.escape(req.query.minDate)}`
            else if(req.query.maxDate && req.query.maxDate !== '') query += ` && publish_date < ${database.escape(req.query.maxDate)}`
        }

        if(req.query.recordType && req.query.recordType !== 'All' && req.query.recordType !== '') query += ` && ${type} = ${database.escape(req.query.recordType)}`;
        if(req.query.user && req.query.user !== 'All' && req.query.user !== '') query += ` && publisher_id = ${database.escape(req.query.user)}`;

        pageNumQuery = "SELECT count(*) AS num " + query.substring(query.indexOf('FROM'))
        query += ` ORDER BY publish_date DESC LIMIT ${req.query.page * limit - limit}, ${limit}`;

        try {    
            const {data: pageNum} = await database.query(pageNumQuery);
            const {data: body} = await database.query(query);
            res.status(200).json({body, pageNum: pageNum[0].num/limit});
        } catch(err) {
            console.log(err);
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }

    if(req.method === 'DELETE') {
        try{
            if(req.body.tab === 'Patient') {
                await database.query("DELETE FROM subscribers WHERE (id = ? || other_data = ?) AND (data_state = 'Deleted' || data_state = 'Old')", [req.body.id, req.body.id]);
                await database.query("DELETE FROM Patients WHERE subscriber_id = ? ", [req.body.id]);
                await database.query("DELETE FROM records WHERE subscriber_id = ?", [req.body.id]);
            } else if(req.body.tab === 'Record') {
                await database.query("DELETE FROM records WHERE (id = ? || other_data = ?) AND (data_state = 'Deleted' || data_state = 'Old')", [req.body.id, req.body.id]);
                await database.query("DELETE FROM diseases WHERE record_id = ? ", [req.body.id]);
            }

            res.status(202).json({type: 'done', message: `The ${req.body.tab} Successfully Deleted`});
        } catch(err) {
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }

        return;
    }

    if(req.method === 'PUT') {
        try{
            if(req.body.tab === 'Patient') {
                await database.query("UPDATE subscribers SET ? WHERE id = ? AND data_state = 'Deleted'", [{data_state: 'Restored', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}, req.body.id]);
                await database.query(`UPDATE records SET ? WHERE subscriber_id = ? AND data_state = 'Deleted' AND last_update >= '${moment(req.body.last_update).format('YYYY-MM-DD')}'`, [{data_state: 'Restored', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}, req.body.id]);
            } else if(req.body.tab === 'Record') {
                await database.query("UPDATE records SET ? WHERE id = ? AND data_state = 'Deleted'", [{data_state: 'Restored', editor_id: session.user.name.id, last_update: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}, req.body.id]);
            }

            res.status(202).json({type: 'done', message: `The ${req.body.tab} Successfully Restord`});
        } catch(err) {
            console.log(err);
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }

        return;
    }
}