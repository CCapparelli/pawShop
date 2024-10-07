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

function adicionar(id) {
    shoppingCart.add(new ShoppingCartItem(id, 1));
    refreshCartItems();
    
    var prod = catalog.ProductById(id);
    alert(`${prod.titulo} adicionado ao carrinho.`);
}

function increase(id) {
    shoppingCart.increase(id);
    refreshCartItems();
}

function decrease(id) {
    shoppingCart.decrease(id);
    refreshCartItems();
}

function remove(id) {
    var item = shoppingCart.items.filter(x => x.productId === id)[0];
    var prod = catalog.ProductById(id);
    
    var ok = confirm(`Remover ${prod.titulo} - qtd : ${item.qtd} ?`);
    if (ok) {
        shoppingCart.remove(item);
        refreshCartItems();
    }
}

function refreshCartItems() {
    cartItems.innerHTML = '';
    shoppingCart.items.forEach(item => {
        var product = catalog.ProductById(item.productId);
        cartItems.innerHTML += `
<div class="cartItem w-100 d-flex justify-content-start p-2 bg-azul rounded gap-2">
    <img class="rounded" src="${catalogImagePath}${product.img}" width="55" height="55">
    <div class="cardInfo w-100 d-flex flex-column">
        <p class="m-0 align-self-end">${product.titulo}</p>
        <div class="w-100 d-flex justify-content-between align-items-center">
            <h5 class="m-0">${product.preco}</h5>
            <div class="d-flex align-items-center">
                <i class="cHand m-1 fa fa-minus text-danger" onclick="decrease(${product.id});"></i>
                <div class="cArrow m-1">${item.qtd}</div>
                <i class="cHand m-1 fa fa-plus text-success" onclick="increase(${product.id});"></i>
            </div>
            <i class="cHand fa fa-trash me-2" onclick="remove(${product.id});"></i>
        </div>
    </div>
</div>`;
    });
    cartValue.innerText = shoppingCart.total();
}