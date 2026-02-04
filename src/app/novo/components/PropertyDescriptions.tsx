"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import CurrencyInput from "@/components/CurrencyInput";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { LiaSpinnerSolid } from "react-icons/lia";

interface PropertyForm {
    title: string;
    iptuValue: number;
    valuePerMeter: number;
    totalValue: number;
    totalMeters: number;
    description: string;
    dormitoryCount: number;
    bathroomsCount: number;
    carSpaces: number;
}

const PropertyDescriptions = ({ createProperty: createProperty }: any) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<PropertyForm>();

    watch("title");
    watch("iptuValue");
    watch("valuePerMeter");
    watch("totalValue");
    watch("totalMeters");
    watch("description");
    watch("dormitoryCount");
    watch("bathroomsCount");
    watch("carSpaces");

    const onSubmit = async (data: PropertyForm) => {
        setLoading(true);
        await createProperty(data);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
            <h1 className="font-medium mt-10 mb-5 text-xl text-primaryDarker lg:text-3xl">
                Estamos quase lá... <br />
                Preencha os dados abaixo
            </h1>

            <div className="flex gap-3 flex-col lg:flex-row">
                <Input
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Por favor informe o título",
                        },
                    })}
                    placeholder="Título"
                    error={!!errors?.title}
                    errorMessage={errors?.title?.message}
                />
            </div>

            <div>
                <TextArea
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Por favor informe a descrição",
                        },
                    })}
                    className="mt-3 w-full"
                    placeholder="Descrição"
                    cols={30}
                    rows={10}
                    error={!!errors?.description}
                    errorMessage={errors?.description?.message}
                />
            </div>

            <div className="flex mt-3 gap-3 flex-col md:flex-row">
                <Controller
                    name="totalValue"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Por favor informe o valor total",
                        },
                    }}
                    render={({ field }) => (
                        <CurrencyInput
                            className="w-full"
                            placeholder="Valor total"
                            allowDecimals={false}
                            onValueChange={field.onChange as any}
                            value={field.value}
                            onBlur={field.onBlur}
                            errorMessage={errors.totalValue?.message}
                            error={!!errors.totalValue}
                        />
                    )}
                />

                <Input
                    {...register("totalMeters", {
                        required: {
                            value: true,
                            message: "Por favor informe a metragem do imóvel",
                        },
                        min: {
                            value: 1,
                            message: "A metragem deve ser maior que zero",
                        },
                    })}
                    className="w-full"
                    placeholder="Metragem total (m²)"
                    type="number"
                    error={!!errors?.totalMeters}
                    errorMessage={errors?.totalMeters?.message}
                />

                <Controller
                    name="valuePerMeter"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Por favor informe o valor por metro",
                        },
                    }}
                    render={({ field }) => (
                        <CurrencyInput
                            className="w-full"
                            placeholder="Valor por m²"
                            allowDecimals={false}
                            onValueChange={field.onChange as any}
                            value={field.value}
                            onBlur={field.onBlur}
                            errorMessage={errors.valuePerMeter?.message}
                            error={!!errors.valuePerMeter}
                        />
                    )}
                />
            </div>

            <div className="mt-3 flex gap-3 flex-col md:flex-row">
                <Controller
                    name="iptuValue"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Por favor informe o valor do IPTU",
                        },
                    }}
                    render={({ field }) => (
                        <CurrencyInput
                            className="w-full"
                            placeholder="Valor do IPTU"
                            allowDecimals={false}
                            onValueChange={field.onChange as any}
                            value={field.value}
                            onBlur={field.onBlur}
                            errorMessage={errors.iptuValue?.message}
                            error={!!errors.iptuValue}
                        />
                    )}
                />
            </div>

            <div className="flex mt-3 gap-3 flex-col sm:flex-row">
                <Input
                    {...register("dormitoryCount", {
                        required: {
                            value: true,
                            message: "Por favor informe o número de dormitórios",
                        },
                    })}
                    className="w-full"
                    placeholder="Núm. de dormitórios"
                    error={!!errors?.dormitoryCount}
                    errorMessage={errors?.dormitoryCount?.message}
                    type="number"
                />

                <Input
                    {...register("bathroomsCount", {
                        required: {
                            value: true,
                            message: "Por favor informe o número de banheiros",
                        },
                    })}
                    className="w-full"
                    placeholder="Núm. de banheiros"
                    error={!!errors?.bathroomsCount}
                    errorMessage={errors?.bathroomsCount?.message}
                    type="number"
                />

                <Input
                    {...register("carSpaces", {
                        required: {
                            value: true,
                            message: "Por favor informe a quantidade de vagas",
                        },
                    })}
                    className="w-full"
                    placeholder="Núm. de vagas de carros"
                    error={!!errors?.carSpaces}
                    errorMessage={errors?.carSpaces?.message}
                    type="number"
                />
            </div>

            <Button
                disabled={loading}
                onClick={() => handleSubmit(onSubmit)()}
                className="w-full mt-4 h-[40px]"
            >
                {loading ? (
                    <div className="flex items-center justify-center w-full">
                        <LiaSpinnerSolid className="animate-spin w-[35px] h-[35px]" />
                    </div>
                ) : (
                    "Criar propriedade"
                )}
            </Button>
        </div>
    );
};

export default PropertyDescriptions;
