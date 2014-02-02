$("document").load(function() {
	var sock = io.connect();
	var messages = [];
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
		send($('#subjectBox').val,$('#messageBox').val,$('.selectedReply').attr('id'),$('.currentRoom').attr('id'))
		
	});

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
    	$('.selectedReply').removeClass('.selectedReply');
    	$(this).addClass('.selectedReply');
  	});

  	$(".reply").bind("getChat", function(e) {
  		//MONKEYING
  	});
});
