var words = {
	// Words are organized in the order they appear
	"idi": "this (is)",
	"kukka": "(a) dog",
	"maMci": "nice",
	"pilli": "(a) cat",
	"nA": "? (this word indicates a question)",
	"Avunu": "yes",
	"kAdu": "not"
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

// The code below makes a definition pop up when a word is clicked
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
			$("#dialog").dialog({
				"modal": true,
				title: "Definition of " + "\"" + tgword +  "\"",
				"width": 500
			}).html(engword);	
		}
	}
})
