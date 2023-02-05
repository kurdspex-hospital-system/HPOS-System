const fs = require('fs');
import moment from "moment";

const createBackupFile = async (database, tables) => {
    if (!fs.existsSync('backup_data')) {
        fs.mkdirSync('backup_data');
    }

    await fs.writeFileSync(`backup_data/data_${moment(Date.now()).format('YYYY-MM-DD')}.sql`, '');
    for(let table of tables) {
        await fs.appendFileSync(`backup_data/data_${moment(Date.now()).format('YYYY-MM-DD')}.sql`, `DELETE FROM ${table.TABLE_NAME}`);
        const {data} = await database.query(`SELECT * FROM ${table.TABLE_NAME}`);
    
        for(let rowData of data) {
            await fs.appendFileSync(`backup_data/data_${moment(Date.now()).format('YYYY-MM-DD')}.sql`, `\nINSERT INTO ${table.TABLE_NAME} SET ${database.escape(rowData)}`)
        }
    
        await fs.appendFileSync(`backup_data/data_${moment(Date.now()).format('YYYY-MM-DD')}.sql`, `\n`)
    }
}

module.exports = {
    backup: async (databaseConnection) => {
        const {data: tables} = await databaseConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = ?", [databaseConnection.getDatabaseName()]);
        await createBackupFile(databaseConnection, tables);
    },
    restore: async (databaseConnection, date) => {
        try {  
            const allFileContents = fs.readFileSync(`backup_data/data_${date}.sql`, 'utf-8').split(/\r?\n/);

            for(let line of allFileContents) {
                if(line.trim() !== '') {
                    await databaseConnection.query(line);
                }
            }
        } catch(err) {
            console.log(err);
        }
    },
    getBackupFileNames: async () => {
        try {
            const files = await fs.readdirSync('backup_data/');
            return files.map((file) => file.substring(5, 15));
        } catch(err) {
            return [];
        }
    }
}