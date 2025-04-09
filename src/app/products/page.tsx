"use client"
import  styles from "app/products/styles.module.css"
import globalStyles from "app/styles/styles.module.css"
import { Product } from "app/models/product";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {
    // const session = await getServerSession()
    // if (!session) {
    //   redirect("/login");
    // }

    const productsURI = '/api/products'

    const handleFetchProduct = async () => {
        try {
            const response = await fetch(productsURI)
            const data = await response.json()
            setProducts(data)
            setLoading(false)
        } catch (e) {
            alert(`erro ao adicionar: ${e}`)
        }
    }

    const handleAddProduct = async () => {
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

    const  handleRemoveProduct = async () => {
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

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        handleFetchProduct()
    }, [])

    if (loading) {
        return <p>Carregando perfil...</p>;
    }

    return (
        <section className={`${styles.productsSection} ${globalStyles.container}`}>
            <div className={styles.productsHeader}>
                <h1>Produtos</h1>
                <button onClick={handleAddProduct}>Add product</button>
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
                        </tr>
                    </thead>
                    <tbody>
                            {products.map((product: Product, i) => (
                                <tr key={i}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td><button onClick={handleRemoveProduct}>Remover Venda</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            }
        </section>
    )
}