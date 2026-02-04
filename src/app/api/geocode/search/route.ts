import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
        return NextResponse.json({ error: "Query missing" }, { status: 400 });
    }

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            q
        )}`,
        {
            headers: {
                "User-Agent": "JeffersonTeixeira/1.0 (contato@seudominio.com)",
            },
        }
    );

    const data = await res.json();
    return NextResponse.json(data);
}
