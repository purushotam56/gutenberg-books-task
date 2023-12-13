var mysql = require('mysql2/promise');
const bluebird = require('bluebird');
require('dotenv').config()

console.log(process.env.HOST,process.env.PASSWORD,process.env.USER_NAME)

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  Promise:bluebird
});

module.exports = connection