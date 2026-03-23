import xlsx from 'xlsx';
const wb = xlsx.readFile('./public/요약 설명_차트.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
console.log(JSON.stringify(xlsx.utils.sheet_to_json(ws), null, 2));
