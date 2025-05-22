const getRandomWord = async () => {
    const response = await fetch('http://localhost:5000/getRandomWord');
    const word = await response.text();
    return word;
};

const validateWord = async (word) => {
    const response = await fetch(`http://localhost:5000/validateWord?word=${word}`);
    const isValid = await response.json();
    return isValid;
}

const highlightBox = () => {
    for (let i = 0; i < columns; i++) {
        const box = getBox(activeCell[0], i);
        box.classList.remove('now');
    }
    const box = getBox(...activeCell);
    box.classList.add('now');
};
const summaryRow = (arr) => { // функція, фарбує рядок з еррея попаданнь і повертає 'win', 'gameover' або 'continue'
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
const messagePlayer = (message, decor = 'normal') => { // функція, яка виводить повідомлення на лінію
    cLine.classList.remove('error-message');
    cLine.classList.remove('win-message');
    if (decor === 'error') {cLine.classList.add('error-message')}
    if (decor === 'win') {cLine.classList.add('win-message')}
    cLine.innerText = message;
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
    console.log(guess); // Тестова штука
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
    console.log(guess); // Тестова штука  
};
const submitKey = async () => {
    if (keyboardOff) return;
    if (guess[columns - 1] === undefined) {messagePlayer('Введіть усі літери', 'error');
        return};
    let guessWord = deArraify(guess);
    const validity = await validateWord(guessWord);
    if (!validity) {messagePlayer('Введіть слово з української мови', 'error');
    return};
    const compareArray = wordCompare(guessWord, wordleAnswer);
    const gamestate = summaryRow(compareArray);
    if (gamestate === 'win') {messagePlayer('Вітаємо, ви перемогли!', 'win');
        keyboardOff = true;
        return};
    if (gamestate === 'gameover') {messagePlayer('Ви програли, спробуйте знову!', 'error');
        keyboardOff = true;
        return}
};