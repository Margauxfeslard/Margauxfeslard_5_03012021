/*********** Get DOM Elements ***********/
const img = document.getElementsByClassName('card-img-top')[0];
const h5 = document.getElementsByClassName('card-title')[0];
const p = document.getElementsByClassName('card-text')[0];
const pricing = document.getElementsByClassName('card-text')[1];
const select = document.getElementById('colors');
const title = document.getElementsByTagName('title')[0];

/*********** Get ID from URL ***********/
function getId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}

/*********** Add product to basket ***********/
function addToBasket(id, name,description, price, imageUrl){
    const button = document.getElementById('addToBasket');
    button.addEventListener('click', function(ev) {
        ev.preventDefault();
        button.style.backgroundColor = '#0d6efd';
        button.style.color = 'white';
        const product = new Product(id, name, description, price, imageUrl);
        localStorage.setItem(name, JSON.stringify(product));
        //alert('Le produit a été ajouté au panier ! ')
    })
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
        select.appendChild(colorOption);
    }
}

/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/teddies")
    .then(function (response) {
        for(const teddy of response) {
            if(teddy._id === getId()) {
                productData(teddy.imageUrl, teddy.name, teddy.description, teddy.price/100);
                addToBasket(teddy._id, teddy.name, teddy.description, teddy.price/100, teddy.imageUrl);
                productOption(teddy.colors);
            }
        }
    })
    .catch(error => alert("Erreur : " + error));
