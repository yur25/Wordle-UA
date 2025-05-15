const keyrowArray0 = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'];
const keyrowArray1 = ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', '←'];
const keyrowArray2 = ["'",'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ґ', '✔'];

let keyrow0 = document.getElementById('keyrow-0');
    keyrowArray0.forEach((value) => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('keyboard-box');
        keyElement.innerText = value;
        keyElement.id = 'keybox-' + value;
        keyrow0.appendChild(keyElement);
        keyElement.addEventListener('click', normalKey(value));
    });
let keyrow1 = document.getElementById('keyrow-1');
    keyrowArray1.forEach((value) => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('keyboard-box');
        keyElement.innerText = value;
        keyElement.id = 'keybox-' + value;
        keyrow1.appendChild(keyElement);
        if (value === '←') {
            keyElement.addEventListener('click', eraseKey);
        } else {
            keyElement.addEventListener('click', normalKey(value));
        }
    });
let keyrow2 = document.getElementById('keyrow-2');
    keyrowArray2.forEach((value) => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('keyboard-box');
        keyElement.innerText = value;
        keyElement.id = 'keybox-' + value;
        keyrow2.appendChild(keyElement);
        if (value === '✔') {
            keyElement.addEventListener('click', submitKey);
        } else {
            keyElement.addEventListener('click', normalKey(value));
        }
    });