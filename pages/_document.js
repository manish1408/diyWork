import Document, { Html, Head, Main, NextScript } from 'next/document'
import PrismicScript from '../components/PrismicScript'
import { reset, globals } from 'styles'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />

          <link href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&amp;display=swap" rel="stylesheet" />

          <link rel="stylesheet" href="./css/all.css" />
          <link rel="stylesheet" href="./css/elegant-font-icons.css" />
          <link rel="stylesheet" href="./css/bootstrap.min.css" />
          <link rel="stylesheet" href="./css/owl.carousel.css" />
          <link rel="stylesheet" href="./css/style.css" />
          <link rel="stylesheet" href="./css/custom.css" />
          <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <PrismicScript />
          <script src="./js/jquery-3.5.0.min.js"></script>
          <script src="./js/popper.min.js"></script>
          <script src="./js/bootstrap.min.js"></script>

          <script src="./js/ajax-contact.js"></script>
          <script src="./js/owl.carousel.min.js"></script>
          {/* <script src="./js/switch.js"></script> */}

          <script src="./js/main.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
