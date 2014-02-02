$("document").load(function() {
	var swig = require("swig");
	var sock = io.connect();
	var messages = [];
	var msgTemplate = '{% if msgType == reply %}<div class="row"><div id="{{ msgID }}" class="alert alert-info reply"><div class="reply-name">{{ name }}</div><div class="reply-content">{{ text }}</div></div></div>{% else %}<div id="{{ msgID }}" class="panel panel-default"><div class="panel-heading">{{ name}}: {{ text }}</div></div>{% endif %}';
	sock.on('message', function(msg) {
		//Add to map
		messages[msg.msgID] = msg;

		//Display in proper place
		if(messages[msg.msgID].repID != ''){
			//Add to existing message div
			$('#'+messages[msg.msgID].repID).add();
		}
		else{
			//Add div to room
		}
	});

	$("#chatInput").bind("enterKey", function(e) {
		//MORE FANCY JQUERY MONKEYING
		send($('#subjectBox').val,$('#messageBox').val,$('.selectedReply').attr('id'),$('.currentRoom').attr('id'))
		
	})

	function send(sub,txt,repID,roomID){
		sock.emit('message', sub, txt, repID, roomID);
	}

	$("#chatInput").keyUp(function(e) {
		if (e.keyCode == 13) {
			$(this).trigger("enterKey");
		}
	});

	$(".reply").click(function(){
    	$(this).siblings().fadeOut('slow');
    	$(this).trigger('getChat');
  	});

  	$(".reply").bind("getChat", function(e) {
  		//MONKEYING
  	});
});
