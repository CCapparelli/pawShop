const prodCards = document.getElementById("prodCards");
const body = document.querySelector("body");
const btnToggleTheme = document.getElementById("btnToggleTheme");
const imgLogo = document.getElementById('imgLogo');
const cartItems = document.getElementById('cartItems');
const cartValue = document.getElementById('cartValue');


btnToggleTheme.addEventListener('click', toggleTheme);

function updateCart() {
alert('carro visível')
}

class Product {
    constructor(id, img, titulo, descricao, complemento, preco) {
        this.id = id;
        this.img = img;
        this.titulo = titulo;
        this.descricao = descricao;
        this.complemento = complemento;
        this.preco = preco;
    }
}

class CartItem {
    constructor(productId, qtd) {
        this.productId = productId;
        this.qtd = qtd;
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
}

var products = [];
products.push(new Product(1, 'src/img/products/productImage.png','COLEIRA','A coleira é o acessório essencial para manter o seu companheiro de quatro patas seguro e com estilo.','Feita com materiais de alta qualidade, nossa coleira é resistente e confortável para o seu cão. Com diversos designs e cores disponíveis, você pode encontrar a coleira perfeita que combina com a personalidade do seu peludo amigo. Além de proporcionar segurança durante os passeios, a coleira é uma expressão do amor e cuidado que você tem pelo seu cão.',100));
products.push(new Product(2, 'src/img/products/productImage2.png','COMIDA','Ofereça ao seu cão a nutrição de que ele precisa com a nossa seleção de alimentos premium.','Nossas opções de comida são formuladas com ingredientes de alta qualidade, proporcionando uma dieta equilibrada e saborosa. Temos uma variedade de rações secas, úmidas e até mesmo opções naturais e orgânicas para atender às necessidades alimentares do seu pet. Cuide da saúde do seu cão com o melhor em nutrição, garantindo que ele se sinta energizado e feliz todos os dias.',100));
products.push(new Product(3, 'src/img/products/productImage3.png','DISCO DE BRINQUEDO','Mantenha seu cão entretido e ativo com nosso disco de brinquedo, projetado para horas de diversão ao ar livre.','Feito de materiais seguros e duráveis, o disco é perfeito para jogos de busca e interação com o seu cão. Seu design aerodinâmico permite lançamentos precisos, proporcionando ao seu peludo momentos de alegria e exercício. Leve-o para o parque ou o quintal e desfrute de momentos emocionantes e saudáveis com seu cão, fortalecendo ainda mais a conexão entre vocês.',100));
products.push(new Product(4, 'src/img/products/productImage4.png','CASINHA','Nossa casinha para cães é um verdadeiro lar dentro de casa.','Feita com materiais duráveis e resistentes às intempéries, ela oferece um refúgio seguro e aconchegante para o seu pet. Com um design espaçoso e confortável, a casinha é o local perfeito para seu cão descansar, se abrigar do sol ou da chuva, e relaxar com todo o conforto que merece. Garanta que seu melhor amigo tenha um lugar aconchegante para chamar de seu com a nossa casinha de qualidade.',100));

products.forEach(x => {
    prodCards.innerHTML += `
        <div class="card p-2" style="width: 18rem;">
            <img src="${x.img}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="c-laranja">${x.titulo}</h5>
                <p class="text-center">${x.descricao}</p>
                <p class="card-price">R$ ${x.preco}</p>
                <div class="w-100 d-flex justify-content-between align-items-center">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalProduto" class="btn btn-primary btn-form" onclick="modalExibir(${x.id});">VER MAIS</a>
                    <i id="btnCardCarrinho" class="cHand fa-solid fa-cart-arrow-down" onclick="adicionar(${x.id});"></i>  
                </div>
            </div>
        </div>
    `;
});

const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');

function modalExibir(id) {
    var product = products.filter(x => x.id === id)[0];
    modalTitle.innerText = product.titulo;
    modalBody.innerHTML = `
        <div class="container-fluid d-flex justify-content-center align-items-center gap-2">
            <img src="${product.img}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <p class="text-center">${product.descricao}</p>
                <p class="text-center">${product.complemento}</p>
                <p class="card-price">R$ ${product.preco}</p>
            </div>
        </div>
    `;
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

var carrinho = new Cart();

function adicionar(id) {
    alert(id)
    // var product = products.filter(x => x.id === id)[0];
    carrinho.add(new CartItem(id, 1));

    cartItems.innerHTML = '';
    carrinho.items.forEach(item => {
        var product = products.filter(x => x.id === item.productId)[0];
        cartItems.innerHTML += `
<div class="cartItem w-100 d-flex justify-content-start p-2 bg-azul rounded gap-2">
    <img class="rounded" src="${product.img}" width="55" height="55">
    <div class="cardInfo w-100 d-flex flex-column">
        <p class="m-0">${product.titulo}</p>
        <div class="w-100 d-flex justify-content-between align-items-center">
            <h5 class="m-0">${product.preco}</h5>
            <div class="d-flex align-items-center">
                <i class="cHand m-1 fa fa-minus text-danger"></i>
                <div class="cArrow m-1">${item.qtd}</div>
                <i class="cHand m-1 fa fa-plus text-success"></i>
            </div>
            <i class="cHand fa fa-trash me-2"></i>
        </div>
    </div>
</div>`;
    });

    cartValue.innerText = carrinho.total();
    alert(`Adicionado ao carrinho.`);
}