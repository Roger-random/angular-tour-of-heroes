// Example from https://www.npmjs.com/package/serve-static

const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

const serve = serveStatic('./coverage/angular-tour-of-heroes', {index: ['index.html']});

const server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
});

server.listen(8765);
