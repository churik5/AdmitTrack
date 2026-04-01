import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Activity } from '../types'

export function exportActivitiesPdf(activities: Activity[]) {
  const doc = new jsPDF('landscape')

  // Header
  doc.setFontSize(20)
  doc.setTextColor(45, 71, 166)
  doc.text('AdmitTrack — Activities', 14, 20)

  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text(`Generated: ${new Date().toLocaleDateString()} · ${activities.length} activities`, 14, 28)

  autoTable(doc, {
    startY: 35,
    head: [['#', 'Activity', 'Role', 'Organization', 'Grades', 'Hrs/Wk', 'Wks/Yr', 'Description']],
    body: activities.map((a, i) => [
      String(i + 1),
      a.name,
      a.role || '—',
      a.organization || '—',
      (a.grades || []).join(', ') || '—',
      a.hoursPerWeek ? String(a.hoursPerWeek) : '—',
      a.weeksPerYear ? String(a.weeksPerYear) : '—',
      a.description ? (a.description.length > 100 ? a.description.slice(0, 100) + '...' : a.description) : '—',
    ]),
    theme: 'striped',
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [45, 71, 166], fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 35 },
      7: { cellWidth: 60 },
    },
  })

  // Footer
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text(`AdmitTrack — Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
  }

  doc.save('AdmitTrack_Activities.pdf')
}
