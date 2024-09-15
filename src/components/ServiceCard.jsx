import React from 'react'

export default function ServiceCard({ icon, title, description }) {
    return (
        <div className="bg-background border border-secondary hover:shadow-md transition-shadow duration-300 p-6 rounded-lg">
            <div className="mb-4 text-primary flex justify-center">{icon}</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 font-mono">{title}</h3>
            <p className="text-sm md:text-base text-foreground/80 break-words">{description}</p>
        </div>
    )
}
