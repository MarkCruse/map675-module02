var chalk = require('chalk');
var http = require('http');

console.log(chalk.blue('Starting a local web server ...'));

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello Node server!</h1>');
}).listen(8080);
