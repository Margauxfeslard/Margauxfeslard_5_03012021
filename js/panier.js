/*********** Get DOM element ***********/
const basket = document.getElementById('basket');
const sum = document.getElementById('sum');
const firstName = document.getElementsByName('firstName')[0];
const lastName = document.getElementsByName('lastName')[0];
const address = document.getElementsByName('address')[0];
const city = document.getElementsByName('city')[0];
const email = document.getElementsByName('email')[0];
const orderValidation = document.getElementById('orderForm');

/*********** Calculate total sum ***********/
let pricingTotal = 0;

/*********** Initialize products ***********/
let products = []

/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/teddies")
    .then(function (response) {
        for(const teddy of response) {
            const product = retrieveProducts(teddy.name);
            if(product){
                products.push(product._id);
                createList(basket, product.name, product.description, product.price, product.imageUrl, product.quantity)
                pricingTotal += product.price * product.quantity;
                sum.innerHTML = "Prix total : "+ pricingTotal + "<sup>€</sup>";
                localStorage.setItem('totalPrice', JSON.stringify(pricingTotal));
            }
        }
    })
    .catch(error => alert("Erreur : " + error));

/*********** Get form data ***********/
orderValidation.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value);
    const order = new Order(products, contact);
    sendFormData(order, 'order.html');
})


