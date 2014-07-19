$(document).ready(function(){

});

$(document).on('click', 'button.post_comment', function() {
	var val = new String($(this).attr("value"));
	val = val.substring(1, val.length - 1);
	postComment(val); //$(this).attr('data-value')
	$(this).hide();
});	  
