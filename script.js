const button = document.getElementById('button');
const audioElement = document.getElementById('audio')


// disable/enable button
function toggleButton(){
   button.disabled = !button.disabled;
}

// passing Joke to voiceRSS API
function tellMe(joke){
  
  VoiceRSS.speech({
    key: 'cfbb17bca225493b98c14b566b67143b',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from joke API 
async function getJokes(){
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup){
      joke = `${data.setup}...${data.delivery}`;
    } else{
      joke = data.jokes;
    }
    // text-to-speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch(error){
  // catch errors here
  console.log( 'whoooops', error);
  }
}

getJokes();

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)