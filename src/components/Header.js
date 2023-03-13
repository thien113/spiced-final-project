import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image
        src="/images/crepe.svg"
        height={150}
        width={150}
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
