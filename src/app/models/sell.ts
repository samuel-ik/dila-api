export class Sell {
    id: string;
    name: string;
    price: number;
    quantity: number;
    date: Date;

    constructor(id: string, name: string, price: number, quantity: number, date: Date) {
        this.date = date;
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}