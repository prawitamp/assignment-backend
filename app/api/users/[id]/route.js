import { users } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const user = users.find((u) => String(u.id) === String(id));

  if (!user) {
    return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  return Response.json(user);
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const index = users.findIndex((u) => String(u.id) === String(id));

    if (index === -1) {
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    if (!body || !body.name || !body.email) {
      return Response.json(
        { error: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }

    users[index] = {
      ...users[index],
      name: body.name,
      email: body.email,
      phone: body.phone ?? users[index].phone,
      website: body.website ?? users[index].website,
      company: typeof body.company === "object" ? body.company : { name: body.company || users[index].company?.name || "Independent" },
      address: typeof body.address === "object" ? body.address : { city: body.city || body.address || users[index].address?.city || "Indonesia" },
    };

    return Response.json(users[index]);
  } catch {
    return Response.json({ error: "Gagal memperbarui user." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const index = users.findIndex((u) => String(u.id) === String(id));

    if (index === -1) {
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    users[index] = {
      ...users[index],
      ...body,
      company: body.company
        ? typeof body.company === "object"
          ? body.company
          : { name: body.company }
        : users[index].company,
      address: body.address
        ? typeof body.address === "object"
          ? body.address
          : { city: body.city || body.address }
        : users[index].address,
    };

    return Response.json(users[index]);
  } catch {
    return Response.json({ error: "Gagal memperbarui user." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = users.findIndex((u) => String(u.id) === String(id));

  if (index === -1) {
    return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  const [deletedUser] = users.splice(index, 1);
  return Response.json({
    message: "User berhasil dihapus",
    user: deletedUser,
  });
}

