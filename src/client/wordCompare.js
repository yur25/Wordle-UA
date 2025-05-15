const wordCompare = (input, answer) => {
    const inputArray = input.split('');
    const answerArray = answer.split('');
    const objArray = [];

    for (let i in inputArray) {                                         // перевіряє чи на однаковій позиції в обох словах є однакові літери. Якщо так - колір зелений.
        if (inputArray.at(i) === answerArray.at(i)) {
            objArray.push({'match': i});
            answerArray.splice(i, 1, null);
            inputArray.splice(i, 1, '');
        }
    }

    for (let i in inputArray) {                                         // перевіряє чи в слові, яке ввів користувач, є літери зі слова, яке потрібно відгадати (не на однаковій позиції). Якщо так - колір жовтий.
        if (answerArray.includes(inputArray.at(i))) {
            objArray.push({'here': i});
            answerArray.splice(answerArray.indexOf(inputArray.at(i)), 1, null);
            inputArray.splice(i, 1, '');
        }
    }

    for (let i in inputArray) {                                         // Призначає решті літер сірий колір.
        if (inputArray.at(i) !== '') {
            objArray.push({'miss': i});
        }
    }
    
    objArray.sort((a,b) => Object.values(a) - Object.values(b));
    return objArray.map((obj) => Object.keys(obj));
}