import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="dashboard-row">
        <Link href="/privacy-policy">
          <h6>Privacy Policy</h6>
        </Link>
        <Link href="/terms-of-conditions">
          <h6>Terms of Conditions</h6>
        </Link>
      </div>

      <h4>© 2023 by Crêpe Cone</h4>
    </footer>
  );
}
