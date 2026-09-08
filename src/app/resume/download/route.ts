import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get('variant');
  const viewMode = request.nextUrl.searchParams.get('view');

  // Check if variant-specific PDF exists (e.g., resume_triono-hidayat_android.pdf)
  let fileName = 'resume_triono-hidayat.pdf';
  if (variant) {
    const variantFileName = `resume_triono-hidayat_${variant}.pdf`;
    if (fs.existsSync(path.join(process.cwd(), 'public', variantFileName))) {
      fileName = variantFileName;
    }
  }

  const filePath = path.join(process.cwd(), 'public', fileName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Resume PDF file not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const disposition = viewMode === 'true' || viewMode === 'inline' ? 'inline' : 'attachment';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${disposition}; filename="${fileName}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
