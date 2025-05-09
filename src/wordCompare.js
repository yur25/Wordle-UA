const answer = "канон";
const input = "канон";

const wordCompare = (input, answer) => {
    inputArray = arraify(input)
    answerArray = arraify(answer)
    result = [];

    for (let i in inputArray) {                                         // перевіряє чи на однаковій позиції в обох словах є однакові літери. Якщо так - колір зелений.
        if (inputArray.at(i) === answerArray.at(i)) {
            result.push ({                                              // зробити повернення однієї змінної, по типу match, here, miss
                'letter': inputArray.at(i), 
                'position': i,
                'color': 'green'
            });
            answerArray.splice(i, 1, null);
            inputArray.splice(i, 1, '');
        }
    }

    for (let i in inputArray) {                                         // перевіряє чи в слові, яке ввів користувач, є літери зі слова, яке потрібно відгадати (не на однаковій позиції). Якщо так - колір жовтий.
        if (answerArray.includes(inputArray.at(i))) {
            result.push ({
                'letter': inputArray.at(i), 
                'position': i,
                'color': 'yellow'
            });
            answerArray.splice(answerArray.indexOf(inputArray.at(i)), 1, null);
            inputArray.splice(i, 1, '');
        }
    }

    for (let i in inputArray) {                                         // Призначає решті літер сірий колір.
        if (inputArray.at(i) !== '') {
            result.push ({
                'letter': inputArray.at(i), 
                'position': i,
                'color': 'gray'
            });
        }
    }

    result.sort((a,b) => a.position - b.position);
    return result;
}

for (const obj of wordCompare(input, answer)) console.log(obj);