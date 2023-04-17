import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import Admin from '../components/Admin/Admin';
import Student from '../components/Student/Student';

export { getServerSideProps } from '../components/getDataFromCookies'

export default function Home({ data, setData, userData, setNotification }) {
  React.useEffect(() => {
    if (userData) {
      if (data) setData(data)
      else setData(userData)
    }
    if (!data) Router.push('/');
  }, [userData, data])

  
  if (!data) return <></>
  
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data.role === 'admin'
        ? <Admin data={data} setData={setData} setNotification={setNotification} />
        : <Student data={data} setData={setData} setNotification={setNotification}/>
      }
    </>
  )
}
