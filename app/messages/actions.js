"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  const index = messages.findIndex((m) => String(m.id) === String(id));

  if (index !== -1) {
    messages.splice(index, 1);
  }

  // Refresh data pada halaman /messages secara otomatis
  revalidatePath("/messages");
}
