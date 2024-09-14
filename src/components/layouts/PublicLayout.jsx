export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
            {/* Contenido principal */}
            <main className="w-full flex-grow max-w-7xl mx-auto px-4">
                {children}
            </main>

            {/* Footer, separado del contenedor principal */}
            <footer className="bg-primary text-background py-4 w-full">
                <div className="w-full text-center">
                    <p>&copy; {new Date().getFullYear()} Servicios Osorio. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
