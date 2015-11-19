var Bbs= require('../persister/bbs');
var mongoose = require('mongoose');
var flash = require('connect-flash');

module.exports = function(app, passport){

	 /* GET home page. */
	app.get('/',isAuthenticated, function(req, res) {
	   res.redirect('/board');
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/board',
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
	app.get('/dashboard',isAuthenticated, function(req, res) {
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
	   res.render('template/board', {});
	});

  	app.get('/bbs',isAuthenticated, function(req, res) {
	   res.render('template/bbs', {});
	});

	app.get('/blank',isAuthenticated, function(req, res) {
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= 'select ip, count(ip) as count from kippo.sessions group by ip order by count(ip) desc limit 10';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data',tmp2);
		 		res.redirect('/blank2');
				//res.render('template/blank', {table_data:tmp2});
				connection.release();
			});
		});
	});
	app.get('/blank2',isAuthenticated, function(req, res) {
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= 'select username, count(username) as count from kippo.auth group by username order by count(username) desc limit 10';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data2',tmp2);
		 		res.redirect('/blank3');
				//res.render('template/blank', {table_data:tmp2});
				connection.release();
			});
		});
	});
	app.get('/blank3',isAuthenticated, function(req, res) {
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= 'select password, count(password) as count from kippo.auth group by password order by count(username) desc limit 10';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data3',tmp2);
				res.redirect('/blank4');
				connection.release();
			});
		});
	});
	app.get('/blank4',isAuthenticated, function(req, res) {
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql= 'SELECT username, password, COUNT(username) as count FROM kippo.auth WHERE username <> "" AND password <> "" GROUP BY username, password ORDER BY COUNT(username) DESC limit 10;';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				req.flash('table_data4',tmp2);
				res.redirect('/blank5');
				connection.release();
			});
		});
	});
	app.get('/blank5',isAuthenticated, function(req, res) {
		var report_file = require('./mysql2');
		report_file.pool.getConnection(function(err, connection){
			var query_sql ='select atackName as attack_name, count(atackName) as number from app_log.IPS group by atackname order by count(atackName) desc limit 10';
			connection.query(query_sql, function(err, results){
				var tmp= (JSON.stringify(results));
				var tmp2= JSON.parse(tmp);
				res.render('template/blank', {table_data:req.flash('table_data'),table_data2:req.flash('table_data2'),table_data3:req.flash('table_data3'),table_data4:req.flash('table_data4'),donut_data:tmp2});
				connection.release();
			});
		});
	});

	app.get('/report',isAuthenticated, function(req, res) {
				 res.render('template/report');
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
