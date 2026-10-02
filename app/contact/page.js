"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { submitContactForm } from "./actions";

export default function ContactPage() {
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitted,
    setSubmitted,
    resetForm,
  } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
          <span>📮</span>
          <span>Kirim Pesan</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-5xl">
          Hubungi Saya
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#6E5D66] leading-relaxed">
          Punya pertanyaan, ide proyek, atau sekadar ingin berdiskusi seputar web development? Silakan kirimkan pesan Anda melalui formulir di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="border border-[#F0DFD7] bg-white/95 p-6 shadow-sm rounded-2xl">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-xl font-bold text-[#2A1D24]">
              {submitted ? "Pesan Terkirim 🎉" : "Kirim Pesan"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {submitted ? (
              <div className="rounded-2xl border border-pink-200 bg-pink-50/80 p-5 text-[#35252E]">
                <p className="font-bold text-pink-700 text-base">
                  Terima kasih, {name}!
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#6E5D66] leading-relaxed">
                  Pesan Anda telah berhasil dikirim ke server. Saya akan segera membalasnya melalui email dalam waktu dekat.
                </p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="sm"
                  className="mt-5 rounded-full border-pink-200 bg-white text-xs text-pink-700 hover:bg-pink-100"
                >
                  Kirim Pesan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-[#4A3B43] mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama Anda"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-[#4A3B43] mb-1.5"
                  >
                    Alamat Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[#4A3B43] mb-1.5"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tuliskan pesan atau kebutuhan proyek Anda..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="w-full rounded-xl border border-[#F0DFD7] bg-white/90 px-4 py-2.5 text-sm text-[#35252E] placeholder:text-[#9E8B95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:border-pink-300 shadow-sm transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold hover:opacity-95 h-10 rounded-full shadow-md shadow-pink-200"
                >
                  Kirim Pesan
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#2A1D24]">
              Informasi Kontak
            </h3>
            <p className="text-xs text-[#6E5D66] leading-relaxed">
              Anda juga bisa menghubungi saya langsung melalui kontak berikut:
            </p>

            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center gap-3 text-[#35252E]">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-50 border border-pink-200 text-sm">
                  ✉️
                </span>
                <div>
                  <p className="text-[11px] text-[#9E8B95]">Email</p>
                  <p className="font-semibold text-[#2A1D24]">prawita@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#35252E]">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-50 border border-pink-200 text-sm">
                  📍
                </span>
                <div>
                  <p className="text-[11px] text-[#9E8B95]">Lokasi</p>
                  <p className="font-semibold text-[#2A1D24]">Serang, Banten</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#35252E]">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-50 border border-pink-200 text-sm">
                  🟢
                </span>
                <div>
                  <p className="text-[11px] text-[#9E8B95]">Status</p>
                  <p className="font-semibold text-emerald-600">Terbuka untuk kolaborasi</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
