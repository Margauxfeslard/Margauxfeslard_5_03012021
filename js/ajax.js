/*********** API calls with GET method ***********/
function get(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
}

/*********** Send DATA to the API with POST Method ***********/
function sendFormData(data, location) {
    fetch("https://oc-devweb-p5-api.herokuapp.com/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('orderWithContact', JSON.stringify(response));
            document.location.replace(location);
        })
        .catch(error => alert("Erreur : " + error));
}

/*********** Retrieved data from localStorage ***********/
function retrieveProducts(data) {
    return JSON.parse(localStorage.getItem(data));
}

/*********** Create list of choosed product ***********/
function createList(parent, name, description, price, imageUrl, quantity) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
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
    span2.innerHTML = 'Prix : ' + price + "<sup>€</sup>";
    span3.classList.add('quantity');
    span3.innerText = 'Quantités: ' + quantity;
    li.appendChild(image);
    li.appendChild(span1);
    li.appendChild(span3);
    li.appendChild(span2);
    parent.appendChild(li);
}

/*********** Create list of order ***********/
function createListOrder(parent, name, description, imageUrl) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    const span1 = document.createElement('span');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');
    li.innerHTML = name;
    image.classList.add('imageBasket');
    image.src = imageUrl;
    span1.innerText = description;
    li.appendChild(image);
    li.appendChild(span1);
    parent.appendChild(li);
}
