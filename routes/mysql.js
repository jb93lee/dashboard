var mysql= require('mysql');
exports.pool= mysql.createPool({
  host:"192.168.32.2",
  port: "3306",
  user: "username",
  password: "password",
  database: "dashboard",
  connectionLimit: 20,
  queueLimit: 100,
  waitForConnections: true
});

exports.pool.getConnection(function(err, connection){
/*  var query_sql= 'select * from tables';
  connection.query(query_sql, function(err, results){
    console.log(JSON.stringify(results,null,2));
    var tmp= (JSON.stringify(results,null,2));
    var tmp2= JSON.parse(tmp);
//    res.render('template/report', {table_data:JSON.stringify(results,null,2)});
    connection.release();
    console.log(tmp2[0]);
  }); */
});
