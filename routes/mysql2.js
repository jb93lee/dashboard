var mysql= require('mysql');
exports.pool= mysql.createPool({
  host:"192.168.0.110",
  port: "3306",
  user: "root",
  password: "oppa",
  connectionLimit: 20,
  queueLimit: 100,
  waitForConnections: true
});
exports.pool.getConnection(function(err, connection){
//;
//  var query_sql= 'SELECT username, password, COUNT(username) FROM auth WHERE username <> "" AND password <> "" GROUP BY username, password ORDER BY COUNT(username) DESC';
//  connection.query(query_sql, function(err, results){
//    console.log(JSON.stringify(results,null,2));
//  });
});
