import React from 'react'
import Footer from '../Footer'
import moment from 'moment'
import axios from 'axios'
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'
import { StudentSentButton, StudentPaymentContainerInfo, StudentContainer, StudentBackButton, StudentPaymentMainContainer, StudentPaymentContainer } from './StudentPaymentPage.style'

export default function PaymentPage({ data, setData, setPaymentPage, setNotification }) {
  const lessonsToPay = React.useMemo(() => data.lessonsToPay, [data])

  const createPaymentRequest = async (lesson) => {
    const lessonDate = new Date(lesson.from)
    const lessonEndDate = new Date(lesson.to)
    const minutes = lessonEndDate.getMinutes() - lessonDate.getMinutes()
    const hours = lessonEndDate.getHours() - lessonDate.getHours()
    hours += minutes / 60

    const amount = hours * 250

    await axios('http://localhost:3000/api/lesson.change', {
      method: 'PUT',
      data: {
        id: data.id,
        lessonId: lesson.id,
        from: lesson.from,
        amount,
      }
    }).then(({ data }) => {
      if (data) {
        setData(data)
      } else setNotification('Change failed.')
    })
    setNotification(`Payment From ${moment(lesson.from).format('D.M.YYYY')} Paid ! #goodNotification`)
  }

  return (
    <>
      <StudentPaymentMainContainer>
        <FontsHeaderBold>Payments</FontsHeaderBold>
        {lessonsToPay.map((lessonToPay, index) => (
          <StudentPaymentContainer key={index} sent={lessonToPay.sent}>
            <StudentContainer>
              <span>Lesson to pay:</span>
              <span>{moment(lessonToPay.from).format('D. MMMM HH:mm')}</span>
            </StudentContainer>
            <StudentSentButton disabled={lessonToPay.sent} onClick={() => createPaymentRequest(lessonToPay)}>pay now</StudentSentButton>
          </StudentPaymentContainer>
        ))}
        <StudentPaymentContainerInfo>
          <FontsBold>Info:</FontsBold>
          <FontsThin>č.ú.: 3014941083/0800</FontsThin>
          <FontsThin>email: machackova.baraa@seznam.cz</FontsThin>
          <FontsThin>tel.č.: 725 352 444</FontsThin>
        </StudentPaymentContainerInfo>
        <StudentBackButton onClick={() => setPaymentPage(false)}><FontsBold>back to dashboard</FontsBold></StudentBackButton>
      </StudentPaymentMainContainer>
      <Footer />
    </>
  )
}