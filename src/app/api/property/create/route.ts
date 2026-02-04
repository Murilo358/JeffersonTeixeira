//Recebe o que precisamos para criar a reserva no db
//user
//startDate
//endDate

import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const req = await request.json();

    const generatePrisma = async () => {
        try {
            await prisma.$connect();
            await prisma.$executeRaw`PRISMA MIGRATE DEPLOY \--preview-feature  `;
            await prisma.$executeRaw`PRISMA GENERATE`;
            await prisma.$executeRaw`PRISMA DB PULL`;
            console.log("Prisma migration completed successfully.");
        } catch (error) {
            console.error("Prisma migration failed:", error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const {
        lat,
        lng,
        highLights,
        uploadedImages,
        descriptions,
        street,
        city,
        neighborhood,
        number,
    } = req.data;

    await prisma.property.create({
        data: {
            title: descriptions.title,
            description: descriptions.description,
            imagesUrl: uploadedImages,
            highlights: highLights,
            sould: false,
            highLightImage: "",
            lat: lat.toString(),
            lng: lng.toString(),
            state: "",
            totalMeters: Number(descriptions.totalMeters),
            valuePerMeter: descriptions.valuePerMeter,
            dormitoryCount: descriptions.dormitoryCount,
            suitesCount: 1,
            carSpaces: descriptions.carSpaces,
            totalValue: descriptions.totalValue,
            street: street,
            city: city,
            neighborhood: neighborhood,
            number: Number(number),
            iptuValue: descriptions.iptuValue,
            bathroomsCount: descriptions.bathroomsCount
        },
    });

    generatePrisma();

    return new NextResponse(
        JSON.stringify({
            req,
        }),
        {status: 201}
    );
}
