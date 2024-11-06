export default function formatDate(date: Date, edited?: boolean) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  if (edited) return `${month}/${day}/${year} (edited)`;
  return `${month}/${day}/${year}`;
}
