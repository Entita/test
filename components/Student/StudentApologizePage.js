import React from 'react'
import Footer from '../Footer'
import "react-dates/initialize";
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import axios from 'axios'
import { StudentApologizeContainer, ApologizeTitle, ApologizeForm, ApologizeLabel, ApologizeInput, ApologizeSendButton, ApologizeBackButton } from './StudentApologizePage.style'

export default function ApologizePage({ data, setData, setApologizePage, setNotification }) {
  const [focused, setFocused] = React.useState(false)
  const [date, setDate] = React.useState(null)
  const allowedDays = data.lessons.map(day => moment(day.date).format('d'))

  const apologizeFromLesson = async () => {
    const selectedLesson = data.lessons.filter(day => moment(day.date).format('d') === moment(date._d).format('d'))[0]
    const selectedDate = moment(selectedLesson.date)
    const selectedEndDate = moment(selectedLesson.endDate)
    const dynamicDate = moment(date._d)
    const dynamicEndDate = moment(date._d)
    dynamicDate.set({
      h: selectedDate.format('HH'),
      m: selectedDate.format('mm'),
      s: selectedDate.format('ss'),
    })
    dynamicEndDate.set({
      h: selectedEndDate.format('HH'),
      m: selectedEndDate.format('mm'),
      s: selectedEndDate.format('ss'),
    })

    const dateFormat = {
      from: dynamicDate.format(),
      to: dynamicEndDate.format(),
      status: 'apologized'
    }

    console.log(dynamicDate, dateFormat)

    await axios('http://localhost:3000/api/lesson.change', {
      method: 'POST',
      data: {
        studentId: data.id,
        lessonId: selectedLesson.id,
        date: dateFormat,
      }
    }).then(({ data }) => {
      if (data) {
        setData(data)
        setApologizePage(false)
      } else setNotification('Change failed.')
    })
    setNotification('You Have Apologized From Lecture ! #goodNotification')
  }

  return (
    <>
      <StudentApologizeContainer>
        <ApologizeTitle>Apologies from lecture</ApologizeTitle>
        <ApologizeForm>
          <ApologizeLabel >name:</ApologizeLabel >
          <ApologizeInput type="text" name="name" value={data.firstName} readOnly />
          <ApologizeLabel >surname:</ApologizeLabel >
          <ApologizeInput type="text" name="name" value={data.lastName} readOnly />
          <ApologizeLabel >date:</ApologizeLabel >
          <SingleDatePicker
            date={date}
            onDateChange={(date) => setDate(date)}
            focused={focused}
            onFocusChange={({ focused }) => setFocused(focused)}
            id="your_unique_id"
            numberOfMonths="1"
            showDefaultInputIcon="true"
            hideKeyboardShortcutsPanel="true"
            placeholder=""
            isDayBlocked={(day) => {
              const date = moment(day?._d)
              return !allowedDays.includes(date.format('d')) || moment(date).isSame(new Date(), 'day')
            }}
          />

          <ApologizeSendButton onClick={() => apologizeFromLesson()} disabled={!date}>send</ApologizeSendButton>
          <ApologizeBackButton onClick={() => setApologizePage(false)}>back to dashboard</ApologizeBackButton>
        </ApologizeForm>
      </StudentApologizeContainer>
      <Footer />
    </>
  )
}