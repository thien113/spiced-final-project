import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image
        src="/images/crepe.svg"
        height={50}
        width={50}
        alt="crêpe cone log"
      />
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
