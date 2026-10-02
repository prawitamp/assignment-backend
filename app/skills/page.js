import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function SkillsPage() {
  const frontendSkills = [
    {
      title: "Desain Antarmuka Responsif",
      desc: "Menyusun layout modern yang nyaman dilihat di desktop maupun ponsel, memanfaatkan utilitas Tailwind CSS dan komponen berbasis desain modern.",
      tag: "Tailwind CSS",
    },
    {
      title: "Arsitektur Komponen & Routing",
      desc: "Mengelola navigasi dinamis dan struktur halaman menggunakan Next.js App Router, memadukan Server Components dan Client Components secara efektif.",
      tag: "Next.js App Router",
    },
    {
      title: "Pengelolaan State Global",
      desc: "Menerapkan React Context API agar data seperti koleksi user favorit dapat diakses dan diperbarui secara konsisten dari komponen manapun.",
      tag: "React Context API",
    },
  ];

  const backendSkills = [
    {
      title: "RESTful API & Route Handlers",
      desc: "Membangun endpoint API backend kustom untuk melayani operasi CRUD lengkap: GET data, POST item baru, PATCH catatan, hingga DELETE.",
      tag: "Next.js Route Handlers",
    },
    {
      title: "Mutasi Data via Server Actions",
      desc: "Menjalankan fungsi langsung di server untuk menambah atau menghapus data, lalu memperbarui tampilan secara otomatis menggunakan revalidatePath.",
      tag: "Server Actions",
    },
    {
      title: "Validasi Request & Middleware",
      desc: "Memvalidasi body JSON untuk mencegah request yang tidak lengkap (400 Bad Request) serta mencatat log setiap request yang masuk.",
      tag: "Validation & Middleware",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
          <span>✨</span>
          <span>Skills &amp; Tech Stack</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-5xl">
          Tech Stack I've Explored
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#6E5D66] max-w-2xl mx-auto leading-relaxed">
          Here are the skills and technologies I've explored and applied in my journey of becoming a fullstack web developer.
        </p>
      </div>

      <div className="space-y-12">
        {/* Frontend Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-pink-600 font-bold text-sm bg-pink-100/80 px-2 py-0.5 rounded-md">#01</span>
            <h2 className="text-lg font-bold text-[#2A1D24] tracking-tight">
              Front-End Development
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {frontendSkills.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-5 hover:border-pink-200 transition-all shadow-sm hover:shadow-md hover:shadow-pink-100/50 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700 mb-3 border border-pink-200/80">
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-bold text-[#2A1D24] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#6E5D66] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-rose-600 font-bold text-sm bg-rose-100/80 px-2 py-0.5 rounded-md">#02</span>
            <h2 className="text-lg font-bold text-[#2A1D24] tracking-tight">
              Back-End Development
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {backendSkills.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-5 hover:border-pink-200 transition-all shadow-sm hover:shadow-md hover:shadow-pink-100/50 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700 mb-3 border border-rose-200/80">
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-bold text-[#2A1D24] mb-2">{item.title}</h3>
                  <p className="text-xs text-[#6E5D66] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/contact"
          className={buttonVariants({
            variant: "default",
            size: "default",
            className: "font-semibold px-7 shadow-md shadow-pink-200",
          })}
        >
          Hubungi Saya untuk Kolaborasi &rarr;
        </Link>
      </div>
    </div>
  );
}
