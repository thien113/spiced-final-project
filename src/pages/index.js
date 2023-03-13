import Head from "next/head";
import Image from "next/image";
import Benefits from "../components/Benefits";
import EmailForm from "../components/EmailForm";

export default function Home() {
  async function handleAddEmailSubscriber(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailData = Object.fromEntries(formData);

    const response = await fetch("/api/email", {
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
      <div
        style={{
          height: "auto",
          position: "relative",
          borderRadius: "50px",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/wave.svg"
          layout="fill"
          objectFit="cover"
          alt="crêpe cone log"
        />
        <Image
          src="/images/crepe.svg"
          height={250}
          width={250}
          alt="crêpe cone log"
          style={{ zIndex: 1, position: "relative", borderRadius: "30px" }}
        />
        <p
          style={{
            zIndex: 1,
            position: "relative",
            backgroundColor: "white",
          }}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </p>
        <button
          style={{ zIndex: 1, position: "relative", backgroundColor: "white" }}
        >
          Get delivery
        </button>
      </div>
      <EmailForm onSubmit={handleAddEmailSubscriber} />
      <Benefits />
    </>
  );
}
