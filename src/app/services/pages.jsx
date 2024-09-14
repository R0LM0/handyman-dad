'use client'

import Image from "next/image"
import { useState, useEffect } from 'react'
import { Hammer, Wrench, Paintbrush, Building2 } from "lucide-react"
import Link from "next/link"
import perfil from "../../assets/perfil.jpg"

export default function ServicesLandingPage() {
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
                    <h1 className="text-2xl font-bold font-mono">Osorio Servicios</h1>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
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
                            <li><Link href="/login" className="hover:underline">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow pt-16 bg-background text-foreground">
                <section id="about" className="py-20">
                    <div className="container mx-auto text-center px-4">
                        <Image
                            src={perfil}
                            alt="Juan Osorio Servicios"
                            width={200}
                            height={200}
                            className="rounded-full mx-auto mb-8"
                        />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Bienvenido a mi mundo de reparaciones</h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Soy Juan Osorio, tu experto de confianza en mejoras del hogar. Con más de 33 años de experiencia, me especializo en hacer realidad tus proyectos de reparación y renovación para mantener tu casa en perfectas condiciones.
                        </p>
                    </div>
                </section>

                <section id="services" className="py-20 bg-secondary/10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 font-mono">Mis Servicios</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <ServiceCard
                                icon={<Hammer className="w-8 h-8 md:w-12 md:h-12" />}
                                title="Carpintería"
                                description="Reparaciones y proyectos personalizados en madera"
                            />
                            <ServiceCard
                                icon={<Wrench className="w-8 h-8 md:w-12 md:h-12" />}
                                title="Fontanería"
                                description="Soluciones para todos tus problemas de plomería"
                            />
                            <ServiceCard
                                icon={<Paintbrush className="w-8 h-8 md:w-12 md:h-12" />}
                                title="Pintura"
                                description="Dale vida a tus espacios con un toque de color"
                            />
                            <ServiceCard
                                icon={<Building2 className="w-8 h-8 md:w-12 md:h-12" />}
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
                            <PortfolioItem src="/placeholder.svg" alt="Proyecto de carpintería" />
                            <PortfolioItem src="/placeholder.svg" alt="Remodelación de baño" />
                            <PortfolioItem src="/placeholder.svg" alt="Pintura de interiores" />
                            <PortfolioItem src="/placeholder.svg" alt="Reparación de fontanería" />
                            <PortfolioItem src="/placeholder.svg" alt="Instalación de pisos" />
                            <PortfolioItem src="/placeholder.svg" alt="Renovación de cocina" />
                        </div>
                    </div>
                </section>


                <section id="contact" className="py-20 bg-secondary/10">
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

        </div>
    )
}

function ServiceCard({ icon, title, description }) {
    return (
        <div className="bg-background border border-secondary hover:shadow-md transition-shadow duration-300 p-6 rounded-lg">
            <div className="mb-4 text-primary flex justify-center">{icon}</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 font-mono">{title}</h3>
            <p className="text-sm md:text-base text-foreground/80 break-words">{description}</p>
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