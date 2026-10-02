import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { error: "Format JSON tidak valid atau request body kosong" },
      { status: 400 }
    );
  }

  if (!body || Object.keys(body).length === 0 || !body.id || !body.name) {
    return Response.json(
      { error: "id dan name wajib diisi" },
      { status: 400 }
    );
  }

  const alreadyExists = favorites.some((f) => String(f.id) === String(body.id));
  if (alreadyExists) {
    return Response.json(
      { error: "User ini sudah difavoritkan" },
      { status: 400 }
    );
  }

  favorites.push(body);
  return Response.json(body, { status: 201 });
}
