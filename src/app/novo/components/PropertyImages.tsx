"use client";

import React, { useState } from "react";

interface PropertyImagesProps {
    setUploadedImages: (links: string[]) => void;
    uploadedImages: string[];
}

function normalizeDriveLink(link: string): string {
    const match = link.match(/\/d\/([^/]+)|id=([^&]+)/);
    const fileId = match?.[1] || match?.[2];
    if (!fileId) return link;
    return `https://lh3.googleusercontent.com/d/${fileId}`;
}

const PropertyImages = ({ setUploadedImages }: PropertyImagesProps) => {
    const [input, setInput] = useState("");
    const [links, setLinks] = useState<string[]>([]);

    function addLink() {
        if (!input.trim()) return;
        setLinks((prev) => [...prev, normalizeDriveLink(input.trim())]);
        setInput("");
    }

    function removeLink(index: number) {
        setLinks((prev) => prev.filter((_, i) => i !== index));
    }

    function handleClick() {
        setUploadedImages(links);
    }

    return (
        <div className="mx-auto max-w-5xl">
            <h1
                data-aos="zoom-in"
                className="mb-4 text-xl font-semibold text-primaryDarker sm:text-2xl lg:text-3xl"
            >
                Adicione no mínimo 5 fotos da sua propriedade
            </h1>

            <p className="mb-8 text-sm text-gray-500">
                Quanto melhor a qualidade das imagens, maior a chance de atrair hóspedes.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Cole o link da imagem (Google Drive)"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm
                     transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />

                <button
                    type="button"
                    onClick={addLink}
                    className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white
                     transition hover:bg-gray-800 active:scale-95"
                >
                    Adicionar
                </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                {links.length}/5 imagens adicionadas
            </div>

            {links.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="group relative aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-sm"
                        >
                            <img
                                src={link}
                                alt={`Imagem ${index + 1}`}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover transition group-hover:scale-105"
                            />

                            <div
                                className="absolute inset-0 bg-black/0 transition
                           group-hover:bg-black/30"
                            />

                            <button
                                type="button"
                                onClick={() => removeLink(index)}
                                className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1
                           text-xs text-white opacity-0 transition
                           hover:bg-black group-hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {links.length >= 5 && (
                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleClick}
                        className="rounded-xl bg-primary px-10 py-3 text-sm font-semibold text-white
                       transition hover:brightness-110 active:scale-95"
                    >
                        Próximo
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyImages;
