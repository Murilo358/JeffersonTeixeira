"use client";

import React, { useState } from "react";
import PropertyHighlightOption from "./PropertyHighlightOption";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@/components/Button";
import { toast } from "react-toastify";

interface PropertyHighlightProps {
    setHighLights: any;
    highLights: any;
    setHighLightsSelected: any;
}

const PropertyHighLights = ({
                                highLights,
                                setHighLights,
                                setHighLightsSelected,
                            }: PropertyHighlightProps) => {
    const [newHighLight, setNewHighLight] = useState("");

    const defaultHighlights = [
        { text: "Área de serviço", disabled: false },
        { text: "Varanda", disabled: false },
        { text: "Varanda gourmet", disabled: false },
        { text: "Mobiliado", disabled: false },
        { text: "Semi-mobiliado", disabled: false },
        { text: "Aceita animais", disabled: false },
        { text: "Ar-condicionado", disabled: false },
        { text: "Ventilador de teto", disabled: false },
        { text: "Churrasqueira", disabled: false },
        { text: "Piscina", disabled: false },
        { text: "Elevador", disabled: false },
        { text: "Vaga de garagem", disabled: false },
        { text: "Vaga para visitante", disabled: false },
        { text: "Portaria 24h", disabled: false },
        { text: "Sistema de segurança", disabled: false },
        { text: "Cozinha planejada", disabled: false },
        { text: "Área gourmet", disabled: false },
        { text: "Vista para o mar", disabled: false },
        { text: "Vista livre", disabled: false },
        { text: "Iluminação natural", disabled: false },
        { text: "Internet Wi-Fi", disabled: false },
    ];

    const [initialHighlights, setInitialHighlights] =
        useState(defaultHighlights);

    const handleAddHighlight = () => {
        if (!newHighLight.trim()) {
            toast.error("O destaque não pode ser vazio.", {
                position: "bottom-center",
            });
            return;
        }

        if (highLights.includes(newHighLight)) {
            toast.error("Esse destaque já foi adicionado.", {
                position: "bottom-center",
            });
            return;
        }

        setHighLights([...highLights, newHighLight]);
        setNewHighLight("");
    };

    return (
        <div
            data-aos="zoom-in"
            className="mx-auto flex max-w-5xl flex-col items-center px-4"
        >
            <h1 className="mb-4 mt-10 text-center text-xl font-semibold text-primaryDarker sm:text-2xl lg:text-3xl">
                Escolha as características da propriedade
            </h1>

            <p className="mb-10 text-center text-sm text-gray-500">
                Selecione ao menos 2 itens ou crie seus próprios destaques.
            </p>

            <div className="flex w-full flex-wrap justify-center gap-2 sm:gap-3">
                {initialHighlights.map((highlight) => (
                    <PropertyHighlightOption
                        key={highlight.text}
                        text={highlight.text}
                        disabled={highlight.disabled}
                        defaults
                        initialHighlights={initialHighlights}
                        setInitialHighlights={setInitialHighlights}
                        highLights={highLights}
                        setHighLights={setHighLights}
                    />
                ))}
            </div>

            <div className="mt-8 flex w-full max-w-md items-center rounded-full border border-gray-300 bg-white px-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-200">
                <input
                    className="flex-1 rounded-full px-4 py-3 text-sm outline-none"
                    placeholder="Adicionar característica personalizada"
                    type="text"
                    value={newHighLight}
                    onChange={(e) => setNewHighLight(e.target.value)}
                />
                <button
                    onClick={handleAddHighlight}
                    className="rounded-full bg-primary p-3 text-white transition hover:bg-primaryDarker active:scale-95"
                >
                    <AiOutlinePlus size={18} />
                </button>
            </div>

            {highLights.length > 0 && (
                <>
                    <h3 className="mb-6 mt-12 text-center text-lg font-medium text-primaryDarker sm:text-xl">
                        Itens selecionados
                    </h3>

                    <div className="flex w-full flex-wrap justify-center gap-3">
                        {highLights.map((highLight: any) => (
                            <PropertyHighlightOption
                                key={highLight}
                                text={highLight}
                                added
                                defaults={false}
                                disabled={false}
                                initialHighlights={initialHighlights}
                                setInitialHighlights={setInitialHighlights}
                                highLights={highLights}
                                setHighLights={setHighLights}
                            />
                        ))}
                    </div>
                </>
            )}

            {highLights.length > 1 && (
                <Button
                    onClick={() => setHighLightsSelected(true)}
                    className="mt-12 w-full max-w-xs"
                >
                    Confirmar características
                </Button>
            )}
        </div>
    );
};

export default PropertyHighLights;
