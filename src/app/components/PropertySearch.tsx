"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface PropertySearchForm {
    text: string;
    price?: string;
}

const PropertySearch = () => {
    const {
        control,
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<PropertySearchForm>();

    const router = useRouter();

    const onSubmit = (data: PropertySearchForm) => {
        const query = new URLSearchParams({
            text: data.text,
        });

        if (data.price) {
            query.append("price", data.price);
        }

        router.push(`/properties/search?${query.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto bg-search-background bg-cover bg-center items-center bg-no-repeat lg:py-28"
        >
            <h1 className="text-center font-semibold text-2xl text-grayPrimary lg:text-[2.5rem]">
                Encontre seu próximo <span className="text-primary">LAR!</span>
            </h1>

            <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg">
                <Input
                    placeholder="Bairro, cidade ou nome do imóvel"
                    error={!!errors.text}
                    errorMessage={errors.text?.message}
                    {...register("text", {
                        required: {
                            value: true,
                            message: "Insira o Bairro, cidade ou nome do imóvel que você está buscando",
                        },
                    })}
                />

                <div className="flex gap-4 lg:w-full">
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <CurrencyInput
                                placeholder="Orçamento máximo"
                                allowDecimals={false}
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>

                <Button type="submit" className="lg:w-1/2">
                    Buscar
                </Button>
            </div>
        </form>
    );
};

export default PropertySearch;
