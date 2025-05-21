import fs from 'node:fs';
import readline from 'node:readline';

export const validateWord = async (filePath, word) => {
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