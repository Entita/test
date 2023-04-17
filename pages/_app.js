import React from 'react';
import { GlobalStyle } from '../styles/global.style'
import Notification from '../components/Notification'

// basic component of react and nextjs
function MyApp({ Component, pageProps }) {
  const [data, setData] = React.useState();
  const [notification, setNotification] = React.useState("")

  return (
    <>
      <GlobalStyle />
      <Notification notification={notification} setNotification={setNotification} />
      <Component {...pageProps} data={data} setData={setData} setNotification={setNotification} />
    </>
  )
}

export default MyApp
