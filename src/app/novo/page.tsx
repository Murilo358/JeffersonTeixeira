"use client";

import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AOS from "aos";
import PropertyLocation from "./components/PropertyLocation";
import PropertyHighLights from "./components/PropertyHighLights";
import PropertyImages from "./components/PropertyImages";
import PropertyDescriptions from "./components/PropertyDescriptions";
import {toast} from "react-toastify";

const Page = () => {

  const [highLights, setHighLights] = useState([]);
  const [highLightsSelected, setHighLightsSelected] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");

    interface PropertyForm {
        title: string;
        iptuValue: number;
        valuePerMeter: number;
        totalValue: number;
        description: string;
        dormitoryCount: number;
        bathroomsCount: number;
        carSpaces: number;
    }

  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, [status]);

  async function createProperty(descriptions: PropertyForm) {
    const data = {
        lat,
        lng,
        highLights,
        uploadedImages,
        highLightImage: null,
        descriptions: descriptions,
        street,
        city,
        neighborhood,
        number,
    };

    if (descriptions) {
      try {
        const res = await fetch("/api/property/create", {
          method: "POST",
          body: Buffer.from(JSON.stringify({ data })),
        });
        if (res.ok) {
          toast.success("Propriedade criada com sucesso", {
            position: "bottom-center",
          });
          router.push("/");
        }
      } catch (err) {
        toast.error(
          "Não foi possivel criar a propriedade, tente novamente mais tarde",
          {
            position: "bottom-center",
          }
        );
        console.error(err);
        router.push("/");
      }
    }
  }

  return (
    <div className="container mx-auto flex  flex-col items-center">
      {!(street && city && neighborhood && number) && (
        <PropertyLocation
          setStreet={setStreet}
          setCity={setCity}
          setNeighborhood={setNeighborhood}
          setNumber={setNumber}
          setLat={setLat}
          setLng={setLng}
        />
      )}
      {(street && city && neighborhood && number) && !highLightsSelected && (
        <PropertyHighLights
          setHighLightsSelected={setHighLightsSelected}
          highLights={highLights}
          setHighLights={setHighLights}
        />
      )}
      {highLightsSelected && uploadedImages.length < 5 && (
        <PropertyImages setUploadedImages={setUploadedImages} />
      )}
      {highLightsSelected && uploadedImages.length >= 5 && (
        <PropertyDescriptions createTrip={createProperty} />
      )}
    </div>
  );
};

export default Page;
