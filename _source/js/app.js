const $ = (el) => document.querySelector(el);

const message = $('#message'),
      morse = $('#morse'),
      close = document.querySelectorAll('.close'),
      url = location.href;


const alphabet = {'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..'}

// Translate
// ---------------------
$('#submit').addEventListener('click', (e) => {
  e.preventDefault();
	if(message.value != ""){
		var text = translate(message.value);
		message.value = text;
        $('#submit').classList.add('is-hidden');
        $('#share').classList.remove('is-hidden');

	}
});

for(let i = 0; i < close.length; i++) {
    close[i].addEventListener('click', () => {
        message.value = "";
        $('#submit').classList.remove('is-hidden');
        $('#share').classList.add('is-hidden');
    })
}

function translate(sentence) {
	return sentence.split('').map((e) => { 
        		return alphabet[e.toLowerCase()] || '/';
   			}).join(' ').replace(/ +/g, ' ');
}

// Facebook Button
// --------------------------------
$('#facebook').addEventListener('click', (e)=>{
    e.preventDefault();
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': "Talk in Code",
          'og:description': message.value + " translate it at",
          "og:image": "https://s3.amazonaws.com/js-morse-1/images/talkincode1.jpg"
        }
      })
    },
    function (response) {});
});


// Twitter Button
// --------------------
$('#twitter').addEventListener('click', (e) =>{
    e.preventDefault();

    $('#twitter').setAttribute('href', 'https://twitter.com/intent/tweet?text='+ message.value + " translate it at" + "&url=" + url);
    return false;
});


// G+ Button
// -----------------------
var options = {
    contenturl: 'https://s3.amazonaws.com/js-morse-1/index.html',
    contentdeeplinkid: '/pages',
    clientid: '815714469419-8im790ooeco7jcof0tpj8qvonq3hqlgs.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    prefilltext: 'Talk in Code',
    calltoactionlabel: 'CREATE',
    calltoactionurl: 'http://plus.google.com/pages/create',
    calltoactiondeeplinkid: '/pages/create'
  };

  $('#gplus').addEventListener('click', (e) =>{
    e.preventDefault();
    options.prefilltext = "Translate my morse code: " + message.value;
    gapi.interactivepost.render('gplus', options);
});
  // Call the render method when appropriate within your app to display
  // the button.
  gapi.interactivepost.render('gplus', options);



