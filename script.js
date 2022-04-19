// This script file houses additional javascript features; they are handy but the site can be used without them
// Features include: left/right navigation, definition popups
// Requires jquery and jquery ui

var words = {
	// Words are organized in the order they appear
	"idi": "this (is)",
	"kukka": "(a) dog",
	"maYci": "nice",
	"pilli": "(a) cat",
	"nA": "? (this word indicates that the sentence is a question)",
	"Avunu": "yes",
	"kAdu": "not",
	"gAndhi": "Gandhi ",
	"indirA": "Indira (former Indian prime minister)",
	"Iyana": "he (is)",
	"IviDa": "she (is)",
	"Ime": "she (is)",
	"kiraN": "Kiran (an Indian name)",
	"evaru": "who",
	"tiNTunAru": " is eating",
	"tiNTundi": "is eating",
	"tiNTunArA": " is eating?",
	"tiNTundA": " is eating?",
	"Amir": "Aamir (an Indian name)",
	"pustakam": "a book",
	"I": "this",
	"pEru": "name",
	"kukka2": "dog's",
	"EmiTI": "what is",
	"idi2": "she",
	"pilli2": "cat's",
	"vijaya": "Vijaya (an Indian name)",
	"nikki": "Nikki (an Indian name)"

};

var isExDone = true;

