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

export function toAlias(input: string): string{
  const words = input.split(/\s+/)
  if (words.length == 1) return words[0].charAt(0).toUpperCase()
  return words[0].charAt(0).toUpperCase() + words[words.length-1].charAt(0).toUpperCase() || ""
}