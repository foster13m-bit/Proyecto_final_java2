// Importa los iconos aquí (dado que todas las vistas los necesitan)
// Asume que la ruta es correcta con respecto al archivo View.js
const icons = new URL('../../img/icons.svg', import.meta.url).href; 

//const icons = new URL('../../img/icons.svg', import.meta.url).href; 

// 5.a.ii: Declara y exporta por defecto la clase View
export default class View {
    // 5.c: Propiedad data
    _data; // 5.b.ii: Usamos '_' en lugar de '#'

    // 5.c: Copia render, _clear, renderSpinner, renderError, renderMessage de RecipeView
    
    /**
     * Renderiza los datos recibidos en el DOM.
     * @param {Object | Object[]} data El objeto o array de datos a renderizar (ej. receta o resultados de búsqueda).
     * @param {boolean} [render=true] Si es false, retorna el markup string en lugar de renderizarlo al DOM.
     * @returns {string | undefined} Retorna el markup si render=false, sino undefined.
     */
    render(data, render = true) {
        // 5.i.iii: Validación de datos antes de renderizar (Manejo de No Resultados)
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        this._clear();
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // El valor por defecto se debe definir en la clase hija
    renderError(message = this._errorMessage) {
        this._clear();
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // El valor por defecto se debe definir en la clase hija
    renderMessage(message = this._message) {
        this._clear();
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}