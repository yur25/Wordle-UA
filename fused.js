// Константи. Вони мають бути першими я думаю, щоб функції з ними працювали?
const keyboardArray = [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', '←'],["'",'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ґ', '✔']];
const columns = 5 // скільки літер у слові
const rows = 6 // скільки спроб вгадати
const gamefield = document.getElementById('gamefield');
const cLine = document.getElementById('communication-line');
let keyboardOff = false;
let activeCell = [0,0]; // рядок, колонка
let guess = new Array(columns).fill(undefined);

// Функції. Пробую кидати їх у порядку, де спершу без вкладених функцій, далі що тільки з ними і так далі
// функції без вкладених функцій
const getBox = (i, j) => { return document.getElementById('box' + i.toString() + '-' + j.toString()) }
const arraify = (word) => {
    if (typeof word === "object") {return word}
    return word.split("")
};
const deArraify = (word) => {
    if (typeof word === "string") {return word}
    return word.join("")
};
const colorKeyboard = (guessArray, colorArray) => {
    for (let i = 0; i < guessArray.length; i++) {
        let letterBox = document.getElementById('keybox-' + guessArray[i]);
        letterBox.classList.add(colorArray[i]);
    }
};
const messagePlayer = (message, decor = 'normal') => {
    cLine.classList.remove('error-message');
    cLine.classList.remove('win-message');
    if (decor === 'error') {cLine.classList.add('error-message')}
    if (decor === 'win') {cLine.classList.add('win-message')}
    cLine.innerText = message;
};
// функції наступного шару
const wordCompare = (input, answer) => {
    const inputArray = arraify(input);
    const answerArray = arraify(answer);
    const objArray = [];
    for (let i in inputArray) {
        if (inputArray.at(i) === answerArray.at(i)) {
            objArray.push({'match': i});
            answerArray.splice(i, 1, null);
            inputArray.splice(i, 1, '');}}
    for (let i in inputArray) {
        if (answerArray.includes(inputArray.at(i))) {
            objArray.push({'here': i});
            answerArray.splice(answerArray.indexOf(inputArray.at(i)), 1, null);
            inputArray.splice(i, 1, '');}}
    for (let i in inputArray) {
        if (inputArray.at(i) !== '') {
            objArray.push({'miss': i});}}
    objArray.sort((a,b) => Object.values(a) - Object.values(b));
    return objArray.map((obj) => Object.keys(obj)[0]);
};
const highlightBox = () => {
    for (let i = 0; i < columns; i++) {
        const box = getBox(activeCell[0], i);
        box.classList.remove('now');
    }
    const box = getBox(...activeCell);
    box.classList.add('now');
};
//функції наступного шару
const summaryRow = (arr) => {
    const row = activeCell[0];
    let isWin = true;
    for (let i = 0; i < columns; i++) {
        const box = getBox(row, i);
        box.classList.add(arr[i]);
        box.classList.remove('now');
        if (arr[i] !== 'match') {isWin = false};
    }
    if (isWin) return 'win';
    if (row === rows - 1) return 'gameover';
    activeCell = [row + 1, 0];
    highlightBox();
    guess = new Array(columns).fill(undefined);
    return 'continue';
};
const normalKey = (key) => () => {
    if (keyboardOff) return;
    const column = activeCell[1];
    if (guess[column] !== undefined) return;
    let box = getBox(activeCell[0], column);
    box.innerText = key;
    guess[column] = key;
    if (column !== columns - 1) {activeCell[1] += 1};
    highlightBox();
};
const eraseKey = () => {
    if (keyboardOff) return;
    const column = activeCell[1];
    if (column === 0) return;
    let prevBox;
    if (guess[column] !== undefined) {prevBox = getBox(...activeCell);
        guess[column] = undefined}
    else {prevBox = getBox(activeCell[0], column - 1);
        guess[column - 1] = undefined;
        activeCell[1] -= 1;}
    prevBox.innerText = '';
    highlightBox();
};


