/*$(document).ready(function() {
	$('div.numberBox').click(function(s) {
//		s.target.innerText // value of box
	debugger
		if (!s.target.classList.contains("checked") && s.delegateTarget.childElementCount){
			s.target.classList.add("checked") //p tag to modify
		}
		
	});
});
*/
const lockEmoji = "🔓";
const maxNumber = 13;
let gameOver = false;

let oLowestBox = {
	red: 0,
	yellow: 0,
	green: 0,
	blue: 0
};

let oNumberMarkedBoxes = {
	red: 0,
	yellow: 0,
	green: 0,
	blue: 0,
	mistake: 0
};

function markBox(source, color) {
	evaluateGameState();
	if (gameOver) {
		return;
	}

	if (source.innerText === lockEmoji) {
		if (oLowestBox[color] == 12) {
			source.classList.add("checked");
			oLowestBox[color] = maxNumber;
			oNumberMarkedBoxes[color]++;

		}
		return;
	}

	if (source.innerText == 12 && oNumberMarkedBoxes[color] > 4) {
		source.classList.add("checked");
		oLowestBox[color] = parseInt(source.innerText);
		oNumberMarkedBoxes[color]++;
	}

	if (oLowestBox[color] < source.innerText && source.innerText < 12) {
		source.classList.add("checked");
		oLowestBox[color] = parseInt(source.innerText);
		oNumberMarkedBoxes[color]++;
	}

};

function evaluateGameState() {
	if (oNumberMarkedBoxes.mistake > 3) {
		gameOver = true;
	} else {
		let closedRows = 0;
		oLowestBox.red == maxNumber ? closedRows++ : 0;
		oLowestBox.yellow == maxNumber ? closedRows++ : 0;
		oLowestBox.green == maxNumber ? closedRows++ : 0;
		oLowestBox.blue == maxNumber ? closedRows++ : 0;
		gameOver = closedRows > 1;

	}
}

function markBoxMistake(source) {
	evaluateGameState();
	if (gameOver) {
		return;
	}
	source.classList.add("checked");
	oNumberMarkedBoxes.mistake++;
};

function convertScore(n) {
	let score = 0;
	for (let i = 1; i <= n; i++) {
		score += i;
	}
	return score;
}

function onEvaluate() {
	fillInterimResult();
	let score = convertScore(oNumberMarkedBoxes.red) + convertScore(oNumberMarkedBoxes.yellow) + convertScore(oNumberMarkedBoxes.green) + convertScore(oNumberMarkedBoxes.blue);
	score -= oNumberMarkedBoxes.mistake * 5;
	$("#result").empty();
	$("#result").append(score);
};

function fillInterimResult() {
	for (const [key, value] of Object.entries(oNumberMarkedBoxes)) {
		//console.log(`${key}Result: ${value}`);
		$(`#${key}Result`).empty();
		$(`#${key}Result`).append(
			key == "mistake" ? value * 5 :convertScore(value));
	}
};

console.log("script loaded");