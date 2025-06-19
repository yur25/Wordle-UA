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


