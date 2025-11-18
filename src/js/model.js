import { getJSON } from '../js/helpers.js'; // Importa getJSON
import { API_URL } from './config.js'; // Importa la constante desde config.js
// Estado global de la aplicación
// Aquí se almacenan los datos que se comparten entre módulos (receta actual, búsqueda, marcadores)
export const state = {
    recipe: {}, // Receta actual cargada desde la API
    search: {
        query: '',   // 2.a.i: Almacena la consulta de búsqueda
        results: [], // 2.a.ii: Almacena los resultados de la búsqueda (matriz vacía)
    }, // Resultados de búsqueda (se implementará más adelante)
    bookmarks: [], // Recetas guardadas por el usuario (se implementará más adelante)
};

export async function loadRecipe(id) {
    try {
        //const urlValida = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        // const urlInvalida = 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz'; // Para la prueba H https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

        // a. Función de búsqueda (fetch) con await
        //const resp = await fetch(urlValida);
        // CORRECCIÓN: Usar API_URL en lugar de la URL estática
        //const resp = await fetch(`${API_URL}${id}`);
        const url = `${API_URL}${id}`;
        // Manejo de error de red o de API (¡IMPORTANTE!)
        // if (!resp.ok) {
        //     const data = await resp.json();
        //     throw new Error(`${data.message} (${resp.status})`);
        // }
        // 4.a.viii: Sustituye la declaración de la función asíncrona data con getJSON (no olvides el await)
        // La función getJSON ya maneja fetch, JSON parsing y la validación de res.ok
        const data = await getJSON(url);

        // b. Convertir la respuesta a JSON con await
        //const data = await resp.json();

        // c. Enviar a la consola las constantes resp y data
        // console.log('Contenido de resp:', resp);
        console.log('Contenido de data:', data);
        // console.log('Objeto recipe:', recipe);

        // j. Crear la variable recipe del tipo objeto e igualarla a data.data
        const {recipe} = data.data;

        // k. Desestructurar/reformatear el objeto recipe
       state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url, // Nota la conversión de snake_case a camelCase
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        
        // l.Imprime en la consola el contenido (Paso 15.l)
        console.log('Objeto recipe reformateado:', state.recipe);

    }

    catch (error) {
        // // d. En caso de error, enviar una alerta
        // alert(`Ocurrió un error en model: ${error.message}`);
        // // También puedes loguear el error completo para depuración
        // console.error(error);
        // BUENA PRÁCTICA: El modelo lanza el error
        // Esto permite que el controlador (controller.js) lo capture
        // y lo muestre al usuario usando la vista (recipeView), manteniendo
        // al modelo libre de responsabilidades de la UI (alert).
        // 4.a.ix: Optimiza el manejo de errores: envía un mensaje de error personalizado a la consola
        //console.error(`${error} Request took too long! 💥💥💥💥`); 
        // Lanza el error para que el controlador lo capture
        // 2.c: Propagar el error, avance 3
        // Esto permite que controlRecipes lo capture,avance 3
        throw error;
    }
}

///////////////////////////avance 3 //////////////////////////
// 1.a: Declara y exporta una función asíncrona llamada loadSearchResults
export async function loadSearchResults(query) {
    // 1.b: En el cuerpo de la función crea un bloque try y catch
    try {
        const url = `${API_URL}?search=${query}`; // ¡Cuidado, la API necesita el '?' después de API_URL
        
        // 1.c: Declara una constante data e indícale que espere a la promesa getJSON
        const data = await getJSON(url); 

        // 2.b.i: Asigna la variable query a state.search.query
        state.search.query = query;

        // 1.d & 2.b.ii: Mapear los resultados y asignarlos a state.search.results
        state.search.results = data.data.recipes.map(rec => { 
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });

        // 2.b.iii: Envía a la consola los resultados
        //console.log('Resultados de búsqueda (state.search.results):', state.search.results);

        // 1.g: Prueba (eliminar después)
        //loadSearchResults('pizza'); 

    } catch (error) {
        // 1.e: Imprime en la consola la cadena de error
        console.log(`${error} 💥💥💥💥`);
        // 1.f: Lanza el error nuevamente para que pueda ser utilizado por el controlador
        throw error;
    }
}