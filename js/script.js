// INICIALIZACION
const params = new URLSearchParams(window.location.search);
const codigo = params.get('cod');

let labNum = '01';
let labPab = 'AP';

let labNumElem = document.getElementById('labNum');
let labPabElem = document.getElementById('labPab');

let active_cells = new Array(26).fill(0);

function decodificador(codigo) {
  labPab = codigo.slice(0, 2);
  labNum = codigo.slice(2, 4);

  labPabElem.value = labPab;
  labNumElem.value = labNum;

  codPcs = codigo.slice(4);
  for (let i = 0; i < codPcs.length; i++) {
    const letra = codPcs[i];
    const pcNum = letra.toLowerCase().charCodeAt(0) - 97;

    active_cells[pcNum] = 1;
  }

  console.log('Labo: ' + labNum + ' ' + labPab);
  console.log(active_cells);
}

if (codigo !== null) decodificador(codigo);

// TITULO
labNumElem.addEventListener('change', (e) => {
  // console.log('Nuevo número:', e.target.value);
  labNum = e.target.value;
  console.log('Nuevo lab num: ' + labNum);
});

labPabElem.addEventListener('change', (e) => {
  // console.log('Nuevo tipo:', e.target.value);
  labPab = e.target.value;
  console.log('Nuevo lab pab: ' + labPab);
});

// FRENTE
// Profesor
let profesor = document.getElementById('profesor');

if (active_cells[0]) {
  profesor.classList.add('activo');
}

profesor.addEventListener('click', (e) => {
  let tar = e.target;

  tar.classList.toggle('activo');
  active_cells[0] = !active_cells[0];
  console.log(active_cells);
});

// Pantalla
let pantalla = document.getElementById('pantalla');

if (active_cells[25]) {
  pantalla.classList.add('activo');
}

pantalla.addEventListener('click', (e) => {
  let tar = e.target;
  tar.classList.toggle('activo');
  active_cells[25] = !active_cells[25];
  console.log(active_cells);
});

// COLUMNAS

// General
function createCells(col, col_vals) {
  for (let i = 0; i < col_vals.length; i++) {
    const cell = document.createElement('div');
    const cell_id = col_vals[i];

    if (active_cells[cell_id]) {
      cell.classList.add('activo');
    }

    cell.innerText = String(cell_id).padStart(2, '0');
    cell.dataset.id = cell_id;

    cell.addEventListener('click', () => {
      cell.classList.toggle('activo');
      active_cells[cell_id] = !active_cells[cell_id];
      console.log(active_cells);
    });

    col.append(cell);
  }
}

// Col1
let col1 = document.getElementById('col1');
let col1_vals = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18];

createCells(col1, col1_vals);

// Col2
let col2 = document.getElementById('col2');
let col2_vals = [3, 4, 7, 8, 11, 12, 15, 16, 19, 20];

createCells(col2, col2_vals);

// GENERAR URL
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
botonGenerar = document.getElementById('generar');

// Codificador
function generarURL() {
  let url = '';
  for (let i = 0; i < active_cells.length; i++) {
    if (active_cells[i]) {
      //   console.log(i);
      url += letters[i];
    }
  }
  return url;
}

botonGenerar.addEventListener('click', async () => {
  let gen_url = generarURL();

  if (gen_url.length === 0) {
    alert('Seleccione un equipo como minimo');
  } else {
    gen_url = 'https://labos-fisi.netlify.app/?cod=' + labPab + labNum + gen_url;
    console.log(gen_url);

    try {
      await navigator.clipboard.writeText(gen_url);
      alert('URL copiada al portapapeles:\n' + gen_url);
    } catch (err) {
      console.error('Error al copiar:', err);
      alert('No se pudo copiar la URL');
    }
  }
});

