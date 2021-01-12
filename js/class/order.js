class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

class Order {
    constructor(products, contact) {
        this.products = products;
        this.contact = contact;
    }
}
