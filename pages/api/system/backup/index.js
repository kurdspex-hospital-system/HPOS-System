import { getSession } from "next-auth/react";
const database = require('../../../../scripts/mysqlAsyncPoolConnection')
const mysqlBackup = require('../../../../scripts/mysqlBackupSystem');

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
        try {
            const files = await mysqlBackup.getBackupFileNames();
            res.status(201).json(files);
        } catch(err) {
            console.log(err);
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }

    if(req.method === 'POST') {    
        try {
            await mysqlBackup.backup(database);
            res.status(201).json({type: 'done', message: 'The Backup Created Successfully'});
        } catch(err) {
            res.status(400).json(err);
            // res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }

    if(req.method === 'PATCH') {
        try {
            await mysqlBackup.restore(database, req.body.date);
            res.status(201).json({type: 'done', message: 'The Backup Restord Successfully'});
        } catch(err) {
            res.status(400).json({type: 'error', message: 'Some thing went wrong'});
        }
    }
}