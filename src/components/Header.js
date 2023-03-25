import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header>
      <Link href="/">
        <Image
          src="/images/crepe.svg"
          height={100}
          width={100}
          alt="crêpe cone log"
        />{" "}
      </Link>

      <nav>
        <Link href="/menu">Menu </Link>
        <Link href="/order">Order </Link>
        <Link href="/booking">Booking </Link>
        <Link href="/about-us">About </Link>
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </nav>
    </header>
  );
}
