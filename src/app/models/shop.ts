export class Shop {
    id: string;
    productName: string;
    supplier: string;
    quantity: number;
    price: number;
    date: Date;

    constructor(id: string, productName: string, supplier: string, quantity: number, price: number, date: Date) {
        this.date = date;
        this.id = id;
        this.productName = productName;
        this.supplier = supplier;
        this.quantity = quantity;
        this.price = price;
    }
}