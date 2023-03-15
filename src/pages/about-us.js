import Image from "next/image";

export default function About() {
  return (
    <section className="page-section">
      <h2>About Us</h2>
      <Image src="/images/crepe.svg" height={200} width={200} alt="about-us" />
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </p>
    </section>
  );
}
