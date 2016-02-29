//REQUIREMENTS\\
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var logger = require('morgan')

//CREATE APP\\
var app = express()


//APP CONFIG\\
app.use(logger('dev'))
app.use(bodyParser.JSON())	
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname +'/public'))

//ROUTES\\

app.get('/', function(req, res){
	res.sendFile('/index.html', {roor: './public'})

	//ACTIVATES SERVER\\
	var port = 300
	app.listen(port, function(){
		console.log('Server is running on port ' + port)
	})
})