var sumOrderTotal = $('#sumOrderTotal');


$(window).ready(function() {
    // Your code here
    refreshCartItems();
});

function refreshCartItems() {
    prodCards.innerHTML = '';
    catalog.items.forEach(item => {
        prodCards.innerHTML += `
<div class="prodCard w-100 d-flex align-items-center justify-content-between">
    <div class="w-50 px-2 d-flex align-items-center gap-2">
        <img class="pic" src="${catalogImagePath}${item.img}" alt="">
        <div class="d-flex flex-column">
            <span class="fw-bold">${item.titulo}</span> 
            <div class="d-flex">
                <span class="pe-3">R$ ${item.preco},00</span>
                <span class="text-muted text-decoration-line-through">R$ 150,00</span>
            </div>
        </div>
    </div>
    <div class="w-50 d-flex justify-content-start">
        <span class="pe-3 text-muted">Quantidade: </span>
        <span class="pe-3">2</span>
    </div>
</div>
`;
    });
    sumOrderTotal.text('R$ 800,00');
}