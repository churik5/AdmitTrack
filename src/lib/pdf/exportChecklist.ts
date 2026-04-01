import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ChecklistItem } from '../types'

export function exportChecklistPdf(items: ChecklistItem[]) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header
  doc.setFontSize(20)
  doc.setTextColor(45, 71, 166)
  doc.text('AdmitTrack — Application Checklist', 14, 20)

  const totalDone = items.filter(i => i.completed).length
  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text(`Generated: ${new Date().toLocaleDateString()} · ${totalDone}/${items.length} completed`, 14, 28)

  // Group by category
  const categories = Array.from(new Set(items.map(i => i.category)))
  let y = 38

  for (const cat of categories) {
    const catItems = items.filter(i => i.category === cat)
    const catDone = catItems.filter(i => i.completed).length

    if (y > 250) { doc.addPage(); y = 20 }

    doc.setFontSize(13)
    doc.setTextColor(30, 30, 30)
    doc.text(`${cat} (${catDone}/${catItems.length})`, 14, y)
    y += 6

    autoTable(doc, {
      startY: y,
      head: [],
      body: catItems.map(item => [
        item.completed ? '\u2713' : '\u2717',
        item.label,
      ]),
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center', textColor: catItems[0]?.completed ? [46, 158, 110] : [200, 200, 200] },
      },
      didParseCell: (data) => {
        if (data.column.index === 0) {
          const item = catItems[data.row.index]
          if (item?.completed) {
            data.cell.styles.textColor = [46, 158, 110]
          } else {
            data.cell.styles.textColor = [200, 200, 200]
          }
        }
      },
    })

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text(`AdmitTrack — Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
  }

  doc.save('AdmitTrack_Checklist.pdf')
}
