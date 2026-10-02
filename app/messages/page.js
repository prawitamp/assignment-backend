import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs text-pink-700 font-semibold mb-3">
            <span>💌</span>
            <span>Kotak Masuk</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#2A1D24] sm:text-4xl">
            Pesan Masuk
          </h1>
          <p className="mt-2 text-sm text-[#6E5D66]">
            Daftar pesan dan formulir kontak yang dikirimkan oleh pengunjung situs.
          </p>
        </div>

        <Link
          href="/contact"
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "font-semibold px-5 shadow-sm shadow-pink-200 w-fit",
          })}
        >
          + Kirim Pesan Baru
        </Link>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-10 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 border border-pink-200 text-xl mb-3">
              📭
            </div>
            <h3 className="text-base font-bold text-[#2A1D24]">Belum Ada Pesan Masuk</h3>
            <p className="mt-1 text-xs text-[#6E5D66] max-w-md mx-auto">
              Saat ini belum ada pesan yang masuk dari formulir kontak.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="text-xs text-pink-600 hover:text-pink-700 font-semibold underline underline-offset-4"
              >
                Kirim Pesan Pertama &rarr;
              </Link>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#F0DFD7] bg-white/95 p-5 hover:border-pink-200 transition-all shadow-sm hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#2A1D24]">{msg.name}</h3>
                  <span className="text-xs text-[#7E6A74]">({msg.email})</span>
                </div>
                <p className="mt-1.5 text-xs text-[#4A3B43] whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
                {msg.createdAt && (
                  <p className="mt-2 text-[10px] text-[#9E8B95] font-mono">
                    {new Date(msg.createdAt).toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              <div>
                <form action={deleteMessageAction.bind(null, msg.id)}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-500 hover:text-white transition-all shadow-2xs"
                  >
                    <span>🗑️</span>
                    <span>Hapus</span>
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
