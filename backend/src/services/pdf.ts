import PDFDocument from 'pdfkit';
import type { Response } from 'express';
import type { Project, Equipment } from '@prisma/client';

function header(doc: PDFKit.PDFDocument, title: string) {
  doc.fillColor('#0e7c5a').fontSize(20).text('Frandee Consulting Services', { align: 'left' });
  doc.moveDown(0.2);
  doc.fillColor('#333').fontSize(14).text(title);
  doc.moveDown(0.5);
  doc.strokeColor('#0e7c5a').lineWidth(1).moveTo(doc.x, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.8);
  doc.fillColor('#111').fontSize(11);
}

function footer(doc: PDFKit.PDFDocument) {
  const bottom = doc.page.height - 50;
  doc.fontSize(9).fillColor('#888').text(
    `Generated ${new Date().toISOString()} — frandeeconsult.com`,
    50,
    bottom,
    { align: 'center', width: 495 },
  );
}

export function streamProjectPdf(res: Response, project: Project) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="project-${project.slug}.pdf"`,
  );
  doc.pipe(res);

  header(doc, `Project Report — ${project.title}`);

  doc.font('Helvetica-Bold').text('Client: ', { continued: true }).font('Helvetica').text(project.client ?? '—');
  doc.font('Helvetica-Bold').text('Location: ', { continued: true }).font('Helvetica').text(project.location ?? '—');
  doc.font('Helvetica-Bold').text('Category: ', { continued: true }).font('Helvetica').text(project.category);
  doc.font('Helvetica-Bold').text('Status: ', { continued: true }).font('Helvetica').text(project.status);
  if (project.startDate) {
    doc.font('Helvetica-Bold').text('Period: ', { continued: true })
      .font('Helvetica')
      .text(
        `${project.startDate.toISOString().slice(0, 10)} → ${
          project.endDate ? project.endDate.toISOString().slice(0, 10) : 'ongoing'
        }`,
      );
  }

  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(12).text('Summary');
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(11).text(project.summary);
  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(12).text('Description');
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(11).text(project.description, { align: 'justify' });

  if (project.tags?.length) {
    doc.moveDown(0.8);
    doc.font('Helvetica-Bold').fontSize(12).text('Tags');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(11).text(project.tags.join(', '));
  }

  footer(doc);
  doc.end();
}

export function streamInventoryPdf(res: Response, items: Equipment[]) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="inventory-report.pdf"');
  doc.pipe(res);

  header(doc, 'Equipment Inventory Report');

  doc.font('Helvetica').fontSize(10);
  doc.text(`Total items: ${items.length}`);
  doc.moveDown(0.8);

  for (const it of items) {
    doc.font('Helvetica-Bold').text(it.name);
    doc.font('Helvetica').text(
      `${it.category}${it.manufacturer ? ` — ${it.manufacturer}` : ''}` +
        `${it.model ? ` (${it.model})` : ''} · qty ${it.quantity} · ${it.status}`,
    );
    if (it.description) doc.font('Helvetica-Oblique').fontSize(9).text(it.description);
    doc.fontSize(10).moveDown(0.4);
  }

  footer(doc);
  doc.end();
}
