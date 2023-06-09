import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <Head>
          <title>FOOD APP</title>
          <meta name="description" content="foodApp by Dhanasekar A" />

          <link rel="icon" href={"../logo.png"} />
        </Head>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
