import React from 'react'
import { Colors } from '../../utils/Colors'
import { FaSignOutAlt, FaPlus, FaCalendarAlt, FaEnvelopeOpen } from 'react-icons/fa'
import { SideContainer } from './AdminSidePanel.style'

export default function SidePanel({ setLogoutPage, setAddPage, setPostPage }) {
    const styleSingOut = { color: Colors.darkGray, fontSize: "2.3rem" };
    const styleAdd = { color: Colors.lightGreen, fontSize: "2.3rem" };
    const styleCalendar = { color: Colors.purple, fontSize: "2.3rem" };
    const styleEnvelope = { color: Colors.blue, fontSize: "2.3rem" };

    return (
      <SideContainer>
        <FaSignOutAlt style={styleSingOut} onClick={() => setLogoutPage(true)}/>
        <FaPlus style={styleAdd} onClick={() => setAddPage(true)}/>
        {/* <FaCalendarAlt style={styleCalendar} /> */}
        <FaEnvelopeOpen style={styleEnvelope} onClick={() => setPostPage(true)}/>
      </SideContainer>
    )
  }