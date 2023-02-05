import { getSession } from "next-auth/react";
const database = require('../../../scripts/mysqlAsyncPoolConnection');

export default async function handler (req, res) {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({type: 'error', message: 'You Not Authorized'});
      return;
    }

    // if(session.user.name.access !== 'SuperAdmin' && session.user.name.access !== 'Admin' && session.user.name.access !== 'InventoryAccess') {
    //     res.status(403).json({type: 'error', message: 'You Not Have Permission'});
    //     return;
    // }

    if(req.method !== 'GET') {
        res.status(404).json({ type: "error", message: "Not Found"});
        return;
    }

    try{
        let query = `
        SELECT subscribers.id AS id, fullname, phoneNumber
        FROM patients RIGHT JOIN subscribers ON(subscriber_id = subscribers.id)
        WHERE data_state != 'Deleted' && data_state != 'Old'
        ORDER BY fullname
      `;

        const {data: subscribers} = await database.query(query);
        res.status(200).json(subscribers);
    } catch(err) {
        console.log(err);
        res.status(400).json({type: 'error', message: 'Some thing went wrong'});
    }
}