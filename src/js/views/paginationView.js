import View from './View.js';

// Importa los iconos aquí para que estén en el alcance de _generateMarkup
const icons = new URL('../../img/icons.svg', import.meta.url).href; 

// 2.a.iii: Crea la clase PaginationView como hija de View
class PaginationView extends View {
    // 2.a.iii.1: Elemento padre con clase .pagination
    _parentElement = document.querySelector('.pagination'); 

    // 2.a.iii.4: Crea el método addHandlerClick
    addHandlerClick(handler) {
        // 2.a.iii.4.a: Escucha el evento 'click' en el elemento padre
        this._parentElement.addEventListener('click', function (e) {
            // 2.a.iii.4.a.ii: Delegación de eventos. Busca el botón más cercano.
            const btn = e.target.closest('.btn--inline');
            
            // Si el clic no fue en un botón, sal inmediatamente.
            if (!btn) return; 

            // 2.a.iii.4.a.iii: Obtiene el número de página del atributo data-goto
            const goToPage = +btn.dataset.goto; // El '+' convierte la cadena a número
            
            // 2.a.iii.4.a.iv: Registra en la consola
            // console.log(goToPage); 

            // Llama al controlador (handler) con el número de página
            handler(goToPage);
        });
    }

    // 2.a.iii.3: Crea el método privado _generateMarkup
    _generateMarkup() {
        // 2.a.iii.3.2: Declara la constante para la página actual
        const curPage = this._data.page; 

        // 2.a.iii.3.a: Valida cuántas páginas existen
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Generación del Markup
        // 2.a.iii.3.b.i: Escenario 1: Página 1 y existen más páginas
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButton(curPage, 'next');
        }

        // 2.a.iii.3.b.ii: Escenario 2: Última página
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupButton(curPage, 'prev');
        }

        // 2.a.iii.3.b.iii: Escenario 3: Cualquier otra página (en medio)
        if (curPage < numPages) {
            return this._generateMarkupButton(curPage, 'prev') + this._generateMarkupButton(curPage, 'next');
        }

        // 2.a.iii.3.b.iv: Escenario 4: Página 1 y NO existen más páginas (solo 1 página)
        return '';
    }

    // Helper para generar el botón (Para evitar repetición de código)
    _generateMarkupButton(curPage, type) {
        if (type === 'next') {
            return `
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        if (type === 'prev') {
            return `
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
            `;
        }
    }
}

// 2.a.iii.4.v: Exporta por defecto un nuevo objeto de PaginationView
export default new PaginationView();