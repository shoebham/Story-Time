var section = document.querySelector(".sections");
var title=document.getElementById("title");
var textarea = document.getElementById("textarea");
var videoSection = document.querySelector("#video-container");
var speechContainer = document.querySelector(".speech-container");
var langChange = document.querySelector("#language").value;
var msg = new SpeechSynthesisUtterance();
var voiceSelect = document.querySelector('#voices');
var scrollUpButt = document.querySelector(".scrollToTopBtn");
var tempHindiBuffer;
var tempEnglishBuffer;
var temp_arr;
var temp_lang;
var st=false;
var output="";
window.speechSynthesis.cancel();

// ----------------------Animate On Scroll----------------------------------
AOS.init(
    {
        once:true
    }
);
// --------------------------------------------------------------------------







//-------------------Firebase------------------------------------
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB1-Pyv_klRZ_CEzUDTgWAhDjqLZ7Q9cAU",
    authDomain: "story-time-3a855.firebaseapp.com",
    projectId: "story-time-3a855",
    storageBucket: "story-time-3a855.appspot.com",
    messagingSenderId: "847184503556",
    appId: "1:847184503556:web:5ccec5adf8c59171f72651",
    measurementId: "G-NRGYXKEP0Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //----------------------------------------Calls the database from firestore---------------------------------------------
  var db = firebase.firestore();
  db.settings({timstapsInSnapshots:true});

  db.collection("Stories").get().then((snapshot)=>
  {
    // console.log(snapshot);
    i=1;
     snapshot.forEach((e)=>
     {
        //  console.log(e.data());
         populateStories(e.data().title,i);
         i++;
     });
  });
//--------------------------------------------------------------------------------------
  
function populateStories(e,i)
{
    var storiesSelect = document.querySelector("#stories");
    var option = document.createElement("option");
    option.textContent=e;
    option.value=i;
    storiesSelect.appendChild(option);
    // console.log(option);
}

