import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { FaRegEdit, FaCheck } from 'react-icons/fa'
import { StudentSettingButtonsContainer, SettingsKeyInputAttribute, SettingsKeyAttribute, SettingsSendButton, SettingsBackButton, StudentSettingButtonContainer, StudentSettingAttributesContainer, StudentSettingContainer, StudentSettingMainContainer } from './StudentSettingsPage.style'
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'

export default function SettingsPage({ data, setData, setSettingsPage, setNotification={setNotification} }) {
    const [edit, setEdit] = React.useState(false)
    const passwordRef = React.useRef(null)
    const id = getCookie('userCookie')
    const studentId = data.id

    const changePassword = async () => {
        // console.log(passwordRef.current.value)
        const changedPassword = passwordRef.current.value
        await axios('http://localhost:3000/api/student.change', {
            method: 'PATCH',
            data: {
                adminId: id,
                studentId,
                changedPassword
            }
        }).then(({ data }) => {
            console.log(data)
            if (data) setData(data)
            else alert('Change failed.')
        }).finally(() => setEdit(prevState => !prevState))
        setNotification("Password Was Edited ! #goodNotification")
    }

    return (
        <StudentSettingMainContainer>
            <StudentSettingContainer>
                <FontsHeaderBold>Settings</FontsHeaderBold>
                <StudentSettingAttributesContainer>
                    <FontsBold>{`student's role:`}</FontsBold><FontsThin>{data.role}</FontsThin>
                </StudentSettingAttributesContainer>
                <StudentSettingAttributesContainer>
                    <FontsBold>{`student's name:`}</FontsBold><FontsThin>{data.firstName} {data.lastName}</FontsThin>
                </StudentSettingAttributesContainer>
                <StudentSettingAttributesContainer>
                    {/*Zeptat se kubu na bezpečnost */}
                    <FontsBold>{`student's username:`}</FontsBold><FontsThin>{data.username}</FontsThin>
                </StudentSettingAttributesContainer>
                <StudentSettingAttributesContainer>
                    {
                        edit
                            ?
                            <>
                                <FontsBold>{`student's passwd:`}</FontsBold>
                                <SettingsKeyInputAttribute ref={passwordRef} defaultValue={"input new passwd"} disabled={!edit} readOnly={!edit} editable={edit} />
                            </>
                            :
                            <>
                                {/*Zeptat se kubu na bezpečnost */}
                                <FontsBold>{`student's passwd:`}</FontsBold><FontsThin>{"********"}</FontsThin>
                            </>
                    }
                </StudentSettingAttributesContainer>

                <StudentSettingButtonsContainer>
                    <StudentSettingButtonContainer onClick={() => setEdit(prevState => !prevState)}>
                        <FaRegEdit />
                    </StudentSettingButtonContainer>
                    {
                        edit
                            ?
                            <StudentSettingButtonContainer onClick={() => changePassword()}>
                                <FaCheck />
                            </StudentSettingButtonContainer>
                            :
                            <></>
                    }
                </StudentSettingButtonsContainer>
            </StudentSettingContainer>
            {/* <SettingsSendButton>send</SettingsSendButton> */}
            <SettingsBackButton onClick={() => setSettingsPage(false)}>back to dashboard</SettingsBackButton>
        </StudentSettingMainContainer>
    )
}