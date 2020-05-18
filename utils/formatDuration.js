export const formatDuration = (totalMinutes) => {
  totalMinutes = parseInt(totalMinutes);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  hours == 0 ? (formatted = `${minutes} min`) : (formatted = `${hours} h ${minutes} min`);

  return formatted;
};
