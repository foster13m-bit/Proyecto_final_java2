// Estado global de la aplicación
// Aquí se almacenan los datos que se comparten entre módulos (receta actual, búsqueda, marcadores)
export const state = {
    recipe: {}, // Receta actual cargada desde la API
    search: {}, // Resultados de búsqueda (se implementará más adelante)
    bookmarks: [], // Recetas guardadas por el usuario (se implementará más adelante)
};

export async function loadRecipe(id) {
    try {
        const urlValida = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        // const urlInvalida = 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz'; // Para la prueba H https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

        // a. Función de búsqueda (fetch) con await
        const resp = await fetch(urlValida);

        // b. Convertir la respuesta a JSON con await
        const data = await resp.json();

        // c. Enviar a la consola las constantes resp y data
        console.log('Contenido de resp:', resp);
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
        console.log('Objeto recipe reformateado:', state.recipe)

    }
    catch (error) {
        // d. En caso de error, enviar una alerta
        alert(`Ocurrió un error en model: ${error.message}`);
        // También puedes loguear el error completo para depuración
        console.error(error);
    }
}
