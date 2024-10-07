

// event handlers

// In general, the DOMContentLoaded event is a good choice 
// if your JavaScript code doesn’t rely on external assets, 
// while the window load event is better suited for code that depends on all assets being loaded.
//
// The load event can take a bit longer to fire compared to DOMContentLoaded, 
// as it waits for all assets to load. If your script doesn’t depend on other assets, 
// you might want to use DOMContentLoaded instead for a faster response time.

// the initial HTML document has been completely loaded and parsed, 
// without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
});

//when the whole page has fully loaded, 
// including all dependent resources such as stylesheets, scripts, iframes, and images. 
window.addEventListener('load', function() {
    // Your code here
});

$(document).ready(function() {
    // Your code here
    mostrarProdutos(3);
});


function mostrarProdutos(qtd) {
    prodCards.innerHTML = '';
    catalog.items.slice(0, qtd).forEach(x => {
        prodCards.innerHTML += `
            <div class="card p-2" style="width: 18rem; height: 550px;">
                <img src="${catalogImagePath}${x.img}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between align-items-center">
                    <div class="w-100 d-flex flex-column align-items-center">
                        <h5 class="c-laranja">${x.titulo}</h5>
                        <p class="text-center">${x.descricao[0]}</p>
                    </div>
                    <div class="w-100 d-flex flex-column justify-content-between align-items-center">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#modalProduto" class="btn btn-primary btn-form" onclick="modalExibir(${x.id});">VER MAIS</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// behavior





