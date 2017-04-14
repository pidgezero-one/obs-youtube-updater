/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(video)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getYoutubeVideo(id, callback, errorCallback) {
  var searchUrl = 'https://www.googleapis.com/youtube/v3/videos' +
    '?key=YOUR_API_KEY_HERE&id=' + encodeURIComponent(id) + "&part=snippet";
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
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
	if (item.filename == "current-youtube-output.txt") {
		chrome.storage.local.get(function(options) {
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
		chrome.storage.sync.get('youtubeObsEnable', function(val) {
			if ((val.hasOwnProperty("youtubeObsEnable") && val["youtubeObsEnable"]) || !val.hasOwnProperty("youtubeObsEnable")) {
				var url = tab.url;
				if (url.match(/\byoutube.com\b/) && url != lastVideo) {
					lastVideo = url;
					var pars = getUrlVars(url);
					
					getYoutubeVideo(pars["v"], function(video) {
						//use an onchange event to save this to local storage?
						chrome.storage.sync.get('youtubeObsFormat', function(val) {
							if (val.hasOwnProperty("youtubeObsFormat") && val['youtubeObsFormat'] != "" && val['youtubeObsFormat'] != null) {
								var output = val['youtubeObsFormat'].replace("%ARTIST%", video[0].snippet.channelTitle).replace("%TITLE%", video[0].snippet.title);
								finishDownload(output);
							}
							else {
								var output = video[0].snippet.channelTitle + " - " + video[0].snippet.title;
								finishDownload(output)
							}
						});
						
						function finishDownload(str) {
							
							var textFile = null,
							makeTextFile = function (text) {
								var data = new Blob([text], {type: 'text/plain'});

								if (textFile !== null) {
								  window.URL.revokeObjectURL(textFile);
								}

								textFile = window.URL.createObjectURL(data);

								return textFile;
							};

							chrome.downloads.download({
							  url: makeTextFile(str),
							  filename: "current-youtube-output.txt",
							  conflictAction: "overwrite"
							});
						}
						
						
					}, function(errorMessage) {
						console.log(errorMessage);
					});
				}
			}
		});
	}
});