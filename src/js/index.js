// HTML elements
const imgLogo           = document.getElementById('imgLogo');
const body              = document.querySelector('body');
const btnToggleTheme    = document.getElementById('btnToggleTheme');

const prodCards     = document.getElementById('prodCards');
const cartItems     = document.getElementById('cartItems');
const cartValue     = document.getElementById('cartValue');

const modalBody     = document.getElementById('modalBody');
const modalTitle    = document.getElementById('modalTitle');

const ofcanvas      = document.getElementById('offCarrinho');
const headerNav      = document.getElementById('headerNav');

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
const catalogImagePath = '/src/img/products/';

btnToggleTheme.addEventListener('click', toggleTheme);
// btnToggleTheme.on('click', toggleTheme);

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

function modalExibir(id) {
    var product = catalog.ProductById(id);
    modalTitle.innerText = product.titulo;

    var html  = `
        <div class="modal-test d-flex gap-3">
            <img src="${catalogImagePath}${product.img}" class="w-50 align-self-start" alt="...">
            <div class="modal-test-info d-flex flex-column">`;
    
    product.descricao.forEach(x => { 
        html += `<p class="text-align-justify">${x}</p>`;
    });

    html + `<p>R$ ${product.preco}</p>
            </div>
        </div>`;

    modalBody.innerHTML = html;
}

function toggleTheme(){
    if(body.getAttribute('data-bs-theme') == 'dark'){
        body.setAttribute('data-bs-theme','light');
        btnToggleTheme.innerHTML='<i class="fa fa-moon"></i>  Modo escuro';
        imgLogo.src = 'src/img/logo/logoDark.svg';
        headerNav.classList.toggle('navbar-light','navbar-dark');
        headerNav.style.color = 'black';
    }else{
        body.setAttribute('data-bs-theme','dark');
        btnToggleTheme.innerHTML='<i class="fa fa-sun"></i>  Modo claro';
        imgLogo.src = 'src/img/logo/logoWhite.svg';
        headerNav.classList.toggle('navbar-dark','navbar-light');
        headerNav.style.color = 'black';
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




