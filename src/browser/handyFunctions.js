const arraify = (word) => {
    if (typeof word === "object") {return word}
    return word.split("")
};

const deArraify = (word) => {
    if (typeof word === "string") {return word}
    return word.join("")
};

const getBox = (i, j) => { return document.getElementById('box' + i.toString() + '-' + j.toString()) }

const logDecorator = (f, logger = console.log) => { // Лабораторна робота 9
    const name = f.name;
    return (logLevel, ...args) => { // logLevel INFO буде видавати загальну інформацію, DEBUG усю, ERROR - лише помилки, будь що інше ніякої інформації
        const debug = (logLevel === "DEBUG");
        const info = (logLevel === "INFO") || debug;
        if (info) {logger("Function " + name + " activated")};
        if (debug) {logger("Arguments inserted in " + name + ": " + args.join(", "))};
        try {
            const result = f(...args);
            if (info) {logger("Function " + name + " finished successfully")};
            if (debug) {logger("Result of " + name + ": " + result.toString())};
            return result;
        } catch (e) {
            logger("Function " + name + "finished with error:" + e.toString())
            throw e;
        }
    }

};