import React from 'react'
import moment from 'moment'
import AdminStudentContent from './AdminStudentContent'
import { addDays } from './ContentOfStudent/LessonChange';
import { getNextLesson, getDay } from '../Student/StudentMainContent';

import { AdminStudentsContainer, MainContainer, MainHeaderContainer, MainHeaderUser, MainHeaderRole, MainHeaderName, MainHeaderTitle, MainHeaderTitleRole, MainHeaderNextLesson, MainHeaderNextLessonTitle, MainHeaderLessonTitleTime } from './AdminMainContent.style'

// export const getAllDates = (data) => {
//     const allDates = data.students.map((student) => {
//         return student.lessons.map((lesson) => {
//           return lesson.date;
//         });
//       }).flat();
//     return allDates
// }

export const getAllDates = (data) => {
    const allDates = data.students.map((student) => {
        return student.lessons
    }).flat();

    allDates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse()
    return allDates
}

export default function MainContent({ data, setData, setNotification }) {
    const allDates = getAllDates(data)
    const nextLesson = React.useMemo(() => getNextLesson(allDates), [data])
    const day = getDay(nextLesson.getDay())

    return (
        <MainContainer>
            <MainHeaderContainer>
                <MainHeaderUser>
                    <MainHeaderName><MainHeaderTitle>{data.firstName} {data.lastName}</MainHeaderTitle></MainHeaderName>
                    <MainHeaderRole><MainHeaderTitleRole>{data.role}</MainHeaderTitleRole></MainHeaderRole>
                </MainHeaderUser>
                <MainHeaderNextLesson>
                    <MainHeaderNextLessonTitle>next lesson</MainHeaderNextLessonTitle>
                    <MainHeaderLessonTitleTime>{`${day ? `${day} ${moment(nextLesson).format('HH:mm')}` : "Lessons not yet set"}`}</MainHeaderLessonTitleTime>
                </MainHeaderNextLesson>
            </MainHeaderContainer>
            <AdminStudentsContainer>
                {data.students.map((student, key) => {
                    return (
                        <AdminStudentContent student={student} data={data} key={key} setData={setData} setNotification={setNotification}/>
                    )
                })
                }
            </AdminStudentsContainer>
        </MainContainer>
    )
}