const readline = require('node:readline');

async function getRandomWord(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let selectedLine = null;
  let count = 0;

  for await (const line of rl) {
    count++;
    if (Math.random() < 1 / count) {
      selectedLine = line;
    }
  }

  return selectedLine;
}

// тест
getRandomWord('ukrainian_words.txt').then((word) => { 
  console.log(word);
});