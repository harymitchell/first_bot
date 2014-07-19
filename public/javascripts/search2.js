// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

var ACCESS_TOKEN = ""
var DEVELOPER_KEY = "AIzaSyC4R4QWHhd1JmuzKCRZhgc58YLgLRI_Z9U"

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    console.log(response.items);
    // items->id->videoID
    //var responseString = JSON.stringify(response, '', '\t');
    //document.getElementById('response').innerHTML += responseString;
    for(i=0;i<response.items.length;i++){
	var id = response.items[i].id.videoId;
	var comments = ('https://gdata.youtube.com/feeds/api/videos/'+id+'/comments');
	if(id){
	    console.log(comments);
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", comments, false);
	    xhr.send();
	    console.log(xhr.status);
	    console.log(xhr.statusText);
	    xmlDocument = xhr.responseXML;
	    console.log(xmlDocument.childNodes['0'].textContent);
	}
   }

}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyDQ3APacLHNH6vqwyPTzoz1HVSfc4PLNXM');
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    document.getElementById('response').innerHTML = '';
    var q = ('#query').val();
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: q
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

function feed(){
    document.getElementById('response').innerHTML = '';    
    var q = $('#query').val();
    var query = 'http://gdata.youtube.com/feeds/api/videos?q='+q+'&start-index=1&max-results=50&orderby=viewCount&alt=json&fields=entry(media:group(yt:videoid))&time=today&v=2';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", query, false);
    xhr.send();
 //   console.log(xhr.status);
 //   console.log(xhr.statusText);
    var jsonDocument = JSON.parse(xhr.responseText);
    var entries = jsonDocument.feed.entry;
//    Console.log(JSON.stringify(entries, "\t"));
//    document.getElementById('response').innerHTML += JSON.stringify(entries, "\t");
    for(i=0;i<entries.length;i++){
	var id = (JSON.stringify(entries[i].media$group.yt$videoid.$t));
//	console.log(id);
	getComments(id);
    }
}

function getComments(id){
    id = id.substring(1, id.length-1);
    var url = 'https://gdata.youtube.com/feeds/api/videos/'+id+'/comments'
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    console.log(xhr.status);
    console.log(xhr.statusText);
 if(xhr.status == 200){
    xmlDoc = xhr.responseXML;
    var commentGroup = (xmlDoc.childNodes['0']);    
    var comments = commentGroup.getElementsByTagName("entry");
    var len = comments.length;
    if(len==0){
	console.log('\nhttp://www.youtube.com/watch?v='+id);

	document.getElementById('response').innerHTML += ('\nhttp://www.youtube.com/watch?v='+id);
    }
 //   for(i=len-1;i>=0;i--){
//	//var title = comments[i].getElementsByTagName("title")[0].nodeValue;
//	var content = comments[i].getElementsByTagName("content")[0].textContent;
//	console.log("\n"+content)
//    }
 }
}


// Sends comment to youtube using CORS.
function postComment(){
// POST /feeds/api/videos/VIDEO_ID/comments HTTP/1.1
// Host: gdata.youtube.com
// Content-Type: application/atom+xml
// Content-Length: CONTENT_LENGTH
// Authorization: Bearer ACCESS_TOKEN
// GData-Version: 2
// X-GData-Key: key=DEVELOPER_KEY 

    var id = $('#id_to_video').val();
	alert(id);
    var url = 'https://gdata.youtube.com/feeds/api/videos/'+id+'/comments'
    var body = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom"xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>First!</content></entry>';                          
 
 var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  xhr.setRequestHeader('Content-Type', 'application/atom+xml');
  xhr.setRequestHeader('Content-Length', 6) 
  xhr.setRequestHeader('Authorization', "Bearer " + "ACCESS_TOKEN")
  xhr.setRequestHeader('GData-Version', 2) 
  xhr.setRequestHeader('X-GData-Key', "key="+"DEVELOPER_KEY") 
  xhr.send(body);
    console.log(xhr.status);
    console.log(xhr.statusText);
    console.log ("poo")
}

// Creates a CORS request.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);

}



//function postCommentOldNonCORS(id){
   // var id = document.getElementById('query').val();
  //  var url = 'https://gdata.youtube.com/feeds/api/videos/'+id+'/comments'
    //var url = 'https://gdata.youtube.com/feeds/api/videos/KQhUTWYe4mg/comments';
   // var xhr = new XMLHttpRequest();
   // xhr.open("POST", url, true);
   // var invocation = new XMLHttpRequest();                             
   // var body = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/////Atom"xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>First!</content><//entry>';                          
//    if(invocation)                                                                                    
 //   {
 //       invocation.open('POST', url, true);
 //       invocation.setRequestHeader('X-PINGOTHER', 'pingpong');
 //       invocation.setRequestHeader('Content-Type', 'application/xml');
 ///    //   invocation.onreadystatechange = handler;
//	invocation.send(body);
//    }
//    console.log(xhr.status);
 //   console.log(xhr.statusText);
//}
