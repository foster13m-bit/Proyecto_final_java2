// searchView.js

class SearchView {
    // 4.b.i: Crea el elemento padre privado (#parentElement)
    _parentElement = document.querySelector('.search');

    // 4.b.ii & 4.e.iii, 4.e.iv: Método para obtener la búsqueda y limpiar el campo
    getQuery() {
        // 4.e.iii: Crea la constante query y asigna el valor del input
        const query = this._parentElement.querySelector('.search__field').value;
        
        // 4.e.ii: Llama al método privado clearInput para borrar el texto
        this._clearInput(); 
        
        // 4.e.iv: Retorna la constante query
        return query;
    }

    // 4.e.i: Crea el método privado clearInput para borrar el campo
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }

    // 4.d.i: Crea el método addHandlerSearch (Patrón Editor-Suscriptor)
    addHandlerSearch(handler) {
        // 4.d.ii.1.a & 4.d.ii.1.b: Escucha el evento 'submit' en el formulario
        this._parentElement.addEventListener('submit', function (e) {
            // 4.d.ii.1.b.i: Previene la recarga de la página
            e.preventDefault(); 
            
            // 4.d.ii.1.b.ii: Llama a la función controladora
            handler(); 
        });
    }
    
    // 4.b.iv: Exporta por defecto una invocación a la clase
}

export default new SearchView();