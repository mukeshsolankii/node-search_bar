var express = require('express');
var mysql = require('mysql');

var app = express();
var connection = mysql.createConnection({ //Here we are creating connection to the mysql database....
	host : '127.0.0.1',
	user : 'root',
	password : '',
	database : 'musa'
});
connection.connect();//Here connection is held...

app.set('view engine' , 'ejs');//For ejs file... to render.....

app.get('/' , (req ,res)=>{ res.render('db'); });//We use  this '()=>' instead of function()......

app.get('/query', function(req ,res){
	var search =  req.query.q;
	
	//Quering the database....
	connection.query(`SELECT * FROM search WHERE title LIKE '%${search}%' OR description LIKE '%${search}%'`,function(err , result , fields){
		if(err){
           res.send('error in database');
		} else{
			if(result[0] == null){// if result is empty....
				//console.log('hurrey');
				res.render('db',{err : "0 result found with '"+ search+"'"});
			}else{
			    var data = result;
			    //console.log(result);
		        res.render('db',{data : data});
	        }
        }
	});
	
});

app.listen(5432,()=>{ console.log('your app is running at port 5432 !!'); });
//NOTE: we don't use connection.end() function becouse it close the connection and cause error....
//NOTE: we use host: 127.0.0.1 instead of localhost becouse it cause error when its not connected to 
//internet.......