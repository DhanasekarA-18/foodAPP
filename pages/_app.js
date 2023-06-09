import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../public/assets/Logo.png";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Head>
          <title>FOOD APP</title>
          <meta name="description" content="foodApp by Dhanasekar A" />

          <link rel="icon" href={Logo.src} />
        </Head>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
