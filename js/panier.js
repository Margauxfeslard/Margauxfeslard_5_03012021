/*********** Get DOM element ***********/
const basket = document.getElementById('basket');
const sum = document.getElementById('sum');
const firstName = document.getElementsByName('firstName')[0].value;
const lastName = document.getElementsByName('lastName')[0].value;
const address = document.getElementsByName('address')[0].value;
const city = document.getElementsByName('city')[0].value;
const email = document.getElementsByName('email')[0].value;
const orderValidation = document.getElementById('orderConfirm');

/*********** Retrieved data from localStorage ***********/
function retrieveProducts(name) {
     return JSON.parse(localStorage.getItem(name));
}

/*********** Create list of choose product ***********/
function createList(parent, name, description, price, imageUrl) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    const span2 = document.createElement('span');
    const span1 = document.createElement('span');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');
    li.innerHTML = name;
    image.classList.add('imageBasket');
    image.src = imageUrl;
    span1.innerText = description;
    span2.classList.add('badge');
    span2.classList.add('bg-primary');
    span2.classList.add('rounded-pill');
    span2.innerHTML = price + "<sup>€</sup>";
    li.appendChild(image);
    li.appendChild(span1);
    li.appendChild(span2);
    parent.appendChild(li);
}

/*********** Calculate total sum ***********/
let pricingTotal = 0;

/*********** Get data from the API with a promise ***********/
get("https://teddies-api.herokuapp.com/api/teddies")
    .then(function (response) {
        for(const teddy of response) {
            const product = JSON.parse(localStorage.getItem(teddy.name));
            if(product){
                createList(basket, product.name, product.description, product.price, product.imageUrl)
                pricingTotal += product.price;
                sum.innerHTML = "Prix total : "+ pricingTotal + "<sup>€</sup>";
            }
        }
    })
    .catch(function (error) {
        console.log('promise failed !');
    })

/*********** Get form data ***********/
orderValidation.addEventListener('click', function (ev){
    ev.preventDefault();
    const order = new OrderContact(firstName, lastName, address, city, email);

    post("https://teddies-api.herokuapp.com/api/teddies/order", order);
});


