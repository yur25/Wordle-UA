// Варіант як розставити літери на клавіатурі (щоб всі рядки мали однакову кількість символів, на майбутнє)

// йцукенгшщзхї
// фівапролджє (+стирання)
// 'ячсмитьбюґ  (+ентер)

const collums = 5 // скільки літер у слові
const rows = 6 // скільки спроб вгадати
const gamefield = document.getElementById('gamefield');

for (let i = 0; i < rows; i++) { //генерація потрібної кількості рядків, коробочок і надання їм усім унікального id
  const row = document.createElement('div');
    row.classList.add('row');
    row.id = 'row' + i.toString()
  for (let j = 0; j < collums; j++) {
    const box = document.createElement('div');
    box.classList.add('letter-box');
    box.id = 'box'+i.toString()+'-'+j.toString()
    row.appendChild(box);
  }

  gamefield.appendChild(row);}

let activeCell = [0,0]; // рядок, колонка
let guess = new Array(collums)

const highlightBox = () => {
    const box = document.getElementById('box' + activeCell[0].toString() + '-' + activeCell[1].toString());
    box.classList.add('now');
    if (activeCell[1] > 0) {
        const prevBox = document.getElementById('box' + activeCell[0].toString() + '-' + (activeCell[1] - 1).toString());
        prevBox.classList.remove('now');
    }
}

highlightBox();