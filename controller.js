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
	

	let valueClicked = source.innerText;
	if (color == "green" || color == "blue") {
		valueClicked = mapGreenAndBlueToIndex(valueClicked);
	}

	if (valueClicked == oLowestBox[color] || (valueClicked == lockEmoji && oLowestBox[color] == maxNumber)) {
		undoLastCheck(source, color);
	} else {
		evaluateGameState();
	if (gameOver) {
		return;
	}
		addScore(source, valueClicked, color);
	}
};

function mapGreenAndBlueToIndex(valueClicked) {
	//reverse green and blue
	return String(valueClicked == lockEmoji ? lockEmoji : 14 - valueClicked);
}

function undoLastCheck(source, color) {
	source.classList.remove("checked");
	oLowestBox[color] = parseInt(getLowestCheckedOfColor(color)); // next lowest
	oNumberMarkedBoxes[color]--;
};

function getLowestCheckedOfColor(color) {
	if (color == "green" || color == "blue") {

		for (let i = 2; i < 13; i++) {
			if ($(`#${i}${color}`)[0].className.indexOf("checked") > 0) {
				return mapGreenAndBlueToIndex(i);
			}
		}
	} else {
		for (let i = 12; i > 1; i--) {
			if ($(`#${i}${color}`)[0].className.indexOf("checked") > 0) {
				return i;
			}
		}
	}
	return 0;
}

function addScore(source, valueClicked, color) {
	if (valueClicked.includes(lockEmoji)) {
		if (oLowestBox[color] == 12) {
			source.classList.add("checked");
			oLowestBox[color] = maxNumber;
			oNumberMarkedBoxes[color]++;

		}
		return;
	}

	if (valueClicked == 12 && oNumberMarkedBoxes[color] > 4) {
		source.classList.add("checked");
		oLowestBox[color] = parseInt(valueClicked);
		oNumberMarkedBoxes[color]++;
	}

	if (oLowestBox[color] < valueClicked && valueClicked < 12) {
		source.classList.add("checked");
		oLowestBox[color] = parseInt(valueClicked);
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
	return (n * (n + 1)) / 2;;
}

function onEvaluate() {
	fillInterimResult();
	let score = convertScore(oNumberMarkedBoxes.red) + convertScore(oNumberMarkedBoxes.yellow) + convertScore(oNumberMarkedBoxes.green) + convertScore(oNumberMarkedBoxes.blue);
	score -= oNumberMarkedBoxes.mistake * 5;
	$("#result").empty();
	$("#result").css("margin", "1em");
	$("#result").append(score);
};

function fillInterimResult() {
	for (const [key, value] of Object.entries(oNumberMarkedBoxes)) {
		//console.log(`${key}Result: ${value}`);
		$(`#${key}Result`).empty();
		$(`#${key}Result`).append(
			key == "mistake" ? value * 5 : convertScore(value));
	}
};
