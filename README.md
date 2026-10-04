# Assignment Backend - Perempuan Inovasi 2026

Proyek tugas fase **Back-End Development** dalam program **Perempuan Inovasi**, bekerja sama dengan **IBM SkillsBuild** dan **Markoding**, di bawah bimbingan instruktur **Nur Indah Pratiwi**.

Dikembangkan oleh: **prawitamp** (Prawita Mepilianti)

---

## 🛠️ Tech Stack & Konsep
- **Framework:** Next.js (App Router)
- **Library:** React (Server Components, Client Components, Context API)
- **Backend Architecture:** Route Handlers, In-Memory DB (`lib/db.js`), Server Actions, Middleware, Validation
- **Styling:** Tailwind CSS & komponen berbasis shadcn/ui
- **Deployment:** Vercel

---

## ✨ Penerapan Fitur & Mini Challenge

### 1. Mini Challenge 1: Back-End Fundamentals & REST API
- Route Handler profil pribadi di `app/api/profile/route.js`.
- Mengembalikan response JSON berisi `name`, `role`, `favoriteTech`, `bio`, `email`, dan `location`.
- Endpoint dapat diakses melalui `http://localhost:3000/api/profile`.

### 2. Mini Challenge 2: Route Handlers & CRUD API Favorites
- In-memory database array `favorites` di `lib/db.js`.
- Endpoint koleksi di `app/api/favorites/route.js`:
  - `GET`: Mengambil semua daftar user favorit.
  - `POST`: Menambah user favorit baru dengan validasi (jika body kosong / tanpa `id` atau `name`, return status `400 Bad Request`, dan cek duplikasi user).
- Dynamic Route di `app/api/favorites/[id]/route.js`:
  - `PATCH`: Mengubah/menambahkan catatan (`note`) pada data favorit tertentu.
  - `DELETE`: Menghapus user favorit dari daftar berdasarkan ID (`200 OK` jika berhasil, `404 Not Found` jika tidak ditemukan).
- Integrasi ke `FavoriteContext.jsx`: State favorit di frontend kini tersambung langsung ke endpoint API menggunakan HTTP request `fetch()`.

### 3. Mini Challenge 3: Server Actions & Data Mutation
- In-memory database array `messages` di `lib/db.js`.
- Server Action `submitContactForm` di `app/contact/actions.js` untuk menerima input form kontak dan menyimpannya ke server.
- Server Action `deleteMessageAction` di `app/messages/actions.js` untuk menghapus pesan berdasarkan `id`, disertai pemanggilan `revalidatePath("/messages")`.
- Halaman `app/messages/page.js` untuk menampilkan daftar pesan masuk dengan tombol "Hapus" yang memicu Server Action secara reaktif tanpa perlu reload browser manual.

### 4. Middleware & Observability
- File `middleware.js` di root project untuk logging setiap request masuk (waktu, method, path) dan proteksi rute / maintenance mode berbasis environment variable (`MAINTENANCE_MODE`).

---

## 🚀 Menjalankan Proyek Secara Lokal

1. Clone repositori:
   ```bash
   git clone https://github.com/prawitamp/assignment-backend.git
   cd assignment-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server development:
   ```bash
   npm run dev
   ```

4. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🌐 Endpoint API untuk Pengujian (Thunder Client / Browser / cURL)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/profile` | Data profil developer |
| `GET` | `/api/favorites` | Ambil semua user favorit |
| `POST` | `/api/favorites` | Tambah user favorit baru (Body: `{ "id": 1, "name": "Leanne Graham", ... }`) |
| `PATCH` | `/api/favorites/:id` | Update note user favorit (Body: `{ "note": "Catatan..." }`) |
| `DELETE` | `/api/favorites/:id` | Hapus user favorit berdasarkan ID |
| `GET` | `/api/users` | List semua user |
| `POST` | `/api/users` | Tambah pengguna baru (Body: `{ "name": "...", "email": "...", ... }`) |
| `GET` | `/api/users/:id` | Detail user berdasarkan ID |
| `PUT` / `PATCH` | `/api/users/:id` | Perbarui data user berdasarkan ID |
| `DELETE` | `/api/users/:id` | Hapus user berdasarkan ID |

