export const getFormattedDayName = (dateString: string, locale: string = 'en-EN'): string => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumber = date.getDate();
  const month = date.toLocaleDateString(locale, { month: 'long' });

  return `${dayNumber} ${month} · ${day}`;
};
