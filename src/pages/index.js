import Head from "next/head";
import Image from "next/image";
import Benefits from "../components/Benefits";
import EmailForm from "../components/forms/EmailForm";
import Info from "../components/Info";
import useSWR from "swr";
import Ratings from "../components/Ratings";

export default function Home() {
  const { data, isLoading } = useSWR("/api/restaurant");
  if (!data) return;
  if (isLoading) {
    return (
      <main>
        <Head>
          <title>Crêpe Cone</title>
          <meta name="description" content="Generated by Crêpe Cone" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h2>Home</h2>
        <div className="cover">
          <Image
            src="/images/crepe.svg"
            height={250}
            width={250}
            alt="crêpe cone log"
            className="cover-logo"
          />
          <div className="cover-info">
            <p className="cover-text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </p>
            <button className="cover-button">Get delivery</button>
          </div>
        </div>
      </main>
    );
  }
  async function handleAddEmailSubscriber(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailData = Object.fromEntries(formData);

    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      event.target.reset();
    } else {
      console.error(response.status);
    }
  }
  return (
    <main>
      <Head>
        <title>Crêpe Cone</title>
        <meta name="description" content="Generated by Crêpe Cone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Home</h2>
      <div className="cover">
        <Image
          src="/images/crepe.svg"
          height={250}
          width={250}
          alt="crêpe cone log"
          className="cover-logo"
        />
        <div className="cover-info">
          <p className="cover-text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
          <button className="cover-button">Get delivery</button>
        </div>
      </div>
      <h4>What our customers think about us</h4>
      <Ratings restaurant={data} />
      <EmailForm onSubmit={handleAddEmailSubscriber} />
      <Benefits />
      <Info restaurant={data} />
    </main>
  );
}
