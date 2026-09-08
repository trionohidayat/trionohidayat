import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'resume_triono-hidayat.pdf');

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Resume PDF file not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const viewMode = request.nextUrl.searchParams.get('view');
  const disposition = viewMode === 'true' || viewMode === 'inline' ? 'inline' : 'attachment';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${disposition}; filename="resume_triono-hidayat.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
