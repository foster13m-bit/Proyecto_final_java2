import View from './View.js'; // 5.f.i: Importa la clase View
const icons = new URL('../../img/icons.svg', import.meta.url).href;
// Importa los iconos aquí (o usa la variable icons si la exportaste desde View)
// Asumiré que View.js contiene la lógica de iconos y renderizado.

class ResultsView extends View { // 5.f.ii: Crea ResultsView como hija de View
    // 5.f.iii: Declara el elemento padre
    _parentElement = document.querySelector('.results'); 
    
    // 5.i.i: Crea la propiedad error Message
    _errorMessage = 'No recipes found for your query. Please try another one!';
    
    // 5.i.ii: Crea la propiedad message
    _message = ''; // Cadena vacía
    
    // 5.h.i: Crea el método privado _generateMarkup
    _generateMarkup() {
        // 5.h.i: Regresa el arreglo this._data convertido en cadena
        return this._data.map(this._generateMarkupPreview).join('');
    }

    // 5.h.ii: Crea el método _generateMarkupPreview
    _generateMarkupPreview(result) {
        // Obtenemos el id de la receta activa (si la hay) para marcar el link activo
        const id = window.location.hash.slice(1);

        return `
            <li class="preview">
                <a class="preview__link ${
                    result.id === id ? 'preview__link--active' : '' // Marca el link activo
                }" href="#${result.id}"> <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" /> </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4> <p class="preview__publisher">${result.publisher}</p> <div class="preview__user-generated ${result.key ? '' : 'hidden'}"> 
                             <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `;
    }
}

export default new ResultsView(); // 5.f.iv: Exporta la instancia