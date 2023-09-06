const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql123',
  database:'lyl_demo_01'
})

module.exports = db;