function showEnglish() {
	var d = document.getElementById("eng_trans");
	if (d.style.display == "none") {
		d.style.display = "block";
	}
	else if (d.style.display == "block") {
		d.style.display = "none";
	}
	
	else if (d.style.visibility == "hidden") {
		d.style.visibility = "visible";
	}

	else if (d.style.visibility == "visible") {
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
		console.log("Searching for definitions...");
		var engword = words[this.hash.slice(1)]; // Telugu word
		var tgword = getKeyByValue(words, engword); // Its English translation
		var found = !(tgword in words); // prevents a popup from showing when a link is clicked
		if (found) return;
		else {
			// Add diacritics
			tgword = tgword.replaceAll('A','ā');
			tgword = tgword.replaceAll('I','ī');
			tgword = tgword.replaceAll('E','ē');
			tgword = tgword.replaceAll('D','ḍ');
			tgword = tgword.replaceAll('N','ṇ');
			tgword = tgword.replaceAll('Y','ñ');
			tgword = tgword.replaceAll('T','ṭ');
			tgword = tgword.replaceAll('L','ḷ');
			tgword = tgword.replaceAll('M','ṁ');

			// remove any numbers
			tgword = tgword.replaceAll('0','');
			tgword = tgword.replaceAll('1','');
			tgword = tgword.replaceAll('2','');
			tgword = tgword.replaceAll('3','');
			tgword = tgword.replaceAll('4','');
			tgword = tgword.replaceAll('5','');
			tgword = tgword.replaceAll('6','');
			tgword = tgword.replaceAll('7','');
			tgword = tgword.replaceAll('8','');
			tgword = tgword.replaceAll('9','');
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
	if (e.keyCode == '37') { // left arrow and h (vim-like bindings)
		for (let i = 0; i < 3; i++) {
			var elem = z[i];
			console.log(z[i].href);
			if (z[i].innerHTML.includes("Prev")) {
				window.open(z[i].href, "_top");
			}
		}
  }
  else if (e.keyCode == '39') { // right arrow l
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
	//var answerElem = stripDiacritics(document.getElementById("ex"));
	var answerElem = document.getElementById("ex");

	console.log("input " +  stripDiacritics(response.value))
	console.log("answer: " + stripDiacritics(answer))
	console.log(stripDiacritics(response.value) == stripDiacritics(answer))
	if (stripDiacritics(response.value) == stripDiacritics(answer)) {
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

// strips a given string of any diacritics
// this allows for more lenient answer-checking
function stripDiacritics(str) {
	// replace nasals
	let result = str.toLowerCase();	
	// replace y with e for leniency
	result = result.replace(/y/g, "e");

	result = result.replace(/ṅ/g, "m");
	result = result.replace(/ñ/g, "m");
	result = result.replace(/n/g, "m");
	result = result.replace(/ṇ/g, "m");
	result = result.replace(/ṁ/g, "m");
	result = result.replace(/n̆/g, "m");

	// replace retroflexes
	result = result.replace(/ṭ/g, "t");
	result = result.replace(/ḍ/g, "d");
	result = result.replace(/ḷ/g, "l");
	
	// replace aspirates
	result = result.replace	(/kh/g, "k");
	result = result.replace	(/gh/g, "g");
	result = result.replace	(/ch/g, "c");
	result = result.replace	(/th/g, "t");
	result = result.replace	(/dh/g, "d");
	result = result.replace	(/ṭh/g, "t");
	result = result.replace	(/ḍh/g, "d");
	result = result.replace	(/ph/g, "p");
	result = result.replace	(/bh/g, "b");

	// replace vowels
	result = result.replace(/ā/g, "a");
	result = result.replace(/ī/g, "e");
	result = result.replace(/i/g, "e");
	result = result.replace(/ū/g, "u");
	result = result.replace(/ṛ/g, "r");
	result = result.replace(/ē/g, "e");
	result = result.replace(/ō/g, "u");
	result = result.replace(/o/g, "u");

	result = result.replace(/aa/g, "a");
	result = result.replace(/ii/g, "e");
	result = result.replace(/uu/g, "u");
	result = result.replace(/ee/g, "e");
	// the above change is done so that "veedu" works as a substitute for "vidu"

	// replace silibants and other misc
	result = result.replace(/sh/g, "s");
	result = result.replace(/ṣ/g, "s");
	result = result.replace(/ś/g, "s");
	result = result.replace(/ḥ/g, "h");

	// replace double consanants

	result = result.replace(/kk/g, "k");
	result = result.replace(/gg/g, "g");

	result = result.replace(/cc/g, "c");
	result = result.replace(/jj/g, "j");
	
	result = result.replace(/tt/g, "t");
	result = result.replace(/dd/g, "d");
	
	result = result.replace(/pp/g, "p");
	result = result.replace(/bb/g, "b");

	result = result.replace(/yy/g, "y");
	result = result.replace(/rr/g, "r");
	result = result.replace(/ll/g, "l");
	result = result.replace(/vv/g, "v");
	result = result.replace(/ss/g, "s");

	// replace "c" with "k"
	result = result.replace(/c/g, "k");

	return result;
}

/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Released under the MIT and GPL Licenses.
 */

(function(Sanscript) {
    "use strict";

    Sanscript.defaults = {
        skip_sgml: false,
        syncope: false
    };

    /* Schemes
     * =======
     * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
     * describe abugida scripts found in India. "Roman" schemes describe
     * manufactured alphabets that are meant to describe or encode Brahmi
     * scripts. Abugidas and alphabets are processed by separate algorithms
     * because of the unique difficulties involved with each.
     *
     * Brahmic consonants are stated without a virama. Roman consonants are
     * stated without the vowel 'a'.
     *
     * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
     * and "roman" for clarity.)
     */
    var schemes = Sanscript.schemes = {

        /* Bengali
         * -------
         * 'va' and 'ba' are both rendered as ব.
         */
        bengali: {
            vowels: 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ  এ ঐ  ও ঔ'.split(' '),
            vowel_marks: 'া ি ী ু ূ ৃ ৄ ৢ ৣ  ে ৈ  ো ৌ'.split(' '),
            other_marks: 'ং ঃ ঁ'.split(' '),
            virama: ['্'],
            consonants: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল ব শ ষ স হ ळ ক্ষ জ্ঞ'.split(' '),
            symbols: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ॐ ঽ । ॥'.split(' '),
            other: '    ড ঢ  য '.split(' ')
        },

        /* Devanagari
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        devanagari: {
            // "Independent" forms of the vowels. These are used whenever the
            // vowel does not immediately follow a consonant.
            vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ऎ ए ऐ ऒ ओ औ'.split(' '),

            // "Dependent" forms of the vowels. These are used whenever the
            // vowel immediately follows a consonant. If a letter is not
            // listed in `vowels`, it should not be listed here.
            vowel_marks: 'ा ि ी ु ू ृ ॄ ॢ ॣ ॆ े ै ॊ ो ौ'.split(' '),

            // Miscellaneous marks, all of which are used in Sanskrit.
            other_marks: 'ं ः ँ'.split(' '),

            // In syllabic scripts like Devanagari, consonants have an inherent
            // vowel that must be suppressed explicitly. We do so by putting a
            // virama after the consonant.
            virama: ['्'],

            // Various Sanskrit consonants and consonant clusters. Every token
            // here has an explicit vowel. Thus "क" is "ka" instead of "k".
            consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' '),

            // Numbers and punctuation
            symbols: '० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥'.split(' '),

            // Zero-width joiner. This is used to separate a consonant cluster
            // and avoid a complex ligature.
            zwj: ['\u200D'],

            // Dummy consonant. This is used in ITRANS to prevert certain types
            // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
            skip: [''],

            // Vedic accent. Udatta and anudatta.
            accent: ['\u0951', '\u0952'],

            // Accent combined with anusvara and and visarga. For compatibility
            // with ITRANS, which allows the reverse of these four.
            combo_accent: 'ः॑ ः॒ ं॑ ं॒'.split(' '),

            candra: ['ॅ'],

            // Non-Sanskrit consonants
            other: 'क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ऱ'.split(' ')
        },

        /* Gujarati
         * --------
         * Sanskrit-complete.
         */
        gujarati: {
            vowels: 'અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ  એ ઐ  ઓ ઔ'.split(' '),
            vowel_marks: 'ા િ ી ુ ૂ ૃ ૄ ૢ ૣ  ે ૈ  ો ૌ'.split(' '),
            other_marks: 'ં ઃ ઁ'.split(' '),
            virama: ['્'],
            consonants: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ ળ ક્ષ જ્ઞ'.split(' '),
            symbols: '૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯ ૐ ઽ ૤ ૥'.split(' '),
            candra: ['ૅ']
        },

        /* Gurmukhi
         * --------
         * Missing R/RR/lR/lRR
         */
        gurmukhi: {
            vowels: 'ਅ ਆ ਇ ਈ ਉ ਊ      ਏ ਐ  ਓ ਔ'.split(' '),
            vowel_marks: 'ਾ ਿ ੀ ੁ ੂ      ੇ ੈ  ੋ ੌ'.split(' '),
            other_marks: 'ਂ ਃ ਁ'.split(' '),
            virama: ['੍'],
            consonants: 'ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ਸ਼ ਸ਼ ਸ ਹ ਲ਼ ਕ੍ਸ਼ ਜ੍ਞ'.split(' '),
            symbols: '੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯ ॐ ऽ । ॥'.split(' '),
            other: ' ਖ ਗ ਜ ਡ  ਫ  '.split(' ')
        },

        /* Kannada
         * -------
         * Sanskrit-complete.
         */
        kannada: {
            vowels: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ೠ ಌ ೡ ಎ ಏ ಐ ಒ ಓ ಔ'.split(' '),
            vowel_marks: 'ಾ ಿ ೀ ು ೂ ೃ ೄ ೢ ೣ ೆ ೇ ೈ ೊ ೋ ೌ'.split(' '),
            other_marks: 'ಂ ಃ ँ'.split(' '),
            virama: ['್'],
            consonants: 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ ಕ್ಷ ಜ್ಞ'.split(' '),
            symbols: '೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯ ಓಂ ಽ । ॥'.split(' '),
            other: '      ಫ  ಱ'.split(' ')
        },

        /* Malayalam
         * ---------
         * Sanskrit-complete.
         */
        malayalam: {
            vowels: 'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ എ ഏ ഐ ഒ ഓ ഔ'.split(' '),
            vowel_marks: 'ാ ി ീ ു ൂ ൃ ൄ ൢ ൣ െ േ ൈ ൊ ോ ൌ'.split(' '),
            other_marks: 'ം ഃ ँ'.split(' '),
            virama: ['്'],
            consonants: 'ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ക്ഷ ജ്ഞ'.split(' '),
            symbols: '൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯ ഓം ഽ । ॥'.split(' '),
            other: '        റ'.split(' ')
        },

        /* Oriya
         * -----
         * Sanskrit-complete.
         */
        oriya: {
            vowels: 'ଅ ଆ ଇ ଈ ଉ ଊ ଋ ୠ ଌ ୡ  ଏ ଐ  ଓ ଔ'.split(' '),
            vowel_marks: 'ା ି ୀ ୁ ୂ ୃ ୄ ୢ ୣ  େ ୈ  ୋ ୌ'.split(' '),
            other_marks: 'ଂ ଃ ଁ'.split(' '),
            virama: ['୍'],
            consonants: 'କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଵ ଶ ଷ ସ ହ ଳ କ୍ଷ ଜ୍ଞ'.split(' '),
            symbols: '୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯ ଓଂ ଽ । ॥'.split(' '),
            other: '    ଡ ଢ  ଯ '.split(' ')
        },

        /* Tamil
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most incomplete of the Sanskrit schemes here.
         */
        tamil: {
            vowels: 'அ ஆ இ ஈ உ ஊ     எ ஏ ஐ ஒ ஓ ஔ'.split(' '),
            vowel_marks: 'ா ி ீ ு ூ     ெ ே ை ொ ோ ௌ'.split(' '),
            other_marks: 'ஂ ஃ '.split(' '),
            virama: ['்'],
            consonants: 'க க க க ங ச ச ஜ ச ஞ ட ட ட ட ண த த த த ந ப ப ப ப ம ய ர ல வ ஶ ஷ ஸ ஹ ள க்ஷ ஜ்ஞ'.split(' '),
            symbols: '௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௐ ऽ । ॥'.split(' '),
            other: '        ற'.split(' ')
        },

        /* Telugu
         * ------
         * Sanskrit-complete.
         */
        telugu: {
            vowels: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఎ ఏ ఐ ఒ ఓ ఔ'.split(' '),
            vowel_marks: 'ా ి ీ ు ూ ృ ౄ ౢ ౣ ె ే ై ొ ో ౌ'.split(' '),
            other_marks: 'ం ః ఁ'.split(' '),
            virama: ['్'],
            consonants: 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష జ్ఞ'.split(' '),
            symbols: '౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯ ఓం ఽ । ॥'.split(' '),
            other: '        ఱ'.split(' ')
        },

        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         */
        iast: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ  e ai  o au'.split(' '),
            other_marks: ['ṃ', 'ḥ', '~'],
            virama: [''],
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥".split(' ')
        },

        /* ITRANS
         * ------
         * One of the first romanization schemes -- and one of the most
         * complicated. For alternate forms, see the "allAlternates" variable
         * below.
         *
         * '_' is a "null" letter, which allows adjacent vowels.
         */
        itrans: {
            vowels: 'a A i I u U RRi RRI LLi LLI  e ai  o au'.split(' '),
            other_marks: ['M', 'H', '.N'],
            virama: [''],
            consonants: 'k kh g gh ~N ch Ch j jh ~n T Th D Dh N t th d dh n p ph b bh m y r l v sh Sh s h L kSh j~n'.split(' '),
            symbols: '0 1 2 3 4 5 6 7 8 9 OM .a | ||'.split(' '),
            candra: ['.c'],
            zwj: ['{}'],
            skip: '_',
            accent: ["\\'", "\\_"],
            combo_accent: "\\'H \\_H \\'M \\_M".split(' '),
            other: 'q K G z .D .Dh f Y R'.split(' ')
        },

        /* Harvard-Kyoto
         * -------------
         * A simple 1:1 mapping.
         */
        hk: {
            vowels: 'a A i I u U R RR lR lRR  e ai  o au'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: [''],
            consonants: 'k kh g gh G c ch j jh J T Th D Dh N t th d dh n p ph b bh m y r l v z S s h L kS jJ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 OM ' | ||".split(' ')
        },

        /* National Library at Kolkata
         * ---------------------------
         * Apart from using "ē" and "ō" instead of "e" and "o", this scheme is
         * identical to IAST. ṝ, ḷ, and ḹ are not part of the scheme proper.
         *
         * This is defined further below.
         */

        /* Sanskrit Library Phonetic Basic
         * -------------------------------
         * With one ASCII letter per phoneme, this is the tersest transliteration
         * scheme in use today and is especially suited to computer processing.
         */
        slp1: {
            vowels: 'a A i I u U f F x X  e E  o O'.split(' '),
            other_marks: 'M H ~'.split(' '),
            virama: [''],
            consonants: 'k K g G N c C j J Y w W q Q R t T d D n p P b B m y r l v S z s h L kz jY'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oM ' . ..".split(' ')
        },

        /* Velthuis
         * --------
         * A case-insensitive Sanskrit encoding.
         */
        velthuis: {
            vowels: 'a aa i ii u uu .r .rr .li .ll  e ai  o au'.split(' '),
            other_marks: '.m .h '.split(' '),
            virama: [''],
            consonants: 'k kh g gh "n c ch j jh ~n .t .th .d .d .n t th d dh n p ph b bh m y r l v ~s .s s h L k.s j~n'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 o.m ' | ||".split(' ')
        },

        /* WX
         * --
         * As terse as SLP1.
         */
        wx: {
            vowels: 'a A i I u U q Q L   e E  o O'.split(' '),
            other_marks: 'M H z'.split(' '),
            virama: [''],
            consonants: 'k K g G f c C j J F t T d D N w W x X n p P b B m y r l v S R s h  kR jF'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oM ' | ||".split(' ')
        }
    },

    // Set of names of schemes
    romanSchemes = {},

    // Map of alternate encodings.
    allAlternates = {
        itrans: {
            A: ['aa'],
            I: ['ii', 'ee'],
            U: ['uu', 'oo'],
            RRi: ['R^i'],
            RRI: ['R^I'],
            LLi: ['L^i'],
            LLI: ['L^I'],
            M: ['.m', '.n'],
            '~N': ['N^'],
            ch: ['c'],
            Ch: ['C', 'chh'],
            '~n': ['JN'],
            v: ['w'],
            Sh: ['S', 'shh'],
            kSh: ['kS', 'x'],
            'j~n': ['GY', 'dny'],
            OM: ['AUM'],
            "\\_": ["\\`"],
            "\\_H": ["\\`H"],
            "\\'M": ["\\'.m", "\\'.n"],
            "\\_M": "\\_.m \\_.n \\`M \\`.m \\`.n".split(' '),
            ".a": ['~'],
            '|': ['.'],
            '||': ['..'],
            z: ['J']
        }
    },

    // object cache
    cache = {};

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function(name) {
        return romanSchemes.hasOwnProperty(name);
    };

    /**
     * Add a Brahmic scheme to Sanscript.
     *
     * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
     * have an inherent vowel sound, but roman consonants do not. This is the
     * main difference between these two types of scheme.
     *
     * A scheme definition is an object ("{}") that maps a group name to a
     * list of characters. For illustration, see the "devanagari" scheme at
     * the top of this file.
     *
     * You can use whatever group names you like, but for the best results,
     * you should use the same group names that Sanscript does.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself. This should be constructed as
     *                described above.
     */
    Sanscript.addBrahmicScheme = function(name, scheme) {
        Sanscript.schemes[name] = scheme;
    };

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    Sanscript.addRomanScheme = function(name, scheme) {
        if (!('vowel_marks' in scheme)) {
            scheme.vowel_marks = scheme.vowels.slice(1);
        }
        Sanscript.schemes[name] = scheme;
        romanSchemes[name] = true;
    };

    /**
     * Create a deep copy of an object, for certain kinds of objects.
     *
     * @param scheme  the scheme to copy
     * @return        the copy
     */
    var cheapCopy = function(scheme) {
        var copy = {};
        for (var key in scheme) {
            if (!scheme.hasOwnProperty(key)) {
                continue;
            }
            copy[key] = scheme[key].slice(0);
        }
        return copy;
    };

    // Set up various schemes
    (function() {
        // Set up roman schemes
        var kolkata = schemes.kolkata = cheapCopy(schemes.iast),
            schemeNames = 'iast itrans hk kolkata slp1 velthuis wx'.split(' ');
        kolkata.vowels = 'a ā i ī u ū ṛ ṝ ḷ ḹ e ē ai o ō au'.split(' ');

        // These schemes already belong to Sanscript.schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        for (var i = 0, name; (name = schemeNames[i]); i++) {
            Sanscript.addRomanScheme(name, schemes[name]);
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        var itrans_dravidian = cheapCopy(schemes.itrans);
        itrans_dravidian.vowels = 'a A i I u U Ri RRI LLi LLi e E ai o O au'.split(' ');
        itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
        allAlternates.itrans_dravidian = allAlternates.itrans;
        Sanscript.addRomanScheme('itrans_dravidian', itrans_dravidian);
    }());

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var alternates = allAlternates[from] || {},
            consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            tokenLengths = [],
            marks = {},
            toScheme = Sanscript.schemes[to];

        for (var group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (var i = 0; i < fromGroup.length; i++) {
                var F = fromGroup[i],
                    T = toGroup[i],
                    alts = alternates[F] || [],
                    numAlts = alts.length,
                    j = 0;

                tokenLengths.push(F.length);
                for (j = 0; j < numAlts; j++) {
                    tokenLengths.push(alts[j].length);
                }

                if (group === 'vowel_marks' || group === 'virama') {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === 'consonants' || group === 'other') {
                        consonants[F] = T;

                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }

        return {consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            maxTokenLength: Math.max.apply(Math, tokenLengths),
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama};
    };

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateRoman = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            dataLength = data.length,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            maxTokenLength = map.maxTokenLength,
            optSyncope = options.syncope,
            tempLetter,
            tempMark,
            tokenBuffer = '',
            toRoman = map.toRoman,
            transliterationEnabled = true,
            virama = map.virama;

        for (var i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
            // Fill the token buffer, if possible.
            var difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for (var j = 0; j < maxTokenLength; j++) {
                var token = tokenBuffer.substr(0,maxTokenLength-j);

                if (token === '##') {
                    transliterationEnabled = !transliterationEnabled;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                if ((tempLetter = letters[token]) !== undefined && transliterationEnabled) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== 'a') {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength-j);
                    break;
                } else if (j === maxTokenLength - 1) {
                    if (hadConsonant) {
                        hadConsonant = false;
                        if (!optSyncope) {
                            buf.push(virama);
                        }
                    }
                    buf.push(token);
                    tokenBuffer = tokenBuffer.substr(1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && !optSyncope) {
            buf.push(virama);
        }
        return buf.join('');
    };

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateBrahmic = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            danglingHash = false,
            hadRomanConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman,
            transliterationEnabled = true;

        for (var i = 0, L; (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === '#') {
                if (danglingHash) {
                    transliterationEnabled = !transliterationEnabled;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (!transliterationEnabled) {
                buf.push(L);
                continue;
            }

            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push('#');
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }

                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters[L])) {
                    buf.push(temp);
                    hadRomanConsonant = toRoman && (L in consonants);
                } else {
                    buf.push(L);
                }
            }
        }
        if (hadRomanConsonant) {
            buf.push('a');
        }
        return buf.join('');
    };

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    Sanscript.t = function(data, from, to, options) {
        options = options || {};
        var cachedOptions = cache.options || {},
            defaults = Sanscript.defaults,
            hasPriorState = (cache.from === from && cache.to === to),
            map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                var value = defaults[key];
                if (key in options) {
                    value = options[key];
                }
                options[key] = value;

                // This comparison method is not generalizable, but since these
                // objects are associative arrays with identical keys and with
                // values of known type, it works fine here.
                if (value !== cachedOptions[key]) {
                    hasPriorState = false;
                }
            }
        }

        if (hasPriorState) {
            map = cache.map;
        } else {
            map = makeMap(from, to, options);
            cache = {
                from: from,
                map: map,
                options: options,
                to: to};
        }

        if (options.skip_sgml) {
            data = data.replace(/(<.*?>)/g, '##$1##');
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if (from === 'itrans') {
            data = data.replace(/\{\\m\+\}/g, ".h.N");
            data = data.replace(/\.h/g, '');
            data = data.replace(/\\([^'`_]|$)/g, "##$1##");
        }

        if (map.fromRoman) {
            return transliterateRoman(data, map, options);
        } else {
            return transliterateBrahmic(data, map, options);
        }
    };
}(window.Sanscript = window.Sanscript || {}));



const value = localStorage.getItem('usescript');  
console.log(value);

if (1) {
		Array.prototype.slice.call(elems).forEach(function(el) {
			console.log(el)
			if(el.className == "telugu") {
				// Necessary changes to accomodate sunna
				el.innerHTML = el.innerHTML.replace(/ñ/g, "ṃ");
				el.innerHTML = el.innerHTML.replace(/nt/g, "ṃt");
				el.innerHTML = el.innerHTML.replace(/nd/g, "ṃd");
				el.innerHTML = el.innerHTML.replace(/ṇṭ/g, "ṃṭ");
				el.innerHTML = el.innerHTML.replace(/ṇḍ/g, "ṃḍ");
				el.innerHTML = el.innerHTML.replace(/ṁ/g, "ṃ");
				el.innerHTML = el.innerHTML.replace(/n̆/g, "ṃ");

				el.innerHTML = Sanscript.t(el.innerHTML, 'kolkata', 'telugu');
				//console.log(Sanscript.t("nikki", "kolkota", "telugu"));
			}
			//console.log(Sanscript.t(el.innerHTML, 'iast', 'telugu'));
		});
	}
