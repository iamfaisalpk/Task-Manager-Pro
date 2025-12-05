export const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const formatDateTime = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};
