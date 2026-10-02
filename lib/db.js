// "Database" sementara - array di memori server.
// Data akan reset tiap kali server di-restart.
export let favorites = [];
export let messages = [
  {
    id: 1,
    name: "Sarah Anggraini",
    email: "sarah.anggraini@example.com",
    message: "Halo Prawita, salam kenal! Saya melihat portofolio Anda dan tertarik mengajak kolaborasi dalam proyek web application. Apakah ada waktu untuk diskusi singkat?",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Dimas Setiawan",
    email: "dimas.setiawan@techcorp.id",
    message: "Halo, profil keahlian Fullstack Web Development Anda sangat menarik. Kami sedang membuka peluang project freelance, boleh minta kontak LinkedIn-nya?",
    createdAt: new Date().toISOString(),
  },
];