//----------------------------------------Renders the data from firestore----------------------------------------------
  function renderData()
  {
    var sel = document.getElementById("stories");
    var val = sel.options[sel.selectedIndex].value;
    window.speechSynthesis.cancel();
    dePopulateAll();
    populate();
    db.collection("Stories").get().then((snapshot)=>
    {
    //   console.log(snapshot);
       snapshot.forEach((e)=>
       {
        
        //    console.log(e.data());
        //    console.log("e",e.data().text);
        //    console.log("e.id",)
           if(e.data().id==val)
           {
               tempEnglishBuffer=e.data().text;
            textarea.value=e.data().text;  
            tempHindiBuffer=e.data().text_hindi;
            // console.log("e.data()",e.data().src);
            output=`<iframe data-aos="fade-right" data-aos-duration="1500" id="video" src="${e.data().src}" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            title.innerHTML=" "+e.data().title;
           }
           document.querySelector(".video-container").innerHTML=output;
       });
    });
  }
//----------------------------------------------------------------


//--------------------------Watch Button-----------------------------------
document.getElementById('Watch').addEventListener('click',()=>
{ 
    // window.speechSynthesis.cancel();
    var selected=document.getElementById("stories").value;
    // console.log(selected);  
    if(selected=="default")
    {
        alert("Please select a story");
    }
    else
    {  
        section.style="display:block;";
        speechContainer.style="display:none;";
        videoSection.style="display:block;"
        scrollUpButt.style="display:inline-block;";
        document.querySelector(".video-container").style="display:block;";
        document.querySelector(".speech-container").style="display:none;";
        document.querySelector(".chevron-container").style="visibility:visible;";       
        document.querySelector(".video-container").innerHTML=output;
    }
});
//-------------------------------------------------------------------------

function addIframe()
{
    document.querySelector(".video-container").innerHTML=output;
}

//--------------------------Listen Button-----------------------------------
document.getElementById('Listen').addEventListener('click',()=>{

    var selected=document.getElementById("stories").value;
    // console.log("selected is ",selected);
    textarea.autofocus=true;
    if(selected=="default")
    {
        alert("Please select a story");
    }
    else
    {
            // console.log(videoSection);
        videoSection.style="display:none;"
        speechContainer.style="display:block;";
        section.style="display:block;";
        scrollUpButt.style="display:inline-block;";
    // document.querySelector(".speech-container").style="display:block;";
    // document.querySelector(".video-container").style="display:none;";
    document.querySelector(".chevron-container").style="visibility:visible;";
    // SpeakText();
    
    }
}
);
//----------------------------------------------------------------




//-------------------------Scroll Down button----------------------------------
function scrollDown()
{
    document.getElementById("sections").scrollIntoView(true);
}

//----------------------------------------------------------------



//----------------------------Loads voices as page loads------------------------------------
window.speechSynthesis.onvoiceschanged = function()
{
 var synth = window.speechSynthesis;
var voices = synth.getVoices();
temp_arr=voices;
msg.lang="en-US";
populate();
// console.log(voices);
}
//----------------------------------------------------------------


//----------------------------Populates select menu of voices------------------------------------
function populate()
{
    // console.log("populate called");
    
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();
//   console.log(voices);
  var voiceSelect = document.querySelector('#voices');
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    option.value=i;
    if(voices[i].name=="Microsoft David Desktop - English (United States)") {
      option.textContent += ' -- DEFAULT';
      option.selected=true;
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  
    // console.log("selected",voiceSelect);
}
//----------------------------------------------------------------



//--------------------------Depopulates select menu of voices-------------------------------------
function dePopulateAll()
{
    var voiceSelect = document.getElementById('voices');
 
  for (i = voiceSelect.length-1; i >= 0; i--) {
    voiceSelect.options[i] = null;
  }
}
//----------------------------------------------------------------


//--------------------------Depopulates select menu of voices execpt hindi language--------------------------------------
function dePopulate()
{
// var voices = synth.getVoices();
  var voiceSelect = document.getElementById('voices');
 
  for (i = voiceSelect.length-1; i >= 0; i--) {
    if(((voiceSelect.options[i].text.includes("hi-IN"))||(voiceSelect.options[i].text.includes("hi_IN"))||(voiceSelect.options[i].text.includes("hindi"))))
    {
        continue;
    }
    voiceSelect.options[i] = null;
  }
}
//----------------------------------------------------------------



//---------------------------Gets data from json value( used in first build)-------------------------------------
// function getText(selected)
// {
//     var sel = document.getElementById("stories");
//     var val = sel.options[sel.selectedIndex].value;
//     window.speechSynthesis.cancel();
//     dePopulateAll();
//     populate();
//     // console.log(val);
//     fetch('stories.json')
//     .then((res)=>res.json())
//     .then((data)=>
//     {
//         let output ="";
//         // console.log(data);
        
//         data.forEach((e)=>
//         {
//             // console.log(e);
//             // console.log("sel is",val);
//             if(val==e.id)
//             {
//                 output+=`<iframe id="video" src="${e.src}" width="100%" height="100%"></iframe>`;
//                 title.innerHTML=" "+e.title;
//                 textarea.value=e.text;  
//                 tempHindiBuffer=e.text_hindi;
//                 // console.log(textarea.value);
//             }

//         });
//         document.querySelector(".video-container").innerHTML=output;
//     });
// }
//-----------------------------------------------------------------------------------------------------------
//  if(((voiceSelect.options[1].text.includes("hi-IN"))||(voiceSelect.options[1].text.includes("hi_IN"))||(voiceSelect.options[1].text.includes("hindi"))))

//------------------------------Changes language----------------------------------
function changeLanguage()
{
    let lang= document.querySelector("#language").value;
    stop();
    if(lang=="Hindi")
    {
        temp_lang="hi-IN";  
        textarea.value=tempHindiBuffer;
        dePopulate();
    }
    if(lang=="English")
    {
        textarea.value=tempEnglishBuffer;
        dePopulateAll();
        populate();
    }
    // console.log(lang);  
  
 
}
//----------------------------------------------------------------



//----------------------------Calls Speechsynthesiser( uses a word chunker) ------------------------------------
function SpeakText()
{
    window.speechSynthesis.cancel(msg);  
    // myTimeout = setTimeout(myTimer, 10000);
    var inputText =textarea.value;
    // console.log(inputText)
    msg = new SpeechSynthesisUtterance(inputText);
    // msg.text=inputText;  
    msg.voice=temp_arr[voiceSelect.value];
    // console.log("message voice",msg.voice.lang);
    msg.lang = msg.voice.lang;
    console.log("message voice",msg.voice.name);
    
    speechUtteranceChunker.cancel =false;
    if(msg.voice.name=="Microsoft David Desktop - English (United States)")
    {
        msg.onboundary=onboundaryHandler;
        console.log("here");    
        window.speechSynthesis.speak(msg);  
        
    }
    else{
    speechUtteranceChunker(msg,
        {
            chunkLength:120,
        },()=>
        {
            // msg.onboundary=onboundaryHandler;
            // window.speechSynthesis.speak(msg);  
            // console.log("done");
        })
    // console.log("voice",temp_arr);
    // console.log("input text",inputText);
    }
}
//--------------------------------------------------------------------------------------

//--------------------------------Resume/pause/stop Speechsyntesiser--------------------------------
function resume()
{
    window.speechSynthesis.resume(msg);  
}
function pause()
{
    window.speechSynthesis.pause(msg);  
}
function stop()
{
    st=true;
    speechUtteranceChunker.cancel =true;
   
    window.speechSynthesis.cancel();  
}
//--------------------------------------------------------------------------------------


var tempTextarea=document.createElement("textarea");
var last=0;
//---------------------------------Highlights text as it is read (doesnt work properly) -----------------------------------------------------
//https://stackoverflow.com/questions/50284816/is-it-possible-to-select-the-word-that-is-being-read-while-using-the-speechsynth
function onboundaryHandler(event){
    console.log("event",event);
    var textarea = document.getElementById('textarea');
    var value = textarea.value;
    var index = event.charIndex;
    console.log("index",index);
    var word = getWordAt(value,index);
    var anchorPosition = getWordStart(value, index);
    var activePosition = anchorPosition + word.length;
    console.log("word",word);
    textarea.focus();

    if (textarea.setSelectionRange) {
       textarea.setSelectionRange(anchorPosition, activePosition);
    }
    else {
       var range = textarea.createTextRange();
       range.collapse(true);
       range.moveEnd('character', activePosition);
       range.moveStart('character', anchorPosition);
       range.select();
    }
};

function getWordAt(str, pos) {
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}

// Get the position of the beginning of the word
function getWordStart(str, pos) {
    console.log("str",str);
    console.log("pos",pos); 
    str = String(str);
    pos = Number(pos) >>> 0;
    // Search for the word's beginning
    var start = str.slice(0, pos + 1).search(/\S+$/);
    console.log("Start",start);
    return start;
}
//-------------------------------------------------------------------------------------------------




//---------------------------------------Chunks a big text into small sentences that can be read by speechsynthesis---------------------------------------------
//------------------https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts----------------------------
//---------------------------Chunker-----------------------------------------------
var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    // console.log("new utterance ",newUtt);
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
 
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        // console.log("here");
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        // console.log("here");
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[[\s\S].!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);
        // console.log("chunk array",chunkArr);
        if (chunkArr == null || chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        tempTextarea.value=chunk;
        // console.log("chunk",chunk);
        newUtt = new SpeechSynthesisUtterance(chunk);
        // console.log("utt.lang",utt.lang);
        newUtt.lang=utt.lang;
        // newUtt.onboundary=onboundaryHandler;
        // console.log("new utt",newUtt.text);
        newUtt.voice=utt.voice;
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            // console.log("here",speechUtteranceChunker.cancel);
            
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length;
            speechUtteranceChunker(utt, settings, callback);
        });

    }
 
    if (settings.modifier) {
        settings.modifier(newUtt);
    }


    // console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);

};
//----------------------------------------------------------------




//----------------------------------------------Scroll up Button----------------------------------------
//---------------https://css-tricks.com/how-to-make-an-unobtrusive-scroll-to-top-button/-------------------------
// function scrollToTop() {
//   // Scroll to top logic
//   rootElement.scrollTo({
//     top: 0,
//     behavior: "smooth"
//   })
// }
// scrollToTopBtn.addEventListener("click", scrollToTop)

// We select the element we want to target
var target = document.querySelector(".sections");

var scrollToTopBtn = document.querySelector(".scrollToTopBtn")
var rootElement = document.documentElement

// Next we want to create a function that will be called when that element is intersected
function callback(entries, observer) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Show button
      scrollToTopBtn.classList.add("showBtn")
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn")
    }
  });
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop);
    
// Next we instantiate the observer with the function we created above. This takes an optional configuration
// object that we will use in the other examples.
let observer = new IntersectionObserver(callback);
// Finally start observing the target element
observer.observe(target);
//--------------------------------------------------------------------------------------