const lockEmoji = "🔓";
const maxNumber = 13;
const classChecked = "checked";
const colorRed = "red";
const colorYellow = "yellow";
const colorGreen = "green";
const colorBlue = "blue";
const mistake = "mistake";
const placeholder = "x";
const endResultIdentifier = "#endResult";
const interimResultBackItdentifier = "Result";

let gameOver = false;
let oLowestBox = {
	red: [],
	yellow: [],
	green: [],
	blue: [],
	mistake: []
};

function last(array) {
	let res = array[array.length - 1];
	return res ? res : 0;
}

function markBox(source, color, positionInRow) {
	if (positionInRow == last(oLowestBox[color])) {
		undoLastCheck(source, color);
	} else if (!isGameOver() && positionInRow > last(oLowestBox[color])) {
		addScore(source, positionInRow, color);
	}
};

function isGameOver() {
	evaluateGameState();
	return gameOver;
};

function undoLastCheck(source, color) {
	source.classList.remove(classChecked);
	oLowestBox[color].pop()
};

function addScore(source, valueClicked, color) {
	if (valueClicked == maxNumber) {
		if (last(oLowestBox[color]) == 12) {
			source.classList.add(classChecked);

			oLowestBox[color].push(valueClicked);

		}
		return;
	}

	if (valueClicked == 12 && oLowestBox[color].length > 4) {
		source.classList.add(classChecked);
		oLowestBox[color].push(valueClicked);

	}

	if (last(oLowestBox[color]) < valueClicked && valueClicked < 12) {
		source.classList.add(classChecked);
		oLowestBox[color].push(valueClicked);

	}
};

function evaluateGameState() {
	if (oLowestBox.mistake.length > 3) {
		gameOver = true;
	} else {
		let closedRows = 0;
		last(oLowestBox.red) == maxNumber ? closedRows++ : 0;
		last(oLowestBox.yellow) == maxNumber ? closedRows++ : 0;
		last(oLowestBox.green) == maxNumber ? closedRows++ : 0;
		last(oLowestBox.blue) == maxNumber ? closedRows++ : 0;
		gameOver = closedRows > 1;

	}
}

function markBoxMistake(source) {
	evaluateGameState();
	if (gameOver) {
		return;
	}
	source.classList.add(classChecked);
	oLowestBox.mistake.push(placeholder);
};

function convertScore(n) {
	return (n * (n + 1)) / 2;;
}

function onEvaluate() {
	fillInterimResult();
	let score = convertScore(oLowestBox.red.length) + convertScore(oLowestBox.yellow.length) + convertScore(oLowestBox.green.length) + convertScore(oLowestBox.blue.length);
	score -= oLowestBox.mistake.length * 5;
	$(endResultIdentifier).empty();
	$(endResultIdentifier).css("margin", "1em");
	$(endResultIdentifier).append(score);
};

function fillInterimResult() {
	for (const [key, value] of Object.entries(oLowestBox)) {
		//console.log(`${key}Result: ${value}`);
		$(`#${key}${interimResultBackItdentifier}`).empty();
		$(`#${key}${interimResultBackItdentifier}`).append(
			key == mistake ? oLowestBox[key].length * 5 : convertScore(oLowestBox[key].length));
	}
};