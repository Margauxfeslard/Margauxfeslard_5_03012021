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
function sendFormData(data) {
    fetch("https://oc-devweb-p5-api.herokuapp.com/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(function (response) {
            localStorage.setItem('contact', JSON.stringify(response.contact));
            localStorage.setItem('products', JSON.stringify(response.products));
            document.location.replace('order.html?id=' + response.orderId);

        })
        .catch(error => alert("Erreur : " + error));
}

/*********** Retrieved data from localStorage ***********/
function retrieveProducts(data) {
    return JSON.parse(localStorage.getItem(data));
}

/*********** Get ID from URL ***********/
function getId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}
