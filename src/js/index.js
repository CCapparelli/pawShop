// HTML elements
const imgLogo           = document.getElementById('imgLogo');
const body              = document.querySelector('body');
const btnToggleTheme    = document.getElementById('btnToggleTheme');

const prodCards     = document.getElementById('prodCards');
const cartItems     = document.getElementById('cartItems');
const cartValue     = document.getElementById('cartValue');

const modalBody     = document.getElementById('modalBody');
const modalTitle    = document.getElementById('modalTitle');

const ofcanvas      = document.getElementById('carrinho');

// event handlers
btnToggleTheme.addEventListener('click', toggleTheme);
// btnToggleTheme.on('click', toggleTheme);

// OOP

class Product {
    constructor(id, img, titulo, descricao, preco) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }
    add(cartItem) {
        var item = this.items.filter(x => x.productId === cartItem.productId)[0];
        if (item) {
            item.qtd = item.qtd + 1;
        } else {
            this.items.push(cartItem);
        }
    }
    total() {
        var result = 0;
        this.items.forEach(item => {
            var product = products.filter(x => x.id === item.productId)[0];
            result = result + (item.qtd * product.preco);
        });
        return result;
    }
    
    increase(id) {
        var item = this.items.filter(x => x.productId === id)[0];
        item.qtd++;
    }
    
    decrease(id) {
        var item = this.items.filter(x => x.productId === id)[0];
        if (item.qtd > 1) {
            item.qtd--;
        }
    }
    
    remove(item) {
        var idx  = carrinho.items.indexOf(item);
        this.items.splice(idx, 1);
    }
}

class CartItem {
    constructor(productId, qtd) {
        this.productId = productId;
        this.qtd = Number(qtd);
    }
}

// data

var carrinho = new Cart();
var products = [];

products.push(new Product(1, 'src/img/products/productImage.png','COLEIRA',['A coleira é o acessório essencial para manter o seu companheiro de quatro patas seguro e com estilo.','Feita com materiais de alta qualidade, nossa coleira é resistente e confortável para o seu cão.','Com diversos designs e cores disponíveis, você pode encontrar a coleira perfeita que combina com a personalidade do seu peludo amigo.','Além de proporcionar segurança durante os passeios, a coleira é uma expressão do amor e cuidado que você tem pelo seu cão.'],100));
products.push(new Product(2, 'src/img/products/productImage2.png','COMIDA',['Ofereça ao seu cão a nutrição de que ele precisa com a nossa seleção de alimentos premium.','Nossas opções de comida são formuladas com ingredientes de alta qualidade, proporcionando uma dieta equilibrada e saborosa.','Temos uma variedade de rações secas, úmidas e até mesmo opções naturais e orgânicas para atender às necessidades alimentares do seu pet.','Cuide da saúde do seu cão com o melhor em nutrição, garantindo que ele se sinta energizado e feliz todos os dias.'],100));
products.push(new Product(3, 'src/img/products/productImage3.png','DISCO DE BRINQUEDO',['Mantenha seu cão entretido e ativo com nosso disco de brinquedo, projetado para horas de diversão ao ar livre.','Feito de materiais seguros e duráveis, o disco é perfeito para jogos de busca e interação com o seu cão.','Seu design aerodinâmico permite lançamentos precisos, proporcionando ao seu peludo momentos de alegria e exercício.','Leve-o para o parque ou o quintal e desfrute de momentos emocionantes e saudáveis com seu cão, fortalecendo ainda mais a conexão entre vocês.'],100));
products.push(new Product(4, 'src/img/products/productImage4.png','CASINHA',['Nossa casinha para cães é um verdadeiro lar dentro de casa.','Feita com materiais duráveis e resistentes às intempéries, ela oferece um refúgio seguro e aconchegante para o seu pet. Com um design espaçoso e confortável, a casinha é o local perfeito para seu cão descansar, se abrigar do sol ou da chuva, e relaxar com todo o conforto que merece.','Garanta que seu melhor amigo tenha um lugar aconchegante para chamar de seu com a nossa casinha de qualidade.'],100));

products.forEach(x => {
    prodCards.innerHTML += `
        <div class="card p-2" style="width: 18rem; height: 550px;">
            <img src="${x.img}" class="card-img-top" alt="...">
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
                        <i id="btnCardCarrinho" class="cHand fa-solid fa-cart-arrow-down" onclick="adicionar(${x.id});" data-bs-toggle="offcanvas" data-bs-target="#carrinho" ></i>  
                    </div>
                </div>
            </div>
        </div>
    `;
});

// behavior

function modalExibir(id) {
    var product = products.filter(x => x.id === id)[0];
    modalTitle.innerText = product.titulo;

    var html  = `
        <div class="modal-test d-flex gap-3">
            <img src="${product.img}" class="w-50 align-self-start" alt="...">
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
        btnToggleTheme.innerHTML='<i class="fa fa-sun">';
        imgLogo.src = 'src/img/logo/logoDark.svg';
    }else{
        body.setAttribute('data-bs-theme','dark');
        btnToggleTheme.innerHTML='<i class="fa fa-moon">';
        imgLogo.src = 'src/img/logo/logoWhite.svg';
    }
}

function adicionar(id) {
    carrinho.add(new CartItem(id, 1));
    refreshCartItems();
    
    var prod = products.filter(x => x.id === id)[0];
    alert(`${prod.titulo} adicionado ao carrinho.`);
}

function refreshCartItems() {
    cartItems.innerHTML = '';
    carrinho.items.forEach(item => {
        var product = products.filter(x => x.id === item.productId)[0];
        cartItems.innerHTML += `
<div class="cartItem w-100 d-flex justify-content-start p-2 bg-azul rounded gap-2">
    <img class="rounded" src="${product.img}" width="55" height="55">
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
    cartValue.innerText = carrinho.total();
}

function increase(id) {
    carrinho.increase(id);
    refreshCartItems();
}

function decrease(id) {
    carrinho.decrease(id);
    refreshCartItems();
}

function remove(id) {
    var item = carrinho.items.filter(x => x.productId === id)[0];
    var prod = products.filter(x => x.id === id)[0];
    
    var ok = confirm(`Remover ${prod.titulo} - qtd : ${item.qtd} ?`);
    if (ok) {
        carrinho.remove(item);
        refreshCartItems();
    }
}




