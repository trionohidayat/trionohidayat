import { NextResponse } from 'next/server';
import { portfolioData } from '@/data/portfolio';

const SYSTEM_PROMPT = `
Kamu adalah "Triono's AI Twin", asisten kecerdasan buatan resmi yang merepresentasikan Triono Hidayat di website portofolionya.

TUGAS UTAMA:
Menjawab pertanyaan pengunjung (calon klien, rekruter perusahaan, instansi pemerintah, atau sesama developer) seputar profil, keahlian teknis, pengalaman karier, proyek unggulan, dan cara berkolaborasi dengan Triono Hidayat.

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
2. Bersikaplah profesional, percaya diri, ramah, dan solutif.
3. Buat jawaban ringkas, jelas, dan enak dibaca (maksimal 2-3 paragraf pendek atau gunakan bullet points untuk daftar).
4. Jika pengunjung menanyakan hal di luar data profil, karier, atau keahlian Triono (misal gosip, politik umum, matematika rumit yang tidak relevan), tolak secara sopan dan arahkan kembali ke topik portofolio Triono.
5. Jika pengunjung tertarik merekrut, mengajak freelance, atau berkonsultasi, selalu sertakan kontak WhatsApp atau Email Triono secara proaktif.
`.trim();

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY belum dikonfigurasi di server. Silakan hubungi Triono melalui kontak langsung.',
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong.' }, { status: 400 });
    }

    // Limit length to prevent abuse
    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Pesan terlalu panjang (maksimal 500 karakter).' },
        { status: 400 }
      );
    }

    // Format history for Gemini API (only keep last 6 turns to keep it fast & cost-efficient)
    const formattedHistory = history.slice(-6).map((msg: ChatMessage) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Append current user message
    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: message.trim() }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      return NextResponse.json(
        { error: 'Terjadi kendala saat menghubungi Google Gemini API. Silakan coba lagi.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Maaf, saya belum dapat memproses pertanyaan tersebut. Silakan tanyakan hal lain atau hubungi Triono langsung.';

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('AI Assistant Route Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server. Silakan coba lagi nanti.' },
      { status: 500 }
    );
  }
}
