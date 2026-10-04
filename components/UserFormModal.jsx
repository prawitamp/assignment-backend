"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        company:
          typeof initialData.company === "object"
            ? initialData.company?.name || ""
            : initialData.company || "",
        phone: initialData.phone || "",
        website: initialData.website || "",
        city:
          typeof initialData.address === "object"
            ? initialData.address?.city || ""
            : initialData.city || initialData.address || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        website: "",
        city: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Format email tidak valid (contoh: user@example.com).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-3xl border border-[#F0DFD7] bg-white p-6 sm:p-7 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#F7EBE5]">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-0.5 text-[11px] text-pink-700 font-semibold mb-2">
              <span>{isEdit ? "Edit Pengguna" : "Pengguna Baru"}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#2A1D24]">
              {isEdit ? "Edit Data Pengguna" : "Tambah Pengguna Baru"}
            </h2>
            <p className="mt-1 text-xs text-[#7E6A74]">
              {isEdit
                ? "Ubah data pengguna di bawah ini."
                : "Masukkan data untuk menambahkan user baru ke daftar."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8D7B85] hover:bg-pink-50 hover:text-pink-700 transition-colors"
            aria-label="Tutup modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Contoh: Sarah Permata"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={errors.name ? "border-rose-300 focus-visible:ring-rose-200" : ""}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
              Alamat Email <span className="text-rose-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Contoh: sarah@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={errors.email ? "border-rose-300 focus-visible:ring-rose-200" : ""}
            />
            {errors.email && (
              <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
                Perusahaan / Instansi
              </label>
              <Input
                type="text"
                placeholder="Contoh: Tech Corp"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
                Kota Domisili
              </label>
              <Input
                type="text"
                placeholder="Contoh: Jakarta"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
                Nomor Telepon
              </label>
              <Input
                type="text"
                placeholder="Contoh: 0812-3456-7890"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35252E] mb-1.5">
                Website / Portofolio
              </label>
              <Input
                type="text"
                placeholder="Contoh: sarah.id"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-[#F7EBE5]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full px-5 text-xs font-medium"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="rounded-full px-6 text-xs font-semibold shadow-md shadow-pink-200"
            >
              {isSubmitting
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "+ Tambahkan Pengguna"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
