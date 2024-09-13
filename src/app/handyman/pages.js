'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'

export default function HandymanLandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDarkMode(darkModeMediaQuery.matches)

        const handleChange = (e) => setIsDarkMode(e.matches)
        darkModeMediaQuery.addEventListener('change', handleChange)

        return () => darkModeMediaQuery.removeEventListener('change', handleChange)
    }, [])

    return (
        <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <header className="bg-primary text-background py-4 fixed top-0 left-0 right-0 z-10">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold font-mono">Juan el Handyman</h1>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 bg-primary md:bg-transparent`}>
                        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
                            <li><a href="#about" className="hover:underline">Sobre mí</a></li>
                            <li><a href="#services" className="hover:underline">Servicios</a></li>
                            <li><a href="#portfolio" className="hover:underline">Trabajos</a></li>
                            <li><Link href="/login" className="hover:underline">login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow pt-16 bg-background text-foreground">
                <section id="about" className="py-20">
                    <div className="container mx-auto text-center px-4">
                        <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Juan el Handyman"
                            width={200}
                            height={200}
                            className="rounded-full mx-auto mb-8"
                        />
                        <h2 className="text-4xl font-bold mb-4 font-mono">Bienvenido a mi mundo de reparaciones</h2>
                        <p className="text-xl max-w-2xl mx-auto">
                            Soy Juan, tu handyman de confianza. Con más de 15 años de experiencia, estoy aquí para hacer realidad tus proyectos de mejora del hogar y reparaciones.
                        </p>
                    </div>
                </section>

                <section id="services" className="py-20 bg-secondary bg-opacity-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 font-mono">Mis Servicios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <ServiceCard
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
                                title="Carpintería"
                                description="Reparaciones y proyectos personalizados en madera"
                            />
                            <ServiceCard
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                title="Fontanería"
                                description="Soluciones para todos tus problemas de plomería"
                            />
                            <ServiceCard
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
                                title="Pintura"
                                description="Dale vida a tus espacios con un toque de color"
                            />
                            <ServiceCard
                                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                title="Remodelaciones"
                                description="Transforma tu hogar con renovaciones integrales"
                            />
                        </div>
                    </div>
                </section>

                <section id="portfolio" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 font-mono">Mis Trabajos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Proyecto de carpintería" />
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Remodelación de baño" />
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Pintura de interiores" />
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Reparación de fontanería" />
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Instalación de pisos" />
                            <PortfolioItem src="/placeholder.svg?height=300&width=400" alt="Renovación de cocina" />
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-20 bg-secondary bg-opacity-10">
                    <div className="container mx-auto max-w-md px-4">
                        <h2 className="text-3xl font-bold text-center mb-8 font-mono">Contáctame</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
                                <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium">Teléfono</label>
                                <input type="tel" id="phone" name="phone" className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
                                <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-primary text-background py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Juan el Handyman. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    )
}

function ServiceCard({ icon, title, description }) {
    return (
        <div className="bg-background p-6 rounded-lg shadow-md text-center border border-secondary">
            <div className="mb-4 text-primary">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 font-mono">{title}</h3>
            <p className="text-foreground">{description}</p>
        </div>
    )
}

function PortfolioItem({ src, alt }) {
    return (
        <div className="overflow-hidden rounded-lg shadow-md border border-secondary">
            <Image src={src} alt={alt} width={400} height={300} className="w-full h-auto object-cover" />
        </div>
    )
}