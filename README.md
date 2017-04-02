# obs-youtube-updater
Displays and updates in OBS the name and uploader of whatever YouTube video you're watching in Chrome. Recommended for people streaming with background music who want to credit the uploader on their layout!

# This is in alpha testing before I release it through Google! If you want to try it out and let me know if anything goes wrong, please follow the instructions below and open up an issue report if there are any bugs.

How to use:

**Installing**

* Download the repository (click the big button that does that!) and extract all the files to any directory you like.
* Follow steps 1-3 of the "Before you start" instructions [here](https://developers.google.com/youtube/v3/getting-started#before-you-start). You can name your project whatever you want, it's just to get an API key.
* Copy the API key you got from the previous step. Open **background.js** and replace "YOUR_API_KEY_HERE" with it. There is only one place you need to do this.
* In Chrome, go to Settings -> Extensions and check off "Developer mode" at the top right.
* Click "Load unpacked extension" and select wherever you extracted the code to.

**Using with OBS**

* While you have this extension enabled, it will download a file called "current-youtube-output.txt" every time a new YouTube video plays in your browser. It will always overwrite the file so you don't get a billion of them. I will eventually add an option to enable or disable this.
* In OBS Studio, under Sources, add a new Text source and check off "Read from file". Navigate to your downloads folder and select "current-youtube-output.txt"
* Style and format it however you want, it's a text source. [Example](http://imgur.com/a/B2mKG)
* It will automatically update whenever a new YouTube video starts in Chrome. Does not need to be the active tab.

If you like this extension, please consider [donating to my PayPal](https://www.paypal.me/pidgezero), which is always appreciated but never necessary!