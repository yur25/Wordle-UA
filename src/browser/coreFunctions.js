const highlightBox = () => {
    for (let i = 0; i < columns; i++) {
        const box = getBox(activeCell[0], i);
        box.classList.remove('now');
    }
    const box = getBox(...activeCell);
    box.classList.add('now');
};
const normalKey = (key) => {
    return () => {
    const column = activeCell[1];
    if (guess[column] !== undefined) return;
    let box = getBox(activeCell[0], column);
    box.innerText = key;
    guess[column] = key;
    if (column !== columns - 1) {activeCell[1] += 1};
    highlightBox();
    console.log(guess); // Тестова штука
    }
};
const eraseKey = () => {
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
const submitKey = () => {
    console.log('Submit key pressed'); // Тестова функція
};