// Once the api loads call enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Search for a given string.
function search() {
//    alert("in search()");
    var q = $('#query').val();
    alert(q);
    var request = gapi.client.youtube.search.list({
	part: 'snippet',
        q: q,
    });

    request.execute(function(response) {
	showResponse(response);

//	alert("executing request()");
//	var str = JSON.stringify(response.result);
//	$('#search-container').html('<pre>' + str + '</pre>');
    });
}
