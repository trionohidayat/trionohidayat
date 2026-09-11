import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Import data from resumeVariants.ts and portfolio.ts
// We'll define the HTML template generator for any variant
function generateHtml(variantData) {
  const { professionalTitle, professionalSummary, competencies, experiences, featuredProjects, certificationsHighlight } = variantData;

  const competenciesHtml = competencies
    .map(
      (c) => `
      <div class="skill-category">${c.label}</div>
      <div class="skill-list">${c.skills}</div>`
    )
    .join('');

  const experiencesHtml = experiences
    .map(
      (exp) => `
      <div class="entry">
        <div class="entry-header">
          <div>
            <span class="entry-role">${exp.role}</span>
            <span class="entry-company"> &bull; ${exp.organization}</span>
          </div>
          <span class="entry-date">${exp.period}</span>
        </div>
        <div class="entry-location">${exp.location}${exp.subLocation ? ` &bull; ${exp.subLocation}` : ''}</div>
        <ul class="bullets">
          ${exp.description
            .map((bullet) => `<li>${bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
            .join('')}
        </ul>
      </div>`
    )
    .join('');

  const projectsHtml = featuredProjects
    .map(
      (proj) => `
      <div class="entry">
        <div class="entry-header">
          <div>
            <span class="entry-role">${proj.demoUrl ? `<a href="${proj.demoUrl}" style="color: inherit; text-decoration: none;">${proj.title}</a>` : proj.title}</span>
            <span class="entry-company"> &bull; ${proj.category}</span>
          </div>
          <span class="entry-date">${proj.tech}</span>
        </div>
        <p class="summary" style="font-size: 8.8pt; margin-top: 2px;">
          ${proj.description}
        </p>
      </div>`
    )
    .join('');

  const certsHtml = certificationsHighlight
    .map((cert) => `<div class="cert-item">&bull; ${cert.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Triono Hidayat - Resume (${variantData.label})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 14mm 10mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1a1a1a;
      background-color: #ffffff;
      line-height: 1.42;
      font-size: 9.4pt;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0;
    }
    header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 21pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
      text-transform: uppercase;
    }
    .title {
      font-size: 10.5pt;
      font-weight: 600;
      color: #2563eb;
      margin-top: 3px;
      letter-spacing: -0.2px;
    }
    .contact-bar {
      margin-top: 6px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 8.6pt;
      color: #475569;
    }
    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .contact-item a {
      color: #334155;
      text-decoration: none;
    }
    .separator {
      color: #cbd5e1;
    }
    section {
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 9.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 6px;
      break-after: avoid;
      page-break-after: avoid;
    }
    .summary {
      font-size: 9pt;
      color: #334155;
      text-align: justify;
      line-height: 1.42;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 155px 1fr;
      row-gap: 3px;
      column-gap: 10px;
      font-size: 8.8pt;
    }
    .skill-category {
      font-weight: 700;
      color: #1e293b;
    }
    .skill-list {
      color: #334155;
    }
    .entry {
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .entry:last-child {
      margin-bottom: 0;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .entry-role {
      font-size: 9.4pt;
      font-weight: 700;
      color: #0f172a;
    }
    .entry-company {
      font-size: 9pt;
      font-weight: 600;
      color: #2563eb;
    }
    .entry-date {
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
    }
    .entry-location {
      font-size: 8.4pt;
      color: #64748b;
      font-style: italic;
    }
    ul.bullets {
      margin-top: 2px;
      padding-left: 15px;
    }
    ul.bullets li {
      font-size: 8.8pt;
      color: #334155;
      margin-bottom: 2px;
      line-height: 1.38;
    }
    ul.bullets li strong {
      color: #0f172a;
    }
    .edu-cert-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 14px;
    }
    .cert-item {
      font-size: 8.5pt;
      margin-bottom: 2px;
      color: #334155;
    }
    .cert-item strong {
      color: #0f172a;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="name">Triono Hidayat</div>
      <div class="title">${professionalTitle}</div>
      <div class="contact-bar">
        <span class="contact-item">Jakarta, Indonesia (UTC+7) &bull; Worldwide Remote</span>
        <span class="separator">|</span>
        <span class="contact-item"><a href="mailto:trionohidayat3@gmail.com">trionohidayat3@gmail.com</a></span>
        <span class="separator">|</span>
        <span class="contact-item"><a href="https://wa.me/6287788084441">+62 877-8808-4441</a></span>
        <span class="separator">|</span>
        <span class="contact-item"><a href="https://linkedin.com/in/triono-hidayat" target="_blank">linkedin.com/in/triono-hidayat</a></span>
        <span class="separator">|</span>
        <span class="contact-item"><a href="https://github.com/trionohidayat" target="_blank">github.com/trionohidayat</a></span>
      </div>
    </header>

    <section>
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary">
        ${professionalSummary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
      </p>
    </section>

    <section>
      <h2 class="section-title">Core Technical Competencies</h2>
      <div class="skills-grid">
        ${competenciesHtml}
      </div>
    </section>

    <section>
      <h2 class="section-title">Professional Experience</h2>
      ${experiencesHtml}
    </section>

    <section>
      <h2 class="section-title">Key Featured Projects</h2>
      ${projectsHtml}
    </section>

    <section>
      <div class="edu-cert-grid">
        <div>
          <h2 class="section-title">Education</h2>
          <div class="entry" style="margin-bottom: 5px;">
            <div class="entry-role" style="font-size: 9.1pt;">Bachelor of Informatics Engineering (S.Kom)</div>
            <div class="entry-company">STMIK Nusa Mandiri, Jakarta</div>
            <div class="entry-date" style="font-size: 8.4pt;">2017 – 2019</div>
          </div>
          <div class="entry">
            <div class="entry-role" style="font-size: 9.1pt;">Associate of Computer Engineering (A.Md.Kom)</div>
            <div class="entry-company">Universitas Bina Sarana Informatika (BSI), Jakarta</div>
            <div class="entry-date" style="font-size: 8.4pt;">2013 – 2016</div>
          </div>
        </div>

        <div>
          <h2 class="section-title">Target Certifications Highlight</h2>
          ${certsHtml}
          <div class="cert-item" style="font-size: 7.8pt; color: #64748b; font-style: italic; margin-top: 2px;">&bull; + 37 additional verified credentials in AI, Cloud, Mobile &amp; Systems.</div>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`;
}

// We import data dynamically
async function main() {
  // Clean test file if any
  const testFile = path.resolve('public', 'test.pdf');
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
  }

  // Load resumeVariants
  const { resumeVariants } = await import('../src/data/resumeVariants.js').catch(() => {
    // Fallback if ts/js resolution needs compile: we can compile or read file
    return null;
  }) || {};

  // If ts-node or direct import fails, read resumeVariants.ts via regex or evaluated script
  let variants = resumeVariants;
  if (!variants) {
    const rawTs = fs.readFileSync(path.resolve('src/data/resumeVariants.ts'), 'utf-8');
    // Extract resumeVariants object
    const startIdx = rawTs.indexOf('export const resumeVariants');
    const cleaned = rawTs
      .slice(startIdx)
      .replace(/export const resumeVariants: Record<ResumeVariantId, ResumeVariantData> = /, 'const resumeVariants = ')
      .replace(/as ResumeVariantId/g, '');
    const fn = new Function(`${cleaned}; return resumeVariants;`);
    variants = fn();
  }

  const tmpDir = path.resolve('public', '_tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  for (const [key, data] of Object.entries(variants)) {
    console.log(`\n--- Processing variant: ${key} ---`);
    const html = generateHtml(data);
    const htmlFilePath = path.resolve(tmpDir, `resume_${key}.html`);
    fs.writeFileSync(htmlFilePath, html, 'utf-8');

    const pdfFileName = `resume_triono-hidayat_${key}.pdf`;
    const pdfFilePath = path.resolve('public', pdfFileName);

    console.log(`Generating: ${pdfFileName}`);
    execSync(`"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfFilePath}" "${htmlFilePath}"`, {
      stdio: 'inherit',
    });

    console.log(`Created: ${pdfFileName} (${fs.statSync(pdfFilePath).size} bytes)`);

    // If fullstack, also save as master resume_triono-hidayat.pdf
    if (key === 'fullstack') {
      const masterPdfPath = path.resolve('public', 'resume_triono-hidayat.pdf');
      fs.copyFileSync(pdfFilePath, masterPdfPath);
      console.log(`Updated master PDF: resume_triono-hidayat.pdf (${fs.statSync(masterPdfPath).size} bytes)`);
    }
  }

  // Cleanup tmp HTMLs
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('\nAll variant PDFs generated successfully!');
}

main().catch(console.error);
