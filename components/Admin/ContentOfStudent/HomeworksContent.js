import React from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { FaTrash, FaPlusSquare, FaMinusSquare } from 'react-icons/fa'
import { HomeworksContentShowContentEditContainer, HomeworksContentShowTitleItem, HomeworksContentShowMainContainer, HomeworksContentShowContainer } from './HomeworksContentShow.style'
import HomeworksContentEmpty from './HomeworksContentEmpty'
import HomeworksContentAdd from './HomeworksContentAdd'

export default function HomeworksContent({ student, setData, setNotification }) {
    const [edit, setEdit] = React.useState(false)
    const id = getCookie('userCookie')
    const studentId = student.id

    async function removeItem(homeworkId) {
        console.log("Removing homework with this ID: ", id)

        await axios('http://localhost:3000/api/user.change', {
            method: 'DELETE',
            data: {
                adminId: id,
                studentId,
                erasable: homeworkId,
                difference: "homework",
            }
        }).then(({ data }) => {
            if (data) setData(data)
            else setNotification('Change failed.')
        }).finally(() => setNotification("Homework Was Removed ! #goodNotification"))
    }

    return (
        <>
            {edit
                ?
                <HomeworksContentAdd student={student} setEdit={setEdit} setData={setData} setNotification={setNotification} />
                :
                <HomeworksContentShowMainContainer>
                    {student.homeworks.length > 0
                        ?
                        student.homeworks.map(homework =>
                            <HomeworksContentShowContainer key={homework.id}>
                                <HomeworksContentShowTitleItem><span>{homework.title} -</span> {homework.description}</HomeworksContentShowTitleItem>
                                <FaTrash onClick={() => removeItem(homework.id)} />
                            </HomeworksContentShowContainer>
                        )
                        :
                        <HomeworksContentEmpty setData={setData}></HomeworksContentEmpty>}
                </HomeworksContentShowMainContainer>
            }
            <HomeworksContentShowContentEditContainer onClick={() => setEdit(prevState => !prevState)} editable={edit} >
                {

                    edit ?
                        <FaMinusSquare />
                        :
                        <FaPlusSquare />
                }
            </HomeworksContentShowContentEditContainer>
        </>
    )
}
