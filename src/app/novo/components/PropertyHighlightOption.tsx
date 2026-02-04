import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

interface PropertyHighLightsOptionProps {
  text: string;
  highLights?: any;
  setHighLights?: any;
  added?: boolean;
  defaults?: boolean;
  disabled?: boolean;
  setInitialHighlights: any;
  initialHighlights: any;
}

const PropertyHighlightOption: React.FC<PropertyHighLightsOptionProps> = ({
  setHighLights,
  highLights,
  text,
  added,
  disabled,
  setInitialHighlights,
  initialHighlights,
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (highLights.includes(text)) {
      if (
        highLights.includes(text) &&
        initialHighlights.find((e: any) => e.text === text)
          ? true
          : false
      ) {
        initialHighlights.filter((highlight: any) =>
          highlight.text == text ? (highlight.disabled = false) : highlight
        );
      }
      setHighLights(
        highLights.filter((highlight: string) => highlight !== text)
      );
      setSelected(false);
    } else {
      setHighLights([...highLights, text]);
      setSelected(true);
      setInitialHighlights(
        initialHighlights.filter((highlight: any) =>
          highlight.text == text ? (highlight.disabled = true) : highlight
        )
      );
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={` ${
        disabled ? "bg-gray-200" : ""
      } hover:bg-grayLighter flex gap-2 p-3  rounded-2xl shadow-md items-center text-center`}
    >
      <AiOutlineCheckCircle className="text-primary" />
      <p className="text-sm">{text}</p>
      {added && <AiOutlineClose />}
    </button>
  );
};

export default PropertyHighlightOption;
