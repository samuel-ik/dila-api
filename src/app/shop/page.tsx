"use client"
import { useEffect, useState } from "react";
import { Shop } from "app/models/shop";
import styles from "app/products/styles.module.css"
import globalStyles from "app/styles/styles.module.css"

export default function Page() {
    const shopURI = '/api/shop'

    const handleFetchShop = async () => {
        try {
            const response = await fetch(shopURI)
            const data = await response.json()
            setShop(data)
            setLoading(false)
        } catch (e) {
            alert(`erro ao adicionar: ${e}`)
        }
    }

    const handleAddShop = async () => {
        const response = await fetch(shopURI, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id: '2', name: 'Produto 2', price: 20, quantity: 2, date: new Date() })
        })

        if (response.ok) {
            handleFetchShop()
        } else {
            alert("Erro ao criar produto")
        }
    }

    const handleRemoveShop = async () => {
        const response = await fetch(shopURI, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id: '2' })
        })

        if (response.ok) {
            handleFetchShop()
        } else {
            alert("Erro ao remover produto")
        }
    }

    const [loading, setLoading] = useState(true)
    const [shop, setShop] = useState<Shop[]>([]);

    useEffect(() => {
        handleFetchShop()
    }, [])

    return (
        <section className={`${styles.productsSection} ${globalStyles.container}`}>
            <div className={styles.productsHeader}>
                <h1>Compras</h1>
                <button onClick={handleAddShop}>Adicionar</button>
            </div>
            { loading 
                ? <p>Carregando perfil...</p> 
                : <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shop.map((shop) => (
                            <tr key={shop.id}>
                                <td>{shop.id}</td>
                                <td>{shop.productName}</td>
                                <td>{shop.price}</td>
                                <td>{shop.quantity}</td>
                                <td>{shop.date.getUTCDate()}</td>
                                <td><button onClick={handleRemoveShop}>Remover</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </section>
    )
}