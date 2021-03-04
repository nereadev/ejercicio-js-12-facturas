// iniciar en el archivo de la API con el comando: npm start
devolverFactuas();
async function devolverFactuas() {
  const facturas = await fetch("http://localhost:3001/facturas");
  const listaFacturas = await facturas.json();
  // añadir factura tipo ingreso en fila
  const tipoIngreso = await listaFacturas
    .filter(factura => factura.tipo === "ingreso");
  console.log(tipoIngreso);
  for (const factura of await tipoIngreso) {
    const nuevaFila = listaMolde.cloneNode(true);
    nuevaFila.classList.remove("off");
    nuevaFila.querySelector(".numero").textContent = factura.id;
    nuevaFila.querySelector(".concepto").textContent = factura.concepto;
    console.log(factura.concepto);
    nuevaFila.querySelector(".fecha").textContent = factura.fecha;
    nuevaFila.querySelector(".base").textContent = factura.base;
    nuevaFila.querySelector(".iva").textContent = factura.tipoIva;
    nuevaFila.querySelector(".total").textContent = factura.numero;
    nuevaFila.querySelector(".estado").textContent = factura.abonada;
    nuevaFila.querySelector(".vence").textContent = factura.vencimiento;
    document.querySelector(".lista-facturas").append(nuevaFila);
  }
}

// crear fila "dummy"
const listaMolde = document.querySelector(".lista-dummy");
// listaMolde.textContent = "";
// console.log(listaMolde);
listaMolde.classList.add("off");

document.querySelector(".lista-facturas").textContent = "";
// console.log(listaMolde);
