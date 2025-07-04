export default function Copyright() {
  const year = new Date().getFullYear();
  return (
    <footer>
      &copy; {year} José Velis
    </footer>
  );
}