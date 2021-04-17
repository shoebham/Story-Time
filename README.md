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
2. Two different Language support (Hindi and English).<br>
3. Uses SpeechSynthesis for listening. <br>
4. Word Highlighting.<br>
5. Uses Animate on Scroll.<br>
6. Deployed on Firebase Hosting.<br>
7. Uses Bootstrap.<br>
8. Links to respective libraries from where I had to copy code and modify it according to my need is given in comments  in respective files. 
<hr>

<strong> <h3>BUGS</h3></strong><br>
1. Pause play does not work on mobile (This is a issue with speechsynthesis API itself) https://github.com/mdn/browser-compat-data/issues/4500
2. Languages are filled according to the browsers implementation (for eg. Brave browser currently only supports 2 languages)<br>
3. Word Highlighting only works for one language (which is selected by default).
If there are any other bugs you encounter please open up a issue.
<hr>

<strong> <h3>Credits</h3></strong><br>
1. SpeechSynthesis API https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
2. Animate on Scroll https://github.com/michalsnik/aos
3. Bootstrap https://getbootstrap.com/
4. Bootstrap Icons https://icons.getbootstrap.com/
5. Firestore https://firebase.google.com/docs/firestore
6. Chunker Written for breaking long text in SpeechSynthesis (mainly for non-english languages) https://gist.github.com/woollsta/2d146f13878a301b36d7#file-chunkify-js
7. Text Highlighter https://stackoverflow.com/questions/50284816/is-it-possible-to-select-the-word-that-is-being-read-while-using-the-speechsynth
8. Scroll to top button https://css-tricks.com/how-to-make-an-unobtrusive-scroll-to-top-button/
9. Chevron (scroll to bottom button) https://codepen.io/xonic/pen/KWMaqe

<h3>Resources used for Listen and Watch feature<h4>
  <h4>Youtube Videos</h4>
  1. The turtle and rabbit https://www.youtube.com/watch?v=_sslVJS7Gvk
  2. The Boy who cried wolf https://www.youtube.com/watch?v=zUDYuPL6YLI
  3. The golden egg https://www.youtube.com/watch?v=E5U6HXBcNEA
  4. The thirsty crow https://www.youtube.com/watch?v=uwzViw-T0-A
  
  <h4>English Text</h4>
  1. The turtle and rabbit http://read.gov/aesop/025.html
  2. The Boy who cried wolf http://read.gov/aesop/043.html
  3. The golden egg http://read.gov/aesop/091.html
  4. The thirsty crow http://read.gov/aesop/012.html

 <h4>Hindi Text</h4>
  1. The turtle and rabbit https://storyrevealers.com/blog/rabbit-and-tortoise-story/
  2. The Boy who cried wolf https://hindiparenting.firstcry.com/articles/bhaago-bhediya-aaya-bhediya-aaya-kahani-%E0%A4%AD%E0%A4%BE%E0%A4%97%E0%A5%8B-%E0%A4%AD%E0%A5%87%E0%A5%9C%E0%A4%BF%E0%A4%AF%E0%A4%BE-%E0%A4%86%E0%A4%AF%E0%A4%BE-%E0%A4%AD%E0%A5%87%E0%A5%9C%E0%A4%BF%E0%A4%AF%E0%A4%BE-%E0%A4%86%E0%A4%AF%E0%A4%BE-%E0%A4%95%E0%A4%B9%E0%A4%BE%E0%A4%A8%E0%A5%80/
  3. The golden egg https://royalbulletin.in/children-world/golden-fowl-funny-story/cid1997969.htm
  4. The thirsty crow https://www.thepublic.in/story-kahaniya/kids-stories/hindi-short-story-thirsty-crow
  
 <h2><strong> More stories can be added/removed. These stories were added for demonstration purposes</strong></h2>
 <br>
 <hr>
 <h3>Future Improvements</h3>
 <ul>
  <li>Make a script to scrape the web for stories and their youtube videos.</li>
  <li>Adding a Picture Book.</li>
  <li>Improving SpeechSynthesis.</li>
 <li>Highlight text in every language.</li>
  <li>Add more languages. </li>
</ul>
