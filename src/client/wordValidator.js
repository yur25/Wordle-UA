const fs = require('node:fs');
const readline = require('node:readline');

async function validateWord(filePath, word) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line === word) return true;
  }
  return false;
}