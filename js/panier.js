/*********** Get DOM element ***********/
const basket = document.getElementById('basket');
const sum = document.getElementById('sum');
const firstName = document.getElementsByName('firstName')[0];
const lastName = document.getElementsByName('lastName')[0];
const address = document.getElementsByName('address')[0];
const city = document.getElementsByName('city')[0];
const email = document.getElementsByName('email')[0];
const orderValidation = document.getElementById('orderConfirm');

/*********** Calculate total sum ***********/
let pricingTotal = 0;

/*********** Initialize products ***********/
let products = []

/*********** Data validation ***********/
/*function isValid(value) {
    if(/(.*)/.test(value.value)) {
        return true;
    } else {
        return value.setCustomValidity('Ce champ n\'est pas valide');
    }
}*/

/*function isValidAddress(value) {
    if(/(.*)/.test(value.value)) {
        return true;
    } else {
        return value.setCustomValidity('Votre adresse n\'est pas correct');
    }
}*/
/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/teddies")
    .then(function (response) {
        for(const teddy of response) {
            const product = JSON.parse(localStorage.getItem(teddy.name));
            if(product){
                products.push(product._id);
                createList(basket, product.name, product.description, product.price, product.imageUrl)
                pricingTotal += product.price;
                sum.innerHTML = "Prix total : "+ pricingTotal + "<sup>€</sup>";
            }
        }
    })
    .catch(error => alert("Erreur : " + error));

/*********** Get form data ***********/
/*if(isValid(firstName) && isValid(lastName) && isValid(city) && isValidAddress(address)) {*/
    orderValidation.addEventListener('click', function (ev) {
        ev.preventDefault();
        const contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value);
        const order = new Order(products, contact);
        sendFormData(order, 'order.html');
    })

