# Panduan Deploy — Portfolio Yasykury

Aplikasi ini Next.js (full-stack). Cara termudah & gratis: **Vercel** + domain.

---

## 1. Upload ke GitHub

```bash
# (sudah di-init & commit otomatis)
git remote add origin https://github.com/USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Buat repo kosong dulu di https://github.com/new (jangan centang "Add README").

## 2. Deploy ke Vercel

1. Daftar di https://vercel.com pakai akun GitHub (gratis).
2. **Add New → Project → Import** repo `portfolio`.
3. Framework akan terdeteksi otomatis (Next.js). Klik **Deploy**.
4. Selesai → dapat URL `namamu.vercel.app`.

> Alternatif tanpa GitHub: `npm i -g vercel` lalu jalankan `vercel` di folder ini.

## 3. Environment Variables (penting untuk form kontak)

Di Vercel: **Project → Settings → Environment Variables**, tambahkan:

| Key | Value | Catatan |
|-----|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://yasykury.com` | domain final kamu |
| `RESEND_API_KEY` | `re_xxx` | dari https://resend.com (gratis) |
| `CONTACT_TO` | `yasykury@outlook.com` | tujuan email masuk |
| `CONTACT_FROM` | `Portfolio <onboarding@resend.dev>` | atau alamat di domain yang sudah diverifikasi di Resend |

Setelah menambah env vars, klik **Redeploy** agar diterapkan.

### Setup Resend (untuk form kontak)
1. Daftar di https://resend.com → **API Keys → Create** → salin ke `RESEND_API_KEY`.
2. Untuk uji coba cepat, pakai `CONTACT_FROM=Portfolio <onboarding@resend.dev>` (hanya bisa kirim ke email kamu sendiri yang terverifikasi).
3. Agar bisa kirim dari `hello@yasykury.com`: **Domains → Add Domain** di Resend, lalu tambahkan DNS record yang diberikan di registrar domain.

> Tanpa `RESEND_API_KEY`, form tetap jalan tapi pesan disimpan ke file lokal saja (cocok untuk dev, **tidak** untuk production di Vercel karena filesystem serverless bersifat sementara).

## 4. Pasang domain (yasykury.com / yasykury.id)

**Beli domain:**
- `.com` → Namecheap / Cloudflare / GoDaddy (bebas).
- `.id` → registrar Indonesia: Niagahoster / Domainesia / Rumahweb (**wajib KTP**).

**Hubungkan ke Vercel:**
1. Vercel → **Project → Settings → Domains → Add** → ketik `yasykury.com`.
2. Vercel menampilkan DNS record. Masukkan di panel DNS domain kamu:
   - Domain utama (`yasykury.com`): **A record** → `76.76.21.21`
   - `www`: **CNAME** → `cname.vercel-dns.com`
   (Ikuti instruksi persis yang ditampilkan Vercel — bisa beda.)
3. Tunggu propagasi (beberapa menit–beberapa jam). HTTPS/SSL otomatis aktif.
4. Update env `NEXT_PUBLIC_SITE_URL` ke domain final, lalu **Redeploy**.

---

## Update konten ke depan
Cukup edit kode lalu:
```bash
git add . && git commit -m "Update konten" && git push
```
Vercel auto-deploy setiap kali push ke `main`.

## Cek lokal sebelum deploy
```bash
npm run build && npm run start   # uji versi production di http://localhost:3000
```
