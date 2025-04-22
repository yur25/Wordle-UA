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

const logDecorator = (f, logger = console.log) => { // Лабораторна робота 9? Але треба підключити асинхронки (та й декоратори якось у @ стилі пишуться, а я wrapper написав)
    n = f.name
    return (logLevel, ...args) => { // logLevel INFO буде видавати загальну інформацію, DEBUG усю, ERROR - лише помилки, будь що інше ніякої інформації
        const debug = (logLevel === "DEBUG");
        const info = (logLevel === "INFO") || debug;
        const error = (logLevel === "ERROR") || info;
        if (info) {logger("Function" + n + "activated")};
        if (debug) {logger("Arguments inserted in " + n + ": " + args.join(", "))};
        try {
            const result = f(...args);
            if (info) {logger("Function " + n + " finished successfully")};
            if (debug) {logger("Result of " + n + ": " + result.toString())};
            return result;
        } catch (e) {
            if (error) {logger("Function " + n + "finished with error:" + e.toString())};
            throw e;
        }
    }

}