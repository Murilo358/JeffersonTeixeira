import {Property} from "@prisma/client";
import React from "react";

interface PropertyDescriptionProps {
  property: Property;
}

const PropertyDescriptions = ({ property }: PropertyDescriptionProps) => {
  return (
      <div className="flex-1 p-5 mt-5 shadow-lg rounded-lg 0 bg-white ">
      <h3 className="font-semibold mt-3 lg:text-xl text-primaryDarker">
        {" "}
        Sobre a propriedade
      </h3>
      <p className="text-sm mt-3 lg:text-base text-grayPrimary">
          {property.description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                  {line}
                  <br />
              </React.Fragment>
          ))}
      </p>
    </div>
  );
};

export default PropertyDescriptions;
