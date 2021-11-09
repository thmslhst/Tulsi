/*
*
* ..
* --
* @author >> Thomas Lhoest - tlhoest@gmail.com
*
* */

const SERVER_PORT = 8080;

var inport = 1515;
var outport = 2020;

var http = require('http'),
    ecstatic = require('ecstatic'), 
	io = require('socket.io'),
    dgram = require("dgram"),
    osc = require('osc-min'),
    EventEmitter = require('events').EventEmitter,
    emitter = new EventEmitter();

// memory leak "fix". May slow down the app...
// todo : find a better solution.
emitter.setMaxListeners(0);

//-> server

var server = http.createServer(ecstatic({root: 'public'}));

/*
*
* OSC RECEIVER
*
* */

var OSCReceiver = dgram.createSocket('udp4', function(msg, rInfo){

	var message = '';

	try {
		message = osc.fromBuffer(msg);
	} catch (e) {
		return console.log('error', e);
	}

	var elements = 'bundle' === message.oscType ? message.elements : [message];

	elements.forEach(function(el, index) {
		var args = [el.address];
		el.args.forEach(function(arg, index) {
			args.push(arg.value);
		});
		emitter.emit('message', args);
	});
});

OSCReceiver.bind(inport);

/*
*
* OSC SENDER
*
* */

var OSCSender = dgram.createSocket('udp4');

/*
*
* SOCKET IO
*
* */

io = io.listen(server);

io.sockets.on('connection', function (socket) {

	emitter.on('message', function(){
		socket.emit('osc-receive', arguments);
	});

	socket.on('osc-send', function(msg){

		var buf;
		buf = osc.toBuffer(msg);
		OSCSender.send(buf, 0, buf.length, outport, "localhost");

		socket.broadcast.emit('osc-broadcast', msg);
	});

    socket.on('port-change', function (m) {
        inport = m.inport;
        outport = m.outport;
    });
});

/*
*
*
* */

server.listen(SERVER_PORT);
