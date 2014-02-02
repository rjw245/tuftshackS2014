//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var swig = require('swig');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
router.engine('html', swig.renderFile);
router.set('view_engine', 'html');
router.set('views', __dirname + '/views');

router.set('view cache', false);
swig.setDefaults({ cache: false });

router.get('/', function (req, res) {
	res.render('post.html', { 
		post: {
			author: "me",
			time: "2014-01-02",
			subject: "Testing",
			content: "pray to god this works",
			title: "test",
			replies: [
				{
					author: "you",
					content: "test reply",
					time: "2014-01-02",
				},
			]
		}
	});
});

router.use("/client", express.static(__dirname + "/client"));

var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (subject,msg,repl) {
      var subj = String(subject || '');
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        

        socket.get('id', function (err, id) {
          //INSERT IN DATABASE
          db.serialize(function() {
            var time = (new Date()).getTime();
            var stmt = db.prepare("INSERT INTO messages VALUES(NULL,?,?,?,?,?,?)");
            var userid =
            stmt.run(id,subj,text,time,'');
            stmt.finalize();
          });
        });

        var data = {
          name: name,
          subj: subj,
          text: text,
          repl: repl
        };

        broadcast('message', data);
        messages.push(data);
      });

    });

    socket.on('identify', function (name,id) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
      socket.set('id', String(id || '0'));

    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
