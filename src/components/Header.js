import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/order">Order</Link>
        <Link href="/booking">Booking</Link>
        <Link href="/about-us">About Us</Link>
      </nav>
    </header>
  );
}
