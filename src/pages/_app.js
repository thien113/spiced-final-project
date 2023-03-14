import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
      <Footer />
    </>
  );
}
