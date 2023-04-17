import React, { useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { FaRegCheckCircle, FaFolderOpen, FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa'
import { SummaryContentAddInput, SummaryContentIconWrapper, SummaryContentItemWrapper, SummaryContentAddLabel, SummaryContentAddContainer, SummaryContentBasicContainer, SummaryContentAddForm, SummaryContentBackButtonContainer, SummaryContentAddButtonContainer, SummaryContentItem, SummaryContentItemContainer, SummaryContentContainer } from './SummaryContent.style'

export default function SummaryContent({ setData, student, setNotification }) {
    const dateRef = React.useRef(null)
    const summaryRef = React.useRef(null)
    const [add, setAdd] = React.useState(false)


    async function deleteSummary(compound){
        const id = student.id
        const adminId = getCookie('userCookie')
        
        await axios('http://localhost:3000/api/user.change', {
            method: 'DELETE',
            data: {
                adminId,
                studentId: id,
                erasable: compound,
                difference: "summary",
            }
        }).then(({ data }) => {
            if (data) setData(data)
            else setNotification('Change failed.')
        }).finally(() => setNotification("Summary Was Deleted ! #goodNotification"))
    }

    async function createSummary(){
        const id = student.id
        const adminId = getCookie('userCookie')
        const newDate = dateRef.current.value
        const newSummary = summaryRef.current.value
        const compound = (newDate + " - " + newSummary).toString()
        if (newDate.length === 0 || newSummary.length === 0){
            setNotification("You should fill all fields.")
        }
        else{
            await axios('http://localhost:3000/api/student.change', {
                method: 'PUT',
                data: {
                    adminId,
                    studentId: id,
                    compound
                }
            }).then(({ data }) => {
                if (data) setData(data)
                else alert('Change failed.')
            }).finally(() => setAdd(false))
            setNotification("Summary Was Created! #goodNotification");
        }
        
    }


    return (
        <>
            {add
                ?
                <>
                    <SummaryContentAddForm>
                        <SummaryContentAddContainer>
                            <SummaryContentBasicContainer>
                                <SummaryContentAddLabel >date:</SummaryContentAddLabel>
                                <SummaryContentAddInput ref={dateRef} type="date"></SummaryContentAddInput>
                            </SummaryContentBasicContainer>
                        </SummaryContentAddContainer>
                        <SummaryContentAddContainer>
                            <SummaryContentBasicContainer>
                                <SummaryContentAddLabel >description:</SummaryContentAddLabel>
                                <SummaryContentAddInput ref={summaryRef} type="text" placeholder='description'></SummaryContentAddInput>
                            </SummaryContentBasicContainer>
                        </SummaryContentAddContainer>
                        <FaRegCheckCircle onClick={() => createSummary()} />
                        
                    </SummaryContentAddForm>
                    <SummaryContentBackButtonContainer onClick={() => setAdd(prevState => !prevState)}>
                        <FaMinusSquare />
                    </SummaryContentBackButtonContainer>
                </>
                :

                // change files for summary
                student.summary.length > 0
                    ?
                    <>
                        <SummaryContentContainer>
                            <SummaryContentItemContainer>
                                <SummaryContentItem>Summaries</SummaryContentItem>
                                {
                                    student.summary.map((summaryItem, idx) =>
                                        <SummaryContentItemWrapper key={idx}>
                                            <SummaryContentItem><span>{summaryItem.slice(0,12)}</span>{summaryItem.slice(12,)}</SummaryContentItem>
                                            <SummaryContentIconWrapper onClick={() => deleteSummary(summaryItem)}>
                                                <FaTrash/>
                                            </SummaryContentIconWrapper>
                                        </SummaryContentItemWrapper>
                                    )
                                }
                            </SummaryContentItemContainer>
                        </SummaryContentContainer>
                        <SummaryContentAddButtonContainer onClick={() => setAdd(prevState => !prevState)}>
                            <FaPlusSquare />
                        </SummaryContentAddButtonContainer>
                    </>
                    :
                    <>
                        <SummaryContentContainer>
                            <p>{`Summary hasn't been added!`}</p>
                            <FaFolderOpen />

                        </SummaryContentContainer>
                        <SummaryContentAddButtonContainer onClick={() => setAdd(prevState => !prevState)}>
                            <FaPlusSquare />
                        </SummaryContentAddButtonContainer>
                    </>
            }
        </>
    );
}