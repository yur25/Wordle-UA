const arraify = (word) => {
    if (typeof word === "object") {return word}
    return word.split("")
};

const deArraify = (word) => {
    if (typeof word === "string") {return word}
    return word.join("")
};