"use client";

import React, { useState, useEffect } from "react";
import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data user dari server");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(term);
    const emailMatch = user.email.toLowerCase().includes(term);
    const companyName =
      typeof user.company === "object" ? user.company?.name : user.company || "";
    const companyMatch = companyName.toLowerCase().includes(term);

    return nameMatch || emailMatch || companyMatch;
  });

  if (loading) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-pink-200 border-t-pink-500" />
          <p className="text-sm font-medium text-[#7E6A74]">Memuat data pengguna...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-center max-w-md shadow-sm">
          <h2 className="font-bold text-rose-700 text-lg">Terjadi Kesalahan</h2>
          <p className="mt-2 text-sm text-[#7E6A74]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 transition-colors shadow-xs"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
          <span>👥</span>
          <span>Eksplorasi Data</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-4xl">
          Daftar Pengguna
        </h1>
        <p className="mt-2 text-sm text-[#6E5D66]">
          Data pengguna yang diambil secara dinamis dari REST API. Anda dapat mencari berdasarkan nama atau perusahaan, melihat detail kontak, serta menyimpannya ke daftar favorit.
        </p>
      </div>

      <div className="mb-8 relative max-w-md">
        <Input
          type="text"
          placeholder="Cari berdasarkan nama, email, atau perusahaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-14 bg-white/95 border-[#F0DFD7]"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-pink-600 hover:text-pink-800"
          >
            Batal
          </button>
        )}
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#F0DFD7] bg-white/90 p-12 text-center shadow-sm">
          <p className="text-[#2A1D24] font-medium text-base">Tidak ada pengguna yang cocok.</p>
          <p className="mt-1 text-xs text-[#8D7B85]">
            Coba gunakan kata kunci pencarian yang lain.
          </p>
        </div>
      )}
    </div>
  );
}
