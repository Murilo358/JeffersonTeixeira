import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const properties = await prisma.property.findMany();

        if (!properties || properties.length === 0) {
            return NextResponse.json(
                {
                    error: {
                        code: "ALL_PROPERTIES_NOT_FOUNDED",
                    },
                },
                { status: 404 }
            );
        }

        const safeProperties = JSON.parse(
            JSON.stringify(properties, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return NextResponse.json(
            {
                properties: safeProperties,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "INTERNAL_SERVER_ERROR" },
            { status: 500 }
        );
    }
}
