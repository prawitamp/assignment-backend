import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#F0DFD7] bg-[#FAF6F0]/90 py-10 text-[#7E6A74]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 font-extrabold text-white text-xs shadow-xs">
              PM
            </div>
            <div>
              <p className="text-sm font-bold text-[#2A1D24]">Perempuan Inovasi 2026</p>
              <p className="text-xs text-[#9E8B95]">
                Dibuat oleh <span className="text-pink-600 font-medium">@prawitamp</span> • Bootcamp AI Fullstack Web Development
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
