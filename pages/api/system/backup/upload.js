import { getSession } from "next-auth/react";
import moment from "moment";
const database = require('../../../../scripts/mysqlAsyncPoolConnection')

const restoreBackup = async (json) => {
    try {
        await database.query('DELETE FROM records');
        await database.query('DELETE FROM users');
        await database.query('DELETE FROM subscribers');
        await database.query('DELETE FROM patients');
        await database.query('DELETE FROM diseases');

        for(let record of json.data.records) {
            record.publish_date = moment(record.publish_date).format('YYYY-MM-DD h:mm:ss');
            record.last_update = record.last_update ? moment(record.last_update).format('YYYY-MM-DD h:mm:ss') : null;
            await database.query('INSERT INTO records SET ?', [record]);
        }

        for(let user of json.data.users) {
            user.created_at = moment(user.created_at).format('YYYY-MM-DD h:mm:ss');
            await database.query('INSERT INTO users SET ?', [user]);
        }

        for(let subscriber of json.data.subscribers) {
            subscriber.publish_date = moment(subscriber.publish_date).format('YYYY-MM-DD h:mm:ss');
            subscriber.last_update = subscriber.last_update ? moment(subscriber.last_update).format('YYYY-MM-DD h:mm:ss') : null;
            await database.query('INSERT INTO subscribers SET ?', [subscriber]);
        }

        for(let patient of json.data.patients) {
            await database.query('INSERT INTO patients SET ?', [patient]);
        }

        for(let disease of json.data.diseases) {
            disease.plan_date = moment(disease.plan_date).format('YYYY-MM-DD h:mm:ss');
            await database.query('INSERT INTO diseases SET ?', [disease]);
        }
    } catch(err) {
        console.log(err);
    }
}

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

    if(req.method === 'POST') {    
        try {
            const buff = new Buffer(req.body.data, 'base64');
            const data = buff.toString('ascii');

            await restoreBackup(await JSON.parse(data));
            res.status(201).json({type: 'done', message: 'The Data Restord Successfully'});
        } catch(err) {
            console.log(err);
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }
}