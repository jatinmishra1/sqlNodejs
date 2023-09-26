


const mysql = require("mysql2");
  
let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: "crud_database",
});
db_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
module.exports = db_con;