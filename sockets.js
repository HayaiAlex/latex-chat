var chatController = require('./controllers/chat');

function bindClient(io,socket) {
	socket.on('entered', function() {
		// Tell everyone else that someone has entered
		socket.broadcast.emit('newUser');
	});
	
	socket.on('requestMessages', function(req, handle) {
		chatController.getMessages(io, socket, req, handle);
	});
	
	socket.on('newMessage', function(req, handle) {
		chatController.sendMessage(io, socket, req, handle);
	});
}
// Add names rooms/namespaces
module.exports = function(io) {
	io.on('connection', function(socket) {
		bindClient(io, socket);
	});
}; 