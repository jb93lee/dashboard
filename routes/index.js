var Bbs= require('../persister/bbs');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var request= require('request');
var fs = require('fs');
var async = require('async');
var date= require('date-utils');
var report_file = require('./mysql2');

module.exports = function(app, passport){

	app.get('/modal',isAuthenticated, function(req, res) {
		sDay=req.query.sd;dDay=req.query.dd;
		report_file.pool.getConnection(function(err, connection){
		 var query_sql= "select (select 'MX') as eq, count(*) as num from app_log.mail_log where date >= '"+ sDay +"' and date <= '"+ dDay +"' union select (select 'syslog'),count(*) as num from app_log.syslog where time >= '"+ sDay +"' and time <= '"+ dDay +"' union select (select 'WEB'),count(*) as num from app_log.web_access_log where time >= '"+ sDay +"' and time <= '"+ dDay +"'";
		 connection.query(query_sql, function(err, results){
			 connection.release();
			 res.render('template/modal',{table_data:results});
		 });
		});
	});

	app.get('/dashboard',isAuthenticated, function(req, res) {
		var dt = new Date();
		var dDay = dt.toFormat('YYYY-MM-DD');
		if (req.query.days != null){
			var num= req.query.days;
			num= num * -1;
			var da= dt.addDays(num);
			var sDay = da.toFormat('YYYY-MM-DD');
		}
		else{
			var da= dt.addDays(-7);
			var sDay = da.toFormat('YYYY-MM-DD');
		}
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "select srcip, count(srcip) as count, country from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 10";
			connection.query(query_sql, function(err, results){
				async.series([
					function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select (select 'IPS') as eq,count(*) as num from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' union select (select 'WAF') as eq,count(*) as num from app_log.WAF where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"'  union select (select 'MX') as eq, count(*) as num from app_log.mail_log where date >= '"+ sDay +"' and date <= '"+ dDay +"'  union select (select 'syslog'),count(*) as num from app_log.syslog where time >= '"+ sDay +"' and time <= '"+ dDay +"'  union select (select 'WEB'),count(*) as num from app_log.web_access_log where time >= '"+ sDay +"' and time <= '"+ dDay +"'";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('nums', results);}
								connection.release();
								callback(null, '0');
								});
							});
					},
					function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where  time2 >= '"+ sDay + "' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 0,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack1_data', results);
								connection.release();
								callback(null, '1');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where  time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 1,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack2_data', results);
								connection.release();
								callback(null, '2');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 2,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack3_data', results);
								connection.release();
								callback(null, '3');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 3,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack4_data', results);
								connection.release();
								callback(null, '4');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 4,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack5_data', results);
								connection.release();
								callback(null, '5');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 5,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack6_data', results);
								connection.release();
								callback(null, '6');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 6,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack7_data', results);
								connection.release();
								callback(null, '7');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 7,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack8_data', results);
								connection.release();
								callback(null, '8');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 8,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack9_data', results);
								connection.release();
								callback(null, '9');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 9,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack10_data', results);
								connection.release();
								callback(null, '10');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select level, count(level) as num from app_log.IPS where time2 >= '"+ sDay +"' group by level";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('level_data', results);}
								connection.release();
								callback(null, '12');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select level, attackname, count(attackname) as num from app_log.IPS where time2 >= '"+ sDay +"' group by level,attackname order by level,num desc";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('level_data2', results);}
								connection.release();
								callback(null, '13');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country, country_code, count(country) as count from app_log.IPS where time2 >= '"+ sDay +"' and country not like 'null' group by country order by count(country) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('bar_data2', results);
								connection.release();
								callback(null, '11');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country, srcip, count(srcip) as num from app_log.IPS where time2 >=  '"+ sDay +"' group by country_code,srcip having num >= 2 order by country_code,num desc";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('bar_data3', results);}
								connection.release();
								callback(null, '14');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country_code as code, count(country) as value, country from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and country not like 'null' and country not like '%denied%' and country not like 'unknown' group by country_code order by count(country) desc";
							connection.query(query_sql, function(err, results){
								req.flash('map_data', results);
								connection.release();
								callback(null, '15');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select (select 'IPS') as eq, (unix_timestamp(date(app_log.IPS.time2))*1000+32400000) as ts, count(app_log.IPS.time2) as num from app_log.IPS where app_log.IPS.srcip not like '192.168.0.1' group by ts union select (select 'WAF') as eq, (unix_timestamp(date(app_log.WAF.time2))*1000+32400000) as ts, count(app_log.WAF.time2) as num from app_log.WAF where app_log.WAF.srcip not like '192.168.0.1' group by ts union select (select 'mail') as eq, (unix_timestamp(date(app_log.mail_log.date))*1000+32400000) as ts, count(app_log.mail_log.date) as num from app_log.mail_log group by ts union select (select 'web_access') as eq, (unix_timestamp(date(app_log. web_access_log.time))*1000+32400000) as ts, count(app_log. web_access_log.time) as num from app_log.web_access_log group by ts";
							connection.query(query_sql, function(err, results){
								req.flash('line_data_dash', results);
								connection.release();
								callback(null, '16');
								});
							});
					}
				],
				function (err, result) {
						connection.release();
						res.render('template/dashboard',{
							'nums':req.flash('nums'),
							'ip_data':results,
							'attack1_data':req.flash('attack1_data'),
							'attack2_data':req.flash('attack2_data'),
							'attack3_data':req.flash('attack3_data'),
							'attack4_data':req.flash('attack4_data'),
							'attack5_data':req.flash('attack5_data'),
							'attack6_data':req.flash('attack6_data'),
							'attack7_data':req.flash('attack7_data'),
							'attack8_data':req.flash('attack8_data'),
							'attack9_data':req.flash('attack9_data'),
							'attack10_data':req.flash('attack10_data'),
							'bar_data2':req.flash('bar_data2'),
							'bar_data3':req.flash('bar_data3'),
							'map_data':req.flash('map_data'),
							'date':req.query.days,
							level_data:req.flash('level_data'),
							level_data2:req.flash('level_data2'),
							'sDay':sDay,
							'dDay':dDay,
							line_data_dash:req.flash('line_data_dash')
						});
				});
			});
		});
	});

	app.post('/dashboard',isAuthenticated, function(req, res) {
		var dt = new Date();
		if(req.body.start_date == '' && req.body.end_date != ''){
			var da= dt.addDays(-7);
			var sDay = da.toFormat('YYYY-MM-DD');
			var dDay=req.body.end_date+'24';
		}
		else if(req.body.end_date == '' && req.body.start_date == ''){
			var dDay = dt.toFormat('YYYY-MM-DD')+'24';
			var da= dt.addDays(-7);
			var sDay = da.toFormat('YYYY-MM-DD');
		}
		else if(req.body.end_date == '' && req.body.start_date != ''){
			var sDay=req.body.start_date;
			var dDay = dt.toFormat('YYYY-MM-DD')+'24';
		}
		else{
			var sDay=req.body.start_date;
			var dDay=req.body.end_date+'24';
		}
		if(sDay>=dDay){
			res.render('template/blank2',{});
		}
		else{
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "select srcip, count(srcip) as count, country from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 10";
			connection.query(query_sql, function(err, results){
				async.series([
					function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select (select 'IPS') as eq,count(*) as num from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' union select (select 'WAF') as eq,count(*) as num from app_log.WAF where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"'  union select (select 'MX') as eq, count(*) as num from app_log.mail_log where date >= '"+ sDay +"' and date <= '"+ dDay +"'  union select (select 'syslog'),count(*) as num from app_log.syslog where time >= '"+ sDay +"' and time <= '"+ dDay +"'  union select (select 'WEB'),count(*) as num from app_log.web_access_log where time >= '"+ sDay +"' and time <= '"+ dDay +"'";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('nums', results);}
								else{ res.render('template/blank3',{})}
								connection.release();
								callback(null, '0');
								});
							});
					},
					function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where  time2 >= '"+ sDay + "' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 0,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack1_data', results);}
								connection.release();
								callback(null, '1');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where  time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 1,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack2_data', results);}
								connection.release();
								callback(null, '2');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 2,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack3_data', results);}
								connection.release();
								callback(null, '3');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 3,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack4_data', results);}
								connection.release();
								callback(null, '4');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 4,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack5_data', results);}
								connection.release();
								callback(null, '5');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 5,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack6_data', results);}
								connection.release();
								callback(null, '6');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 6,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack7_data', results);}
								connection.release();
								callback(null, '7');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 7,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack8_data', results);}
								connection.release();
								callback(null, '8');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 8,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack9_data', results);}
								connection.release();
								callback(null, '9');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 9,1) group by attackName order by count(attackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('attack10_data', results);}
								connection.release();
								callback(null, '10');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select level, count(level) as num from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' group by level";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('level_data', results);}
								connection.release();
								callback(null, '12');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select level, attackname, count(attackname) as num from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' group by level,attackname union select level, attackname, count(attackname) as num from app_log.WAF where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' group by level,attackname order by level,num desc";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('level_data2', results);}
								connection.release();
								callback(null, '13');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country, country_code, count(country) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and country not like 'null' group by country order by count(country) desc limit 10";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('bar_data2', results);}
								connection.release();
								callback(null, '11');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country, srcip, count(srcip) as num from app_log.IPS where time2 >=  '"+ sDay +"' and time2 <= '"+ dDay +"' group by country_code,srcip having num >= 2 order by country_code,num desc";
							connection.query(query_sql, function(err, results){
								if (results != ''){	req.flash('bar_data3', results);}
								connection.release();
								callback(null, '14');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country_code as code, count(country) as value, country from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and country not like 'null' and country not like '%denied%' and country not like 'unknown' group by country_code order by count(country) desc";
							connection.query(query_sql, function(err, results){
								if (results != ''){req.flash('map_data', results);}
								connection.release();
								callback(null, '15');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select (select 'IPS') as eq, (unix_timestamp(date(app_log.IPS.time2))*1000+32400000) as ts, count(app_log.IPS.time2) as num from app_log.IPS where app_log.IPS.srcip not like '192.168.0.1' group by ts union select (select 'WAF') as eq, (unix_timestamp(date(app_log.WAF.time2))*1000+32400000) as ts, count(app_log.WAF.time2) as num from app_log.WAF where app_log.WAF.srcip not like '192.168.0.1' group by ts union select (select 'mail') as eq, (unix_timestamp(date(app_log.mail_log.date))*1000+32400000) as ts, count(app_log.mail_log.date) as num from app_log.mail_log group by ts union select (select 'web_access') as eq, (unix_timestamp(date(app_log. web_access_log.time))*1000+32400000) as ts, count(app_log. web_access_log.time) as num from app_log.web_access_log group by ts";
							connection.query(query_sql, function(err, results){
								req.flash('line_data_dash', results);
								connection.release();
								callback(null, '16');
								});
							});
					}
				],
				function (err, result) {
						connection.release();
						if(results==''){res.render('template/blank3',{});}
						res.render('template/dashboard',{
							'nums':req.flash('nums'),
							'ip_data':results,
							line_data_dash:req.flash('line_data_dash'),
							'attack1_data':req.flash('attack1_data'),
							'attack2_data':req.flash('attack2_data'),
							'attack3_data':req.flash('attack3_data'),
							'attack4_data':req.flash('attack4_data'),
							'attack5_data':req.flash('attack5_data'),
							'attack6_data':req.flash('attack6_data'),
							'attack7_data':req.flash('attack7_data'),
							'attack8_data':req.flash('attack8_data'),
							'attack9_data':req.flash('attack9_data'),
							'attack10_data':req.flash('attack10_data'),
							'bar_data2':req.flash('bar_data2'),
							'bar_data3':req.flash('bar_data3'),
							'map_data':req.flash('map_data'),
							'date':req.query.days,
							level_data:req.flash('level_data'),
							level_data2:req.flash('level_data2'),
							'sDay':sDay,
							'dDay':dDay.split('24')[0]
					});
				});
			});
		});}
	});

	app.get('/search_ip_ajax',isAuthenticated, function(req, res) {
		if (req.query.ip!= null && req.query.lv!= null && req.query.date!= null){
			report_file.pool.getConnection(function(err, connection){
			 var query_sql= "select (select 'IPS') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country_code, country, level from app_log.IPS where srcip like '"+ req.query.ip+ "' and level like '"+ req.query.lv+ "' and time2 like '"+ req.query.date+ "%' union select (select 'WAF') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2 , srcip, dstip, srcport, dstport, country_code, country, level from app_log.WAF where srcip like '"+ req.query.ip+ "' and level like '"+ req.query.lv+ "' and time2 like '"+ req.query.date+ "%' order by time2 desc";
			 connection.query(query_sql, function(err, results){
				 connection.release();
				 res.render('template/search-ip-ajax',{table_data:results});
			 });
		 	});
	 	}
		if (req.query.sD!= null && req.query.an!= null && req.query.dD!= null){
			req.query.ip = '%';
			report_file.pool.getConnection(function(err, connection){
			 var query_sql= "select (select 'IPS') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country_code, country, level from app_log.IPS where srcip like '"+ req.query.ip+ "' and attackname like '%"+ req.query.an+ "%' and time2 >='"+ req.query.sD +"' and time2 <= '"+ req.query.dD+ "24' union select (select 'WAF') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2 , srcip, dstip, srcport, dstport, country_code, country, level from app_log.WAF where srcip like '"+ req.query.ip+ "' and attackname like '%"+ req.query.an+ "%' and time2 >= '"+ req.query.sD +"' and time2 <= '"+ req.query.dD+ "24' order by time2 desc";
			 connection.query(query_sql, function(err, results){
				 connection.release();
				 res.render('template/search-ip-ajax',{table_data:results});
			 });
			});
		}
		if (req.query.ip!= null && req.query.an!= null && req.query.sD== null){
			if(req.query.ip == ''){
				req.query.ip = '%';
			}
			report_file.pool.getConnection(function(err, connection){
			 var query_sql= "select (select 'IPS') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country_code, country, level from app_log.IPS where srcip like '"+ req.query.ip+ "' and attackname like '%"+ req.query.an+ "%' union select (select 'WAF') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2 , srcip, dstip, srcport, dstport, country_code, country, level from app_log.WAF where srcip like '"+ req.query.ip+ "' and attackname like '%"+ req.query.an+ "%' order by time2 desc";
			 connection.query(query_sql, function(err, results){
				 connection.release();
				 res.render('template/search-ip-ajax',{table_data:results});
			 });
		 	});
	 	}

 	});

	app.get('/search_attack_ajax',isAuthenticated, function(req, res) {
		if (req.query.ip!= null && req.query.lv!= null && req.query.date!= null){
			report_file.pool.getConnection(function(err, connection){
			 var query_sql= "select (select 'IPS') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country_code, country, level from app_log.IPS where srcip like '"+ req.query.ip+ "' and level like '"+ req.query.lv+ "' and time2 like '"+ req.query.date+ "%' union select (select 'WAF') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2 , srcip, dstip, srcport, dstport, country_code, country, level from app_log.WAF where srcip like '"+ req.query.ip+ "' and level like '"+ req.query.lv+ "' and time2 like '"+ req.query.date+ "%' order by time2 desc";
			 connection.query(query_sql, function(err, results){
				 connection.release();
				 res.render('template/search-ip-ajax',{table_data:results});
			 });
			});
		}
	});

	app.get('/search_ip',isAuthenticated, function(req, res) {
		if (req.query.q!= null){
			var rand = Math.floor(Math.random() * 1000);
			report_file.pool.getConnection(function(err, connection){
			 var query_sql= "create view app_log.temp_"+rand.toString()+" as select (select 'IPS') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country_code, country, level from app_log.IPS where srcip like '"+ req.query.q+ "' union select (select 'WAF') as equip, attackName, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2 , srcip, dstip, srcport, dstport, country_code, country, level from app_log.WAF where  srcip like '"+ req.query.q+ "' order by time2 desc";
			 connection.query(query_sql, function(err, results){
					async.series([
									function (callback) {
										 report_file.pool.getConnection(function(err, connection){
												 var query_sql= "select (unix_timestamp(date(time2))*1000+32400000) as ts, count(time2) as num from app_log.temp_"+rand.toString()+" group by ts";
												 connection.query(query_sql, function(err, results){
													 if (results != ''){req.flash('line_data',results);}
													 connection.release();
													 console.log(1);
													 callback(null, '0');
												 });
										 });
								 },
									function (callback) {
											report_file.pool.getConnection(function(err, connection){
											var query_sql= "select * from app_log.temp_"+rand.toString();
											connection.query(query_sql, function(err, results){
												if (results != ''){	req.flash('table_data', results);}
												connection.release();
												console.log(2);
												callback(null, '1');
												});
											});
									},function (callback) {
											report_file.pool.getConnection(function(err, connection){
											var query_sql= "select attackname, count(attackName) as count from app_log.temp_"+rand.toString()+" group by attackName limit 10";
											connection.query(query_sql, function(err, results){
												if (results != ''){	req.flash('ip_data', results);}
												connection.release();
												console.log(3);
												callback(null, '2');
												});
											});
									},function (callback) {
											report_file.pool.getConnection(function(err, connection){
											var query_sql= "select date_format(time2, '%Y-%m-%d') as date, level, count(time2) as num from app_log.temp_"+rand.toString()+" group by date,level";
											connection.query(query_sql, function(err, results){
												if (results != ''){	req.flash('heat_data', results);}
												connection.release();
												console.log(4);
												callback(null, '3');
												});
											});
									},function (callback) {
											report_file.pool.getConnection(function(err, connection){
											var query_sql= "select level, count(level) as num from app_log.temp_"+rand.toString()+" group by level";
											connection.query(query_sql, function(err, results){
												if (results != ''){	req.flash('level_data', results);}
												connection.release();
												console.log(5);
												callback(null, '4');
												});
											});
									},function (callback) {
											report_file.pool.getConnection(function(err, connection){
											var query_sql= "select level, attackname, count(attackname) as num from app_log.temp_"+rand.toString()+" group by level,attackname order by level,num desc";
											connection.query(query_sql, function(err, results){
												if (results != ''){	req.flash('level_data2', results);}
												connection.release();
												console.log(6);
												callback(null, '4');
												});
											});
									}
								],
								function (err, result) {
										connection.release();
										report_file.pool.getConnection(function(err, connection){
											var query_sql= "drop view app_log.temp_"+rand.toString();
											connection.query(query_sql, function(err, results){
											 	connection.release();
													res.render('template/search-ip',
												 {table_data:req.flash('table_data'),
												 ip_data:req.flash('ip_data'),
												 line_data:req.flash('line_data'),
												 heat_data:req.flash('heat_data'),
												 level_data:req.flash('level_data'),
												 level_data2:req.flash('level_data2')
											 });
											});
										});
								});
						 });
					 });
	 }else {
			 res.render('template/search-ip',{table_data:{},ip_data:{},top_ip_data:{},top_cd_data:{},line_data:{},heat_data:{},level_data:{},level_data2:{}});
		}
	});

	app.get('/search_eq',isAuthenticated, function(req, res) {
			 res.render('template/search-eq',{table_data:{},ip_data:{},top_ip_data:{},top_cd_data:{},bar_data2:{},bar_data3:{},level_data:{},level_data2:{},attack1_data:{},attack2_data:{},attack3_data:{},attack4_data:{},attack5_data:{},attack6_data:{},attack7_data:{},attack8_data:{},attack9_data:{},attack10_data:{},sDay:{},dDay:{}});
	});

	app.post('/search_eq', isAuthenticated, function(req,res){
		if(req.body.limit == ''){
				req.body.limit= '10000';
		}
		if(req.body.source_port == ''){
				req.body.source_port= '%';
		}
		if(req.body.time_start == ''){
				req.body.time_start= '2015-01-01';
		}
		if(req.body.time_end == ''){
				req.body.time_end= '2015-12-31';
		}
		if(req.body.destination_port == ''){
				req.body.destination_port= '%';
		}
		if(req.body.level == ''){
				req.body.level= '%';
		}
		var rand = Math.floor(Math.random() * 1000);
		req.body.time_end=req.body.time_end+'24';
		report_file.pool.getConnection(function(err, connection){
			if(req.body.eq == 'ALL'){
				var query_sql= "create view app_log.temp"+rand+" as select (select 'IPS') as equip, level, attackname, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country, country_code from app_log.IPS where time2 >= '"+ req.body.time_start+ "' and level like '%"+ req.body.level+ "%' and time2 <= '"+ req.body.time_end+ "' and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and dstport like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' union select (select 'WAF') as equip, level, attackname, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country, country_code from app_log.WAF where time2 >= '"+ req.body.time_start+ "' and level like '%"+ req.body.level+ "%' and time2 <= '"+ req.body.time_end+ "' and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and dstport like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' order by time2 desc" ;
			}else{
				var query_sql= "create view app_log.temp"+rand+" as select (select '"+req.body.eq+ "') as equip, level, attackname, date_format(time2, '%Y-%m-%d %H:%i:%s') as time2, srcip, dstip, srcport, dstport, country, country_code from app_log."+ req.body.eq+" where time2 > '"+ req.body.time_start+ "' and level like '%"+ req.body.level+ "%' and time2 <= '"+ req.body.time_end+ "' and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and dstport like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' order by time2 desc limit " + req.body.limit;
			}
			connection.query(query_sql, function(err, results){
				connection.release();
				async.series([
						function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select * from app_log.temp"+rand;
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('table_data',results);}
									connection.release();
									callback(null, '1');
								});
							});
						},
						function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+" group by srcip order by count(srcip) desc limit 0,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack1_data', results);}
									connection.release();
									callback(null, '1');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 1,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack2_data', results);}
									connection.release();
									callback(null, '2');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 2,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack3_data', results);}
									connection.release();
									callback(null, '3');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 3,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack4_data', results);}
									connection.release();
									callback(null, '4');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 4,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack5_data', results);}
									connection.release();
									callback(null, '5');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 5,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack6_data', results);}
									connection.release();
									callback(null, '6');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 6,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack7_data', results);}
									connection.release();
									callback(null, '7');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 7,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack8_data', results);}
									connection.release();
									callback(null, '8');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 8,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack9_data', results);}
									connection.release();
									callback(null, '9');
									});
								});
						},function (callback) {
								report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, attackName as attack_name, count(attackName) as count from app_log.temp"+rand+" where srcip = (select srcip from app_log.temp"+rand+"  group by srcip order by count(srcip) desc limit 9,1) group by attackName order by count(attackName) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('attack10_data', results);}
									connection.release();
									callback(null, '10');
									});
								});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select attackname, count(attackname) as count from app_log.temp"+rand+" group by attackname order by count(attackname) desc";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('ip_data',results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select srcip, count(srcip) as count, country from app_log.temp"+rand+" group by srcip order by count(srcip) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('top_ip_data',results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select country_code, country, count(country_code) as count from app_log.temp"+rand+" group by country_code order by count(country_code) desc limit 10";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('bar_data2',results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select country, srcip, count(srcip) as num from app_log.temp"+rand+" group by country_code,srcip having num >= 1 order by country_code,num desc";
								connection.query(query_sql, function(err, results){
									if (results != ''){req.flash('bar_data3',results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select level, count(level) as num from app_log.temp"+rand+" group by level";
								connection.query(query_sql, function(err, results){
									if (results != ''){	req.flash('level_data', results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "select level, attackname, count(attackname) as num from app_log.temp"+rand+" group by level,attackname order by level,num desc";
								connection.query(query_sql, function(err, results){
									if (results != ''){	req.flash('level_data2', results);}
									connection.release();
									callback(null, '1');
								});
							});
						},function (callback) {
							report_file.pool.getConnection(function(err, connection){
								var query_sql= "drop view app_log.temp"+rand;
								connection.query(query_sql, function(err, results){
									connection.release();
									callback(null, '1');
								});
							});
						}],
						function (err, result) {
							res.render('template/search-eq', {
								'attack1_data':req.flash('attack1_data'),
								'attack2_data':req.flash('attack2_data'),
								'attack3_data':req.flash('attack3_data'),
								'attack4_data':req.flash('attack4_data'),
								'attack5_data':req.flash('attack5_data'),
								'attack6_data':req.flash('attack6_data'),
								'attack7_data':req.flash('attack7_data'),
								'attack8_data':req.flash('attack8_data'),
								'attack9_data':req.flash('attack9_data'),
								'attack10_data':req.flash('attack10_data'),
								table_data:req.flash('table_data'),
								ip_data:req.flash('ip_data'),
								top_ip_data:req.flash('top_ip_data'),
								bar_data2:req.flash('bar_data2'),
								bar_data3:req.flash('bar_data3'),
								level_data:req.flash('level_data'),
								level_data2:req.flash('level_data2'),
								dDay:req.body.time_end.split('24')[0],
								sDay:req.body.time_start
							});
						}
				);
			});
		});
	});

	 /* GET home page. */
	app.get('/',isAuthenticated, function(req, res) {
	   res.redirect('/dashboard');
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash : true
	}));

	app.get('/login', function(req, res) {
	   res.render('template/login', { message: req.flash('message') });
	});

	app.get('/logout', function(req, res) {
	   req.logout();
	   res.redirect('/');
	});

	app.get('/signup', function(req, res){
		res.render('template/signup',{ message: req.flash('message') });
	});

	/* Handle Registration POST */
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true
	}));
	app.get('/readme',isAuthenticated, function(req, res) {
	   res.render('template/readme', {});
	});
	app.get('/index',isAuthenticated, function(req, res) {
	   res.render('template/index', {});
	});
	app.get('/flot',isAuthenticated, function(req, res) {
	   res.render('template/flot', {});
	});
	app.get('/morris',isAuthenticated, function(req, res) {
	   res.render('template/morris', {});
	});
	app.get('/tables',isAuthenticated, function(req, res) {
	   res.render('template/tables', {});
	});
	app.get('/forms',isAuthenticated, function(req, res) {
	   res.render('template/forms', {});
	});
	app.get('/panelswells',isAuthenticated, function(req, res) {
	   res.render('template/panelswells', {});
	});
	app.get('/buttons',isAuthenticated, function(req, res) {
	   res.render('template/buttons', {});
	});
	app.get('/notifications',isAuthenticated, function(req, res) {
	   res.render('template/notifications', {});
	});
	app.get('/typography',isAuthenticated, function(req, res) {
	   res.render('template/typography', {});
	});
	app.get('/icons',isAuthenticated, function(req, res) {
	   res.render('template/icons', {});
	});
	app.get('/grid',isAuthenticated, function(req, res) {
	   res.render('template/grid', {});
	});

	app.get('/board',isAuthenticated, function(req, res) {

		var url = 'http://192.168.33.26/data.tsv';
		request(url, function(error, response, html){
				if (error) {throw error};
				fs.writeFile('public/data.tsv',html,encoding='utf8',function(err){
				if(err){
					throw err;
				}
			});
		});

		 var report_file = require('./mysql2');
		 report_file.pool.getConnection(function(err, connection){
			 var query_sql= "select srcip, dstip, count(srcip) as count from app_log.IPS where srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip,dstip order by count(srcip) desc limit 10";
			 connection.query(query_sql, function(err, results){
				 var tmp= (JSON.stringify(results));
				 var tmp2= JSON.parse(tmp);
				 res.render('template/board', {table_data:tmp2});
				 connection.release();
			 });
		 });
	});

	app.get('/bbs',isAuthenticated, function(req, res) {
	   res.render('template/bbs', {});
	});

	app.get('/honeypot',isAuthenticated, function(req, res) {
			var dt = new Date();
			var dDay = dt.toFormat('YYYY-MM-DD');
			if (req.query.days != null){
				var num= req.query.days;
				num= num * -1;
				var da= dt.addDays(num);
				var sDay = da.toFormat('YYYY-MM-DD');
			}
			else{
				var da= dt.addDays(-7);
				var sDay = da.toFormat('YYYY-MM-DD');
			}
			async.series([
				function (callback) {
						// starttime >= '"+ sDay +"' and
						report_file.pool.getConnection(function(err, connection){
						var query_sql= "select country, country_code, count(country) as count from kippo.sessions where country not like 'null' group by country order by count(country) desc limit 10";
						connection.query(query_sql, function(err, results){
							if (results != ''){req.flash('bar_data2', results);}
							connection.release();
							callback(null, '1');
							});
						});
				},function (callback) {
					// where starttime >= '"+ sDay +"'
						report_file.pool.getConnection(function(err, connection){
						var query_sql= "select country, ip as srcip, count(ip) as num from kippo.sessions group by country_code,ip having num >= 2 order by country_code,num desc";
						connection.query(query_sql, function(err, results){
							if (results != ''){	req.flash('bar_data3', results);}
							connection.release();
							callback(null, '2');
							});
						});
				},function (callback) {
						report_file.pool.getConnection(function(err, connection){
						var query_sql= "select country, country_code, count(srcip) as count from kippo.kippo_ip where country not like 'null' group by country order by count desc limit 10";
						connection.query(query_sql, function(err, results){
							if (results != ''){req.flash('bar_data4', results);}
							connection.release();
							callback(null, '3');
							});
						});
				},function (callback) {
						report_file.pool.getConnection(function(err, connection){
						var query_sql= "select country, srcip, count as num from kippo.kippo_ip group by country_code,srcip having num >= 2 order by country_code,num desc";
						connection.query(query_sql, function(err, results){
							if (results != ''){	req.flash('bar_data5', results);}
							connection.release();
							callback(null, '4');
							});
						});
					},function (callback) {
						report_file.pool.getConnection(function(err, connection){
							 var query_sql= "select (unix_timestamp(date(starttime))*1000+32400000) as ts, count(starttime) as num from kippo.sessions group by ts";
							 connection.query(query_sql, function(err, results){
								 if (results != ''){req.flash('line_data',results);}
								 connection.release();
								 callback(null, '5');
							 });
					 });
				 },function (callback) {
					// starttime >=  '"+ sDay +"' and starttime <= '"+ dDay +"' and
					report_file.pool.getConnection(function(err, connection){
					var query_sql= "select kippo.sessions.country_code as code, count(kippo.sessions.country) as value, kippo.sessions.country from kippo.sessions where kippo.sessions.country not like 'null' and kippo.sessions.country not like '%denied%' and kippo.sessions.country not like 'unknown' group by kippo.sessions.country_code order by count(kippo.sessions.country) desc";
					connection.query(query_sql, function(err, results){
						if (results != ''){
							req.flash('kippo_map_data', results);
						}
						connection.release();
						callback(null, '6');
						});
					});
				}
			],
			function (err, result) {
					res.render('template/honeypot',{
						'date':req.query.days,
						'bar_data2':req.flash('bar_data2'),
						'bar_data3':req.flash('bar_data3'),
						'bar_data4':req.flash('bar_data4'),
						'bar_data5':req.flash('bar_data5'),
						'line_data':req.flash('line_data'),
						'kippo_map_data':req.flash('kippo_map_data'),
						level_data:req.flash('level_data'),
						level_data2:req.flash('level_data2'),
						sDay:sDay,
						dDay:dDay
					});
			});
		});

	app.get('/report',isAuthenticated, function(req, res) {
				 res.render('template/report');
	});

	app.get('/blank',isAuthenticated, function(req, res) {
				 res.render('template/blank');
	});


}
	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  res.redirect('/login');
	}
