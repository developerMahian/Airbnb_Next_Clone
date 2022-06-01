import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="eng">
    <Head>
      <meta charset="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </Head>

    <body
      className={`${process.env.NODE_ENV !== "production" && "debug-screens"}`}
    >
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
