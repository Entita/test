import { Html, Head, Main, NextScript } from 'next/document'

// link to next and basic adjustments
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        {/*we have to change crossorigin to cross0rigin  */}
        <link rel="preconnect" href="https://fonts.gstatic.com" cross0rigin/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}