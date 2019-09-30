chrome.storage.sync.get('youtubeObsEnable', function(val) {
	if (val.hasOwnProperty("youtubeObsEnable")) {
		document.getElementById('enableExtension').checked = val["youtubeObsEnable"];
	}
	else {
		chrome.storage.sync.set({'youtubeObsEnable': true});
		document.getElementById('enableExtension').checked = true;
	}
});

chrome.storage.sync.get('youtubeObsFormat', function(val) {
	if (val.hasOwnProperty("youtubeObsFormat"))
		document.getElementById('youtube-obs-name-format').value = val['youtubeObsFormat'];
});

document.getElementById('youtube-obs-name-format').onkeyup = function() {
	chrome.storage.sync.set({'youtubeObsFormat': document.getElementById('youtube-obs-name-format').value});
}

document.getElementById('enableExtension').onclick = function() {
	chrome.storage.sync.set({'youtubeObsEnable': document.getElementById('enableExtension').checked});
}
