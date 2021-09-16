// This script file houses all the js needed to make the site run
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
	"evaru": "who"
};

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
			tgword = tgword.replaceAll('M','ṃ');
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
		console.log("could not play... other audio file is currently playing");
		return;
	}
	console.log("playing " + url + "...");
	clip = new Audio(url);
	clip.play();
}

// Plays audio that coresponds to each file.
// EACH AUDIO FILE HAS TO HAVE THE SAME FILE NAME AS ITS RESPECTIVE HTML FILE!!!
function correspondingAudio(path_to_file) {
	var filename = (path_to_file.split("/").pop()).slice(0, -5);
	var filepath = "sounds/" + filename + ".m4a";
	console.log("playing audio at path " + filepath);
	playAudio(filepath);
}
