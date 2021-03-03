// iniciar en el archivo de la API con el comando: npm start
devolverFactuas();
async function devolverFactuas() {
  const facturas = await fetch("http://localhost:3001/facturas");
  const listaFacturas = await facturas.json();
  console.log(listaFacturas);
  // añadir factura tipo ingreso en fila
  listaMolde.classList.remove("off");
  const tipoIngreso = listaFacturas
    .filter(factura => factura.tipo === "ingreso");
  listaMolde.textContent = tipoIngreso[0].base;
  document.querySelector(".lista-facturas").append(listaMolde);
  console.log(listaMolde);
}

// crear fila "dummy"
const listaMolde = document.querySelector(".lista-dummy").cloneNode(true);
listaMolde.textContent = "";
listaMolde.classList.add("off");
// console.log(listaMolde);
