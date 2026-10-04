import { users } from "@/lib/db";

export async function GET() {
  return Response.json(users);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || !body.name || !body.email) {
      return Response.json(
        { error: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone || "-",
      website: body.website || "-",
      company: typeof body.company === "object" ? body.company : { name: body.company || "Independent" },
      address: typeof body.address === "object" ? body.address : { city: body.city || body.address || "Indonesia" },
    };

    users.unshift(newUser);

    return Response.json(newUser, { status: 201 });
  } catch {
    return Response.json(
      { error: "Terjadi kesalahan saat memproses data pengguna." },
      { status: 500 }
    );
  }
}

