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
