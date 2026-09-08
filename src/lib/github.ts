export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubMonthLabel {
  label: string;
  weekIndex: number;
}

export interface GitHubStats {
  username: string;
  totalContributions: number;
  publicRepos: number;
  activeDays: number;
  currentStreak: number;
  maxStreak: number;
  weeks: ContributionDay[][];
  months: GitHubMonthLabel[];
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Organizes a flat list of contribution days into calendar weeks (columns)
 * and calculates month label positions.
 */
export function processContributions(days: ContributionDay[]): {
  weeks: ContributionDay[][];
  months: GitHubMonthLabel[];
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  maxStreak: number;
} {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  let totalContributions = 0;
  let activeDays = 0;
  let tempStreak = 0;
  let maxStreak = 0;

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    totalContributions += day.count;
    if (day.count > 0) {
      activeDays++;
      tempStreak++;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak from the end
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    // If today is 0 and it's the very last element, allow continuation from yesterday
    if (i === days.length - 1 && days[i].count === 0) continue;
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Build weeks matrix
  // Ensure the first week is properly padded if days[0] is not Sunday
  if (days.length > 0) {
    const firstDate = new Date(days[0].date);
    const startDayOfWeek = firstDate.getUTCDay(); // 0: Sunday, 6: Saturday

    // Pad beginning of first week if needed
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push({
        date: '',
        count: 0,
        level: 0,
      });
    }
  }

  const months: GitHubMonthLabel[] = [];
  let lastMonthSeen = -1;

  for (const day of days) {
    currentWeek.push(day);

    const d = new Date(day.date);
    const m = d.getUTCMonth();
    if (m !== lastMonthSeen) {
      months.push({
        label: MONTH_NAMES[m],
        weekIndex: weeks.length,
      });
      lastMonthSeen = m;
    }

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    // Pad end of last week
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: '',
        count: 0,
        level: 0,
      });
    }
    weeks.push(currentWeek);
  }

  return {
    weeks,
    months,
    totalContributions,
    activeDays,
    currentStreak,
    maxStreak,
  };
}

/**
 * Fetch live GitHub contribution data and profile information.
 * Falls back gracefully if rate limits or network issues occur.
 */
export async function getGitHubStats(username = 'trionohidayat'): Promise<GitHubStats> {
  let days: ContributionDay[] = [];
  let totalContributionsFromApi = 0;
  let publicRepos = 55; // verified default

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 }, // Cache 1 hour in Next.js
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.contributions) && data.contributions.length > 0) {
        days = data.contributions;
        totalContributionsFromApi = data.total?.lastYear || 0;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch contributions API:', err);
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { 'User-Agent': 'TrionoHidayatPortfolio/1.0' },
      next: { revalidate: 3600 },
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === 'number') {
        publicRepos = userData.public_repos;
      }
    }
  } catch {
    // Ignore rate-limits on GitHub unauthenticated API
  }

  const processed = processContributions(days);

  return {
    username,
    totalContributions: totalContributionsFromApi || processed.totalContributions,
    publicRepos,
    activeDays: processed.activeDays,
    currentStreak: processed.currentStreak,
    maxStreak: processed.maxStreak,
    weeks: processed.weeks,
    months: processed.months,
  };
}
