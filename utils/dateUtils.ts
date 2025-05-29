// Converts to local time zone from UTC.
export const getFormattedDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return convertFormattedDayNameFromDate(date);
};

// Converts to local time zone from UTC.
export const convertFormattedDayNameFromDate = (date: Date, locale: string = 'en-EN') => {
  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumber = date.getDate();
  const month = date.toLocaleDateString(locale, { month: 'long' });

  return `${dayNumber} ${month} · ${day}`;
};
