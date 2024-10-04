const htmlCatalogo      = document.getElementById("sectionCatalogo");
const htmlCarrinho      = document.getElementById("carrinho");
const htmlCarrinhoLista = document.getElementById("carrinhoLista");

var catalogo = [];
var carrinho = [];
var idx = 0;

class Produto {
    constructor(id, img, tit, desc, valor) {
        this.id = id;
        this.img = img;
        this.tit = tit;
        this.desc = desc;
        this.valor = valor;
    }
}
catalogo.push(new Produto(0, '#', 'Coleira', 'lorem', '100'));

function mostrarCatalogo() {
    htmlCatalogo.innerHTML = '';
    catalogo.forEach(item => {
        htmlCatalogo.innerHTML += `
        <div class="card p-2" style="width: 18rem; height: 550px;">
            <img src="${item.img}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column justify-content-between align-items-center">
                <div class="w-100 d-flex flex-column align-items-center">
                    <h5 class="c-laranja">${item.tit}</h5>
                    <p class="text-center">${item.desc}</p>
                </div>
                <div class="w-100 d-flex flex-column justify-content-between align-items-center">
                    <p class="card-price">R$ ${item.valor}</p>
                    <i id="btnCardCarrinho" class="cHand fa-solid fa-cart-arrow-down" data-bs-toggle="offcanvas" data-bs-target="#carrinho" ></i>  
                </div>
            </div>
        </div>
        `;
    });
}

mostrarCatalogo();


