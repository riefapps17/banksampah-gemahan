# Bank Sampah Barokah Gemahan RT 03 - Web Wrapper & SEO Portal

Website Pembungkus (Wrapper) resmi untuk aplikasi sistem informasi dan tabungan nasabah **Bank Sampah Barokah Gemahan RT 03, Ringinharjo, Bantul**.

Aplikasi ini dibangun menggunakan **React + Vite + Tailwind CSS** dengan optimasi kecepatan akses Google Apps Script, sitemap dinamis, dan meta tag Schema.org untuk pengindeksan organik Google.

---

## 🚀 Panduan Menautkan ke GitHub & Deploy ke GitHub Pages

Proyek ini telah dikonfigurasi penuh dengan dukungan GitHub Pages otomatis via **GitHub Actions** (`.github/workflows/deploy.yml`).

### Langkah 1: Tautkan Sandbox ini ke Repositori GitHub
1. Di antarmuka AI Studio Build, gunakan opsi **Export to GitHub** atau buat repository baru di akun GitHub Anda (misalnya bernama `banksampah-gemahan`).
2. Push / Sinkronkan seluruh file proyek ini ke branch `main`.

### Langkah 2: Aktifkan GitHub Pages di Repositori
1. Buka repositori Anda di GitHub.
2. Masuk ke menu **Settings** > **Pages** (di bilah kiri).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih **GitHub Actions** (bukan *Deploy from a branch*).
4. GitHub Actions akan otomatis menjalankan alur kerja di `.github/workflows/deploy.yml` dan mempublikasikan website Anda!

Setelah proses selesai (sekitar 1–2 menit), website Anda akan aktif di alamat:
```
https://<username-github>.github.io/<nama-repo>/
```

---

## 🌐 Menghubungkan Custom Domain Sendiri (Opsional)
Jika ingin menggunakan domain pendek dan resmi seperti `banksampahgemahan.my.id`:
1. Beli domain di penyedia domain Indonesia (misal domain `.my.id` seharga ~Rp 15.000/tahun).
2. Di **Settings** > **Pages** repositori GitHub Anda, masukkan nama domain di bagian **Custom domain**.
3. Arahkan DNS domain Anda ke IP GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. Centang **Enforce HTTPS** untuk sertifikat SSL gratis otomatis.

---

## 🔍 Mendaftarkan ke Google Search Console (GSC)
Setelah live di GitHub Pages:
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Daftarkan URL GitHub Pages Anda (misal `https://<username>.github.io/<nama-repo>/`).
3. Masuk ke menu **Peta Situs (Sitemaps)** lalu kirimkan `sitemap.xml`.
4. Klik **Inspeksi URL** > **Minta Pengindeksan** untuk mempercepat proses indeks dalam 24–48 jam.
