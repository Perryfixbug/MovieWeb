export function toTitleCase(input: string): string {
  if (!input) return '';

  // Chuẩn hóa Unicode
  input = input.normalize('NFC');

  return input
    .split(/\s+/) // tách theo 1 hoặc nhiều khoảng trắng
    .map(word => {
      const first = word.charAt(0).toLocaleUpperCase('vi-VN');
      const rest = word.slice(1).toLocaleLowerCase('vi-VN');
      return first + rest;
    })
    .join(' ');
}