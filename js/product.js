const url = new URL(window.location.href);
const urlID = url.searchParams.get("id");

const img = document.getElementsByClassName('card-img-top')[0];
const h5 = document.getElementsByClassName('card-title')[0];
const p = document.getElementsByClassName('card-text')[0];
const pricing = document.getElementsByClassName('card-text')[1];

get("http://localhost:3000/api/teddies")
    .then(function (data) {
        for(const teddy of data) {
            if(teddy._id === urlID) {
                img.src = teddy.imageUrl;
                h5.innerText = teddy.name;
                p.innerText = teddy.description;
                pricing.innerHTML = teddy.price + "<sup>€</sup>";
            }
        }
    })
    .catch(function (error) {
        console.log('promise failed !');
    })
