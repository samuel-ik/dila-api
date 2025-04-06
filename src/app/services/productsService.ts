// import { prisma } from "app/lib/db";

// export class Product {
//     readonly id: String;
//     name: String;
//     price: number;
//     quantity: number;

//     constructor(id: string, name: string, price: number, quantity: number) {
//         this.id = id
//         this.name = name
//         this.price = price
//         this.quantity = quantity
//     }
// }

// export async function getProducts(): Promise<Array<Product> | undefined> {
//     return await prisma.product.findMany()
// }

// export async function addProduct(newProduct: Product) {
//     console.log(`Product: ${JSON.stringify(newProduct)}`)
//     await prisma.product.create({
//         data: newProduct
//     })
// }

// export async function removeProduct(productToRemove: Product) {
//     await prisma.product.delete(productToRemove)
// }

// // export async function updatedProduct(productToUpdate: Product) {
// //     products.map(product => {
// //         if (product.id == productToUpdate.id) {
// //             product.name = productToUpdate.name
// //             product.price = productToUpdate.price
// //             product.quantity = productToUpdate.quantity
// //         }
// //     })
// // }