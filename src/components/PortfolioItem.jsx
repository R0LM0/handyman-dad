// src/components/PortfolioItem.jsx
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal'; // Ensure you have a Modal component

export default function PortfolioItem({ src, alt }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="relative overflow-hidden rounded-lg shadow-md border border-secondary cursor-pointer w-full h-72"
                onClick={handleClick} // Open modal on click
                onMouseEnter={() => setIsHovered(true)} // Show alt text on hover
                onMouseLeave={() => setIsHovered(false)} // Hide alt text when not hovered
            >
                {/* Responsive Image with 'fill' */}
                <Image
                    src={src}
                    alt={alt}
                    fill // Correct usage: no 'layout' prop
                    sizes="(max-width: 768px) 100vw, 50vw" // Define sizes
                    className="object-cover transition-transform duration-300 transform hover:scale-105"
                />
                {/* Overlay Text on Hover */}
                {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <p className="text-white font-bold text-lg">{alt}</p>
                    </div>
                )}
            </div>
            {/* Modal */}
            {isModalOpen && <Modal src={src} alt={alt} onClose={handleClose} />}
        </>
    );
}
