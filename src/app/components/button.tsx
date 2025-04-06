import Link from "next/link";

export default function Button() {
    return(
        <Link href={"/products"}>
            <button>Teste de botão</button>
        </Link>
    )
}