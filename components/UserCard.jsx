"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoriteContext";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function UserCard({ user, onEdit, onDelete }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showDetail, setShowDetail] = useState(false);
  const favorited = isFavorite(user.id);

  const companyName =
    typeof user.company === "object" ? user.company?.name : user.company || "Independent";

  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-[#F0DFD7] bg-white/95 hover:border-pink-200 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-pink-100/60 rounded-2xl">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-100/80 border border-pink-200 font-bold text-sm text-pink-700">
            {getInitials(user.name)}
          </div>

          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base font-bold text-[#2A1D24]">
              {user.name}
            </CardTitle>
            <p className="mt-1 truncate text-xs text-[#7E6A74]">{user.email}</p>
            <p className="mt-0.5 truncate text-xs font-semibold text-pink-600">
              {companyName}
            </p>
            {user.note && (
              <p className="mt-1.5 rounded-lg bg-pink-50 border border-pink-200 px-2 py-1 text-[11px] text-pink-700">
                📝 {user.note}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        {showDetail && (
          <div className="my-3 rounded-xl border border-pink-100 bg-pink-50/50 p-3 text-xs text-[#4A3B43] space-y-1.5 animate-in fade-in duration-200">
            {user.phone && (
              <p className="flex justify-between">
                <span className="text-[#8D7B85]">Telepon:</span>
                <span className="font-mono text-[#2A1D24] font-medium">{user.phone}</span>
              </p>
            )}
            {user.website && (
              <p className="flex justify-between">
                <span className="text-[#8D7B85]">Website:</span>
                <span className="text-pink-600 font-medium">{user.website}</span>
              </p>
            )}
            {user.address && (
              <p className="flex justify-between">
                <span className="text-[#8D7B85]">Kota:</span>
                <span className="text-[#2A1D24]">
                  {typeof user.address === "object" ? user.address.city : user.address}
                </span>
              </p>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetail(!showDetail)}
            className="flex-1 rounded-full border-[#F0DFD7] bg-white text-xs font-medium text-[#4A3B43] hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200"
          >
            {showDetail ? "Tutup Detail" : "Lihat Detail"}
          </Button>

          <Button
            variant={favorited ? "default" : "secondary"}
            size="sm"
            onClick={() => toggleFavorite(user)}
            className={`rounded-full px-3 text-xs font-semibold transition-all ${
              favorited
                ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xs hover:opacity-95 border-transparent"
                : "border-pink-200 bg-white text-pink-700 hover:bg-pink-50 hover:border-pink-300"
            }`}
          >
            {favorited ? (
              <span className="flex items-center gap-1.5">
                <span>❤️</span>
                <span>Favorit</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span>♡</span>
                <span>Tambah Favorit</span>
              </span>
            )}
          </Button>
        </div>

        {(onEdit || onDelete) && (
          <div className="mt-2.5 flex items-center gap-2 pt-2.5 border-t border-[#F7EBE5]">
            {onEdit && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onEdit(user)}
                className="flex-1 rounded-full border-[#F0DFD7] bg-white text-xs font-semibold text-[#5A4550] hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300"
              >
                <span className="mr-1">✏️</span>
                <span>Edit</span>
              </Button>
            )}

            {onDelete && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onDelete(user)}
                className="flex-1 rounded-full border border-rose-200 bg-rose-50/70 text-xs font-semibold text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <span className="mr-1">🗑️</span>
                <span>Hapus</span>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

