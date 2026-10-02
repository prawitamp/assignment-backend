import { favorites } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const favorite = favorites.find((f) => String(f.id) === String(id));

  if (!favorite) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  return Response.json(favorite);
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { error: "Format request body tidak valid" },
      { status: 400 }
    );
  }

  const index = favorites.findIndex((f) => String(f.id) === String(id));
  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  // Update data favorite, seperti menambahkan atau memperbarui catatan (note)
  favorites[index] = {
    ...favorites[index],
    ...body,
  };

  return Response.json(favorites[index]);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === String(id));

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
}
