import React from 'react'
import Footer from '../Footer'
import Router from 'next/router'
import { Colors } from '../../utils/Colors'
import { deleteCookie } from 'cookies-next';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'
import { StudentButton, StudentLogoutContainer, StudentMainContent, StudentContentContainer } from './StudentLogoutPage.style'

export default function LogoutPage({setLogoutPage, setData}) {
  const styleIconCheck = { color: Colors.darkGreen, fontSize: "2em", marginLeft: "0.3em"}
  const styleIconTimes = { color: Colors.red, fontSize: "2em", marginLeft: "0.3em"}
  return (
    <>
      <StudentLogoutContainer>
        <StudentMainContent>
          <FontsHeaderBold>logout</FontsHeaderBold>
          <StudentContentContainer>
            <StudentButton onClick={() => {setData(null); deleteCookie('userCookie'); Router.push('/')}}><FontsBold>yes,</FontsBold><FontsThin>logout</FontsThin><FaCheckCircle style={styleIconCheck} /></StudentButton>
            <StudentButton onClick={() => setLogoutPage(false)}><FontsBold>no,</FontsBold> <FontsThin>stay</FontsThin><FaTimesCircle style={styleIconTimes} /></StudentButton>
          </StudentContentContainer>   
        </StudentMainContent>
      </StudentLogoutContainer>
      <Footer />
    </>
  )
}