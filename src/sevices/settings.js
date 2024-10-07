// global HTML elements
const body              = $('body');
const imgLogo           = $('imgLogo');
const headerNav         = $('headerNav');
const btnToggleTheme    = $('#btnToggleTheme');

const prodCards         = document.getElementById('prodCards');
const cartItems         = document.getElementById('cartItems');
const cartValue         = document.getElementById('cartValue');

const modalBody         = document.getElementById('modalBody');
const modalTitle        = document.getElementById('modalTitle');

const ofcanvas          = document.getElementById('offCarrinho');
const offUserTitle      = document.getElementById('offUserTitle');

// global vars

var currentUser;
var currentMode = 'light';
var cadastro    = new Users();

const src_users         = 'cadastro.json';
const catalogImagePath  = '/src/user/img/products/';

// https://drive.google.com/file/d/1RyhbFNkWbxr2MWOPWY72loG2cWt77VW7/view?usp=sharing

// event handlers 

// btnToggleTheme.addEventListener('click', toggleTheme);
btnToggleTheme.on('click', toggleTheme);

// global functions 

function toggleTheme(){
    if(body.getAttribute('data-bs-theme') == 'dark'){
        body.setAttribute('data-bs-theme','light');
        btnToggleTheme.innerHTML='<i class="fa fa-moon"></i>  Modo escuro';
        imgLogo.src = 'src/img/logo/logoDark.svg';
        headerNav.classList.toggle('navbar-light','navbar-dark');
        headerNav.style.color = 'black';
        currentMode = 'dark';
    }else{
        body.setAttribute('data-bs-theme','dark');
        btnToggleTheme.innerHTML='<i class="fa fa-sun"></i>  Modo claro';
        imgLogo.src = 'src/img/logo/logoWhite.svg';
        headerNav.classList.toggle('navbar-dark','navbar-light');
        headerNav.style.color = 'black';
        currentMode = 'light';
    }
}


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



function setup() {
    offUserTitle.innerHtml = currentUser ? currentUser.name : 'User name';
    

    // fetch(src_users).then((res)  => res.text())
    //                 .then((txt) => {
    //                     var items = JSON.parse(txt);
    //                     cadastro.items = items;
    //                 })
    //                 .catch((e) => { 
    //                     console.error(e);
    //                     cadastro.items = [];
    //                 });



    if (currentMode === 'darl') {
        toggleTheme();
    }
    
}

setup();
