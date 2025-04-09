import { NextResponse } from 'next/server'
import { Shop } from 'app/models/shop'

let shopBd: Array<Shop> = []

export async function GET(req: Request) {
    const shop = shopBd
    return NextResponse.json(shop)
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { id, name, price, quantity, date } = body

        if (!id || !name || !price || !quantity || !date) {
            return NextResponse.json(
                { success: false, message: "Some fields are empties" },
                { status: 400 }
            );
        }

        const newShop = new Shop(id, name, "defaultSupplier", quantity, price, date)

        //await addProduct(newProduct)

        shopBd.push(newShop)

        return NextResponse.json(
            { success: true, message: "Shop added with success" },
            { status: 201 }
        )
    } catch (e) {
        return NextResponse.json(
            { success: false, message: "Shop added with error" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()

        const shopToDelete: Shop | undefined = await findOneShop(body)

        if (shopToDelete == undefined) return NextResponse.json(
            { success: false, message: "Error on delete shops" },
            { status: 400 },
        )

        //await removeProduct(productToDelete)

        const newList = shopBd.filter(shop => shop.id != shopToDelete.id)

        shopBd = newList

        return NextResponse.json(
            { success: true, message: "Success on delete shop" },
            { status: 200 }
        )
    } catch (e) {
        return NextResponse.json(
            { success: false, message: "Error on delete shops" },
            { status: 500 }
        )
    }
}

export async function findOneShop(body: any) {
    const { id } = body

    const shopToFind: Shop | undefined = shopBd.find(shop => shop.id == id)

    return shopToFind
}