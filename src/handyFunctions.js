const arraify = (word) => {
    if (typeof word === "object") {return word}
    return word.split("")
};

const deArraify = (word) => {
    if (typeof word === "string") {return word}
    return word.join("")
};

const memoize = (f, n) => { // Лабораторна робота 3, будемо використовувати щоб мемоїзувати перевірку дійсності слова
    const memory = new Map(); // У Мапі формат зберігання input: [answer, counter]
    return (...args) => {
        const input = args.join(",");
        if (memory.has(input)) {
            const arr = memory.get(input);
            memory.set(input, [arr[0], arr[1] + 1]);
            return arr[0];
        } else {
            if (memory.size >= n) {
                let minKey;
                let minCount = Infinity;
                for (const [key, arr] of memory.entries()) {
                    if (arr[1] < minCount) {
                        minCount = arr[1];
                        minKey = key;
                    }
                }
                memory.delete(minKey);
            };
            const answer = f(...args);
            memory.set(input, [answer, 1]);
            return answer;
        }
    }
};