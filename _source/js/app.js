const $ = (el) => document.querySelector(el)

const message = $('#message')
const morse = $('#morse')
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
	return sentence.split('').map(function(e){ 
        		return alphabet[e.toLowerCase()] || '/';
   			}).join(' ').replace(/ +/g, ' ');
}




