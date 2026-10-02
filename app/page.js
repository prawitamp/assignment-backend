import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/90 px-4 py-1.5 text-xs text-pink-700 font-semibold shadow-xs mb-8">
          <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
          <span>Portofolio Fullstack Web Development • Perempuan Inovasi 2026</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#2A1D24] sm:text-6xl md:text-7xl leading-tight">
          Halo, saya <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 bg-clip-text text-transparent">Prawita</span>. <br />
          <span className="bg-gradient-to-r from-[#2A1D24] via-[#5C4551] to-[#2A1D24] bg-clip-text text-transparent">
            Membangun Web Modern dari Frontend hingga Backend.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#6E5D66] leading-relaxed">
          Selamat datang! Website ini merangkum proses belajar saya dalam membangun aplikasi web, mulai dari antarmuka interaktif dengan React &amp; Tailwind CSS, hingga arsitektur backend menggunakan Next.js Route Handlers, REST API (CRUD), dan Server Actions.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/users"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "font-semibold px-7 shadow-lg shadow-pink-200/70",
            })}
          >
            Lihat Direktori User &rarr;
          </Link>
          <Link
            href="/skills"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "px-7 border-[#F0DFD7] bg-white text-[#2A1D24] hover:bg-pink-50/80 hover:border-pink-200 shadow-sm",
            })}
          >
            Eksplorasi Skills
          </Link>
        </div>
      </div>
    </div>
  );
}
