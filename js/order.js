/*********** Get DOM element ***********/
const order = retrieveProducts('orderWithContact');
const orderNumber = document.getElementById('orderId');
const contact = document.getElementById('contact');
const recap = document.getElementById('recap');
const parent = document.getElementById('parent');
const back = document.getElementById('backProduct');

/*********** Order confirmation ***********/
contact.innerText = 'Hello ' + order.contact.firstName + ' !';
orderNumber.innerText = 'Merci pour ta commande #' + order.orderId;
recap.innerHTML = "Livraison à l\'adresse suivante : " + order.contact.address + order.contact.city +'.<br>' +
    "Une confirmation de commande te sera envoyée à l\'adresse suivante :" + order.contact.email;

const products = order.products;
for (const product of products) {
    createList(parent, product.name, product.description, product.price/100, product.imageUrl);
}

/*********** Back to product and localStorage ***********/
back.addEventListener('click', function(ev) {
    ev.preventDefault();
    localStorage.clear();
    document.location.replace('index.html');
})


