# ☁ CLOUDIO — Pixel Weather App

Web app cuaca bergaya Mario Bros dengan pixel art. Dibangun dengan React + Vite + Supabase + OpenWeatherMap.

---

## 🚀 STEP-BY-STEP SETUP

### LANGKAH 1 — Dapatkan OpenWeatherMap API Key

1. Buka https://openweathermap.org dan klik **Sign Up** (gratis)
2. Verifikasi email kamu
3. Login → klik nama profil → **My API Keys**
4. Salin API key yang sudah ada (atau buat baru)
5. ⚠️ **Penting:** API key baru butuh waktu ~10 menit agar aktif

---

### LANGKAH 2 — Setup Supabase

1. Buka https://supabase.com → klik **Start your project** (gratis)
2. Login dengan GitHub atau email
3. Klik **New project**, isi:
   - **Name:** cloudio-weather
   - **Database Password:** buat password yang kuat
   - **Region:** pilih yang terdekat (misal: Southeast Asia)
4. Tunggu project selesai dibuat (~2 menit)
5. Di sidebar kiri, klik **Settings → API**
6. Salin:
   - **Project URL** (bentuknya: https://xxxx.supabase.co)
   - **anon public** key (yang panjang di bawah "Project API Keys")
7. Di sidebar kiri, klik **SQL Editor**
8. Klik **New Query**, paste isi file `supabase_setup.sql`, lalu klik **Run**

---

### LANGKAH 3 — Setup Project Lokal

```bash
# Masuk ke folder project
cd cloudio-weather

# Install dependencies
npm install

# Buat file .env dari template
cp .env.example .env
```

Buka file `.env` dan isi dengan credentials kamu:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...  (paste anon key kamu)
VITE_OPENWEATHER_API_KEY=abc123...       (paste API key kamu)
```

---

### LANGKAH 4 — Jalankan Lokal

```bash
npm run dev
```

Buka browser → http://localhost:5173

---

### LANGKAH 5 — Deploy ke Vercel

1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/username/cloudio-weather.git
   git push -u origin main
   ```
2. Buka https://vercel.com → Login dengan GitHub
3. Klik **New Project** → Import repo `cloudio-weather`
4. Di bagian **Environment Variables**, tambahkan 3 variabel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENWEATHER_API_KEY`
5. Klik **Deploy** → tunggu ~1 menit
6. Website kamu live! 🎉

---

## 🔧 Supabase — Setup Auth Email (Penting!)

1. Di Supabase, klik **Authentication → Settings**
2. Di **Email Auth**, pastikan **Enable Email Signup** = ON
3. Untuk development, set **Confirm email** = OFF (biar bisa langsung login tanpa verifikasi)
4. Untuk production, nyalakan kembali untuk keamanan

---

## 📁 Struktur Project

```
cloudio-weather/
├── src/
│   ├── components/
│   │   ├── auth/         → AuthScreen (login, register, guest)
│   │   ├── weather/      → WeatherScreen (main app)
│   │   ├── ui/           → CloudMascot, PixelWeatherIcon, GuestWarningPopup
│   │   └── layout/       → Sky (background dinamis)
│   ├── hooks/            → useClock, useSkyTheme, useWeather
│   ├── lib/              → supabase.js, weather.js, i18n.js
│   └── styles/           → pixel.css
├── .env.example          → Template environment variables
├── supabase_setup.sql    → SQL untuk setup database
└── README.md
```

---

## 🌟 Fitur

- ☁ Maskot awan pixel Cloudio
- 🎮 Desain Mario Bros style (pixel art, font 8-bit, tanah pixel)
- 🌅 Langit dinamis — berubah sesuai waktu (fajar, pagi, siang, sore, senja, malam)
- ⏱ Jam real-time di HUD
- 📍 Deteksi lokasi otomatis via GPS
- 🌍 Tambah kota lain (tersimpan di database per user)
- 🌧 Prediksi hujan per jam dengan bar chart
- 📅 Forecast 5 hari dengan ikon pixel art
- ☀ Info matahari terbit/terbenam + UV Index
- 🔐 Auth: Login, Register, dan Guest mode
- 👤 Guest mode dengan popup peringatan fitur terkunci
- 🌐 Multi-bahasa: Indonesia, English, 日本語
- 📱 Responsive — semua device

---

## 🐛 Jika Ada Masalah

- **"City not found"** → Cek ejaan nama kota, gunakan bahasa Inggris (misal: "Jakarta" bukan "Jakarta Pusat")
- **Cuaca tidak muncul** → Cek API key di .env, tunggu 10 menit jika baru buat
- **Login gagal** → Cek Supabase URL dan anon key
- **Data demo muncul** → Normal jika API key belum diisi — itu placeholder data

