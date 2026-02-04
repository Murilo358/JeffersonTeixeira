import React from "react";
import { Property } from "@prisma/client";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface PropertiesHighlightsProps {
  property: Property;
}

const PropertyHighlights = ({ property }: PropertiesHighlightsProps) => {
  return (
    <div className=" p-5 mt-5 shadow-lg rounded-lg 0 bg-white ">
      <h2 className="font-semibold mt-3 lg:text-xl  text-primaryDarker mb-2">
        Destaques
      </h2>

      <div className=" flex flex-wrap gap-y-3">
        {property.highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 w-1/2 ">
            <AiOutlineCheckCircle className="text-primary " />
            <p className="text-xs lg:text-base text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyHighlights;
