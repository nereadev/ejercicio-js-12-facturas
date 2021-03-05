// iniciar en el archivo de la API con el comando: npm start
devolverFactuas();
async function devolverFactuas() {
  const facturas = await fetch("http://localhost:3001/facturas");
  const listaFacturas = await facturas.json();
  // añadir factura tipo ingreso en fila
  const tipoIngreso = await listaFacturas
    .filter(factura => factura.tipo === "ingreso");

  let resultadoTotal = 0;
  let ivaTotal = 0;
  let baseTotal = 0;

  for (const factura of await tipoIngreso) {
    const nuevaFila = listaMolde.cloneNode(true);
    nuevaFila.classList.remove("off");
    nuevaFila.querySelector(".numero").textContent = factura.id;
    nuevaFila.querySelector(".concepto").textContent = factura.concepto;
    const numeroFecha = Number(factura.fecha);
    const objetofecha = luxon.DateTime.fromMillis(numeroFecha);
    nuevaFila.querySelector(".fecha").textContent = objetofecha.toLocaleString();
    nuevaFila.querySelector(".base").textContent = factura.base;
    const totalIva = `${Math.round((factura.tipoIva * factura.base) / 100)}€ (21%)`;
    nuevaFila.querySelector(".iva").textContent = totalIva;
    nuevaFila.querySelector(".total").textContent = parseInt(`${Math.round((factura.tipoIva * factura.base) / 100)}`) + factura.base;
    nuevaFila.querySelector(".estado").textContent = factura.abonada;
    const numeroVence = Number(factura.vencimiento);
    const objetoVence = luxon.DateTime.fromMillis(numeroVence);
    const hoy = luxon.DateTime.now();

    const diferencia = `${Math.round(hoy.diff(objetoVence, ['days']).days)}`;

    if (nuevaFila.querySelector(".estado").innerText === "true") {
      nuevaFila.querySelector(".vence").textContent = "-"
    } else {
      if (diferencia <= 0) {
        nuevaFila.querySelector(".vence").textContent = objetoVence.toLocaleString() + " Faltan: " + diferencia * (-1);
        nuevaFila.querySelector(".vence").classList.remove("table-danger");
        nuevaFila.querySelector(".vence").classList.add("table-success");
      } else {
        nuevaFila.querySelector(".vence").textContent = objetoVence.toLocaleString() + " Pasan: " + diferencia;
        nuevaFila.querySelector(".vence").classList.remove("table-success");
        nuevaFila.querySelector(".vence").classList.add("table-danger");
      }
    }

    //Estado Factura abonada
    if (nuevaFila.querySelector(".estado").innerText === "true") {
      nuevaFila.querySelector(".estado").classList.remove("table-danger");
      nuevaFila.querySelector(".estado").classList.add("table-success");
    } else {
      nuevaFila.querySelector(".estado").classList.add("table-danger");
      nuevaFila.querySelector(".estado").classList.remove("table-success");
    }

    resultadoTotal = resultadoTotal + parseInt(`${Math.round((factura.tipoIva * factura.base) / 100)}`) + factura.base;
    ivaTotal = ivaTotal + parseInt(`${Math.round((factura.tipoIva * factura.base) / 100)}`);
    baseTotal = baseTotal + parseInt(factura.base);

    document.querySelector(".lista-facturas").append(nuevaFila);
  }

  document.querySelector(".resultado-total").innerText = resultadoTotal;
  document.querySelector(".iva-total").innerText = ivaTotal;
  document.querySelector(".base-total").innerText = baseTotal;
}

// crear fila "dummy"
const listaMolde = document.querySelector(".lista-dummy");
// listaMolde.textContent = "";

listaMolde.classList.add("off");
document.querySelector(".lista-facturas").textContent = "";

const fecha = new Date("2016-05-25T09:08:34.123+06:00");
const fechaObjeto = luxon.DateTime.fromISO(fecha);

const ts = new Date().getTime(); // 1516717417146
const dt = luxon.DateTime.fromMillis(ts); // { ts: 2018-01-23T09:23:37.146-05:00 ...
