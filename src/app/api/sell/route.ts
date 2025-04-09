import { NextResponse } from 'next/server'
import { Sell } from 'app/models/sell'

let sellsBd: Array<Sell> = []

export async function GET(req) {
    const sells = sellsBd
    return NextResponse.json(sells)
}

export async function POST(req) {
    try {
        const body = await req.json();

        const { id, name, price, quantity, date } = body

        if (!id || !name || !price || !quantity || !date) {
            return NextResponse.json(
                { success: false, message: "Some fields are empties" },
                { status: 400 }
            );
        }

        const newSell = new Sell(id, name, price, quantity, date)

        //await addProduct(newProduct)

        sellsBd.push(newSell)

        return NextResponse.json(
            { success: true, message: "Sell added with success" },
            { status: 201 }
        )
    } catch (e) {
        return NextResponse.json(
            { success: false, message: "Sell added with error" },
            { status: 500 }
        )
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json()

        const sellToDelete: Sell | undefined = await findOneSell(body)

        if (sellToDelete == undefined) return NextResponse.json(
            { success: false, message: "Error on delete sells" },
            { status: 400 },
        )

        //await removeProduct(productToDelete)

        const newList = sellsBd.filter(sell => sell.id != sellToDelete.id)

        sellsBd = newList

        return NextResponse.json(
            { success: true, message: "Success on delete sell" },
            { status: 200 }
        )
    } catch (e) {
        return NextResponse.json(
            { success: false, message: "Error on delete sells" },
            { status: 500 }
        )
    }
}

export async function findOneSell(body: any) {
    const { id } = body

    if (!id) return undefined

    const sellToDelete: Sell | undefined = sellsBd.find(sell => sell.id == id)

    return sellToDelete
}
