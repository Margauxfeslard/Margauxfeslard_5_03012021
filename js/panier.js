/*********** Retrieved data from localStorage ***********/
function retrieveProducts(name) {
    let retrievedProduct = localStorage.getItem(name);
    return JSON.parse(retrievedProduct);
}

/*********** Create list of choose product ***********/
function createList(parent, name, price) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');
    li.innerText = name;
    span.classList.add('badge');
    span.classList.add('bg-primary');
    span.classList.add('rounded-pill');
    span.innerHTML = price + "<sup>€</sup>";
    li.appendChild(span);
    parent.appendChild(li);
}

/*********** Get DOM element ***********/
const basket = document.getElementById('basket');

/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/teddies")
    .then(function (response) {

        for(const teddy of response) {
            let retrievedProduct = localStorage.getItem(teddy.name);
            const product = JSON.parse(retrievedProduct);
            if(product){
                createList(basket, product.name, product.price)
            }
        }
    })
    .catch(function (error) {
        console.log('promise failed !');
    })
