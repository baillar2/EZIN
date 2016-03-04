var request = require('request')
var fs = require('fs')


function getFile(req, res) {
	var options = {
			url: req.body.url,
			encoding: null, 
			headers: req.body.header
		}
	function callback(error, response, body){
		if(!error && response.statusCode == 200){
			fs.writeFile('./spreadsheet.xml', response.body, function(err){
				console.log(err)
			})
		}	
	}

	return request.get(options, callback)
}

module.export = {
	getFile: getFile
}