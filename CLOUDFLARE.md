# Perlindungan Cloudflare — Portfolio Yasykury

Tiga lapisan, **semuanya gratis**. Lapisan 1 (security headers) **sudah aktif di kode**.
Lapisan 2 & 3 butuh akun kamu — ikuti langkah di bawah.

| Lapisan | Apa | Status |
|---|---|---|
| 1. Security headers | HSTS, anti-clickjacking, anti-MIME-sniff, dll. | ✅ sudah di kode |
| 2. Cloudflare Proxy + WAF | DDoS protection, firewall, bot filter, CDN, SSL | ⬜ langkah di bawah (Bagian A) |
| 3. Turnstile | anti-bot di form kontak | ⬜ langkah di bawah (Bagian B) |

---

## Bagian A — Proxy + WAF (perlindungan utama)

Memindahkan domain ke Cloudflare = traffic pengunjung lewat jaringan Cloudflare dulu
sebelum ke Vercel. Cloudflare menyaring serangan/bot dan menyembunyikan origin.

> **Urutan penting** supaya situs tidak down saat pindah. Ikuti persis.

### 1. Daftarkan domain ke Cloudflare
1. Daftar/masuk di https://dash.cloudflare.com (gratis).
2. **Add a site** → ketik `yasykury.com` → pilih plan **Free** → **Continue**.
3. Cloudflare otomatis men-scan DNS yang ada. Pastikan dua record ini terbaca
   (nilai saat ini terdeteksi dari domainmu — kalau tidak ikut ter-scan, tambahkan manual):

   | Type | Name | Content | Proxy |
   |---|---|---|---|
   | `A` | `yasykury.com` (atau `@`) | `216.198.79.1` | **DNS only (abu-abu)** dulu |
   | `CNAME` | `www` | `84eacee0b1711e94.vercel-dns-017.com` | **DNS only (abu-abu)** dulu |

   > Set dulu **DNS only** (awan abu-abu), belum proxy. Cocokkan juga dengan nilai
   > yang ditampilkan di **Vercel → Project → Settings → Domains** kalau berbeda.

### 2. Ganti nameserver di Hostinger
Cloudflare akan memberi **2 nameserver** (mis. `xxx.ns.cloudflare.com`).
1. Masuk Hostinger → **Domains → yasykury.com → DNS / Nameservers**.
2. Ganti nameserver dari `horizon.dns-parking.com` & `orbit.dns-parking.com`
   menjadi **2 nameserver Cloudflare** tadi. Simpan.
3. Balik ke Cloudflare, tunggu status domain jadi **Active** (beberapa menit–jam).
   Selama ini situs tetap jalan (masih DNS only → langsung ke Vercel).

### 3. Aktifkan SSL yang benar (WAJIB — cegah error redirect)
Cloudflare → **SSL/TLS → Overview** → set mode ke **Full (strict)**.

> ⚠️ Jangan pilih **Flexible** — bikin "ERR_TOO_MANY_REDIRECTS" karena Vercel
> memaksa HTTPS. Harus **Full** atau **Full (strict)**.

### 4. Nyalakan proxy (orange cloud)
Di **DNS**, klik awan pada record `A @` dan `CNAME www` sampai jadi **oranye (Proxied)**.
Sekarang traffic sudah lewat Cloudflare. Buka https://yasykury.com — pastikan normal.

> Vercel mungkin menandai domain "misconfigured" karena melihat IP Cloudflare.
> Itu **wajar**, situs tetap jalan. Jangan hapus domain dari Vercel.

### 5. Nyalakan proteksi gratis
- **SSL/TLS → Edge Certificates**: `Always Use HTTPS` **ON**, `Automatic HTTPS Rewrites` **ON**, `Minimum TLS Version` = **1.2**.
- **Security → Bots**: `Bot Fight Mode` **ON**.
- **Security → WAF**: aktifkan **Cloudflare Free Managed Ruleset**.
- **Security → Settings**: `Security Level` = **Medium** (atau High kalau mau ketat).
- (opsional) **Scrape Shield**: `Email Address Obfuscation` **ON**.

Selesai — situs sudah di belakang Cloudflare dengan DDoS protection + WAF gratis. ✅

---

## Bagian B — Turnstile (anti-bot form kontak)

Kode sudah siap. Form **otomatis aktif** begitu kedua key diisi; sebelum itu form
jalan normal seperti biasa.

### 1. Buat widget Turnstile
1. Cloudflare → **Turnstile → Add widget**.
2. Isi:
   - **Name**: `yasykury portfolio`
   - **Domains**: `yasykury.com` dan `www.yasykury.com` (tambah `localhost` kalau mau tes lokal)
   - **Widget mode**: **Managed** (disarankan)
3. **Create** → salin **Site Key** dan **Secret Key**.

### 2. Masukkan key ke Vercel
**Vercel → Project (portofolio) → Settings → Environment Variables**, tambah:

| Key | Value | Scope |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | (Site Key) | Production, Preview, Development |
| `TURNSTILE_SECRET_KEY` | (Secret Key) | Production, Preview |

### 3. Redeploy
**Deployments → ⋯ → Redeploy** (atau push commit baru). Widget Turnstile muncul di
form kontak dan server menolak submit yang gagal verifikasi.

> Tes lokal: pakai test key resmi Cloudflare (selalu lolos):
> Site `1x00000000000000000000AA`, Secret `1x0000000000000000000000000000000AA`.

---

## Bagian C — Security headers (sudah aktif)

Sudah ditambahkan di [`next.config.mjs`](next.config.mjs): `Strict-Transport-Security`,
`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
Aktif otomatis setelah deploy. Tidak ada yang perlu kamu lakukan.
