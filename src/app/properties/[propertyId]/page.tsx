import {prisma} from "@/lib/prisma";
import React from "react";
import PropertyHeader from "./components/PropertyHeader";
import PropertyDescriptions from "./components/PropertyDescriptions";
import PropertyHighlights from "./components/PropertyHighlights";
import PropertyLocation from "./components/PropertyLocation";
import PropertyTitle from "@/app/properties/[propertyId]/components/PropertyTitle";

const getPropertyData = async (propertyId: string) => {
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });
    return property;
};

const PropertyDetails = async ({params}: { params: { propertyId: string } }) => {
    const property = await getPropertyData(params.propertyId);

    if (!property) return null;

    return (
        <div>
            <div className="w-full ">
                <PropertyHeader property={property}/>
            </div>
            <div className="container mx-auto lg:px-40">
                <PropertyTitle property={property}/>
                <div className="flex flex-col lg:gap-5">
                    <div className="lg:order-1">
                        <PropertyDescriptions property={property}/>
                        <PropertyHighlights property={property}/>
                    </div>
                </div>
                <PropertyLocation
                    locationDescription={property.street + ", " + property.neighborhood + ", " + property.number}
                    lat={property.lat}
                    lng={property.lng}
                />
            </div>

        </div>
    );
};

export default PropertyDetails;
