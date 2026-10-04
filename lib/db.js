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

export let users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: { name: "Romaguera-Crona" },
    address: { city: "Gwenborough" },
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: { name: "Deckow-Crist" },
    address: { city: "Wisokyburgh" },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: { name: "Romaguera-Jacobson" },
    address: { city: "McKenziehaven" },
  },
];



