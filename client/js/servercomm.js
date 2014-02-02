$("document").load(function() {
	console.log("serverconn init");
	var swig = require("swig");
	var sock = io.connect();
	var messages = [];
	var msgTemplate = '{% if msgType == reply %}<div class="row"><div id="{{ msgID }}" class="alert alert-info reply"><div class="reply-name">{{ name }}</div><div class="reply-content">{{ text }}</div></div></div>{% else %}<div id="{{ msgID }}" class="panel panel-default"><div class="panel-heading">{{ name}}: {{ text }}</div></div>{% endif %}';
	sock.on('message', function(msg) {
		//Add to map
		messages[msg.msgID] = msg;
		messages[msg.msgID].msgType = '';

		//Display in proper place
		if(messages[msg.msgID].repID != ''){
			//Add to existing message div
			if(messages[ messages[msg.msgID].repID ].repID != ''){
				//This is a chat message
				messages[msg.msgID].msgType = 'chat';

			}
			else{
				//This is a reply to a main topic
				messages[msg.msgID].msgType = 'reply';
			}
		}
		else{
			//This is a main topic
			messages[msg.msgID].msgType = 'topic';
		}
	});

	$("#chatInput").bind("enterKey", function(e) {
		//MORE FANCY JQUERY MONKEYING
		//send($('#subjectBox').val,$('#messageBox').val,$('.selectedReply').attr('id'),$('.currentRoom').attr('id'))
		console.log("enter");
	});

	function send(sub,txt,repID,roomID){
		sock.emit('message', sub, txt, repID, roomID);
	}

	$("#chatInput").keyup(function() {
		//if (e.keyCode == 13) {
			//$(this).trigger("enterKey");
		//}
		alert('Handler of .keyUp called');
	});

	$("#sendButton").click(function() {
		console.log("received");
	});

	$(".reply").click(function(){
    	$(this).siblings().fadeOut('slow');
    	$(this).trigger('getChat');
    	$('.selectedReply').removeClass('.selectedReply');
    	$(this).addClass('.selectedReply');
  	});

  	$(".reply").bind("getChat", function(e) {
  		//MONKEYING
  	});
});
