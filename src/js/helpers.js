import { TIMEOUT_SEC } from './config.js'; // Importa la constante del tiempo límite

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// 4.a.ii, 4.a.vii: Crea y exporta la función asíncrona getJSON
export const getJSON = async function (url) {
  try {
    // 4.b.i: Declara fetchPro y asígnale la función de búsqueda
    const fetchPro = fetch(url);
    
    // 4.b.ii: Modifica la variable resp con Promise.race
    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); 
    
    // 4.a.i: Declaración de data (4.a.iv)
    const data = await resp.json(); 
    // c. Enviar a la consola las constantes resp y data
    // console.log('Contenido de resp:', resp);
    // console.log('Contenido de data:', data);
    // 4.a.i, 4.a.v: Validación del parámetro ok de resp
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

    // 4.a.vi: Retorna el valor de data
    return data;
  } catch (err) {
    // 4.a.vii: Recibe el parámetro error y lanza el error
    throw err; 
  }
};