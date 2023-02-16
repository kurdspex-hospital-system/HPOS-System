import { getSession } from "next-auth/react";
const database = require('../../../../scripts/mysqlAsyncPoolConnection')

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
            const {data: records} = await database.query('SELECT * FROM records');
            const {data: users} = await database.query('SELECT * FROM users');
            const {data: subscribers} = await database.query('SELECT * FROM subscribers');
            const {data: patients} = await database.query('SELECT * FROM patients');
            const {data: diseases} = await database.query('SELECT * FROM diseases');

            const data = JSON.stringify({data: {records, users, subscribers, patients, diseases}});

            const buff = new Buffer(data);
            const base64data = buff.toString('base64');

            res.status(200).json(base64data);
        } catch(err) {
            console.log(err);
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }
}