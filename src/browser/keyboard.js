const keyboardArray = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],
    ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', '←'],
    ["'",'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ґ', '✔']
];

for (let i = 0; i < keyboardArray.length; i++) {
    const keyrow = document.getElementById('keyrow-' + i.toString());
    keyboardArray[i].forEach((value) => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('keyboard-box');
        keyElement.innerText = value;
        keyElement.id = 'keybox-' + value;
        keyrow.appendChild(keyElement);
        if (value === '←') {
            keyElement.addEventListener('click', eraseKey);
        } else if (value === '✔') {
            keyElement.addEventListener('click', submitKey);
        } else {
            keyElement.addEventListener('click', normalKey(value));
        }
    });
}