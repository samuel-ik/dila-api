import  NavBar from "app/components/nav-bar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
            <body style={{ margin: 0, padding: 0, backgroundColor: "#f0f0f0" }}>
                <NavBar></NavBar>
                {children}
            </body>
        </html>
    )
};