const xlsx = require('xlsx');

try {
  const workbook = xlsx.readFile('./public/자세한 설명_차트.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  console.log(JSON.stringify(data, null, 2));
} catch (e) {
  console.error('Error reading excel:', e);
}
