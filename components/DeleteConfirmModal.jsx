"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  userName = "pengguna ini",
  isDeleting = false,
}) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md rounded-3xl border border-rose-100 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-xl text-rose-600">
            🗑️
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#2A1D24]">
              Hapus Pengguna?
            </h3>
            <p className="mt-1.5 text-xs text-[#6E5D66] leading-relaxed">
              Apakah Anda yakin ingin menghapus data pengguna{" "}
              <span className="font-semibold text-rose-700 underline decoration-rose-300">
                {userName}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-[#F8EFEA]">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-full px-5 text-xs font-medium"
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full px-5 text-xs font-semibold shadow-sm shadow-rose-200"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus Pengguna"}
          </Button>
        </div>
      </div>
    </div>
  );
}
