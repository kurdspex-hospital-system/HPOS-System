const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DATABASE_PORT,
	ssl: {
		ca: "/etc/ssl/certs/ca-certificates.crt",
		rejectUnauthorized: false,
	},
});

const database = {
	query: (query, data = []) => {
		const promise = new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				if (err) {
					reject(err);
				}

				connection.query(query, data, (err, data, fields) => {
					connection.release();

					if (err) {
						reject(err);
					}

					resolve(data, fields);
				});
			});
		});

		return promise
			.then((data, fields) => {
				return { data, fields };
			})
			.catch((err) => {
				throw new Error(err);
			});
	},
	escape: (data) => pool.escape(data),
	getDatabaseName: () => process.env.DATABASE,
};

module.exports = database;
