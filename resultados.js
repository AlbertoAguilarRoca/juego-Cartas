// Se está siguiendo el tutorial proporcionado por Reyes
// https://levelup.gitconnected.com/google-sheets-api-tutorial-with-javascript-588f581aa1d9

// Enlace de la hoja de calculo online
// https://docs.google.com/spreadsheets/d/1Pn1fE74pRlnKQUhm_ugYHCZreaCAgVaHrb8Q0o6mEgM/edit?usp=sharing


// El ID de la hoja de calculo en google drive
const SHEET_ID = '1Pn1fE74pRlnKQUhm_ugYHCZreaCAgVaHrb8Q0o6mEgM';

// Este token permite la conexion y edicion de la hoja de calculo
// MUY IMPORTANTE, SOLO FUNCIONA DURANTE UNA HORA EL ACCESS_TOKEN
// En cuanto pasa la hora hay que volver a pedirselo a la api de google

const ACCESS_TOKEN = 'ya29.A0ARrdaM-J0vNkRKGcNqPfvWUJggMFN79EVihjVcnkCgboVp62a9kdFptyolo9frn9bMUhiLtAaT8qw4zPgrtq2WDit7o65iIh0-PdD0-Xfb8C_N0kEPmVwUXBLC-yduAKd650tRoZewbxOnjuMe4WkTB1XgZP';

// Añade un EventListener al boton de guardar resultados
// Similar a ponerle un onclick="botonGuardar()" en html
document.getElementById("boton_guardar").addEventListener("click", botonGuardar);

// Funcion botonGuardar() que hace lo siguiente:
function botonGuardar(){

  // carga del session Storage el array con las puntuaciones de los jugadores
  const jugadoresPuntuaciones = JSON.parse(sessionStorage.getItem("jugadores"));
    
  console.log(jugadoresPuntuaciones);

  // Empieza en la fila 1, que seria el equivalente a la fila 2 de la hoja de calculo
  let fila = 1;

  // Un bucle que recorre el array
  jugadoresPuntuaciones.forEach(jugador => {
      // columna 0 seria la columna A de la hoja de calculo
      let columna = 0;

      ActualizarHojaCalculoCadena(jugador.nombre, fila, columna);
      columna++; // columna B
      ActualizarHojaCalculoNumero(jugador.puntos, fila, columna);
      columna++; // columna C
      ActualizarHojaCalculoNumero(jugador.intentos, fila, columna);
      columna++; // columna D
      ActualizarHojaCalculoCadena(jugador.tiempo, fila, columna);

      fila++; // suma una fila para agregar los datos del siguiente jugador
  });
    

} 

  // Funcion para guardar en la hoja de calculo datos de tipo String
  ActualizarHojaCalculoCadena = (cadena, fila, columna) => {

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: columna,
              endColumnIndex: columna + 1,
              startRowIndex: fila,
              endRowIndex: fila + 1,
              sheetId: 0
            },
            cell: {
              userEnteredValue: {
                "stringValue": cadena
              },
            },
            fields: "*"
          }
        }]

      })
    })
  }

  // Funcion para guardar en la hoja de calculo datos de tipo Int
  ActualizarHojaCalculoNumero = (numero, fila, columna) => {

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: columna,
              endColumnIndex: columna + 1,
              startRowIndex: fila,
              endRowIndex: fila + 1,
              sheetId: 0
            },
            cell: {
              userEnteredValue: {
                "numberValue": numero
              },
            },
            fields: "*"
          }
        }]

      })
    })
  }