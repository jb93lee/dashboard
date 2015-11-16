
var report_file = require('./mysql2');
report_file.pool.getConnection(function(err, connection){
  query_sql ='select atackName as attack_name, count(atackName) as number from app_log.IPS group by atackname order by count(atackName) desc limit 10';
  connection.query(query_sql, function(err, results){
    var tmp= (JSON.stringify(results));
    var donut_data= JSON.parse(tmp);
    for(var i in donut_data){
      console.log(donut_data[i]);
    }
    connection.release();
    });
});
/*
document.addEventListener("DOMContentLoaded", function(event) {
  Morris.Donut({
    element: 'morris-donut-chart',
    data: [
/*
      {label: "ICMP Destination Unreachable", value: 2000},
      {label: "ICMP Echo", value: 736},
      {label: "CoDeSys Industrial Automation Stack Overrun", value: 723},
      {label: "Secure Shell Brute Force", value: 338},
      {label: "SIP Missing Required \n Contact Header Fields", value: 187},
      {label: "UDP Flooding", value: 128},
      {label: "Windows TCP Small Window DoS", value: 69},
      {label: "RPC Port Map Dump", value: 66},
      {label: "UDP Invalid Data Size", value: 46},

      report_file.pool.getConnection(function(err, connection){
        query_sql ='select atackName as attack_name, count(atackName) as number from app_log.IPS group by atackname order by count(atackName) desc limit 10';
        connection.query(query_sql, function(err, results){
  				var tmp= (JSON.stringify(results));
  				var tmp2= JSON.parse(tmp);
  				for(var i in donut_data){
            console.log(donut_data[i]);
          }
  				connection.release();
    			});
      });
    ]
  });
});
/*
      {label: "ICMP Destination Unreachable", value: 2000},
      {label: "ICMP Echo", value: 736},
      {label: "CoDeSys Industrial Automation Stack Overrun", value: 723},
      {label: "Secure Shell Brute Force", value: 338},
      {label: "SIP Missing Required \n Contact Header Fields", value: 187},
      {label: "UDP Flooding", value: 128},
      {label: "Windows TCP Small Window DoS", value: 69},
      {label: "RPC Port Map Dump", value: 66},
      {label: "UDP Invalid Data Size", value: 46},
*/
