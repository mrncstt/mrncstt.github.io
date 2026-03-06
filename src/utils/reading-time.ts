export function getReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  return Math.max(1, Math.ceil(words / 200));
}
