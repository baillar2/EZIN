//REQUIREMENTS\\
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var logger = require('morgan')
var request = require('request')
var controller = require('./controller/controller.js')
var fs = require('fs')
//CREATE APP\\
var app = express()


//APP CONFIG\\
app.use(logger('dev'))
app.use(bodyParser.json())	
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname +'/public'))

//ROUTES\\

app.get('/', function(req, res){
	res.sendFile('/index.html', {root: './public'})
})


app.get('/api/drive', function(req, res){
	var options = {
			url: req.body.url,
			encoding: null, 
			headers: req.body.header
		}
	function callback(error, response, body){
		if(!error && response.statusCode == 200){
			console.log(response)
			//fs.writeFile('./spreadsheet.xml', response.body, function(err){
				console.log(err)
			//})
		 console.log(err)	
		}
	}		
	 request.get(options, callback)
})




//ACTIVATES SERVER\\
var port = 3000
app.listen(port, function(){
	console.log('Server is running on port ' + port)
})
