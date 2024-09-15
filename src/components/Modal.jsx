// Modal.js
import Image from 'next/image';
import { useEffect } from 'react';

export default function Modal({ src, alt, onClose }) {
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="relative max-w-3xl w-full mx-4 bg-transparent"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-white text-3xl font-bold focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="w-full">
                    <Image
                        src={src}
                        alt={alt}
                        layout="responsive"
                        width={800}
                        height={600}
                        className="rounded-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}
