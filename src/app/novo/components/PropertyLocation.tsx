"use client";

import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { LiaSpinnerSolid } from "react-icons/lia";

import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {toast} from "react-toastify";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PropertyLocationInfo {
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    lat: number;
    lng: number;
}

const PropertyLocation = ({setStreet, setCity, setNeighborhood, setNumber, setLat, setLng} : any) => {
    const [loading, setLoading] = useState(false);
    const [mapLoading, setMapLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number] | null>([-23.0068, -46.8387 ]);
    const [markerPosition, setMarkerPosition] =
        useState<[number, number] | null>(null);

    const [searchQuery, setSearchQuery] = useState("");


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PropertyLocationInfo>();


    const reverseGeocode = async (lat: number, lng: number) => {
        setMapLoading(true);
        const res = await fetch(
            `/api/geocode/reverse?lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        setValue("street", data.address?.road || "");
        setValue("city", data.address?.city || "");
        setValue(
            "neighborhood",
            data.address?.suburb ||
            data.address?.neighbourhood ||
            ""
        );
        setValue("number", data.address?.house_number || "");
        setMapLoading(false);
    };

    const FlyToLocation = ({ center }: { center: [number, number] | null }) => {
        const map = useMap();

        useEffect(() => {
            if (!center) return;

            map.whenReady(() => {
                map.flyTo(center, 15, { duration: 1 });
            });
        }, [center, map]);

        return null;
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;

                setMarkerPosition([lat, lng]);
                setMapCenter([lat, lng]);

                setValue("lat", lat);
                setValue("lng", lng);

                reverseGeocode(lat, lng);
            }
        });
        return null;
    };

    const searchOnMap = async () => {
        if (!searchQuery) return;

        setMapLoading(true);
        const res = await fetch(
            `/api/geocode/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setMapLoading(false);

        if (!data?.length) {
            toast.error("não foi possível encontrar o  endereço digitado", {
                position: "top-right",
            });
            return;
        };

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        // setMarkerPosition([lat, lng]);
        setMapCenter([lat, lng]);

        setValue("lat", lat);
        setValue("lng", lng);
    };


    const onSubmit = async (data: PropertyLocationInfo) => {
        if (!markerPosition) {
            toast.error("Clique no mapa para definir o local exato.", {
                position: "top-right",
            });
            return;
        }

        setStreet(data.street);
        setCity(data.city);
        setNeighborhood(data.neighborhood)
        setNumber(data.number)

        setLat(markerPosition[0])
        setLng(markerPosition[1])
    };
    return (
        <div>
            {loading ? (<LiaSpinnerSolid className="animate-spin w-6 h-6"/>) :
                (<div></div>)
            }
            <h1 className="font-medium mt-10 mb-5 text-xl text-primaryDarker lg:text-3xl">
                Preencha os dados abaixo e selecione a localização exata no mapa
            </h1>

            <div className="gap-3  w-full">
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Rua</label>
                    <Input
                        {...register("street", {
                            required: {
                                value: true,
                                message: "Por favor informe a rua da propriedade",
                            },
                        })}
                        placeholder="Rua*"
                        error={!!errors?.street}
                        errorMessage={errors?.street?.message}
                    />
                </div>

                <div className="flex gap-3 ">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">Cidade</label>
                        <Input
                            {...register("city", {
                                required: {
                                    value: true,
                                    message: "Por favor informe a cidade da propriedade",
                                },
                            })}
                            placeholder="Cidade*"
                            error={!!errors?.city}
                            errorMessage={errors?.city?.message}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">Bairro</label>
                        <Input
                            {...register("neighborhood", {
                                required: {
                                    value: true,
                                    message: "Por favor informe a bairro da propriedade",
                                },
                            })}
                            placeholder="Bairro*"
                            error={!!errors?.neighborhood}
                            errorMessage={errors?.neighborhood?.message}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">Número</label>
                        <Input
                            {...register("number", { required: {
                                    value: true,
                                    message: "Por favor informe o número da propriedade"
                                },
                            })}
                            placeholder={`Núm da propriedade*`}
                            error={!!errors?.number}
                            errorMessage={errors?.number?.message}
                            type="number"
                        />
                    </div>
                </div>
            </div>


            <div className="mt-5 flex gap-2">
                <Input
                    value={searchQuery}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar no mapa"
                    onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            searchOnMap();
                        }
                    }}
                />
                <Button type="button" onClick={searchOnMap}>
                    Buscar
                </Button>
            </div>

            <div className="mt-3 h-[350px] w-full rounded-lg overflow-hidden relative">
                <MapContainer center={mapCenter} zoom={13} className="h-full w-full">
                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    <FlyToLocation center={mapCenter} />
                    {markerPosition && <Marker position={markerPosition} />}
                </MapContainer>

                {mapLoading && (
                    <div className="
                  absolute inset-0 z-[1000]
                  flex items-center justify-center
                  bg-white/40 backdrop-blur-sm
                ">
                        <LiaSpinnerSolid className="animate-spin w-8 h-8 text-gray-700" />
                    </div>
                )}
            </div>

            <Button
                disabled={loading}
                onClick={() => handleSubmit(onSubmit)()}
                className="w-full mt-3 h-[40px]"
            >
                {loading ? (
                    <LiaSpinnerSolid className="animate-spin w-6 h-6" />
                ) : (
                    "Próximo"
                )}
            </Button>
        </div>
    );
};

export default PropertyLocation;
