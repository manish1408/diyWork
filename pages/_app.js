// import App from 'next/app'
import { reset, globals } from "styles";
import Head from "next/head";
import { StateProvider } from "../utils/StateProvider";
import reducer, { initialState } from "../utils/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {globals}
      </style>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </>
  );
}

export default MyApp;
