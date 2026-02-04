"use client";

import React from "react";
import { Property } from "@prisma/client";
import Image from "next/image";
import {ImWhatsapp} from "react-icons/im";

interface PropertyTitleProps {
    property: Property;
}

const WHATSAPP_PHONE = "5511999151834";

const PropertyTitle = ({ property }: PropertyTitleProps) => {
    const message = encodeURIComponent(
        `Olá Jefferson! Tenho interesse no imóvel "${property.title}".\n\n` +
        `Endereço: ${property.street}, ${property.neighborhood}, nº ${property.number}\n` +
        `Valor: ${Number(property.totalValue).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })}\n` +
        `Área: ${property.totalMeters}m²\n` +
        `Dormitórios: ${property.dormitoryCount}\n` +
        `Banheiros: ${property.bathroomsCount}\n` +
        `Vagas: ${property.carSpaces}\n\n` +
        `Pode me passar mais informações?`
    );

    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

    return (
        <section className="w-full mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primaryDarker/20 px-6 py-4">
                <p className="text-xs uppercase tracking-wide text-grayPrimary">
                    Valor do imóvel
                </p>
                <p className="text-2xl lg:text-3xl font-bold text-primary">
                    {Number(property.totalValue).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>

            <div className="p-6">
                <h1 className="text-xl lg:text-2xl font-semibold text-primaryDarker">
                    {property.title}
                </h1>

                <p className="mt-1 text-sm text-grayPrimary">
                    {property.street}, {property.neighborhood}, {property.number}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <Feature icon="/room.svg" label="Dormitórios" value={property.dormitoryCount.toString()} />
                    <Feature icon="/shower.svg" label="Banheiros" value={property.bathroomsCount.toString()} />
                    <Feature icon="/carspot.svg" label="Vagas" value={property.carSpaces.toString()} />
                    <Feature icon="/meter.svg" label="Área" value={`${property.totalMeters}m²`} />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm text-grayPrimary">
                    <Info
                        label="IPTU"
                        value={Number(property.iptuValue).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    />
                    <Info
                        label="Valor por m²"
                        value={Number(property.valuePerMeter).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    />
                </div>

                <div className="mt-8">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full sm:w-fit px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition text-white font-semibold"
                    >
                        <ImWhatsapp/>
                        Entrar em contato pelo WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

interface FeatureProps {
    icon: string;
    label: string;
    value: string | number;
}

const Feature = ({ icon, label, value }: FeatureProps) => (
    <div className="flex flex-col items-center justify-center p-4 border border-grayLighter rounded-lg">
        <Image src={icon} alt={label} width={28} height={28} />
        <span className="mt-2 text-sm font-medium text-primaryDarker">
            {value}
        </span>
        <span className="text-xs text-grayPrimary">{label}</span>
    </div>
);

interface InfoProps {
    label: string;
    value: string;
}

const Info = ({ label, value }: InfoProps) => (
    <div className="flex gap-1">
        <span>{label}:</span>
        <span className="font-semibold text-primary">{value}</span>
    </div>
);

export default PropertyTitle;
