import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { FavoriteProvider } from "@/context/FavoriteContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Back-End & Fullstack Development - Prawita Mepilianti",
  description:
    "Project Back-End Development Bootcamp Perempuan Inovasi & IBM SkillsBuild oleh Prawita Mepilianti",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="light">
      <body className={`min-h-screen bg-[#FAF6F0] text-[#35252E] flex flex-col antialiased selection:bg-pink-200 selection:text-pink-900 relative ${plusJakartaSans.className}`}>
        {/* Aesthetic Ambient Pastel Glow Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
          <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
          <div className="absolute top-2/3 left-1/4 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-pink-100/60 blur-3xl" />
        </div>

        <UserProvider>
          <FavoriteProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </FavoriteProvider>
        </UserProvider>
      </body>
    </html>
  );
}
