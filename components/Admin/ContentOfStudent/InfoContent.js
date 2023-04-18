import React from 'react'
import moment from 'moment'
import { FaTrash, FaRegEdit, FaCheck, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { addDays } from './LessonChange';

import { StudentKeyRemoveButton, StudentKeyRemoveLessonButton, StudentKeyRemoveAttribute, StudentRemoveAttribute, StudentPlanAttribute, StudentKeyInputAttributePlan, StudentPlansValues, PlanAttributes, StudentRemoveAttributes, StudentEditAttributes, StudentCheckInputAttribute, StudentKeyInputAttribute, StudentEditContainer, StudentPlanContent, StudentPlanValues, StudentInfoContainerOne, StudentInfoContainerTwo, StudentAttributes, StudentKeyAttribute, StudentValueAttribute } from './InfoContent.style'

export const constructWeek = (lessons) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const week = {}
    const lessonsCopy = JSON.parse(JSON.stringify(lessons));

    lessonsCopy.forEach(lecture => {
        const dayIndex = new Date(lecture.date).getDay() === 0 ? days.length - 1 : new Date(lecture.date).getDay() - 1
        const day = days[dayIndex]
        const lectureDate = new Date(lecture.date)
        let lectureDateThisWeek = lectureDate

        while (moment().isoWeek() != moment(lectureDateThisWeek).isoWeek()) lectureDateThisWeek = addDays(lectureDateThisWeek, 7)


        let isCancelled = false
        let isChange = false

        lecture.statuses.map(status => {
            if (new Date(status.from).getTime() == lectureDateThisWeek.getTime()) isCancelled = true
        })

        if (!isCancelled) {
            lecture.changes.map(change => {
                if (new Date(change.from).getTime() == lectureDateThisWeek.getTime()) isChange = change
            })

            if (isChange) {
                lecture.date = isChange.newFrom
                lecture.endDate = isChange.newTo
                lecture.changed = true
            }

            if (week[day]) week[day].push(lecture)
            else week[day] = [lecture]
        }
    })

    return Object.entries(week).reverse()
}

