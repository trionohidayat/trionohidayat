export interface VercelProjectItem {
  id: string;
  name: string;
  displayName: string;
  framework: string;
  liveUrl: string | null;
  domain: string | null;
  gitRepo: string | null;
  gitRepoUrl: string | null;
  isPrivateRepo: boolean;
  status: 'READY' | 'BUILDING' | 'ERROR' | 'QUEUED' | 'CANCELED' | 'UNKNOWN';
  updatedAt: number;
  commitMessage?: string | null;
}

export interface VercelProjectsResponse {
  configured: boolean;
  total: number;
  projects: VercelProjectItem[];
  error?: string;
}

// Format slug name into professional display title
export function formatProjectDisplayName(slug: string): string {
  if (!slug) return '';
  const acronyms: Record<string, string> = {
    wms: 'WMS',
    rfid: 'RFID',
    ai: 'AI',
    api: 'API',
    hris: 'HRIS',
    ac: 'AC',
    sso: 'SSO',
    rbac: 'RBAC',
    ui: 'UI',
  };

  return slug
    .replace(/-next$/i, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronyms[lower]) return acronyms[lower];
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Find cleanest production domain
function pickBestDomain(aliases?: string[], fallbackUrl?: string): string | null {
  if (Array.isArray(aliases) && aliases.length > 0) {
    // 1. Look for custom domain (does not contain .vercel.app)
    const custom = aliases.find((a) => !a.endsWith('.vercel.app'));
    if (custom) {
      return custom.replace(/^\*\./, '');
    }

    // 2. Filter out verbose git-branch / internal project aliases
    const cleanAliases = aliases.filter(
      (a) => !a.includes('-git-') && !a.includes('-projects.vercel.app')
    );
    if (cleanAliases.length > 0) {
      // Pick shortest alias
      return cleanAliases.sort((a, b) => a.length - b.length)[0].replace(/^\*\./, '');
    }

    // 3. Pick shortest alias from all aliases
    return aliases.sort((a, b) => a.length - b.length)[0].replace(/^\*\./, '');
  }

  if (fallbackUrl) {
    return fallbackUrl.replace(/^https?:\/\//, '').replace(/^\*\./, '');
  }

  return null;
}

// Curated fallback showcase projects if VERCEL_TOKEN is not yet configured
export const FALLBACK_VERCEL_PROJECTS: VercelProjectItem[] = [
  {
    id: 'prj_kemnaker_wms',
    name: 'kemnaker-rfid-wms',
    displayName: 'Kemnaker RFID WMS',
    framework: 'nextjs',
    liveUrl: 'https://kemnaker-wms.vercel.app',
    domain: 'kemnaker-wms.vercel.app',
    gitRepo: 'trionohidayat/kemnaker-rfid-wms',
    gitRepoUrl: 'https://github.com/trionohidayat/kemnaker-rfid-wms',
    isPrivateRepo: false,
    status: 'READY',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    commitMessage: 'feat(rfid): add real-time tag scanner sync with edge database',
  },
  {
    id: 'prj_n8n_dashboard',
    name: 'n8n-automation-hub',
    displayName: 'n8n Automation Hub',
    framework: 'nextjs',
    liveUrl: 'https://n8n-automation-hub.vercel.app',
    domain: 'n8n-automation-hub.vercel.app',
    gitRepo: 'trionohidayat/n8n-automation-hub',
    gitRepoUrl: 'https://github.com/trionohidayat/n8n-automation-hub',
    isPrivateRepo: false,
    status: 'READY',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    commitMessage: 'feat(workflows): live telemetry monitoring & webhook failure alerts',
  },
  {
    id: 'prj_govtech_portal',
    name: 'govtech-digital-service',
    displayName: 'GovTech Digital Service',
    framework: 'vite',
    liveUrl: 'https://govtech-service-portal.vercel.app',
    domain: 'govtech-service-portal.vercel.app',
    gitRepo: 'trionohidayat/govtech-digital-service',
    gitRepoUrl: 'https://github.com/trionohidayat/govtech-digital-service',
    isPrivateRepo: false,
    status: 'READY',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    commitMessage: 'refactor(auth): integrate SSO Kemnaker OAuth2 and multi-role RBAC',
  },
];

interface RawVercelTargetProduction {
  url?: string;
  readyState?: string;
  alias?: string[];
  meta?: {
    githubCommitMessage?: string;
    githubRepo?: string;
    githubRepoVisibility?: string;
  };
}

interface RawVercelDeployment {
  url?: string;
  readyState?: string;
  alias?: string[];
  meta?: {
    githubCommitMessage?: string;
    githubRepo?: string;
    githubRepoVisibility?: string;
  };
}

interface RawVercelProject {
  id: string;
  name: string;
  framework: string | null;
  updatedAt: number;
  targets?: {
    production?: RawVercelTargetProduction;
  };
  latestDeployments?: RawVercelDeployment[];
  link?: {
    type?: string;
    repo?: string;
    org?: string;
  };
}

// Projects to exclude from public showcase by default
export const DEFAULT_EXCLUDED_PROJECTS = [
  'trionohidayat',
  'triono-hidayat',
  'grid',
  'gene-hris',
  'mass-standalone',
  'inset-app',
];

/**
 * Fetch list of projects deployed on Vercel using the official Vercel REST API v9.
 * Utilizes Next.js ISR revalidation (30 minutes) to avoid rate limits.
 */
export async function getVercelProjects(): Promise<VercelProjectsResponse> {
  const token = process.env.VERCEL_TOKEN?.trim();
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const includeSelf = process.env.VERCEL_INCLUDE_PORTFOLIO === 'true';
  const customIgnored = (process.env.VERCEL_IGNORED_PROJECTS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const ignoredSet = new Set<string>([
    ...DEFAULT_EXCLUDED_PROJECTS.map((p) => p.toLowerCase()),
    ...customIgnored,
  ]);

  if (includeSelf) {
    ignoredSet.delete('trionohidayat');
    ignoredSet.delete('triono-hidayat');
  }

  if (!token) {
    return {
      configured: false,
      total: FALLBACK_VERCEL_PROJECTS.length,
      projects: FALLBACK_VERCEL_PROJECTS,
    };
  }

  try {
    const url = new URL('https://api.vercel.com/v9/projects');
    url.searchParams.set('limit', '50');
    if (teamId) {
      url.searchParams.set('teamId', teamId);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes in Next.js
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn('Vercel API error:', res.status, errorText);
      return {
        configured: true,
        total: FALLBACK_VERCEL_PROJECTS.length,
        projects: FALLBACK_VERCEL_PROJECTS,
        error: `Vercel API responded with status ${res.status}`,
      };
    }

    const data = await res.json();
    const rawProjects: RawVercelProject[] = data.projects || [];

    const formattedProjects: VercelProjectItem[] = rawProjects
      .filter((project) => {
        const nameLower = project.name.toLowerCase();
        if (ignoredSet.has(nameLower)) return false;
        return true;
      })
      .map((project) => {
        const prod = project.targets?.production;
        const latest = project.latestDeployments?.[0];
        const activeDeployment = prod || latest;

        // Resolve clean domain and live URL
        const bestDomain = pickBestDomain(prod?.alias || latest?.alias, activeDeployment?.url);
        const liveUrl = bestDomain ? `https://${bestDomain}` : `https://${project.name}.vercel.app`;

        // Resolve GitHub repo & visibility
        let gitRepo: string | null = null;
        let gitRepoUrl: string | null = null;
        const visibility = activeDeployment?.meta?.githubRepoVisibility || '';
        const isPrivateRepo = visibility.toLowerCase() === 'private';

        if (project.link?.repo) {
          const org = project.link.org ? `${project.link.org}/` : '';
          gitRepo = `${org}${project.link.repo}`;
        } else if (activeDeployment?.meta?.githubRepo) {
          gitRepo = activeDeployment.meta.githubRepo;
        }

        if (gitRepo && !isPrivateRepo) {
          gitRepoUrl = `https://github.com/${gitRepo}`;
        }

        const commitMessage =
          activeDeployment?.meta?.githubCommitMessage || null;

        const rawState = (
          activeDeployment?.readyState || 'READY'
        ).toUpperCase();
        let status: VercelProjectItem['status'] = 'READY';
        if (['READY', 'BUILDING', 'ERROR', 'QUEUED', 'CANCELED'].includes(rawState)) {
          status = rawState as VercelProjectItem['status'];
        }

        return {
          id: project.id,
          name: project.name,
          displayName: formatProjectDisplayName(project.name),
          framework: project.framework || 'nextjs',
          liveUrl,
          domain: bestDomain,
          gitRepo,
          gitRepoUrl,
          isPrivateRepo,
          status,
          updatedAt: project.updatedAt || Date.now(),
          commitMessage,
        };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);

    return {
      configured: true,
      total: formattedProjects.length,
      projects: formattedProjects,
    };
  } catch (error) {
    console.error('Failed to fetch Vercel projects:', error);
    return {
      configured: true,
      total: FALLBACK_VERCEL_PROJECTS.length,
      projects: FALLBACK_VERCEL_PROJECTS,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
