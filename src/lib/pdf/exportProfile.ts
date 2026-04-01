import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Profile } from '../types'

export function exportProfilePdf(profile: Profile) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header
  doc.setFontSize(20)
  doc.setTextColor(45, 71, 166)
  doc.text('AdmitTrack — Student Profile', 14, 20)

  doc.setFontSize(10)
  doc.setTextColor(128, 128, 128)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28)

  let y = 38

  // Personal Info
  doc.setFontSize(14)
  doc.setTextColor(30, 30, 30)
  doc.text('Personal Information', 14, y)
  y += 8

  const personalData = [
    ['Name', profile.name || '—'],
    ['High School', profile.highSchool || '—'],
    ['City', profile.city || '—'],
    ['Region', profile.state || '—'],
    ['Graduation Year', String(profile.graduationYear || '—')],
    ['Intended Majors', (profile.intendedMajors || []).join(', ') || '—'],
  ]

  autoTable(doc, {
    startY: y,
    head: [],
    body: personalData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
  })

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  // Academic Info
  doc.setFontSize(14)
  doc.text('Academic Information', 14, y)
  y += 8

  const academicData = [
    ['GPA (Unweighted)', profile.gpa || '—'],
    ['GPA (Weighted)', profile.weightedGpa || '—'],
    ['Class Rank', profile.classRank || '—'],
  ]

  autoTable(doc, {
    startY: y,
    head: [],
    body: academicData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
  })

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  // Test Scores
  if (profile.testScores && profile.testScores.length > 0) {
    doc.setFontSize(14)
    doc.text('Test Scores', 14, y)
    y += 8

    autoTable(doc, {
      startY: y,
      head: [['Test', 'Score', 'Date']],
      body: profile.testScores.map(s => [s.name, s.score, s.date || '—']),
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [45, 71, 166] },
    })

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
  }

  // Reflections
  if (profile.strengths || profile.weaknesses) {
    if (y > 240) { doc.addPage(); y = 20 }
    doc.setFontSize(14)
    doc.text('Personal Reflections', 14, y)
    y += 8

    if (profile.strengths) {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Strengths:', 14, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      const lines = doc.splitTextToSize(profile.strengths, pageWidth - 28)
      doc.text(lines, 14, y)
      y += lines.length * 5 + 5
    }

    if (profile.weaknesses) {
      doc.setFont('helvetica', 'bold')
      doc.text('Areas for Improvement:', 14, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      const lines = doc.splitTextToSize(profile.weaknesses, pageWidth - 28)
      doc.text(lines, 14, y)
    }
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text(`AdmitTrack — Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
  }

  doc.save('AdmitTrack_Profile.pdf')
}
