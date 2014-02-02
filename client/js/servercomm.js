$("document").load(function() {
	var sock = io.connect();

	sock.on('message', function(msg) {
		//FANCY JQUERY MOKEYING
	});

	$("#chatInput").bind("enterKey", function(e) {
		//MORE FANCY JQUERY MONKEYING
	})
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
  	})
})