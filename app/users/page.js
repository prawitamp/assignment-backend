"use client";

import React, { useState, useEffect } from "react";
import UserCard from "@/components/UserCard";
import UserFormModal from "@/components/UserFormModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "app_users_data";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const savedData = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
          setLoading(false);
          return;
        }
      } catch {
        // fallback jika JSON di localStorage tidak valid
      }
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data user dari server");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
        setLoading(false);
      });
  }, []);

  const persistUsers = (newUsersList) => {
    setUsers(newUsersList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsersList));
    } catch {
      // ignore
    }
  };

  const handleAddUser = async (formData) => {
    setIsSubmitting(true);
    try {
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "-",
        website: formData.website.trim() || "-",
        company: {
          name: formData.company.trim() || "Independent",
        },
        address: {
          city: formData.city.trim() || "Indonesia",
        },
      };

      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      } catch {
        // opsional sync api
      }

      const updated = [newUser, ...users];
      persistUsers(updated);
      setIsAddModalOpen(false);
      setToast({
        type: "success",
        message: `Pengguna "${newUser.name}" berhasil ditambahkan!`,
      });
    } catch {
      setToast({
        type: "error",
        message: "Gagal menambahkan pengguna. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (formData) => {
    if (!editingUser) return;
    setIsSubmitting(true);
    try {
      const updatedUser = {
        ...editingUser,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "-",
        website: formData.website.trim() || "-",
        company: {
          ...(typeof editingUser.company === "object" ? editingUser.company : {}),
          name: formData.company.trim() || "Independent",
        },
        address: {
          ...(typeof editingUser.address === "object" ? editingUser.address : {}),
          city: formData.city.trim() || "Indonesia",
        },
      };

      try {
        await fetch(`/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
      } catch {
        // opsional sync api
      }

      const updated = users.map((u) =>
        u.id === editingUser.id ? updatedUser : u
      );
      persistUsers(updated);
      setEditingUser(null);
      setToast({
        type: "success",
        message: `Data pengguna "${updatedUser.name}" berhasil diperbarui!`,
      });
    } catch {
      setToast({
        type: "error",
        message: "Gagal memperbarui pengguna. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    setIsSubmitting(true);
    try {
      try {
        await fetch(`/api/users/${deletingUser.id}`, {
          method: "DELETE",
        });
      } catch {
        // opsional sync api
      }

      const updated = users.filter((u) => u.id !== deletingUser.id);
      persistUsers(updated);
      const deletedName = deletingUser.name;
      setDeletingUser(null);
      setToast({
        type: "success",
        message: `Pengguna "${deletedName}" berhasil dihapus dari daftar.`,
      });
    } catch {
      setToast({
        type: "error",
        message: "Gagal menghapus pengguna. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetData = async () => {
    if (!confirm("Kembalikan daftar pengguna ke data awal dari server?")) return;
    setLoading(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setToast({
        type: "success",
        message: "Daftar pengguna telah di-reset ke data bawaan!",
      });
    } catch {
      setToast({
        type: "error",
        message: "Gagal me-reset data pengguna.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    const nameMatch = (user.name || "").toLowerCase().includes(term);
    const emailMatch = (user.email || "").toLowerCase().includes(term);
    const companyName =
      typeof user.company === "object" ? user.company?.name : user.company || "";
    const companyMatch = (companyName || "").toLowerCase().includes(term);

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
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
              toast.type === "error"
                ? "border-rose-200 bg-rose-50/95 text-rose-800"
                : "border-pink-200 bg-white/95 text-[#2A1D24]"
            }`}
          >
            <span className="text-base">
              {toast.type === "error" ? "⚠️" : "🎉"}
            </span>
            <p className="text-xs font-semibold">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-xs text-[#8D7B85] hover:text-[#2A1D24]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
            <span>👥</span>
            <span>Eksplorasi Data</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-4xl">
            Daftar Pengguna
          </h1>
          <p className="mt-2 text-sm text-[#6E5D66] max-w-2xl">
            Kelola dan jelajahi data pengguna secara dinamis. Anda dapat menambah pengguna baru, mengubah profil, menghapus data, atau menyimpannya ke daftar favorit.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-full px-5 py-2.5 font-semibold text-xs sm:text-sm shadow-md shadow-pink-200/70 shrink-0 gap-1.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:opacity-95 cursor-pointer"
          >
            <span className="text-base leading-none">＋</span>
            <span>Tambah Pengguna</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetData}
            title="Reset data ke bawaan API"
            className="rounded-full border-[#F0DFD7] bg-white text-xs text-[#7E6A74] hover:bg-pink-50 hover:text-pink-700"
          >
            🔄 Reset
          </Button>
        </div>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
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

        <div className="text-xs font-medium text-[#7E6A74] flex items-center gap-1.5 self-end sm:self-auto">
          <span>Menampilkan</span>
          <span className="rounded-full bg-pink-100 border border-pink-200 px-2 py-0.5 font-bold text-pink-700">
            {filteredUsers.length}
          </span>
          <span>dari {users.length} pengguna</span>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => setEditingUser(u)}
              onDelete={(u) => setDeletingUser(u)}
            />
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

      <UserFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        initialData={null}
        isSubmitting={isSubmitting}
      />

      <UserFormModal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        onSubmit={handleEditUser}
        initialData={editingUser}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteUser}
        userName={deletingUser?.name}
        isDeleting={isSubmitting}
      />
    </div>
  );
}
