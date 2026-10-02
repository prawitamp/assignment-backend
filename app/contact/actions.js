"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  messages.push({
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/messages");

  return { success: true };
}

