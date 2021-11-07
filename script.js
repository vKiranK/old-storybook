// This script file houses additional javascript features; they are handy but the site can be used without them
// Features include: left/right navigation, definition popups
// Requires jquery and jquery ui

var words = {
	// Words are organized in the order they appear
	"idi": "this (is)",
	"kukka": "(a) dog",
	"maMci": "nice",
	"pilli": "(a) cat",
	"nA": "? (this word indicates a question)",
	"Avunu": "yes",
	"kAdu": "not",
	"gandhi": "Gandhi (an Indian name)",
	"indirA": "Indira (an Indian name)",
	"Iyana": "he (is)",
	"IviDa": "she (is)",
	"Ime": "she (is)",
	"kiraN": "Kiran (an Indian name)",
	"evaru": "who",
	"tiNTunAru": " is eating",
	"tiNTundi": "is eating",
	"tiNTunArA": " is eating?",
	"Amir": "Aamir (an Indian name)",
	"pustakam": "a book",
	"I": "this"
};

var isExDone = true;

function showEnglish() {
	var d = document.getElementById("eng_trans");
	if (d.style.visibility === "hidden") {
		d.style.visibility = "visible";
	}
	else {
		d.style.visibility = "hidden";
	}
}

// Make a definition pop up when a word is clicked
var elems = document.getElementsByTagName("a");
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
Array.prototype.slice.call(elems).forEach(function(el) {
	el.onclick = function(e) {
		var engword = words[this.hash.slice(1)]; // Telugu word
		var tgword = getKeyByValue(words, engword); // Its English translation
		var found = !(tgword in words); // prevents a popup from showing when a link is clicked
		if (found) return;
		else {
			// Add diacritics
			tgword = tgword.replaceAll('A','ā');
			tgword = tgword.replaceAll('I','ī');
			tgword = tgword.replaceAll('D','ḍ');
			tgword = tgword.replaceAll('N','ṇ');
			tgword = tgword.replaceAll('Y','ñ');
			tgword = tgword.replaceAll('T','ṭ');
			tgword = tgword.replaceAll('L','ḷ');
			tgword = tgword.replaceAll('M','ṁ');
			$("#dialog").dialog({
				"modal": true,
				title: "Definition of " + "\"" + tgword +  "\"",
				"width": 500
			}).html(engword);	
		}
	}
})

// Play sounds when element clicked
var	clip = new Audio();
function playAudio(url) {
	if (!clip.paused) {
		//console.log("could not play... other audio file is currently playing");
		return;
	}
	//console.log("playing " + url + "...");
	clip = new Audio(url);
	clip.play();
}

// Plays audio that coresponds to each file.
// EACH AUDIO FILE HAS TO HAVE THE SAME FILE NAME AS ITS RESPECTIVE HTML FILE!!!
function correspondingAudio(path_to_file) {
	var filename = (path_to_file.split("/").pop()).slice(0, -5);
	var filepath = "sounds/" + filename + ".m4a";
	//console.log("playing audio at path " + filepath);
	playAudio(filepath);
}

// Left/right-arrow navigation
document.onkeydown = function(e) {
	answerElem = document.getElementById("ex");
	if ((answerElem == document.activeElement) && (isExDone == false)) {
		return;
	}
	var filecode = (location.pathname.split("/").pop()).slice(0, -5);
	ge = e || window.event;
	var z = document.getElementsByClassName("nav");
	//console.log(z);
	if (e.keyCode == '37' || e.keyCode == '72') { // left arrow and h (vim-like bindings)
		for (let i = 0; i < 3; i++) {
			var elem = z[i];
			console.log(z[i].href);
			if (z[i].innerHTML.includes("Prev")) {
				window.open(z[i].href, "_top");
			}
		}
  }
  else if (e.keyCode == '39' || e.keyCode == '76') { // right arrow l
		for (let i = 0; i < 3; i++) {
			var elem = z[i];
			//console.log(z[i].href);
			if (z[i].innerHTML.includes("Next")) {
				window.open(z[i].href, "_top");
			}
		}
	}
}

// https://www.quora.com/How-can-I-check-if-an-input-field-has-a-certain-text-value-with-JavaScript
function checkAnswer(response, answer) {
	isExDone = false;
	//console.log("user entered" + response.value + ", answer is " + answer);
	//console.log (response.value == answer);
	//var answerElem = document.activeElement;
	var answerElem = document.getElementById("ex");
	if (response.value == answer) {
    answerElem.readOnly = true;
		answerElem.style.color = "green"
		isExDone = true;
	}
	else {
		isExDone = false;
	}
}

// allows inserting letters that dont exist on the user's keyboard like ñ
function insertLetter(l) {
	var answerElem = document.getElementById("ex");
	answerElem.value += l;
}
