function createCard(src, name, description) {
    const firstDiv = document.createElement('div');
    const secondDiv = document.createElement('div');
    const img = document.createElement('img');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');
    const a = document.createElement('a');
    firstDiv.classList.add('card');
    secondDiv.classList.add('card-body');
    img.classList.add('card-img-top');
    h5.classList.add('card-title');
    p.classList.add('card-text');
    a.classList.add('btn');
    a.classList.add('btn-primary');
    firstDiv.style.width = '18rem';
    img.src = src;
    h5.innerText = name;
    p.innerText = description;
    a.innerText = "Ajouter au panier";
    firstDiv.appendChild(img);
    firstDiv.appendChild(secondDiv);
    secondDiv.appendChild(h5);
    secondDiv.appendChild(p);
    secondDiv.appendChild(a);

    return firstDiv;
}

get("http://localhost:3000/api/teddies")
    .then(function (data) {
        for(const teddy of data) {
            const row = document.getElementsByClassName('row')[0];
            row.appendChild(createCard(teddy.imageUrl, teddy.name, teddy.description));
        }
    })
    .catch(function (error) {
        console.log('promise failed !');
    })
