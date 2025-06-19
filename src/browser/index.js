

for (let i = 0; i < rows; i++) { //генерація потрібної кількості рядків, коробочок і надання їм усім унікального id
  const row = document.createElement('div');
    row.classList.add('row');
    row.id = 'row' + i.toString()
  for (let j = 0; j < columns; j++) {
    const box = document.createElement('div');
    box.classList.add('letter-box');
    box.id = 'box'+i.toString()+'-'+j.toString()
    row.appendChild(box);
  }

  gamefield.appendChild(row);}



let wordleAnswer = '';                  // TODO: Тимчасова штука! Зробити по-нормальному якщо можна
const testasync = async () => {
  wordleAnswer = await getRandomWord();
}

testasync();

highlightBox();