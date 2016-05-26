var translatorBot = require('./src/translatorBot.js');
var http = require('http');

http.createServer(function (req, res) {
	//hacks
}).listen(process.env.PORT || 5000);

console.log('Bot started');