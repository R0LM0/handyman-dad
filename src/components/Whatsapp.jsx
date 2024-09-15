import React, { useState } from 'react'

export default function Whatsapp() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminPhoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+17862875239'; // Usa la variable de entorno o un valor por defecto
        const whatsappURL = `https://wa.me/${adminPhoneNumber}?text=Nombre:%20${encodeURIComponent(name)}%0ATeléfono:%20${encodeURIComponent(phone)}%0AMensaje:%20${encodeURIComponent(message)}`;

        // Redirigir a la URL de WhatsApp
        window.open(whatsappURL, '_blank');
    };

    return (
        <section id="contact" className="py-20 bg-secondary/10">
            <div className="container mx-auto max-w-md px-4">
                <h2 className="text-3xl font-bold text-center mb-8 font-mono">Contáctame</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium">Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 bg-background border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-background bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>
    )
}
