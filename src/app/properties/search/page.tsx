"use client";

import PropertyItem from "@/components/PropertyItem";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

const Properties = () => {
    const searchParams = useSearchParams();

    const text = searchParams.get("text");
    const price = searchParams.get("price");

    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!text) return;

        const fetchProperties = async () => {
            setLoading(true);

            const query = new URLSearchParams({ text });
            if (price) query.append("price", price);

            const response = await fetch(
                `/api/property/search?${query.toString()}`
            );

            const data = await response.json();
            setProperties(data);
            setLoading(false);
        };

        fetchProperties();
    }, [text, price]);

    return (
        <div className="container mx-auto min-h-screen px-4 py-10">
            {loading && (
                <div className="flex justify-center mt-32">
                    <LiaSpinnerSolid className="animate-spin w-8 h-8 text-primary" />
                </div>
            )}
            {!loading && properties.length > 0 && (
                <>
                    <div className="mb-8">
                        <h1 className="text-lg font-semibold text-gray-900 lg:text-2xl">
                            Resultados para{" "}
                            <span className="text-primary">{text}</span>
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Imóveis disponíveis no momento
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-10 mt-5 lg:mt-10">
                        {properties.map((property) => (
                            <PropertyItem
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>
                </>
            )}
            {!loading && properties.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-32 text-center">
                    <p className="text-base font-medium text-gray-700">
                        Nenhum imóvel encontrado
                    </p>
                    <span className="mt-1 text-sm text-gray-500">
            Tente ajustar a busca
          </span>
                </div>
            )}
        </div>
    );
};

export default Properties;
