/*********** Get DOM Elements ***********/
const img = document.getElementsByClassName('card-img-top')[0];
const h5 = document.getElementsByClassName('card-title')[0];
const p = document.getElementsByClassName('card-text')[0];
const pricing = document.getElementsByClassName('card-text')[1];
const selectColors = document.getElementById('colors');
const selectQuantity = document.getElementById('quantity');
const title = document.getElementsByTagName('title')[0];
const addProduct = document.getElementById('addToBasket');
const button = document.getElementById('addToBasket');

const productsLocalStorage = [];
/*********** Add product to basket ***********/
function addToBasket(id, name, description, price, imageUrl){
    button.addEventListener('click', function(ev) {
        ev.preventDefault();
        alertMessage(this.parentNode);
        button.setAttribute('disabled', 'true');
        const quantity = selectQuantity.options.selectedIndex + 1;
        const product = {
            "_id" : id,
            "name" : name,
            "description" : description,
            "price" : price,
            "imageUrl" : imageUrl,
            "quantity" : quantity
        };
        const articleInLocalStorage = [retrieveProducts("productsOrdered")];
        productsLocalStorage.push(...articleInLocalStorage, product)
        const productToSet = removeNull(productsLocalStorage.flat(4));
        localStorage.setItem("productsOrdered", JSON.stringify(productToSet));
    })
}

/*********** Create alert message ***********/
function alertMessage(parent){
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-warning');
    alert.setAttribute('role', 'alert');
    alert.innerText = 'Le produit a été ajouté au panier ! ';
    parent.insertBefore(alert, addProduct);
}

/*********** Add product data and option ***********/
function productData(imageUrl, name, description, price) {
    img.src     = imageUrl;
    h5.innerText = name;
    p.innerText = description;
    pricing.innerHTML = price + "<sup>€</sup>";
    title.innerText = name;
}

function productOption(colors) {
    for (const color of colors) {
        const colorOption = document.createElement('option');
        colorOption.innerText = color;
        colorOption.setAttribute('value', color);
        selectColors.appendChild(colorOption);
    }
}

function quantityOfProduct(){
    for(let i = 1; i <= 10; i++){
        const quantity = document.createElement('option');
        quantity.innerText = JSON.stringify(i);
        quantity.setAttribute('value', JSON.stringify(i));
        selectQuantity.appendChild(quantity);
    }
}

function removeNull(array) {
    return array.filter(x => x !== null)
}

/*********** Get data from the API with a promise ***********/
get("https://oc-devweb-p5-api.herokuapp.com/api/teddies")
    .then(function (response) {
        for(const teddy of response) {
            if(teddy._id === getId()) {
                productOption(teddy.colors);
                quantityOfProduct();
                productData(teddy.imageUrl, teddy.name, teddy.description, teddy.price/100);
                addToBasket(teddy._id, teddy.name, teddy.description, teddy.price/100, teddy.imageUrl);
            }
        }
    })
    .catch(error => alert("Erreur : " + error));
