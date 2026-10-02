"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoriteContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function ProfilePage() {
  const { favoritesCount } = useFavorites();

  const skills = [
    "Next.js App Router",
    "React.js",
    "Node.js",
    "RESTful API",
    "Route Handlers",
    "Server Actions",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "Git & GitHub",
    "Data Validation",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
          <span>👩‍💻</span>
          <span>Profil</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-5xl">
          Profil Developer
        </h1>
        <p className="mt-2 text-sm text-[#6E5D66]">
          Informasi profil peserta dan rangkuman aktivitas di dalam aplikasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border border-[#F0DFD7] bg-white/95 p-6 shadow-sm hover:shadow-md transition-all rounded-2xl">
          <CardHeader className="p-0 pb-6 flex flex-row items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 font-black text-white flex items-center justify-center text-xl shadow-md shadow-pink-200/70 shrink-0">
              PM
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-[#2A1D24]">
                Prawita Mepilianti
              </CardTitle>
              <p className="text-xs text-[#7E6A74] mt-0.5">
                prawita@gmail.com • <span className="text-pink-600 font-semibold">@prawitamp</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-block rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-[10px] font-semibold px-2.5 py-0.5">
                  Bootcamp AI Fullstack Web Development
                </span>
                <a
                  href="/api/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2"
                >
                  Lihat JSON API &rarr;
                </a>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-5 text-xs text-[#4A3B43] border-t border-[#F0DFD7] pt-5">
            <div>
              <h4 className="font-bold text-[#2A1D24] mb-1.5">Tentang Saya:</h4>
              <p className="text-[#6E5D66] leading-relaxed">
                Halo! Saya Prawita, peserta program bootcamp Perempuan Inovasi 2026. Saya berfokus mendalami pengembangan aplikasi web modern secara menyeluruh (fullstack web development).
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#2A1D24] mb-2">Tech Stack &amp; Tools:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-pink-50/90 border border-pink-200/80 px-2.5 py-1 text-pink-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0DFD7] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#6E5D66]">
              <div>
                <span className="text-[#9E8B95] block text-[11px]">Program:</span>
                <span className="text-[#2A1D24] font-semibold">Perempuan Inovasi × IBM SkillsBuild</span>
              </div>
              <div>
                <span className="text-[#9E8B95] block text-[11px]">Fokus Pembelajaran:</span>
                <span className="text-[#2A1D24] font-semibold">Fullstack Web Development</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-[#F0DFD7] bg-white/95 p-6 text-center shadow-sm hover:shadow-md transition-all rounded-2xl">
            <p className="text-xs text-[#7E6A74] font-medium">User Favorit Anda</p>
            <p className="mt-2 text-4xl font-black bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {favoritesCount}
            </p>
            <p className="mt-1 text-[11px] text-[#9E8B95]">Tersimpan via REST API Favorites</p>
            <div className="mt-4">
              <Link
                href="/favorites"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "w-full rounded-full text-xs text-[#2A1D24] border-[#F0DFD7] bg-white hover:bg-pink-50 hover:border-pink-200",
                })}
              >
                Lihat Halaman Favorit &rarr;
              </Link>
            </div>
          </Card>

          
        </div>
      </div>
    </div>
  );
}
