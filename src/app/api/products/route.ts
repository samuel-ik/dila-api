// import { addProduct, getProducts, Product, removeProduct } from "app/services/productsService";
import { Product } from "app/models/product";
import { NextResponse } from "next/server";

let productsBd: Array<Product> = []

export async function GET() {
    const products = productsBd
    return NextResponse.json(products)
}

export async function POST(req) {
    try {
        const body = await req.json();
  
        const { id , name, price, quantity } = body

        if (!id || !name || !price || !quantity) {
            return NextResponse.json(
                { success: false, message: "Some fields are empties" },
                { status: 400 }
            );
        }

        const newProduct = new Product(id, name, price, quantity)

        //await addProduct(newProduct)

        productsBd.push(newProduct)

        return NextResponse.json(
            {success: true, message: "Product added with success"},
            {status: 201}
        )
    } catch (e) {
        return NextResponse.json(
            {success: false, message: "Product added with error"},
            {status: 500}
        )
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json()

        const productToDelete: Product | undefined = await findOneProduct(body)

        if (productToDelete == undefined) return NextResponse.json(
            {success: false, message: "Error on delete products"}, 
            {status: 400},
        )

        //await removeProduct(productToDelete)

        const newList = productsBd.filter(product => product.id != productToDelete.id)

        productsBd = newList

        return NextResponse.json(
            {success: true, message: "Success on delete product"}, 
            {status: 200},
        )
    } catch (e) {
        return NextResponse.json(
            {success: false, message: "Error on delete products"}, 
            {status: 500},
        )
    }
}

export async function UPDATE(req) {
    try {
        const body = await req.json()

        const productToUpdate = await findOneProduct(body)

        if (productToUpdate == undefined) return NextResponse.json(
            {success: false, message: "Error on update product"},
            {status: 400},
        )

        //await updatedProduct(productToUpdate)

        return NextResponse.json(
            {success: true, message: "Success on update product"},
            {status: 200},
        )
    } catch (e) {
        return NextResponse.json(
            {success: false, message: "Error on update product"},
            {status: 500},
        )
    }
}

async function findOneProduct(body): Promise<Product | undefined>  {
    try {
        const idToFind = body.id

        const products = productsBd

        if (products == undefined) {
            throw Error()
        }

        const product = products.find(product => product.id === idToFind)

        return product
    } catch (e) {
        console.log("Error on find product")
    }
}