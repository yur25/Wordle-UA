import fs from 'node:fs';
import readline from 'node:readline';

export const getRandomWord = async (filePath) => {
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