"use client"
import { useEffect, useState } from "react";
import { Sell } from "app/models/sell";
import styles from "app/products/styles.module.css"
import globalStyles from "app/styles/styles.module.css"
import { date } from "zod";

export default function Page() {
    // const session = await getServerSession()
    // if (!session) {
    //   redirect("/login");
    // }
    const sellsURI = '/api/sell'

    const handleFetchSells = async () => {
        try {
            const response = await fetch(sellsURI)
            const data = await response.json()
            setSells(data)
            setLoading(false)
        } catch (e) {
            alert(`erro ao adicionar: ${e}`)
        }
    }

    const handleAddSell = async () => {
        const response = await fetch(sellsURI, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id: '2', name: 'Produto 2', price: 20, quantity: 2, date: new Date() })
        })

        if (response.ok) {
            handleFetchSells()
        } else {
            alert("Erro ao criar produto")
        }
    }

    const handleRemoveSell = async () => {
        const response = await fetch(sellsURI, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id: '2' })
        })

        if (response.ok) {
            handleFetchSells()
        } else {
            alert("Erro ao remover produto")
        }
    }

    const [loading, setLoading] = useState(true)
    const [sells, setSells] = useState<Sell[]>([]);

    useEffect(() => {
        handleFetchSells()
    }, [])

    if (loading) {
        return <p>Carregando perfil...</p>;
    }

    return (    
        <section className={`${styles.productsSection} ${globalStyles.container}`}>
            <div className={styles.productsHeader}>
                <h1>Vendas</h1>
                <button onClick={handleAddSell}>Adicionar Venda</button>
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
                        {sells.map((sell) => (
                            <tr key={sell.id}>
                                <td>{sell.id}</td>
                                <td>{sell.name}</td>
                                <td>{sell.price}</td>
                                <td>{sell.quantity}</td>
                                <td>{sell.date.getUTCDate()}</td>
                                <td><button onClick={handleRemoveSell}>Remover Venda</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </section>
    )
}
