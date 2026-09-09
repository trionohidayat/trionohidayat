import { NextResponse } from 'next/server';
import { getVercelProjects } from '@/lib/vercel';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getVercelProjects();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API /api/vercel/projects error:', error);
    return NextResponse.json(
      {
        configured: false,
        total: 0,
        projects: [],
        error: 'Failed to fetch Vercel projects',
      },
      { status: 500 }
    );
  }
}
