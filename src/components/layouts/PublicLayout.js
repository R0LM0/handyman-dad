export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-200">
            <main className="w-full max-w-md">{children}</main>
        </div>
    );
}