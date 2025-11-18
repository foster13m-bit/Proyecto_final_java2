//const icons = new URL('../../img/icons.svg', import.meta.url).href; // Parcel v2
import View from './View.js'; // 5.b.i: Importa la clase View
import Fraction from "fraction.js";
const icons = new URL('../../img/icons.svg', import.meta.url).href; // Parcel v2

export class RecipeView extends View {
    // 2.a.ii: Crea la propiedad privada de mensaje de error por defecto, avance 3
    _message = 'Recipe was successfully uploaded! :)'; // Mensaje por defecto para éxito
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _parentElement = document.querySelector('.recipe');
    //#data;
    //Renderiza la receta en el DOM
    // render(data) {
    //     this.#data = data; // Guarda los datos recibidos
    //     this.#clear(); // Limpia el contenido anterior
    //     const markup = this.#generateMarkup(); // Genera el nuevo HTML
    //     this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Inserta en el DOM
    // }
    //Limpia el contenido del contenedor principal
    // #clear() {
    //     this.#parentElement.innerHTML = '';
    // }
    _generateMarkup() {
        return `
        <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
        <span>${this._data.title}</span>
        </h1>
        </figure>
        <div class="recipe__details">
        <div class="recipe__info">  
        <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use> </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookTime}</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use> </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>
        <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="3">
        <svg>
        <use href="${icons}#icon-minus-circle"></use> </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="5">
        <svg>
        <use href="${icons}#icon-plus-circle"></use> </svg>
        </button>
        </div>
        </div>
        <div class="recipe__user-generated">
        <svg>
        <use href="${icons}#icon-user"></use> </svg>
        </div>
        <button class="btn--round btn--bookmark">
        <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use> </svg>
        </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(ing => { // 20. a. Recorrer el arreglo y generar el HTML
            return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use> 
              </svg>
              <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
        }).join('')} 
          </ul>
        </div>
        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
        directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
        >
        <span>Directions</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use> </svg>
        </a>
        </div>
        `;
    }
//     renderSpinner() {
//         // c. Borra el contenido existente del elemento padre
//         this.#parentElement.innerHTML = '';

//         // a. Crea la variable markup con el spinner
//         const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;

//         // b. Inserta el markup del spinner en el elemento padre
//         this.#parentElement.insertAdjacentHTML('afterbegin', markup);
//     };
    //////////////////////////////////////////////////////////////////Avance 3
    // 2.a.i: Crea el método renderError
    // renderError(message = this.#errorMessage) {
    //     // 2.a.iii - 2.a.vi: Declarar la constante markup con el código de error
    //     const markup = `
    //         <div class="error">
    //             <div>
    //                 <svg>
    //                     <use href="${icons}#icon-alert-triangle"></use>
    //                 </svg>
    //             </div>
    //             <p>${message}</p>
    //         </div>
    //     `;

    //     // 2.a.vii: Limpiar e insertar el HTML
    //     this.#clear();
    //     this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    // }
    // 3.a: Copia renderError y renómbralo como renderMessage
    // 3.b: Pásale como parámetro message=this.#message
    // renderMessage(message = this.#message) {
    //     // 3.c: Cambia el icono de icon-alert-triangle a icon-smile
    //     const markup = `
    //         <div class="message">
    //             <div>
    //                 <svg>
    //                     <use href="${icons}#icon-smile"></use>
    //                 </svg>
    //             </div>
    //             <p>${message}</p>
    //         </div>
    //     `;

    //     this.#clear();
    //     this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    // }
    // 1.b, 1.c: Se Crea el método addHandlerRender para suscribir al controlador (handler)
    addHandlerRender(handler) {
        // Pega el código cortado aquí, reemplazando 'controlRecipes' por 'handler'
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
        //['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipes));
    }
}

export default new RecipeView();