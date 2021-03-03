// iniciar en el archivo de la API con el comando: npm start
const listaFacturas = fetch("http://localhost:3001/facturas")
  .then(response => response.json())
  .then(data => console.log(data));
