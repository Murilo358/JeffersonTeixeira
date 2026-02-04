import { Property } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PropertiesProps {
    property: Property;
}

const PropertyItem = ({ property }: PropertiesProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setLoading(true);
        router.push(`/properties/${property.id}`);
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            )}

            <div className="cursor-pointer" onClick={handleClick}>
                <div className="flex flex-col shadow-md p-2 items-center">
                    <div className="relative h-[280px] w-[280px]">
                        <Image
                            className="rounded-lg object-cover"
                            fill
                            alt={property.title}
                            src={
                                property.imagesUrl[0]
                                    ? property.imagesUrl[0]
                                    : "/image-not-found.jpg"
                            }
                        />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-primaryDarker line-clamp-2">
                        {property.title}
                    </h3>

                    <p className="mt-1 text-xs text-grayPrimary line-clamp-1">
                        {property.street}, {property.neighborhood}, {property.number}
                    </p>

                    <p className="mt-2 text-base text-grayPrimary">
            <span className="font-semibold text-primary">
              {Number(property.totalValue).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
              })}
            </span>
                    </p>

                    <div className="grid grid-cols-4 w-full gap-2 pt-3 mt-3 border-t border-grayLighter">
                        <Feature icon="/room.svg" value={property.dormitoryCount} />
                        <Feature icon="/shower.svg" value={property.bathroomsCount} />
                        <Feature icon="/carspot.svg" value={property.carSpaces} />
                        <Feature icon="/meter.svg" value={`${property.totalMeters}m²`} />
                    </div>
                </div>
            </div>
        </>
    );
};

interface FeatureProps {
    icon: string;
    value: string | bigint;
}

const Feature = ({ icon, value }: FeatureProps) => (
    <div className="flex flex-col items-center justify-center gap-1">
        <Image src={icon} alt="" width={18} height={18} />
        <span className="text-xs text-grayPrimary">{value.toString()}</span>
    </div>
);

export default PropertyItem;
