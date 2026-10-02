"use client";

import React from "react";
import Link from "next/link";
import UserCard from "@/components/UserCard";
import { useFavorites } from "@/context/FavoriteContext";
import { buttonVariants } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
          <span>💖</span>
          <span>Koleksi Favorit</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-4xl">
            Pengguna Favorit
          </h1>
          <span className="rounded-full bg-pink-100/90 border border-pink-200 px-3.5 py-1 text-xs font-bold text-pink-700">
            {favoritesCount} Pengguna
          </span>
        </div>
        <p className="mt-2 text-sm text-[#6E5D66]">
          Daftar pengguna yang telah Anda simpan ke dalam daftar favorit via API.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-12 text-center max-w-lg mx-auto mt-10 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 border border-pink-200 text-2xl mb-4 shadow-xs">
            🌸
          </div>
          <h3 className="text-lg font-bold text-[#2A1D24]">Belum Ada Pengguna Favorit</h3>
          <p className="mt-2 text-sm text-[#6E5D66] leading-relaxed">
            Anda belum menambahkan pengguna ke dalam daftar favorit. Silakan kunjungi halaman direktori pengguna dan klik tombol <strong>Tambah Favorit</strong>.
          </p>
          <div className="mt-6">
            <Link
              href="/users"
              className={buttonVariants({
                variant: "default",
                size: "default",
                className: "font-semibold px-6 shadow-md shadow-pink-200",
              })}
            >
              Buka Direktori Pengguna &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
