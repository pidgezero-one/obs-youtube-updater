/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getTabs(callback) {
  chrome.tabs.query({}, function(tabs) {
    callback(tabs);
  });
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(video)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getYoutubeVideo(id, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://www.googleapis.com/youtube/v3/videos' +
    '?key=YOUR_API_KEY_HERE&id=' + encodeURIComponent(id) + "&part=snippet";
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    callback(x.response.items);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function getUrlVars(url)
{
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
	
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
	if (item.filename = "current-youtube-output.txt") {
		console.log(true);
		chrome.storage.local.get(function(options) {
			// retrieve preference from option page
			var suggestion = {filename: item.filename};
			suggestion["conflictAction"] = "overwrite";
			suggest(suggestion);
		});
	}
    return true;
});

var lastVideo = "";

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		getTabs(function(tabs) {
		  
		  for (var i = 0; i < tabs.length; i++) {
			var url = tabs[i].url;
			if (url.match(/\byoutube.com\b/) && url != lastVideo) {
				lastVideo = url;
				var pars = getUrlVars(url);
				
				getYoutubeVideo(pars["v"], function(video) {
					var output = video[0].snippet.channelTitle + " - " + video[0].snippet.title ;
					
					var textFile = null,
					makeTextFile = function (text) {
						var data = new Blob([text], {type: 'text/plain'});

						// If we are replacing a previously generated file we need to
						// manually revoke the object URL to avoid memory leaks.
						if (textFile !== null) {
						  window.URL.revokeObjectURL(textFile);
						}

						textFile = window.URL.createObjectURL(data);

						return textFile;
					};

					chrome.downloads.download({
					  url: makeTextFile(output),
					  filename: "current-youtube-output.txt", // Optional
					  conflictAction: "overwrite"
					});
					
				}, function(errorMessage) {
					console.log(errorMessage);
				});
			}
		  }
		
		});
	}
});
