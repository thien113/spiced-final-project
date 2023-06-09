import Image from "next/image";

export default function Info({ restaurant }) {
  return (
    <section className="info">
      <Image
        src="/images/crepe.svg"
        height={150}
        width={100}
        alt="crêpe cone log"
      />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.733182133911!2d13.409090916089689!3d52.5020692798108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85040729098d5%3A0x2b26a7719f1340ea!2sSpiced%20Academy!5e0!3m2!1sen!2sde!4v1678714011775!5m2!1sen!2sde"
        width="380"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div>
        <p>Mo-Sun: 11:00 - 20:00</p>
        {restaurant.map((r) => (
          <>
            <p>Telephone: {r.telephone}</p>
            <p>{r.adress}</p>
          </>
        ))}
      </div>
    </section>
  );
}
