// PortfolioSection.js
import { useState } from 'react';
import PortfolioItem from "./PortfolioItem";
import L1 from '../assets/LavadoPresion/L1.jpg';
import L2 from '../assets/LavadoPresion/L2.jpg';
import L3 from '../assets/LavadoPresion/L3.jpg';
import L4 from '../assets/LavadoPresion/L4.jpg';
import P1 from '../assets/Pintura/P1.jpg';
import P2 from '../assets/Pintura/P2.jpg';
import P3 from '../assets/Pintura/P3.jpg';
import P4 from '../assets/Pintura/P4.jpg';
import R1 from '../assets/Remodelacion/R1.jpg';
import Modal from './Modal'; // Importaremos el componente Modal que crearemos

const trabajos = [
    { src: L1, alt: 'Lavado a presión - Trabajo 1' },
    { src: L2, alt: 'Lavado a presión - Trabajo 2' },
    { src: L3, alt: 'Lavado a presión - Trabajo 3' },
    { src: L4, alt: 'Lavado a presión - Trabajo 4' },
    { src: P1, alt: 'Pintura - Trabajo 1' },
    { src: P2, alt: 'Pintura - Trabajo 2' },
    { src: P3, alt: 'Pintura - Trabajo 3' },
    { src: P4, alt: 'Pintura - Trabajo 4' },
    { src: R1, alt: 'Remodelación - Trabajo 1' },
];

export default function PortfolioSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

    const openModal = (src, alt) => {
        setSelectedImage({ src, alt });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage({ src: '', alt: '' });
    };

    return (
        <section id="portfolio" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 font-mono">Mis Trabajos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trabajos.map((trabajo, index) => (
                        <PortfolioItem
                            key={index}
                            src={trabajo.src}
                            alt={trabajo.alt}
                            onClick={openModal}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen &&
                <Modal src={selectedImage.src} alt={selectedImage.alt} onClose={closeModal} />
            }
        </section>
    );
}
