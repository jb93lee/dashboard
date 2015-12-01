var Bbs= require('../persister/bbs');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var request= require('request');
var fs = require('fs');
var async = require('async');
var date= require('date-utils');

module.exports = function(app, passport){

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
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "select srcip, count(srcip) as count, country from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 10";
			connection.query(query_sql, function(err, results){
				async.series([
					function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where  time2 >= '"+ sDay + "' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 0,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack1_data', results);
								connection.release();
								callback(null, '1');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where  time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 1,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack2_data', results);
								connection.release();
								callback(null, '2');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 2,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack3_data', results);
								connection.release();
								callback(null, '3');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 3,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack4_data', results);
								connection.release();
								callback(null, '4');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 4,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack5_data', results);
								connection.release();
								callback(null, '5');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 5,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack6_data', results);
								connection.release();
								callback(null, '6');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 6,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack7_data', results);
								connection.release();
								callback(null, '7');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 7,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack8_data', results);
								connection.release();
								callback(null, '8');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 8,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack9_data', results);
								connection.release();
								callback(null, '9');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select srcip, atackName as attack_name, count(atackName) as count from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip = (select srcip from app_log.IPS where time2 >= '"+ sDay +"' and time2 <= '"+ dDay +"' and srcip not like '192.168.%' and srcip not like '0.0.0.0' group by srcip order by count(srcip) desc limit 9,1) group by atackname order by count(atackName) desc limit 10";
							connection.query(query_sql, function(err, results){
								req.flash('attack10_data', results);
								connection.release();
								callback(null, '10');
								});
							});
					},function (callback) {
							report_file.pool.getConnection(function(err, connection){
							var query_sql= "select country, country_code, count(country) as count from app_log.IPS where time2 >= '"+ sDay +"' and country not like 'null' group by country order by count(country) desc limit 10";
							console.log(query_sql);
							connection.query(query_sql, function(err, results){
								req.flash('bar_data2', results);
								connection.release();
								callback(null, '11');
								});
							});
					}
				],

				function (err, result) {
						connection.release();
						res.render('template/dashboard',{'ip_data':results,
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
							'date':req.query.days
						});
				});
			});
		});
	});



	app.get('/search', function(req, res) {
			if (req.query.q!= null){
				var report_file = require('./mysql2');
			  report_file.pool.getConnection(function(err, connection){
				 var query_sql= "select atackName, date_format(time2, '%Y-%m-%d　%h:%i') as time2 , srcip, dstip, srcport, dstport, country_code from app_log.IPS where  srcip like '"+ req.query.q+ "' order by time2 desc";
				 connection.query(query_sql, function(err, results){
					 var tmp= (JSON.stringify(results));
					 var tmp2= JSON.parse(tmp);
					 res.render('template/search', {table_data:tmp2});
					 connection.release();
				 });
			 });
		 }else if (req.query.c!= null){
				var report_file = require('./mysql2');
			  report_file.pool.getConnection(function(err, connection){
				 var query_sql= "select atackName, date_format(time2, '%Y-%m-%d　%h:%i') as time2 , srcip, dstip, srcport, dstport, country_code from app_log.IPS where to_days(now()) - to_days(time2) <=7 and country_code like '"+ req.query.c+ "' order by time2 desc";
				 connection.query(query_sql, function(err, results){
					 var tmp= (JSON.stringify(results));
					 var tmp2= JSON.parse(tmp);
					 res.render('template/search', {table_data:tmp2});
					 connection.release();
				 });
			 });
			}else {
				 res.render('template/search',{table_data:{}});
			}
	});

	app.post('/search', isAuthenticated, function(req,res){
		if(req.body.limit == ''){
				req.body.limit= '10';
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
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "select atackName, date_format(time2, '%Y-%m-%d　%h:%i') as time2, srcip, dstip, srcport, dstport, country_code from app_log.IPS where time2 > timestamp('"+ req.body.time_start+ "') and time2 < timestamp('"+ req.body.time_end+ "') and atackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and dstport like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' order by time2 desc limit " + req.body.limit ;
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				res.render('template/search', {table_data:tmp2});
				connection.release();
			});
		});
	});


	app.get('/search2', function(req, res) {
			 res.render('template/search-waf',{table_data:{},ip_data:{}});
	});

	app.post('/search2', isAuthenticated, function(req,res){
		if(req.body.limit == ''){
				req.body.limit= '10';
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
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "select attackname as atackName, date_format(time2, '%Y-%m-%d　%h:%i') as time2, srcip, dstip, srcport, port as dstport, country_code from app_log.WAF where time2 > timestamp('"+ req.body.time_start+ "') and time2 < timestamp('"+ req.body.time_end+ "') and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and port like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' order by time2 desc limit " + req.body.limit ;
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data',tmp2);
				connection.release();

				report_file.pool.getConnection(function(err, connection){
					var query_sql= "select attackname, count(attackname) as count from app_log.WAF where time2 > timestamp('"+ req.body.time_start+ "') and time2 < timestamp('"+ req.body.time_end+ "') and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and port like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' group by attackname order by count(attackname) desc limit " + req.body.limit ;
					connection.query(query_sql, function(err, results){
						var tmp= (JSON.stringify(results));
						var tmp2= JSON.parse(tmp);
						console.log(tmp2);
						res.render('template/search-waf', {table_data:req.flash('table_data'),ip_data:tmp2});
						connection.release();
					});
				});

			});
		});
	});


	app.get('/search3', function(req, res) {
			 res.render('template/search-eq',{table_data:{},ip_data:{},top_ip_data:{},top_cd_data:{}});
	});

	app.post('/search3', isAuthenticated, function(req,res){
		if(req.body.limit == ''){
				req.body.limit= '100';
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
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= "create view app_log.temp as select attackname, date_format(time2, '%Y-%m-%d %h:%i') as time2, srcip, dstip, srcport, port as dstport, country, country_code from app_log.WAF where time2 > timestamp('"+ req.body.time_start+ "') and time2 < timestamp('"+ req.body.time_end+ "') and attackName like '%"+ req.body.attack_name +"%' and srcip like '%"+ req.body.source_ip+ "%' and dstip like '%"+ req.body.destination_ip + "%' and srcport like '"+ req.body.source_port+ "' and port like '"+ req.body.destination_port+ "' and country like '%" + req.body.country+ "%' order by time2 desc limit " + req.body.limit ;
			connection.query(query_sql, function(err, results){
				connection.release();

				report_file.pool.getConnection(function(err, connection){
					var query_sql= "select * from app_log.temp";
					connection.query(query_sql, function(err, results){
						var tmp= (JSON.stringify(results));
						var tmp2= JSON.parse(tmp);
						connection.release();
						req.flash('table_data',tmp2);

						report_file.pool.getConnection(function(err, connection){
							var query_sql= "select attackname, count(attackname) as count from app_log.temp group by attackname order by count(attackname) desc";
							connection.query(query_sql, function(err, results){
								var tmp= (JSON.stringify(results));
								var tmp2= JSON.parse(tmp);
								connection.release();
								req.flash('ip_data',tmp2);

								report_file.pool.getConnection(function(err, connection){
									var query_sql= "select srcip, count(srcip) as count, country from app_log.temp group by srcip order by count(srcip) desc limit 10";
									connection.query(query_sql, function(err, results){
										var tmp= (JSON.stringify(results));
										var tmp2= JSON.parse(tmp);
										connection.release();
										req.flash('top_ip_data',tmp2);

										report_file.pool.getConnection(function(err, connection){
											var query_sql= "select country_code, country, count(country_code) as count from app_log.temp group by country_code order by count(country_code) desc limit 10";
											connection.query(query_sql, function(err, results){
												var tmp= (JSON.stringify(results));
												var tmp2= JSON.parse(tmp);
												connection.release();
												req.flash('top_cd_data',tmp2);

												report_file.pool.getConnection(function(err, connection){
													var query_sql= "drop view app_log.temp";
													connection.query(query_sql, function(err, results){
														connection.release();
														res.render('template/search-eq', {
															table_data:req.flash('table_data'),
															ip_data:req.flash('ip_data'),
															top_ip_data:req.flash('top_ip_data'),
															top_cd_data:req.flash('top_cd_data')
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});


	 /* GET home page. */
	app.get('/',isAuthenticated, function(req, res) {
	   res.redirect('/dashboard');
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/search3',
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

//		var url = 'http://192.168.33.26/cities.csv';
		var url = 'http://192.168.0.110/cities.csv';
		request(url, function(error, response, html){
		    if (error) {throw error};
				fs.writeFile('public/cities.csv',html,encoding='utf8',function(err){
				if(err){
					throw err;
				}
			});
		});

		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= 'select ip, count(ip) as count from kippo.sessions group by ip order by count(ip) desc limit 10';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data',tmp2);
				connection.release();
				report_file.pool.getConnection(function(err, connection){
					var query_sql= 'select username, count(username) as count from kippo.auth group by username order by count(username) desc limit 10';
					connection.query(query_sql, function(err, results){
						var tmp= (JSON.stringify(results));
						var tmp2= JSON.parse(tmp);
						req.flash('table_data2',tmp2);
						connection.release();
						report_file.pool.getConnection(function(err, connection){
							var query_sql= 'select password, count(password) as count from kippo.auth group by password order by count(username) desc limit 10';
							connection.query(query_sql, function(err, results){
								var tmp= (JSON.stringify(results));
								var tmp2= JSON.parse(tmp);
								req.flash('table_data3',tmp2);
								connection.release();
								report_file.pool.getConnection(function(err, connection){
									var query_sql= 'SELECT username, password, COUNT(username) as count FROM kippo.auth WHERE username <> "" AND password <> "" GROUP BY username, password ORDER BY COUNT(username) DESC limit 10;';
									connection.query(query_sql, function(err, results){
										var tmp= (JSON.stringify(results));
										var tmp2= JSON.parse(tmp);
										req.flash('table_data4',tmp2);
										connection.release();
									});
										report_file.pool.getConnection(function(err, connection){
										var query_sql ='select atackName as attack_name, count(atackName) as number from app_log.IPS group by atackname order by count(atackName) desc limit 10';
										connection.query(query_sql, function(err, results){
											var tmp= (JSON.stringify(results));
											var tmp2= JSON.parse(tmp);
											res.render('template/honeypot', {table_data:req.flash('table_data'),table_data2:req.flash('table_data2'),table_data3:req.flash('table_data3'),table_data4:req.flash('table_data4'), donut_data:tmp2, html:req.flash('html')});
											connection.release();
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});

	app.get('/report',isAuthenticated, function(req, res) {
				 res.render('template/report');
	});

	app.get('/blank',isAuthenticated, function(req, res) {
				 res.render('template/blank');
	});


	app.get('/bbs/list',isAuthenticated, function(req, res) {
		 Bbs.find({},
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs);
	      }
	    );
	});

	app.post('/bbs/create',isAuthenticated, function(req, res) {

		var newBbs = new Bbs();
		// set the user's local credentials
		newBbs.content = req.param('content');
		newBbs.vote = 0;
		newBbs.username = req.user.username;

		// save the user
		newBbs.save(function(err) {
			if (err){
			  console.log('Error in Saving bbs: '+err);
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.post('/bbs/delete',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');
		Bbs.findByIdAndRemove(id,function(err){
			if (err){
			  console.log('Error in Saving bbs: '+err);
			  res.send({"result":false});
			}
			res.send({"result":true});
		})


	});
	app.post('/bbs/update',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');

		Bbs.findById(id,function(err,bbs){
			if (err){
			  console.log('Error in Saving bbs: '+err);
			  res.send({"result":false});
			}
			bbs.vote +=1;
			bbs.save(function(){
				res.send({"result":true});
			})

		})
	});
}
	// As with any middleware it is quintessential to call next()
	// if the user is authenticated
	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  res.redirect('/login');
	}
