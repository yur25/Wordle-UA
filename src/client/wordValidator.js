import fs from 'node:fs';
import readline from 'node:readline';

const memoize = (f, mapCap = 100) => { 
    const memory = new Map(); // У Мапі формат зберігання input: [answer, counter]
    return async (...args) => {
        const input = args.join(",");
        if (memory.has(input)) {
            const arr = memory.get(input);
            const count = arr[1];
            const answer = arr[0];
            memory.set(input, [answer, count + 1]);
            return answer;
        }
        if (memory.size >= mapCap) {
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
        const answer = await f(...args);
        memory.set(input, [answer, 1]);
        return answer;
    }
};

export const validateWord = memoize(async (filePath, word) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line === word) return true;
  }
  return false;
}, 25);