import React from 'react'
import { useState } from 'react'
import LogoutPage from './AdminLogoutPage'
import PostPage from './AdminPostPage'
import AddPage from './AdminAddPage'
import SidePanel from './AdminSidePanel'
import MainContent from './AdminMainContent'
import Footer from '../Footer'
import { AdminContainer } from './Admin.style'

export default function Admin( { data, setData, setNotification} ) {
  const [openLogoutPage, setLogoutPage] = useState(false);
  const [openPostPage, setPostPage] = useState(false);
  const [openAddPage, setAddPage] = useState(false);
  var subPage;
  if (openLogoutPage){
    subPage = <LogoutPage setLogoutPage={setLogoutPage} setData={setData}/>;
  }
  if (openPostPage){
    subPage = <PostPage setData={setData} setPostPage={setPostPage} data={data} setNotification={setNotification}/>;
  }
  if (openAddPage){
    subPage = <AddPage setAddPage={setAddPage} setNotification={setNotification}/>;
  }

  return (
    <>
    {
      openLogoutPage || openPostPage || openAddPage
      ?
      subPage
      :
      <>
      <AdminContainer>
        <SidePanel setLogoutPage={setLogoutPage} setPostPage={setPostPage} setAddPage={setAddPage} />
        <MainContent data={data} setData={setData} setNotification={setNotification}/>
      </AdminContainer>
      <Footer />
      </>
    }
    </>
  )
}

// onClick={() => setOpenApologize(true)}