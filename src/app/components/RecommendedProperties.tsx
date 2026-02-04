"use client";
import PropertyItem from "@/components/PropertyItem";
import { Property } from "@prisma/client";
import React, { useEffect, useState } from "react";

const RecommendedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProperties = async () => {
      const response = await fetch(`/api/property/getall`);
      const json = await response.json();
      setProperties(json.properties);
      setLoading(false);
    };
    fetchAllProperties();
  }, []);


  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
            Propriedades recomendadas
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
        {loading && (
            <div className="relative mt-10 flex items-center justify-center min-h-[280px]">
                <div className="flex items-center justify-center ">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            </div>
        )}
      {!loading && properties && properties.length > 0 && (
        <div className="flex flex-col items-center mt-5 lg:mt-12 gap-5 lg:flex-row gap lg:flex-wrap lg:justify-center lg:gap-10">
          {properties.length > 0 &&
            properties.map((property: Property) => <PropertyItem key={property.id} property={property} />)}
        </div>
      )}
    </div>
  );
};

export default RecommendedProperties;
