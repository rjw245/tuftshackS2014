<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
</script>
<style>
div.hidden {display:none;}
</style>
<script>
$(document).ready(function(){
  $("div").click(function(){
    $(this).siblings().fadeOut('slow');
    $(this).children().fadeIn('slow');
  });
});
</script>
</head>
<body>

<div>Reply
	<div class="hidden" 
	style="overflow: scroll; height: 400px;">Chatroom</div>
</div>

<div>Reply
	<div class="hidden"
	style="overflow: scroll; height: 400px;">Chatroom</div>
</div>

<div>Reply
	<div class="hidden"
	style="overflow: scroll; height: 400px;">Chatroom</div>
</div>

</body>
</html>