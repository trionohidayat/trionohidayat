export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'GovTech' | 'Automation' | 'Web Engineering' | 'Architecture';
  tags: string[];
  featured?: boolean;
  content: string;
  author: {
    name: string;
    role: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'email-domain-gratis-tanpa-hosting-hostinger-improvmx-gmail',
    title: 'Panduan Setup Email Domain Sendiri Tanpa Sewa Hosting: Hostinger, ImprovMX, dan Gmail',
    excerpt:
      'Beli domain tanpa langganan email hosting bulanan? Pelajari cara kerja email forwarding dengan ImprovMX, konfigurasi DNS di Hostinger, dan trik SMTP gratis agar bisa kirim & terima email langsung dari Gmail.',
    date: '2026-09-11',
    readTime: '6 min read',
    category: 'Web Engineering',
    tags: ['Custom Domain', 'DNS', 'Hostinger', 'ImprovMX', 'Email Architecture', 'SMTP'],
    featured: true,
    author: {
      name: 'Triono Hidayat',
      role: 'Enterprise Systems Governance & Solutions Dev',
    },
    content: `
## Mitos: Punya Email Domain Harus Beli Hosting Mahal?

Banyak pengguna yang baru pertama kali membeli nama domain (misalnya di Hostinger, GoDaddy, atau Namecheap) merasa kaget ketika mengetahui bahwa **membeli domain saja belum otomatis memberi kotak masuk (inbox) email**.

Biasanya, penyedia domain akan langsung menawarkan paket tambahan:
- *Email Hosting Titan / Webmail*: Rp 15.000 - Rp 30.000 / bulan / akun.
- *Google Workspace (Gmail Domain)*: Sekitar Rp 100.000 / bulan / akun.
- *Microsoft 365*: Mulai dari Rp 90.000 / bulan / akun.

Untuk perusahaan skala enterprise atau instansi pemerintahan, biaya langganan tersebut tentu wajar demi jaminan SLA dan kepatuhan regulasi. Namun untuk **kebutuhan personal, freelancer, portofolio developer, atau UMKM tahap awal**, biaya bulanan berulang ini sering kali menjadi beban yang tidak efisien.

Pertanyaannya: **Bisakah kita memiliki email dengan domain kustom (misal: \`halo@domainkamu.com\`) tanpa membayar biaya hosting email sama sekali?**

Jawabannya: **Bisa.** Kuncinya terletak pada pemahaman arsitektur DNS, pemisahan fungsi *receiving* (penerimaan) dan *sending* (pengiriman), serta pemanfaatan layanan *email forwarding* seperti ImprovMX.

---

## Memahami Arsitektur: Domain vs Mail Server

Sebelum masuk ke konfigurasi teknis, mari pahami konsep dasarnya. Domain pada dasarnya adalah sistem penamaan (DNS) yang memetakan nama ke alamat IP atau server tujuan.

Domain **tidak memiliki penyimpanan fisik** untuk menampung berkas pesan email Anda.

Untuk menjalankan siklus komunikasi email secara penuh, ada dua subsistem yang bekerja:

1. **Inbound (Menerima Pesan):** Diatur oleh DNS **MX Record (Mail Exchange)**. Rekam DNS ini memberi tahu server pengirim di internet: *"Jika ada email untuk domain ini, kirimkan suratnya ke server X."*
2. **Outbound (Mengirim Pesan):** Ditangani oleh protokol **SMTP (Simple Mail Transfer Protocol)** yang dilengkapi verifikasi identitas (SPF, DKIM, dan DMARC) untuk membuktikan bahwa email tersebut bukan spam atau pemalsuan identitas (*spoofing*).

\`\`\`
[Pengirim Email Luar]
        │
        ▼ (MX Record)
┌─────────────────────────┐
│   ImprovMX Forwarder    │ (Menerima secara instan)
└─────────────────────────┘
        │
        ▼ (Forward via SMTP)
[Inbox Gmail Pribadi Anda] ───► Anda membaca email masuk
        │
        ▼ (Send Mail As)
┌─────────────────────────┐
│   SMTP Relay (Brevo)    │ (Mengirim dengan DKIM/SPF domain Anda)
└─────────────────────────┘
        │
        ▼
[Penerima Email Tujuan]
\`\`\`

Dengan skema di atas:
- **Penerimaan email:** Ditangani gratis oleh ImprovMX lalu diteruskan langsung ke Gmail pribadi.
- **Penyimpanan inbox:** Memanfaatkan kapasitas 15 GB gratis milik akun Google pribadi Anda.
- **Pengiriman email:** Menggunakan fitur *Send mail as* di Gmail yang dialirkan melalui server SMTP gratisan.

---

## Langkah 1: Membeli Domain di Hostinger

Langkah pertama adalah memiliki nama domain aktif:

1. Kunjungi situs resmi **Hostinger** dan cari nama domain yang Anda inginkan (misalnya \`.com\`, \`.id\`, atau \`.my.id\`).
2. Saat berada di halaman keranjang belanja (*checkout*), **lewati atau hilangkan centang pada penawaran tambahan** seperti *Business Email Hosting*, *Web Hosting*, atau paket berbayar lainnya.
3. Selesaikan pembayaran hingga domain resmi aktif di dashboard Hostinger Anda.

> **Catatan:** Anda hanya perlu status domain aktif. Kita akan memanfaatkan fitur pengelolaan DNS Zone bawaan Hostinger yang sudah tersedia tanpa biaya tambahan.

---

## Langkah 2: Pendaftaran di ImprovMX

ImprovMX adalah layanan *email forwarding* yang sangat andal dan menyediakan paket gratis (*Free Plan*):

1. Buka situs **ImprovMX.com**.
2. Masukkan nama domain Anda (misal: \`domainkamu.com\`) dan alamat email tujuan (misal: akun Gmail pribadi Anda \`namakamu@gmail.com\`).
3. Tentukan alias yang diinginkan:
- \`kontak@domainkamu.com\` diteruskan ke \`namakamu@gmail.com\`
- Atau gunakan *catch-all rule* (\`*@domainkamu.com\`) sehingga alamat apa pun yang dikirim ke domain Anda akan masuk ke satu inbox Gmail.
4. ImprovMX akan menampilkan instruksi konfigurasi DNS yang harus dimasukkan ke registrar domain Anda.

---

## Langkah 3: Konfigurasi DNS Zone di Hostinger

Kembali ke dashboard Hostinger Anda:

1. Buka menu **Domains** > Pilih domain Anda > Masuk ke tab **DNS / Nameservers** (atau **DNS Zone**).
2. Hapus MX Record lama jika ada bawaan default yang tidak digunakan.
3. Tambahkan **2 MX Records** dari ImprovMX:

\`\`\`dns
Type: MX | Name: @ | Mail Server: mx1.improvmx.com | Priority: 10
Type: MX | Name: @ | Mail Server: mx2.improvmx.com | Priority: 20
\`\`\`

4. Tambahkan **1 TXT Record** untuk otentikasi SPF (Sender Policy Framework):

\`\`\`dns
Type: TXT | Name: @ | Value: v=spf1 include:spf.improvmx.com ~all | TTL: 3600
\`\`\`

Setelah disimpan, kembali ke dashboard ImprovMX dan klik tombol **Check DNS Settings**. Jika statusnya berubah menjadi hijau (*Email forwarding active*), Anda sudah berhasil!

Cobalah kirim email uji coba dari akun lain ke \`kontak@domainkamu.com\`. Pesan tersebut akan langsung mendarat di inbox Gmail Anda dalam hitungan detik.

---

## Langkah 4: Jebakan "Kirim Email" & Solusi SMTP Gratis

Di tahap ini, Anda sudah bisa **menerima email secara gratis tanpa batas**.

Namun, muncul kendala baru ketika Anda ingin **membalas atau mengirim email baru**:
- ImprovMX versi gratis **hanya menyediakan forwarding (inbound)**. Fitur server pengiriman (SMTP outbound) di ImprovMX berbayar.
- Jika Anda langsung membalas dari Gmail biasa, penerima akan melihat alamat \`namakamu@gmail.com\`, bukan email domain kustom Anda.

### Solusi Gratis: Gunakan SMTP Relay Pihak Ketiga (Brevo / Resend)
Untuk mengirim email resmi atas nama domain secara cuma-cuma, kita bisa memanfaatkan penyedia SMTP transaksional gratis:

1. **Daftar Akun Brevo (dulu Sendinblue):**
- Paket gratis Brevo memberikan kuota **300 email per hari**. Ini lebih dari cukup untuk korespondensi personal atau portofolio.
2. **Tambahkan Domain Anda di Brevo:**
- Masuk ke menu *Senders, Domains & Dedicated IPs* > Tambahkan domain Anda.
- Brevo akan meminta Anda memasukkan record TXT (DKIM key) di DNS Hostinger untuk memvalidasi bahwa Anda adalah pemilik sah domain tersebut.
3. **Dapatkan Kredensial SMTP:**
- Masuk ke menu *SMTP & API* di Brevo.
- Catat detail SMTP:
- **SMTP Server:** \`smtp-relay.brevo.com\`
- **Port:** \`587\` (TLS)
- **Login / Username:** Email akun Brevo Anda
- **Master Password / SMTP Key:** Kunci rahasia yang digenerate di Brevo

---

## Langkah 5: Konfigurasi "Send Mail As" di Akun Gmail

Langkah pamungkas adalah menghubungkan server SMTP tersebut ke antarmuka Gmail pribadi Anda:

1. Buka Gmail di browser desktop, lalu klik ikon gerigi **Settings (Setelan)** > **See all settings (Lihat semua setelan)**.
2. Pilih tab **Accounts and Import (Akun dan Impor)**.
3. Pada bagian **Send mail as (Kirim email sebagai)**, klik **Add another email address (Tambahkan alamat email lain)**.
4. Pada jendela pop-up:
- **Name:** Nama lengkap atau nama brand Anda (misal: *Triono Hidayat*).
- **Email address:** Alamat email domain Anda (misal: *kontak@domainkamu.com*).
- Pastikan opsi *Treat as an alias* tetap tercentang.
- Klik **Next Step**.
5. Masukkan konfigurasi SMTP Brevo:
- **SMTP Server:** \`smtp-relay.brevo.com\`
- **Port:** \`587\`
- **Username:** Username login Brevo Anda
- **Password:** SMTP Key yang Anda buat di Brevo
- Pilih opsi koneksi aman: **Secured connection using TLS**.
- Klik **Add Account**.
6. Google akan mengirimkan kode konfirmasi ke \`kontak@domainkamu.com\`. Karena ImprovMX sudah aktif, kode tersebut otomatis masuk ke inbox Gmail Anda!
7. Salin kode konfirmasi dan tempelkan ke jendela verifikasi.

Selamat! Sekarang saat Anda membuat email baru (*Compose*) di Gmail, Anda memiliki opsi *dropdown* di kolom **From (Dari)** untuk memilih apakah ingin mengirim sebagai email Gmail biasa atau sebagai email domain kustom Anda.

---

## Praktik Keamanan Email: Menghindari Folder Spam

Agar email yang Anda kirim tidak dianggap spam oleh server penerima (seperti Outlook atau Google), pastikan DNS TXT SPF Anda mencakup kedua layanan:

\`\`\`dns
Type: TXT | Name: @ | Value: v=spf1 include:spf.improvmx.com include:spf.brevo.com ~all
\`\`\`

Dengan menggabungkan parameter SPF dan memasang DKIM dari Brevo, tingkat keterkiriman (*deliverability rate*) email domain Anda akan setara dengan email berbayar.

---

## Kesimpulan

Membangun kredibilitas profesional lewat email domain sendiri **tidak selalu harus mengeluarkan biaya langganan bulanan**.

Dengan alur:
1. **Domain:** Hostinger (hanya bayar sewa nama tahunan).
2. **Penerima:** ImprovMX (meneruskan email secara instan & gratis).
3. **Kotak Masuk:** Akun Gmail pribadi (kapasitas 15GB).
4. **Pengirim:** Brevo SMTP Relay (gratis 300 email/hari).

Anda mendapatkan ekosistem email domain yang fungsional, profesional, aman, dan **100% bebas biaya operasional hosting**.
    `.trim(),
  },
  {
    slug: 'arsitektur-automasi-n8n-layanan-publik',
    title: 'Arsitektur Sistem Automasi Workflow n8n untuk Skalabilitas Layanan Publik',
    excerpt:
      'Bagaimana mengintegrasikan webhook instansi pemerintahan dengan n8n self-hosted untuk memproses puluhan ribu dokumen secara asinkron, aman, dan patuh regulasi data.',
    date: '2026-08-15',
    readTime: '6 min read',
    category: 'Automation',
    tags: ['n8n', 'GovTech', 'System Architecture', 'PostgreSQL', 'Webhooks'],
    featured: true,
    author: {
      name: 'Triono Hidayat',
      role: 'Enterprise Systems Governance & Solutions Dev',
    },
    content: `
## Tantangan Digitalisasi Layanan Publik

Dalam implementasi sistem digital di instansi pemerintah, tantangan terbesar bukanlah membangun antarmuka web, melainkan **menghubungkan sistem lama (legacy system) dengan alur kerja modern** yang membutuhkan validasi bertingkat, notifikasi multi-kanal (WhatsApp, Email, SMS), dan pembuatan berkas PDF secara otomatis.

Ketika volume permohonan melonjak di awal bulan atau masa pendaftaran tertentu, pendekatan tradisional menggunakan *cron job* terjadwal pada server monolitik sering kali mengalami *bottleneck*, *timeout*, atau bahkan kegagalan pengiriman notifikasi tanpa adanya jejak audit (*audit trail*).

\`\`\`
[Sistem Layanan Publik] 
         │ (HTTP Webhook)
         ▼
┌──────────────────┐
│   n8n Cluster    │ ───► Validasi Schema & Sanitasi Data
└──────────────────┘ ───► Antrean RabbitMQ / Redis
         │ ───► PostgreSQL Audit Log
         ▼
[Eksekusi Workflow: Dokumen PDF -> Multi-channel Notif -> Sync Arsip]
\`\`\`

---

## Mengapa Memilih n8n Self-Hosted?

Bagi lingkungan pemerintahan dan korporasi, **kedaulatan data (data sovereignty)** adalah harga mati. Menggunakan platform otomasi berbasis cloud pihak ketiga sering kali terkendala regulasi perlindungan data pribadi dan keharusan data tersimpan di dalam wilayah Republik Indonesia (*on-premise*).

Berikut beberapa keunggulan n8n self-hosted yang kami terapkan:

1. **Full Data Control:** Seluruh payload data sensitif tetap berada di jaringan internal (private intranet/VPC).
2. **Kustomisasi Node & Code:** Fleksibilitas menyisipkan script TypeScript/Python khusus untuk dekripsi data atau integrasi signature digital.
3. **Queue Mode dengan Redis:** Memungkinkan n8n memproses ribuan eksekusi workflow secara paralel tanpa membebani server utama.
4. **Retry Logic & Error Triggers:** Setiap kegagalan pengiriman pesan eksternal otomatis dialihkan ke antrean *dead-letter* dan diteruskan ke dashboard pemantauan tim IT.

---

## Pola Arsitektur Resilient yang Diterapkan

### 1. Webhook Asinkron dengan Quick Acknowledge
Alih-alih menahan koneksi HTTP pengguna sampai seluruh proses pembuatan berkas selesai, webhook langsung merespons dengan status \`202 Accepted\` dan \`request_id\`. Pemrosesan berkas dilimpahkan sepenuhnya ke background worker.

### 2. Idempotency Key
Untuk mencegah duplikasi permohonan akibat jaringan seluler pengguna yang tidak stabil, setiap transaksi wajib menyertakan \`Idempotency-Key\` unik yang divalidasi ke Redis sebelum node n8n dijalankan.

\`\`\`typescript
// Contoh implementasi middleware proteksi idempotensi
export async function validateIdempotency(req: Request, redisClient: any) {
  const key = req.headers.get('x-idempotency-key');
  if (!key) throw new Error('Missing Idempotency Key');

  const exists = await redisClient.get(\`req_lock:\${key}\`);
  if (exists) {
    return { duplicate: true, response: JSON.parse(exists) };
  }

  // Set TTL lock selama 60 detik
  await redisClient.set(\`req_lock:\${key}\`, 'processing', 'EX', 60);
  return { duplicate: false };
}
\`\`\`

---

## Hasil & Pelajaran Lapangan

Dengan menerapkan pemisahan tugas (*separation of concerns*) antara frontend publik dan mesin orkestrasi workflow n8n:
- Waktu respons antarmuka turun dari **4.8 detik menjadi kurang dari 400ms**.
- *Failure rate* notifikasi berkurang hingga **99.2%** berkat mekanisme automatic retry.
- Tim operasional non-teknis dapat dengan mudah melihat diagram status dokumen tanpa harus membaca log server mentah.
    `.trim(),
  },
  {
    slug: 'migrasi-nextjs-16-tailwind-v4',
    title: 'Pelajaran Praktis Migrasi ke Next.js 16 & Tailwind CSS v4: Performa dan Efisiensi',
    excerpt:
      'Refleksi arsitektur mengenai evolusi React 19, arsitektur CSS modern Tailwind v4 berbasis engine Lightning CSS, serta strategi menjaga skor Lighthouse tetap hijau.',
    date: '2026-07-28',
    readTime: '5 min read',
    category: 'Web Engineering',
    tags: ['Next.js', 'React 19', 'Tailwind CSS v4', 'Performance', 'TypeScript'],
    featured: false,
    author: {
      name: 'Triono Hidayat',
      role: 'Enterprise Systems Governance & Solutions Dev',
    },
    content: `
## Transisi Besar ke Tailwind CSS v4

Ketika Tailwind CSS v4 diumumkan dengan arsitektur baru berbasis **Lightning CSS**, ada perubahan fundamental yang perlu dipahami: penghapusan \`tailwind.config.js\` demi pendekatan *CSS-first configuration*.

Alih-alih mendefinisikan ekstensi tema di JavaScript, konfigurasi kini berpusat langsung di file CSS melalui direktif \`@theme\`. Hal ini menghasilkan kecepatan build hingga **10x lebih cepat** dan bundle output yang jauh lebih ramping.

\`\`\`css
/* globals.css di Tailwind v4 */
@import "tailwindcss";

@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-surface: #090a0f;
  --font-display: var(--font-inter), system-ui, sans-serif;
}
\`\`\`

---

## Dampak pada Next.js 16 & React 19

Dengan adopsi React 19 di Next.js 16, beberapa paradigma pengelolaan state dan rendering server mengalami peningkatan signifikan:

1. **Server Actions yang Lebih Matang:** Form submission dan mutasi data dapat ditangani langsung tanpa perlu menulis boilerplate API route terpisah.
2. **Optimasi Asset & Font:** Font Inter dan font pendukung dimuat melalui subrutin \`next/font\` yang bebas dari *Cumulative Layout Shift (CLS)*.
3. **Asset Inlining yang Cerdas:** SVG dan ikon dari \`lucide-react\` hanya dikompilasi untuk komponen yang benar-benar digunakan melalui tree-shaking otomatis.

---

## Praktik Terbaik yang Kami Terapkan

- **Penyederhanaan Layout:** Menghindari *wrapper nesting* yang terlalu dalam guna mengurangi beban komputasi layout engine browser.
- **Glassmorphism Hemat GPU:** Efek blur (\`backdrop-blur-md\`) dibatasi hanya pada elemen navigasi tetap (*fixed navbar*), sementara kartu konten di bawahnya menggunakan solid background dengan opacity halus untuk menjaga frame rate 60 FPS pada perangkat mobile berdaya rendah.
    `.trim(),
  },
  {
    slug: 'membangun-sistem-informasi-pemerintahan-resilient',
    title: 'Membangun Sistem Informasi Pemerintahan yang Resilient: Menjembatani Regulasi dan Kode',
    excerpt:
      'Prinsip tata kelola sistem enterprise: audit trails, role-based access control (RBAC) granular, serta kepatuhan standar keamanan siber dalam ekosistem GovTech.',
    date: '2026-06-10',
    readTime: '7 min read',
    category: 'GovTech',
    tags: ['GovTech', 'Governance', 'Security', 'RBAC', 'Compliance'],
    featured: false,
    author: {
      name: 'Triono Hidayat',
      role: 'Enterprise Systems Governance & Solutions Dev',
    },
    content: `
## Realitas Sistem Informasi Pemerintahan

Membangun aplikasi untuk sektor publik memiliki dinamika yang sangat berbeda dibandingkan produk startup konvensional. Di ranah pemerintahan:
- Regulasi dan hierarki persetujuan bersifat kaku (*statutory requirements*).
- Setiap perubahan status dokumen harus dapat dipertanggungjawabkan di hadapan auditor pemeriksa.
- Pengguna sistem memiliki rentang literasi digital yang sangat luas, dari staf operasional lapangan hingga pejabat pengambil kebijakan.

---

## 3 Pilar Fundamental Sistem yang Resilient

### 1. Immutable Audit Trail (Jejak Rekam yang Tak Dapat Diubah)
Setiap transaksi atau perubahan data tidak boleh langsung menimpa baris data lama (\`UPDATE\`) tanpa riwayat. Kami menerapkan pola *Event Sourcing* atau minimal tabel \`audit_logs\` yang mencatat:
- **Who:** ID pengguna dan peran aktif saat aksi dilakukan.
- **When:** Timestamp berpresisi mikrodetik dengan zona waktu seragam (UTC).
- **What:** Delta perubahan data dalam format JSON diff (nilai sebelum vs nilai sesudah).
- **Where:** IP Address dan User-Agent client yang tervalidasi di layer reverse proxy.

### 2. Granular Role-Based Access Control (RBAC)
Pemberian izin tidak boleh hanya berlabel "Admin" atau "User". Dalam tata kelola birokrasi, wewenang sering kali bergantung pada:
- Satuan Kerja / Unit Organisasi.
- Batasan Geografis / Wilayah Kerja.
- Batas Plafon Nominal atau Jenis Berkas.

\`\`\`typescript
// Struktur Permission Context
interface PermissionContext {
  userId: string;
  unitId: string;
  scope: 'national' | 'provincial' | 'district';
  allowedActions: Array<'VERIFY_STEP_1' | 'APPROVE_FINAL' | 'REJECT_WITH_NOTE' | 'EXPORT_DATA'>;
}
\`\`\`

### 3. Graceful Degradation & Aksesibilitas
Sistem harus tetap dapat beroperasi meskipun koneksi internet instansi sedang mengalami kendala. Fitur simpan draft lokal (*local state persistence*) dan umpan balik visual yang jelas saat proses pengunggahan dokumen menjadi prioritas utama pada desain antarmuka.

---

## Kesimpulan

Teknologi terbaik untuk instansi bukanlah yang paling rumit atau paling trendi, melainkan teknologi yang **dapat diandalkan setiap hari tanpa henti, transparan, dan melindungi integritas data publik**.
    `.trim(),
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  return ['All', ...categories];
}