const randomStringGen = () => (Math.random() + 1).toString(36).substring(7)

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export default function InfoContent({ student, setData, setNotification }) {
    const oldLessons = student.lessons 
    const lessons = React.useMemo(() => constructWeek(student.lessons), [student])
    const [edit, setEdit] = React.useState(false)
    const [plan, setPlan] = React.useState(student.plan.map(plan => ({ value: plan, key: randomStringGen() })))
    const nameRef = React.useRef(null)
    const surnameRef = React.useRef(null)
    
    const addArrayAttribute = () => {
        setPlan(prevPlan => [...prevPlan, { value: 'set plan...', key: randomStringGen() }])
    }

    // [
    //     {
    //         value: 'plan1',
    //         key: 'randomString'
    //     },
    //     {
    //         value: 'plan2',
    //         key: 'randomString'
    //     }
    // ]

    const editArrayAttribute = (key, value) => {
        setPlan(prevPlan => {
            const index = prevPlan.findIndex(planValue => planValue.key === key)
            prevPlan[index].value = value
            return prevPlan
        })
    }

    const removeArrayAttribute = (key) => {
        setPlan(prevPlan => prevPlan.filter(planValue => planValue.key !== key))
    }

    const removeStudent = async (studentId) => {
        const id = getCookie('userCookie')
        console.log(studentId)
        await axios('user.remove', {
            method: 'DELETE',
            data: {
                adminId: id,
                studentId,
            }
        }).then(({ data }) => {
            if (data) setData(data)
            else setNotification('Change failed.')
        })
    }

    const changeInfo = async () => {
        const changedName = nameRef.current.value
        const changedSurname = surnameRef.current.value
        const id = getCookie('userCookie')
        const studentId = student.id
        const valuePlan = plan.map(plan => plan.value)

        if (changedName === student.firstName && changedSurname === student.lastName && arrayEquals(valuePlan, student.plan)) return

        await axios('user.change', {
            method: 'POST',
            data: {
                adminId: id,
                studentId,
                changedName,
                changedSurname,
                plan: valuePlan
            }
        }).then(({ data }) => {
            if (data) setData(data)
            else setNotification('Change failed.')
        }).finally(() => setEdit(false))
        setNotification("Info Was Edited #goodNotification")
    }

    return (
        <>
            <StudentInfoContainerOne>
                <StudentAttributes>
                    <StudentKeyAttribute>name: </StudentKeyAttribute>
                    <StudentKeyInputAttribute ref={nameRef} defaultValue={student.firstName} disabled={!edit} readOnly={!edit} editable={edit} />
                </StudentAttributes>
                <StudentAttributes>
                    <StudentKeyAttribute>surname: </StudentKeyAttribute>
                    <StudentKeyInputAttribute ref={surnameRef} defaultValue={student.lastName} disabled={!edit} readOnly={!edit} editable={edit} />
                </StudentAttributes>
                <StudentAttributes>
                    <StudentKeyAttribute>count of lessons: </StudentKeyAttribute>
                    <StudentValueAttribute>{student.lessons.length}</StudentValueAttribute>
                </StudentAttributes>
                <StudentPlanValues>
                    <StudentPlanAttribute>plan: </StudentPlanAttribute>
                    <StudentPlansValues>
                        {plan.map((value, key) =>
                            <PlanAttributes key={value.key}>
                                <StudentKeyInputAttributePlan onChange={({ target }) => editArrayAttribute(value.key, target.value)} defaultValue={value.value} disabled={!edit} readOnly={!edit} editable={edit} />
                                <StudentRemoveAttributes onClick={() => removeArrayAttribute(value.key)}>
                                    {
                                        edit &&
                                        <FaMinusCircle />
                                    }
                                </StudentRemoveAttributes>
                            </PlanAttributes>
                        )}
                        <StudentEditAttributes onClick={() => addArrayAttribute()}>
                            {
                                edit &&
                                <FaPlusCircle />
                            }
                        </StudentEditAttributes>
                    </ StudentPlansValues>
                </StudentPlanValues>
            </StudentInfoContainerOne>
            <StudentInfoContainerTwo>
                {/* TO DO -> udělat podmínku, jestli je pole s hodinami na tento týden prázdné, tak napsat, že tento týden nemáš hodinu :) nebo tady dát prostě obecný stav kdy hodina je */}
                {lessons.map((lesson, key) =>
                    <div key={key}>
                        <StudentValueAttribute>{lesson[0]}</StudentValueAttribute>
                        {lesson[1].map((day, key) =>
                            <StudentPlanContent key={key}>
                                <StudentKeyAttribute>from: </StudentKeyAttribute><StudentValueAttribute changed={day.changed}>{`${moment(day.date).format('HH:mm')}`}</StudentValueAttribute>
                                <StudentKeyAttribute>to: </StudentKeyAttribute><StudentValueAttribute changed={day.changed}>{`${moment(day.endDate).format('HH:mm')}`}</StudentValueAttribute>
                                <StudentKeyAttribute>
                                    <StudentKeyRemoveLessonButton onClick={() => console.log("click")}>
                                        {
                                            edit &&
                                            <FaTrash />
                                        }
                                    </StudentKeyRemoveLessonButton>
                                </StudentKeyAttribute>
                            </StudentPlanContent>
                        )}
                    </div>
                )}
                {/* <FaPlusCircle /> */}
                {
                    edit &&
                    <StudentRemoveAttribute >
                        <StudentKeyRemoveAttribute onClick={() => removeStudent(student.id)}>disable</StudentKeyRemoveAttribute>

                    </StudentRemoveAttribute>
                }
            </StudentInfoContainerTwo>
            <div>

                <StudentEditContainer onClick={() => setEdit(prevState => !prevState)}>
                    <FaRegEdit />
                </StudentEditContainer>
                {
                    edit &&
                    <StudentCheckInputAttribute onClick={() => changeInfo()}>
                        <FaCheck />
                    </StudentCheckInputAttribute>
                }
            </div>
        </>
    )
}