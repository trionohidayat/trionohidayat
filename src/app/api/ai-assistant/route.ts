import { NextResponse } from 'next/server';
import { portfolioData } from '@/data/portfolio';

const SYSTEM_PROMPT = `
Kamu adalah "TRIS" (Triono Responsive Intelligence System), asisten kecerdasan buatan resmi yang mewakili Triono Hidayat di website portofolionya.

TUGAS UTAMA:
Menjawab pertanyaan pengunjung (calon klien, rekruter perusahaan, instansi pemerintah, atau sesama developer) seputar profil, keahlian teknis, pengalaman karier, proyek unggulan, dan cara berkolaborasi dengan Triono Hidayat.

IDENTITAS & KARAKTER TRIS:
- Nama AI: TRIS (Triono Responsive Intelligence System).
- Nada bicara: Ramah, percaya diri, profesional, solutif, dan cerdas.
- Menyapa pengunjung dengan hangat sebagai representasi digital resmi dari Triono Hidayat.

PROFIL SINGKAT TRIONO HIDAYAT:
- Nama: ${portfolioData.personal.name}
- Gelar / Jabatan: ${portfolioData.personal.title} (${portfolioData.personal.secondaryTitle})
- Peran Saat Ini: Penata Kelola Sistem dan Teknologi Informasi di Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI) & Independent Full-Stack Solutions Developer.
- Pengalaman: ${portfolioData.personal.yearsOfExperience} tahun pengalaman profesional, ${portfolioData.personal.completedProjects} proyek terselesaikan, ${portfolioData.personal.hoursAutomated} jam operasional diotomasi.
- Lokasi: ${portfolioData.personal.location}
- Status Ketersediaan: ${portfolioData.personal.status}

KEAHLIAN UTAMA:
1. Workflow Automation & AI: n8n (Self-Hosted & Cloud), Webhook Pipelines, Integrasi AI Agent, Zapier, Make.
2. Web Engineering: Next.js (App Router, React 19), TypeScript, Tailwind CSS v4, Node.js, Express, REST APIs, PostgreSQL.
3. GovTech & Enterprise Systems: Tata Kelola Sistem Informasi, Digitalisasi Birokrasi, Audit Trail, RBAC granular, Kepatuhan Regulasi Data.
4. Mobile & IoT/Logistics: Native Android (Kotlin/Java), RFID Integration, Warehouse Management Systems (WMS).

KONTAK RESMI:
- Email: ${portfolioData.contacts.email}
- WhatsApp: ${portfolioData.contacts.whatsappNumber} (${portfolioData.contacts.whatsappUrl})
- LinkedIn: ${portfolioData.contacts.linkedin}
- GitHub: ${portfolioData.contacts.github}

PEDOMAN PERILAKU & GAYA JAWABAN:
1. Gunakan bahasa yang sama dengan pengunjung (Bahasa Indonesia atau English).
2. Buat jawaban ringkas, jelas, dan enak dibaca (maksimal 2-3 paragraf pendek atau gunakan bullet points untuk daftar).
3. Jika pengunjung menanyakan hal di luar profil, karier, atau keahlian Triono, tolak secara sopan dan arahkan kembali ke topik portofolio Triono.
4. Jika pengunjung tertarik merekrut, mengajak freelance, atau berkonsultasi, selalu sertakan kontak WhatsApp atau Email Triono secara proaktif.
5. FORMATTING: Tuliskan respons dengan format markdown yang bersih. Jika ingin menebalkan kata kunci, gunakan format bold **kata** tanpa menyarangkan asterik miring di dalamnya. Pastikan semua tanda bintang tertutup sempurna.
`.trim();

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Fallback models in priority order
const MODEL_CHAIN = ['gemini-3.6-flash', 'gemini-2.5-flash'];

export async function POST(req: Request) {
  let userMessage = '';

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const body = await req.json();
    const { message, history = [] } = body;
    userMessage = (message || '').trim();

    if (!userMessage || typeof userMessage !== 'string' || userMessage.length === 0) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong.' }, { status: 400 });
    }

    if (userMessage.length > 500) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 500 karakter).' },
        { status: 400 }
      );
    }

    // If no API key configured on server, immediately return smart offline knowledge
    if (!apiKey) {
      console.warn('GEMINI_API_KEY missing, using TRIS smart offline fallback.');
      return NextResponse.json({ reply: getSmartOfflineFallback(userMessage) });
    }

    // Format history for Gemini API (last 6 turns)
    const formattedHistory = history.slice(-6).map((msg: ChatMessage) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    // Attempt Gemini with Model Fallback Chain
    let replyText: string | null = null;

    for (const model of MODEL_CHAIN) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            replyText = candidate;
            break; // Successfully obtained reply from primary/backup model!
          }
        } else {
          console.warn(`Model ${model} returned error status: ${response.status}`);
        }
      } catch (modelErr) {
        console.warn(`Failed to contact model ${model}:`, modelErr);
      }
    }

    // If all online models failed (rate limit, downtime, network), trigger Smart Offline Fallback
    if (!replyText) {
      console.warn('All Gemini models unavailable. Activating TRIS Smart Offline Engine.');
      replyText = getSmartOfflineFallback(userMessage);
    }

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('AI Assistant Route Error:', error);
    // Even on server exception, return smart fallback rather than breaking
    return NextResponse.json({
      reply: getSmartOfflineFallback(userMessage || 'halo'),
    });
  }
}

