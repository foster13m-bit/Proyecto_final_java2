//import icons from '../img/icons.svg'; 
import * as model from './model.js';
//import * as recipeView from '../js/views/RecipeView.js';
import recipeView from '../js/views/RecipeView.js'; 
console.log("valor recipe:",recipeView);
//const icons = new URL('../img/icons.svg', import.meta.url).href; // Parcel v2

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
////////////////////////////////////////
// const renderSpinner = function (parentEl) {
//   // c. Borra el contenido existente del elemento padre
//   parentEl.innerHTML = ''; 

//   // a. Crea la variable markup con el spinner
//   const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;

//   // b. Inserta el markup del spinner en el elemento padre
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };
////////////////////////////////////////
const controlRecipes = async function() {
    //Paso 4 avance 2 de proyecto
    const id = window.location.hash.slice(1); // 4.a: Declarar 'id' y asignarle el hash completo 'avance 2 de proyecto'
    console.log('ID recibido:', id); // 4.b: Imprimir en la consola (para depuración) 'avance 2 de proyecto'
    if (!id) return;
    // LLAMADA DEL SPINNER:
    recipeView.renderSpinner(); // Se llama justo antes de la operación asíncrona
    // Simular carga lenta (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        // const urlValida = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        // // const urlInvalida = 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz'; // Para la prueba H https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

        // // a. Función de búsqueda (fetch) con await
        // const resp = await fetch(urlValida);

        // // b. Convertir la respuesta a JSON con await
        // const data = await resp.json();

        // // c. Enviar a la consola las constantes resp y data
        // console.log('Contenido de resp:', resp);
        // console.log('Contenido de data:', data);
        // // console.log('Objeto recipe:', recipe);

        // // j. Crear la variable recipe del tipo objeto e igualarla a data.data
        // let recipe = data.data.recipe;

        // // k. Desestructurar/reformatear el objeto recipe
        // recipe = {
        //     id: recipe.id,
        //     title: recipe.title,
        //     publisher: recipe.publisher,
        //     sourceUrl: recipe.source_url, // Nota la conversión de snake_case a camelCase
        //     image: recipe.image_url,
        //     servings: recipe.servings,
        //     cookTime: recipe.cooking_time,
        //     ingredients: recipe.ingredients,
        // };
        // // l.Imprime en la consola el contenido (Paso 15.l)
        // console.log('Objeto recipe reformateado:', recipe);
        await model.loadRecipe(id);
        recipeView.render(model.state.recipe);
        //////////////////////////////////////////////////////////////
        // 18. Borrar contenido previo del contenedor
        //recipeContainer.innerHTML = '';
        // 16. y 17. Generar el markup usando template string y datos de 'recipe'
        //const markup = `
        // <figure class="recipe__fig">
        // <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        // <h1 class="recipe__title">
        // <span>${recipe.title}</span>
        // </h1>
        // </figure>
        // <div class="recipe__details">
        // <div class="recipe__info">  
        // <svg class="recipe__info-icon">
        // <use href="${icons}#icon-clock"></use> </svg>
        // <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
        // <span class="recipe__info-text">minutes</span>
        // </div>
        // <div class="recipe__info">
        // <svg class="recipe__info-icon">
        // <use href="${icons}#icon-users"></use> </svg>
        // <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        // <span class="recipe__info-text">servings</span>
        // <div class="recipe__info-buttons">
        // <button class="btn--tiny btn--update-servings" data-update-to="3">
        // <svg>
        // <use href="${icons}#icon-minus-circle"></use> </svg>
        // </button>
        // <button class="btn--tiny btn--update-servings" data-update-to="5">
        // <svg>
        // <use href="${icons}#icon-plus-circle"></use> </svg>
        // </button>
        // </div>
        // </div>
        // <div class="recipe__user-generated">
        // <svg>
        // <use href="${icons}#icon-user"></use> </svg>
        // </div>
        // <button class="btn--round btn--bookmark">
        // <svg class="">
        // <use href="${icons}#icon-bookmark-fill"></use> </svg>
        // </button>
        // </div>
        // <div class="recipe__ingredients">
        //   <h2 class="heading--2">Recipe ingredients</h2>
        //   <ul class="recipe__ingredient-list">
        //     ${recipe.ingredients.map(ing => { // 20. a. Recorrer el arreglo y generar el HTML
        //     return `
        //     <li class="recipe__ingredient">
        //       <svg class="recipe__icon">
        //         <use href="${icons}#icon-check"></use> 
        //       </svg>
        //       <div class="recipe__quantity">${ing.quantity ? ing.quantity.toFixed(1) : ''}</div>
        //       <div class="recipe__description">
        //         <span class="recipe__unit">${ing.unit}</span>
        //         ${ing.description}
        //       </div>
        //     </li>
        //     `;
        //     }).join('')} 
        //   </ul>
        // </div>
        // <div class="recipe__directions">
        // <h2 class="heading--2">How to cook it</h2>
        // <p class="recipe__directions-text">
        // This recipe was carefully designed and tested by
        // <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        // directions at their website.
        // </p>
        // <a
        // class="btn--small recipe__btn"
        // href="${recipe.sourceUrl}"
        // target="_blank"
        // >
        // <span>Directions</span>
        // <svg class="search__icon">
        // <use href="${icons}#icon-arrow-right"></use> </svg>
        // </a>
        // </div>
        // `;
        //////////////////////////////////////////////////////////////
        // 19. Insertar el nuevo contenido
        //recipeContainer.insertAdjacentHTML('afterbegin', markup);
        // Nota: El punto 20.d pide eliminar los elementos con clase recipe__ingredient, lo cual
        // se logra asegurando que el HTML en index.html está limpio y solo se genera
        // mediante el markup dinámico.

        //////////////////////////////////////////////////////////////
    } catch (error) {
        // d. En caso de error, enviar una alerta
        alert(`Ocurrió un error: ${error.message}`);
        // También puedes loguear el error completo para depuración
        console.error(error);
    }
};

// e. Invocar a la función showRecipe
//controlRecipes(); //El listener de load ya maneja la carga inicial de la página. El llamado directo a controlRecipes() es innecesario.

['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
