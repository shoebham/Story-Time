# Story-Time
<h3>A Story Book created for WEB IT UP PHASE:2</h3>
Website Link:- <br>
https://story-time-3a855.web.app/
<br>
You can watch youtube videos of your favorite stories, listen to the stories.<br>
Listening feature uses SpeechSynthesis API which is still exprimental so some users may experience some bugs on mobile and on some browsers<br>
<hr>
<strong> <h3>Features</h3></strong>
1. Story data is on firestore. <br>
2. Two different Language support (Hindi and English).
3. Uses SpeechSynthesis for listening. <br>
4. Word Highlighting.<br>
5. Uses Animate on Scroll.<br>
6. Deployed on Firebase Hosting.<br>
7. Uses Bootstrap.<br>
8. Links to respective libraries from where I had to copy code and modify it according to my need is given in  javascript file. 
<hr>
<strong> <h3>BUGS</h3></strong>
1. Pause play does not work on mobile (This is a issue with speechsynthesis API itself) (https://github.com/mdn/browser-compat-data/issues/4500) <br>
2. Languages are filled according to the browsers implementation (for eg. Brave browser currently only supports 2 languages)<br>
3. Word Highlighting only works for one language (which is selected by default).
If there are any other bugs you encounter please open up a issue.
