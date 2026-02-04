import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json(
            { error: "Lat/Lon missing" },
            { status: 400 }
        );
    }

    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
            headers: {
                "User-Agent": "JeffersonTeixeira/1.0 (teste@gmail.com)", //todo add real one
            },
        }
    );

    const data = await res.json();
    return NextResponse.json(data);
}
