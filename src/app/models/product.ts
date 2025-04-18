export class Product {
    readonly id: String;
    name: String;
    price: number;
    quantity: number;

    constructor(id: string, name: string, price: number, quantity: number) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
    }
}