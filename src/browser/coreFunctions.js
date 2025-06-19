const getRandomWord = async () => {
    const response = await fetch('http://localhost:5000/getRandomWord');
    const word = await response.text();
    return word;
};

const validateWord = async (word) => {
    const response = await fetch(`http://localhost:5000/validateWord?word=${word}`);
    const isValid = await response.json();
    return isValid;
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
    colorKeyboard(guess, compareArray);
    const gamestate = summaryRow(compareArray);
    if (gamestate === 'win') {messagePlayer('Вітаємо, ви перемогли!', 'win');
        keyboardOff = true;
        return};
    if (gamestate === 'gameover') {messagePlayer('Ви програли, спробуйте знову! Потрібно було вгадати слово ' + wordleAnswer, 'error');
        keyboardOff = true;
        return}
};