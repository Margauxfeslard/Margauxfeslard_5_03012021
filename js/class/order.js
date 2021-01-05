class OrderContact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

class Order {
    constructor(products, orderId) {
        this.products = products;
        this.orderId = orderId;
    }
}
