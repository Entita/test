import axios from 'axios'
import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { getCookie } from 'cookies-next';
import { HomeworksContainer, HomeworksContentAddLabel, HomeworksContentAddContainer, HomeworksContentAddForm, HomeworksContentAddInput } from './HomeworksContentAdd.style'

export default function HomeworksContentAdd({ student, setEdit, setData, setNotification }) {
    const titleRef = React.useRef(null)
    const descriptionRef = React.useRef(null)

    async function createHomework() {
        const id = student.id
        const adminId = getCookie('userCookie')
        const newTitle = titleRef.current.value
        const newDescription = descriptionRef.current.value
        if (newTitle.length === 0 || newDescription.length === 0) {
            setNotification("You should fill all fields.")
        }
        else {
            await axios('http://localhost:3000/api/user.change', {
                method: 'PUT',
                data: {
                    adminId,
                    id,
                    newTitle,
                    newDescription,
                }
            }).then(({ data }) => {
                if (data) setData(data)
                else alert('Change failed.')
            }).finally(() => setEdit(false))
            setNotification("Homework Was Created ! #goodNotification");
        }

    }
    return (
        <HomeworksContentAddForm>
            <HomeworksContentAddContainer>
                <HomeworksContainer>
                    <HomeworksContentAddLabel >title:</HomeworksContentAddLabel>
                    <HomeworksContentAddInput ref={titleRef} type="text" placeholder='title'></HomeworksContentAddInput>
                </HomeworksContainer>
            </HomeworksContentAddContainer>
            <HomeworksContentAddContainer>
                <HomeworksContainer>
                    <HomeworksContentAddLabel >description:</HomeworksContentAddLabel>
                    <HomeworksContentAddInput ref={descriptionRef} type="text" placeholder='description'></HomeworksContentAddInput>
                </HomeworksContainer>
            </HomeworksContentAddContainer>
            <FaRegCheckCircle onClick={() => (createHomework())} />
            {/* <button onClick={() => console.log(titleRef.current.value)}>test</button> */}
        </HomeworksContentAddForm>
    )
}