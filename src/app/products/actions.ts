import { Product } from "app/models/product"


const productsURI = '/api/products'

export async function handleFetchProduct() : Promise<Product[]> {
    const response = await fetch(productsURI)
    const data = await response.json()
    return data
}

export async function handleAddProduct() {
    const response = await fetch(productsURI, {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ id: '2', name: 'Produto 2', price: 20, quantity: 2 })
    })

    if (response.ok) {
        handleFetchProduct()
    } else {
        alert("Erro ao criar produto")
    }
}

export async function handleRemoveProduct() {
    const response = await fetch(productsURI, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify( {id: '2' })
    })

    if (response.ok) {
        handleFetchProduct()
    } else {
        alert("Erro ao remover produto")
    }
}