import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>© 2022 by Crêpe Cone</p>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <Link href="/terms-of-conditions">Terms of Conditions</Link>
    </footer>
  );
}
