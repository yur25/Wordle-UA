import fs from 'node:fs';
import * as cheerio from 'cheerio';

const url = 'http://ukrlit.org/slovnyk/slovnyk_ukrainskoi_movy_v_11_tomakh';

const getPrefixes = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  const prefixes = [];
  const $ = cheerio.load(text);
  $('.letters__dropdown.letters__dropdown_opacity ul li a').each((i, element) => {
    const prefix = $(element).text().trim();
    prefixes.push(prefix);
  })
  return prefixes;
}

const getWords = async (prefixes) => {
  const words = [];
  for (const prefix of prefixes) {
    const url = `http://ukrlit.org/slovnyk/slovnyk_ukrainskoi_movy_v_11_tomakh/${prefix}~`;
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    $('.word-list ul li a').each((i, element) => {
      const word = $(element).text().trim();
      if (word.length === 5 && !word.includes(`-`)) words.push(word);
    })
  }
  return words;
}

const createFile = async (url) => {
  const prefixes = await getPrefixes(url);
  const words = await getWords(prefixes);
  fs.writeFileSync('words.txt', [...words].join('\n'), 'utf-8');
}

createFile(url);