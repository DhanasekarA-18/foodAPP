import Head from "next/head";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DS FOOD | Gourmet Delivery</title>
        <meta name="description" content="Savor the finest culinary creations delivered to your doorstep. DS FOOD offers a premium e-commerce food experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo_premium.png" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
