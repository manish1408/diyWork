import Document, { Html, Head, Main, NextScript } from "next/document";
import PrismicScript from "../components/PrismicScript";
import { reset, globals } from "styles";
import Gtm from 'next-gtm'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="/js/jquery-3.5.0.min.js"></script>

          <link
            href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&amp;display=swap"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="/css/all.css" />
          <link rel="stylesheet" href="/css/elegant-font-icons.css" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/owl.carousel.css" />
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href="/css/custom.css" />
          <link rel="icon" href="/favicon.png" type="image/png" />
          <Gtm id='GTM-K6D5VBD'/>
        </Head>
        <body>
          <Main />
          <NextScript />
          <PrismicScript />
          <script src="/js/popper.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>

          <script src="/js/ajax-contact.js"></script>
          {/* <script src="./js/owl.carousel.min.js"></script> */}
          {/* <script src="./js/switch.js"></script> */}

          <script src="/js/main.js"></script>
          {/* <script src="https://diy-work.disqus.com/embed.js" async ></script>
          <script id="dsq-count-scr" src="//diy-work.disqus.com/count.js" async></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
