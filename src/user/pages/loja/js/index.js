$(window).ready(function() {
    // Your code here
    mostrarCatalogo();
});

function mostrarCatalogo() {
    prodCards.innerHTML = '';
    catalog.items.forEach(x => {
        prodCards.innerHTML += `
            <div class="card p-2" style="width: 18rem; height: 550px;">
                <img src="${catalogImagePath}${x.img}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between align-items-center">
                    <div class="w-100 d-flex flex-column align-items-center">
                        <h5 class="c-laranja">${x.titulo}</h5>
                        <p class="text-center">${x.descricao[0]}</p>
                    </div>
                    <div class="w-100 d-flex flex-column justify-content-between align-items-center">
                        <p class="card-price">R$ ${x.preco}</p>
                        <div class="w-100 d-flex justify-content-between align-items-center">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modalProduto" class="btn btn-primary btn-form" onclick="modalExibir(${x.id});">VER MAIS</a>
                            
                            <!-- adiciona o item (mostra o alert) e então mostra o carrinho [data-bs-toggle & target] -->
                            <i id="btnCardCarrinho" class="cHand fa-solid fa-cart-arrow-down" onclick="adicionar(${x.id});" data-bs-toggle="offcanvas" data-bs-target="#offCarrinho" ></i>  
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}