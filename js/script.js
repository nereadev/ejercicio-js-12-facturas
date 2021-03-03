// iniciar en el archivo de la API con el comando: npm start
const listaFacturas = fetch("http://localhost:3001/facturas")
  .then(response => response.json())
  .then(data => console.log(data));

// crear fila "dummy"
const listaMolde = document.querySelector(".lista-dummy").cloneNode(true);
listaMolde.textContent = "";
listaMolde.classList.add("off");
console.log(listaMolde);
