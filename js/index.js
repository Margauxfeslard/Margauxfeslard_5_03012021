/*********** Creation of a card ***********/
function createCards(src, name, description, price, id) {
    const firstDiv = document.createElement('div');
    const secondDiv = document.createElement('div');
    const img = document.createElement('img');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');
    const pricing = document.createElement('p');
    const a = document.createElement('a');
    firstDiv.classList.add('card');
    secondDiv.classList.add('card-body');
    img.classList.add('card-img-top');
    h5.classList.add('card-title');
    p.classList.add('card-text');
    pricing.classList.add('card-text');
    a.classList.add('btn');
    a.classList.add('btn-outline-primary');
    a.setAttribute("href", "product.html?id=" + id);
    firstDiv.style.width = '18rem';
    img.src = src;
    h5.innerText = name;
    p.innerText = description;
    pricing.innerHTML = price + "<sup>€</sup>";
    a.innerText = "Voir le produit";
    firstDiv.appendChild(img);
    firstDiv.appendChild(secondDiv);
    secondDiv.appendChild(h5);
    secondDiv.appendChild(p);
    secondDiv.appendChild(pricing);
    secondDiv.appendChild(a);

    return firstDiv;
}

/*********** Get data from the API with a promise ***********/
get("https://oc-devweb-p5-api.herokuapp.com/api/teddies")
    .then(function (data) {
        for(const teddy of data) {
            const row = document.getElementsByClassName('row')[0];
            row.appendChild(createCards(teddy.imageUrl, teddy.name, teddy.description, teddy.price/100, teddy._id));
        }
    })
    .catch(error => alert("Erreur : " + error));