// Smart Offline Knowledge Engine (Anti-down fallback)
function getSmartOfflineFallback(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes('govtech') ||
    q.includes('pemerintah') ||
    q.includes('kemnaker') ||
    q.includes('birokrasi') ||
    q.includes('layanan publik')
  ) {
    return `Triono Hidayat saat ini menjabat sebagai **Penata Kelola Sistem dan Teknologi Informasi di Kementerian Ketenagakerjaan RI (Kemnaker)**.

Beliau berpengalaman merancang sistem birokrasi yang patuh regulasi data, memiliki *audit trail* yang tak dapat diubah, serta arsitektur berbasis RBAC granular untuk memproses perizinan dan dokumen ketenagakerjaan skala nasional.

Untuk diskusi lebih mendalam seputar sistem GovTech, silakan hubungi Triono melalui WhatsApp di [${portfolioData.contacts.whatsappNumber}](${portfolioData.contacts.whatsappUrl}) atau Email di [${portfolioData.contacts.email}](mailto:${portfolioData.contacts.email}).`;
  }

  if (
    q.includes('n8n') ||
    q.includes('automasi') ||
    q.includes('otomasi') ||
    q.includes('automation') ||
    q.includes('workflow') ||
    q.includes('webhook')
  ) {
    return `Triono adalah spesialis **n8n Workflow Automation & AI Integration** dengan rekam jejak mengotomasi lebih dari **${portfolioData.personal.hoursAutomated} jam operasional**.

Keahlian automasinya mencakup:
- Desain arsitektur n8n self-hosted dan cloud yang terisolasi aman.
- Pipeline webhook asinkron dengan *idempotency lock* dan antrean Redis.
- Integrasi bot notifikasi multi-kanal (WhatsApp, Telegram, Email) dan generasi berkas PDF otomatis.

Tertarik mengotomasi sistem operasional Anda? Hubungi langsung via WhatsApp: [${portfolioData.contacts.whatsappNumber}](${portfolioData.contacts.whatsappUrl}).`;
  }

  if (
    q.includes('proyek') ||
    q.includes('project') ||
    q.includes('karya') ||
    q.includes('portfolio') ||
    q.includes('portofolio') ||
    q.includes('buat')
  ) {
    return `Triono telah menyelesaikan lebih dari **${portfolioData.personal.completedProjects} proyek** skala enterprise dan publik, di antaranya:
- **Sistem Perizinan & Layanan Ketenagakerjaan (GovTech Kemnaker)**: Integrasi backend dan dashboard analitik data nasional.
- **RFID & Warehouse Management System (WMS)**: Manajemen logistik pergudangan dengan pelacakan hardware real-time.
- **Aplikasi Web & Mobile**: Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Native Android.

Anda juga dapat melihat etalase proyek lengkap pada bagian **Case Studies** di bawah halaman ini.`;
  }

  if (
    q.includes('freelance') ||
    q.includes('remote') ||
    q.includes('kerja') ||
    q.includes('hire') ||
    q.includes('kontrak') ||
    q.includes('terbuka') ||
    q.includes('tersedia')
  ) {
    return `Status ketersediaan Triono saat ini: **${portfolioData.personal.status}**.

Triono terbuka untuk kerja sama konsultasi arsitektur sistem, implementasi automasi n8n, maupun pengembangan aplikasi web & mobile (Next.js & Android) secara remote untuk klien nasional dan internasional.

Silakan jadwalkan diskusi langsung via WhatsApp di [${portfolioData.contacts.whatsappNumber}](${portfolioData.contacts.whatsappUrl}) atau Email di [${portfolioData.contacts.email}](mailto:${portfolioData.contacts.email}).`;
  }

  if (
    q.includes('kontak') ||
    q.includes('hubungi') ||
    q.includes('email') ||
    q.includes('whatsapp') ||
    q.includes('wa') ||
    q.includes('telepon') ||
    q.includes('chat')
  ) {
    return `Anda dapat menghubungi Triono Hidayat secara langsung melalui kanal resmi berikut:
- **WhatsApp:** [${portfolioData.contacts.whatsappNumber}](${portfolioData.contacts.whatsappUrl})
- **Email:** [${portfolioData.contacts.email}](mailto:${portfolioData.contacts.email})
- **LinkedIn:** [Profil LinkedIn Triono](${portfolioData.contacts.linkedin})
- **GitHub:** [${portfolioData.contacts.github}](${portfolioData.contacts.github})

Triono biasanya merespons pesan dalam kurun waktu kurang dari 24 jam.`;
  }

  // Default summary fallback
  return `Halo! Saya **TRIS** (*Triono Responsive Intelligence System*). Triono Hidayat adalah seorang **${portfolioData.personal.title}** dengan **${portfolioData.personal.yearsOfExperience} tahun pengalaman**.

Spesialisasi utamanya meliputi:
- Arsitektur Sistem Pemerintahan (*GovTech*) di Kemnaker RI.
- Automasi alur kerja tingkat lanjut menggunakan **n8n & AI** (2.000+ jam terotomasi).
- Rekayasa Web Performa Tinggi (**Next.js 16**, React 19, Tailwind CSS v4) dan Native Android.

Untuk pertanyaan lebih spesifik atau ajakan kolaborasi, Anda dapat langsung mengontak via WhatsApp di [${portfolioData.contacts.whatsappNumber}](${portfolioData.contacts.whatsappUrl}).`;
}
