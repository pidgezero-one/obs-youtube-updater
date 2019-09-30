# obs-youtube-updater
Displays and updates in OBS the name and uploader of whatever YouTube video you're watching in Chrome. Recommended for people streaming with background music who want to credit the uploader on their layout!

# Note: This needs to be updated and re-released via Google.

How to use:

**Installing**

https://chrome.google.com/webstore/detail/youtube-info-for-obs/fdnlhopofdjpmdhlcocieaahcggdafld/related?authuser=1

**Using with OBS**

* While you have this extension enabled, it will download a file called "current-youtube-output.txt" every time a new YouTube video plays in your browser. It will always overwrite the file so you don't get a billion of them. I will eventually add an option to enable or disable this.
* In OBS Studio, under Sources, add a new Text source and check off "Read from file". Navigate to your downloads folder and select "current-youtube-output.txt"
* Style and format it however you want, it's a text source. [Example](http://imgur.com/a/B2mKG)
* It will automatically update whenever a new YouTube video starts in Chrome. Does not need to be the active tab.

If you like this extension, please consider [donating to my Twitch stream](https://twitch.streamlabs.com/pidgezero_one#/), which is always appreciated but never necessary!