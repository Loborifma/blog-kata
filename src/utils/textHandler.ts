export function cutText(text: string, isTitle: boolean): string {
  if (!text) return '';

  const MAX_SYMBOLS = isTitle ? 40 : 200;
  let newTitle = text;
  if (text.length > MAX_SYMBOLS) {
    newTitle = text.slice(0, MAX_SYMBOLS) + '...';
  }
  return newTitle;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString('en-US', options);
  return formattedDate;
}
