// import App from 'next/app'
import { reset, globals } from "styles";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {globals}
      </style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
