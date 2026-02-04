"use client";

import Button from "@/components/Button";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
// @ts-ignore
import L from "leaflet";


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


interface PropertyLocationProps {
    locationDescription: string;
    lat: string;
    lng: string;
}

const PropertyLocation = ({
                          locationDescription,
                          lat,
                          lng,
                      }: PropertyLocationProps) => {
    const [positions, setPositions] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (lat && lng) {
            setPositions([Number(lat), Number(lng)]);
        }

    }, [lat, lng, locationDescription]);


    return (
        <div className="flex flex-col p-5  shadow-lg rounded-lg  bg-white  ">
            <h2 className="font-semibold lg:text-xl mb-5 text-primaryDarker">
                Localização
            </h2>
            <div className="mt-3  h-[266px] lg:h-[350px] w-full rounded-lg overflow-hidden relative">
                <MapContainer center={[lat, lng]} zoom={16} className="h-full w-full">
                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {positions && <Marker position={[lat, lng]} />}
                </MapContainer>
            </div>

            <p className="text-primaryDarker lg:text-base text-sm font-semibold mt-3">
                {locationDescription}
            </p>
            <a
                href={`https://www.google.com/maps?q=${positions[0]},${positions[1]}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button variant="outlined" className="mt-5 w-full">
                    Ver no Google Maps
                </Button>
            </a>
        </div>
    );
};

export default PropertyLocation;
