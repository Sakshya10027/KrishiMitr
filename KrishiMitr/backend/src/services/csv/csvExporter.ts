export function sanitizeCSVValue(val: unknown): string {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();

  // CSV Formula Injection mitigation (RFC 4180 security extension)
  // Prevent Excel / LibreOffice from executing formulas if value starts with =, +, -, @, or tab
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape inner double quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function generateCSV(headers: string[], rows: unknown[][]): string {
  const headerRow = headers.map(h => sanitizeCSVValue(h)).join(',');
  const dataRows = rows.map(r => r.map(c => sanitizeCSVValue(c)).join(','));
  return [headerRow, ...dataRows].join('\r\n');
}
