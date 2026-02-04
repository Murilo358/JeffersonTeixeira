import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const generateSearchQuery = (
    text: string,
    price?: string | null
) => {
    const where: any = {
        AND: [],
    };

        if (text) {
        where.AND.push({
            OR: [
                {
                    title: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    neighborhood: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    city: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    street: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
                {
                    state: {
                        contains: text,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }

    if (price && price !== "undefined" && price !== "null") {
        where.AND.push({
            totalValue: {
                lte: Number(price),
            },
        });
    }

    return where;
};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const text = searchParams.get("text");
        const price = searchParams.get("price");

        if (!text) {
            return NextResponse.json(
                { message: "missing text parameter" },
                { status: 400 }
            );
        }

        const properties = await prisma.property.findMany({
            where: generateSearchQuery(text, price),
            orderBy: {
                totalValue: "asc",
            },
        });

        if (!properties || properties.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        const safeProperties = JSON.parse(
            JSON.stringify(properties, (_, value) =>
                typeof value === "bigint" ? value.toString() : value
            )
        );

        return NextResponse.json(safeProperties, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "INTERNAL_SERVER_ERROR" },
            { status: 500 }
        );
    }
}
