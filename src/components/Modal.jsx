// Modal.js
import Image from 'next/image';
import { useEffect } from 'react';

export default function Modal({ src, alt, onClose }) {
    // Cerrar el modal al presionar la tecla "Esc"
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={onClose} // Cerrar al hacer clic fuera del contenido
        >
            <div
                className="relative"
                onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el modal
            >
                <button
                    className="absolute top-2 right-2 text-white text-2xl font-bold focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
}
