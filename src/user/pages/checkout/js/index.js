
$(window).ready(function() {
    // Your code here
    refreshCartItems();
});

function refreshCartItems() {
    prodCards.innerHTML = '';
    catalog.items.forEach(item => {
        prodCards.innerHTML += `
<div class="cartItem w-100 d-flex justify-content-start p-2 bg-azul rounded gap-2">
    <img class="rounded" src="${catalogImagePath}${item.img}" width="55" height="55">
    <div class="cardInfo w-100 d-flex flex-column">
        <p class="m-0 align-self-end">${item.titulo}</p>
        <div class="w-100 d-flex justify-content-between align-items-center">
            <h5 class="m-0">${item.preco}</h5>
            <div class="cArrow m-1">${100}</div>
        </div>
    </div>
</div>`;
    });
    cartValue.innerText = shoppingCart.total();
}