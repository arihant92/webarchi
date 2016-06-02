"use strict"; //good practice
var http = require('http'),
    _static = require('node-static'); // for serving files

// This will make all the files in the current folder
// accessible from the web
var fileServer = new _static.Server('./');

// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it

// If the URL of the socket server is opened in a browser
var server = http.createServer(function(request, response) {
  request.on('data', function (chunk) {}); //you have to add on ('data')

  request.addListener('end', function () {
      fileServer.serve(request, response);
  });
});

console.log("Starting up the server port 4994");
server.listen(4994);

var io = require('socket.io').listen(server); //you have to setup server first so this is the correct place to io.listen
// Delete this row if you want to see debug messages
//io.set('log level', 1);
// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

    // Start listening for mouse move events
    socket.on('mousemove', function (data) {
        // This line sends the event (broadcasts it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
});