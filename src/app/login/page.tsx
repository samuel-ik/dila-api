"use client"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const loginSchema = z.object({
    email: z.string().email("E-mail invlálido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: any) => {
        setLoading(true)
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        })

        if (result?.ok) {
            router.push('/products')
        } else {
            alert("Error on login")
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                
                <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded mb-2" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                
                <input {...register("password")} type="password" placeholder="Senha" className="w-full p-2 border rounded mb-2" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                
                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
                {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    )
}