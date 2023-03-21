import Image from "next/image";

export default function Benefits() {
  return (
    <>
      <p className="landing-text">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua.
      </p>
      <div className="benefit">
        <div>
          <Image
            src="/images/com.svg"
            height={80}
            width={80}
            alt="crêpe cone log"
          />
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
        <div>
          <Image
            src="/images/star.svg"
            height={80}
            width={80}
            alt="crêpe cone log"
          />
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
        <div>
          <Image
            src="/images/fast.svg"
            height={80}
            width={80}
            alt="crêpe cone log"
          />
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
      </div>
    </>
  );
}
