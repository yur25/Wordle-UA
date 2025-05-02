const fs = require('node:fs');
const cheerio = require('cheerio');

const url = 'http://ukrlit.org/slovnyk/slovnyk_ukrainskoi_movy_v_11_tomakh';

async function getPrefixes(url) {
  const res = await fetch(url);
  const text = await res.text();
  const prefixes = [];
  const $ = cheerio.load(text);
  $('.letters__dropdown.letters__dropdown_opacity ul li a').each((i, element) => {
    const prefix = $(element).text().trim();
    prefixes.push(prefix);
  })
  return prefixes;
}

async function getWords(prefixes) {
  const words = [];
  for (const prefix of prefixes) {
    const url = `http://ukrlit.org/slovnyk/slovnyk_ukrainskoi_movy_v_11_tomakh/${prefix}~`;
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    $('.word-list ul li a').each((i, element) => {
      const word = $(element).text().trim();
      if (word.length === 5 && !word.includes(`-`)) words.push(word);
    })
  }
  return words;
}

async function createFile(url) {
  const prefixes = await getPrefixes(url);
  const words = await getWords(prefixes);
  fs.writeFileSync('ukrainian_words.txt', [...words].join('\n'), 'utf-8');
}

createFile(url);