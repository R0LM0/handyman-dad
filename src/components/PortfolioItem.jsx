import Image from 'next/image';
import { useState } from 'react';

export default function PortfolioItem({ src, alt, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative overflow-hidden rounded-lg shadow-md border border-secondary cursor-pointer"
            onClick={() => onClick(src, alt)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: '100%', height: '300px' }} // Ajustamos el tamaño del contenedor
        >
            {/* Imagen que se adapta al contenedor */}
            <Image
                src={src}
                alt={alt}
                layout="fill" // La imagen llena completamente el contenedor
                objectFit="cover" // Se asegura de que la imagen cubra el área completamente
                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
            />
            {/* Texto de superposición cuando pasa el mouse */}
            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <p className="text-white font-bold text-lg">{alt}</p>
                </div>
            )}
        </div>
    );
}
