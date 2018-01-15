const $ = (el) => document.querySelector(el);

const message = $('#message');
const morse = $('#morse');
const close = document.querySelectorAll('.close');


var alphabet = {'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..'}

// Translate
// ---------------------
$('#submit').addEventListener('click', () => {
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

// SOCIAL DYNAMIC
// --------------------------------
$('#facebook').addEventListener('click', (e)=>{
    e.preventDefault();
    FB.ui({
      method: 'feed',
      name: "Talk in Code",
      link: "http://localhost:3002/",
      caption: "Talk in Code",
      description: "Tak in Code " + message.value,
      picture: "http://weknowyourdreams.com/single/picture/picture-12"
    });
});

$('#twitter').addEventListener('click', (e) =>{
    e.preventDefault();
    var text = "Talk in code " + message.value;
    var url = "http://localhost:3002/";
    $('#twitter').setAttribute('href', 'https://twitter.com/intent/tweet?text='+ text + "&url=" + url);
    var width  = 575,
        height = 400,
        left   = (window.innerWidth  - width)  / 2,
        top    = (window.innerHeight - height) / 2,
        url    = $('#twitter').href,
        opts   =    'status=1' +
                    ',width='  + width  +
                    ',height=' + height +
                    ',top='    + top    +
                    ',left='   + left;

    window.open(url, 'twitter-share', opts);
    return false;
});


$('#gplus').addEventListener('click', (e) =>{
    
});






// SOCIAL
// ---------------------------------
// function postToTwitter(e) {
//     e.preventDefault();
//     var params = {
//         text: "Hello",         
//         url: "url",
//     };
    
//     element.prop('href', 'https://twitter.com/intent/tweet?' + $.param(params));
//     var width  = 575,
//         height = 400,
//         left   = ($(window).width()  - width)  / 2,
//         top    = ($(window).height() - height) / 2,
//         url    = this.href,
//         opts   =    'status=1' +
//                     ',width='  + width  +
//                     ',height=' + height +
//                     ',top='    + top    +
//                     ',left='   + left;

//     window.open(url, 'twitter-share', opts);

//     return false;
//     //https://twitter.com/intent/tweet?text=What would you make rose gold? Join in %23makeitrosegold for your chance to win your own rose gold watch&amp;url=http://www.watchwarehouse.co.uk/blog/make-it-rose-gold/
// }




