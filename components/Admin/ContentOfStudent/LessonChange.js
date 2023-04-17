import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { getCookie } from 'cookies-next';
import { ApologyButton, LessonChangeButtonContainer, LessonChangeContainer, LessonChangeMainContainer, WrapperStyled, DateStyled, CalendarContentWrapperStyled, DatesWrapperStyled, SaveButton, GoBackButton, LessonTimeWrapper, WeekWrapperStyled, WeekInputStyled, WeekPlaceholderStyled, CalendarWrapperStyled, DayStyled, LessonStyled } from './LessonChange.style'
import { AdminLessonTimeInput } from '../AdminAddPage.style'

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const generateNextLessons = (lessons, weeks) => {
  const nextLessons = []
  let timeShift = false
  let i = 0
  while (nextLessons.length < weeks) {
    const weekLessons = []

    lessons.map(lesson => {
      let newDate = addDays(lesson.date, (i + 1) * 7)

      let newEndDate = addDays(lesson.endDate, (i + 1) * 7)
      if (timeShift) {
        newDate = addDays(newDate, -7)
        newEndDate = addDays(newEndDate, -7)
      }
      const dayIndex = newDate.getDay() === 0 ? week.length - 1 : newDate.getDay() - 1
      
      if (newDate.getTime() < new Date().getTime()) return
      if (nextLessons.length === 0 && moment(newDate).isoWeek() !== moment().isoWeek()) {
        newDate = addDays(newDate, -7)
        newEndDate = addDays(newEndDate, -7)
        timeShift = true
      }

      weekLessons.push([dayIndex, { id: lesson.id, date: newDate, endDate: newEndDate, statuses: lesson.statuses }])
    })

    if (weekLessons.length) nextLessons.push(weekLessons)
    i++
  }

  const formattedNextLessons = []

  nextLessons.map(weekLessons => {
    const formattedWeek = []
    week.map(day => {
      const dayIndex = week.indexOf(day)
      const lessonsThisDay = weekLessons.filter(dayLesson => dayLesson[0] === dayIndex)[0]
      let isCancelled = false
      if (lessonsThisDay) {
        const cancelledLessons = lessonsThisDay[1].statuses.map(day => (day.status === 'apologized' || day.status === 'cancelled') && new Date(day.from).getTime())
        isCancelled = cancelledLessons.includes(new Date(lessonsThisDay[1].date).getTime())
      }
      
      formattedWeek.push(lessonsThisDay && !isCancelled ? (new Date(lessonsThisDay[1].date).getTime() > new Date().getTime() ? lessonsThisDay[1] : null) : null)
    })
    formattedNextLessons.push(formattedWeek)
  })

  return formattedNextLessons
}

const getMonday = (d) => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

const generateDates = (weeks) => {
  const dates = []
  let nextDate = getMonday(new Date())

  while (dates.length < weeks) {
    dates.push(nextDate)

    nextDate = addDays(nextDate, 7)
  }

  return dates
}

export default function LessonChange({ data, student, setData, setNotification }) {
  const [nextWeeks, setNextWeeks] = React.useState(3)
  const [selectedDay, setSelectedDay] = React.useState(null)
  const nextLessons = React.useMemo(() => generateNextLessons(student.lessons, nextWeeks), [nextWeeks, student.lessons])
  const dates = React.useMemo(() => generateDates(nextWeeks), [nextWeeks])
  const lessonRef = React.useRef();
  const id = getCookie('userCookie')
  const studentId = student.id

  if (selectedDay) {
    const formatDate = () => {
      const lesson = lessonRef.current;
      const dateString = lesson.day.value;
      const date = new Date(dateString);

      const from = lesson.from.value;
      const fromHour = from.split(':')[0];
      const fromMinute = from.split(':')[1];
      const fromDate = new Date(new Date(new Date(date).setHours(fromHour)).setMinutes(fromMinute));

      const to = lesson.to.value;
      const toHour = to.split(':')[0];
      const toMinute = to.split(':')[1];
      const toDate = new Date(new Date(new Date(date).setHours(toHour)).setMinutes(toMinute));

      return {
        from: selectedDay.date,
        to: selectedDay.endDate,
        newFrom: fromDate,
        newTo: toDate,
      }
    }

    const cancelLesson = async () => {
      const formattedDate = formatDate()
  
      const dateFormat = {
        from: formattedDate.from,
        to: formattedDate.to,
        status: 'cancelled'
      }
      await axios('http://localhost:3000/api/admin.lesson.change', {
          method: 'POST',
          data: {
              adminId: id,
              studentId,
              lessonId: selectedDay.id,
              date: dateFormat,
          }
      })
      .then(({ data }) => {
          if (data) setData(data)
          else setNotification('Change failed.')
      }).finally(() => setSelectedDay(null))
      setNotification("Lesson Was Cancelled ! #goodNotification")
    }

    const saveTimeChange = async () => {
      const formattedLesson = formatDate()

      await axios('http://localhost:3000/api/student.change', {
        method: 'POST',
        data: {
          adminId: id,
          studentId,
          lessonId: selectedDay.id,
          lessons: formattedLesson,
        }
      }).then(({ data }) => {
        if (data) setData(data)
        else alert('Change failed.')
      })
    }

    return (
      <LessonChangeMainContainer>
        <LessonChangeContainer>
          <LessonTimeWrapper type="date"
            ref={(el) => lessonRef.current = { day: el, from: lessonRef.current?.from, to: lessonRef.current?.to }}
            value={selectedDay.selectedDate}
            readOnly
          />
          <AdminLessonTimeInput type="time"
            ref={(el) => lessonRef.current = { from: el, day: lessonRef.current?.day, to: lessonRef.current?.to }}
            defaultValue={selectedDay.fromTime}
          />
          <AdminLessonTimeInput type="time"
            defaultValue={selectedDay.toTime}
            ref={(el) => lessonRef.current = { to: el, from: lessonRef.current?.from, day: lessonRef.current?.day }}
            onChange={({ target }) => {
              const from = lessonRef.current?.from.value;
              const fromHour = Number(from.split(':')[0]) || 0
              const fromMinute = Number(from.split(':')[1]) || 0
              const toHour = Number(target.value.split(':')[0]) || 0
              const toMinute = Number(target.value.split(':')[1]) || 0

              if (!from || (fromHour >= toHour || (fromHour > toHour && fromMinute >= toMinute) || (fromHour + 1 === toHour && fromMinute > toMinute))) target.value = '';
            }}
          />
        </LessonChangeContainer>
        <LessonChangeButtonContainer>
          <GoBackButton onClick={() => setSelectedDay(null)}>back</GoBackButton>
          <SaveButton onClick={() => saveTimeChange()}>save</SaveButton>
          <ApologyButton onClick={() => cancelLesson()}>cancelled</ApologyButton>
        </LessonChangeButtonContainer>
      </LessonChangeMainContainer>
    )
  }

  return (
    <WrapperStyled>
      <WeekWrapperStyled>
        <WeekPlaceholderStyled>Select how many weeks to show:</WeekPlaceholderStyled>
        <WeekInputStyled value={nextWeeks} onChange={({ target }) => (target.value > 0 && setNextWeeks(target.value))} type='number' />
      </WeekWrapperStyled>

      <CalendarContentWrapperStyled>
        <DatesWrapperStyled>
          <DayStyled>Dates</DayStyled>
          {dates.map((date, key) =>
            <DateStyled key={key}>{`${moment(date).format('DD.M.')} - ${moment(addDays(date, 6)).format('DD.M.')}`}</DateStyled>
          )}
        </DatesWrapperStyled>
        <CalendarWrapperStyled>
          {week.map((day, key) =>
            <DayStyled key={key}>{day}</DayStyled>
          )}

          {nextLessons.map(week => {
            return week.map((day, dayKey) => {
              if (!day) return <DayStyled key={dayKey} />

              const fromDate = new Date(day.date)
              const toDate = new Date(day.endDate)
              const fromHours = fromDate.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
              const fromMinutes = fromDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
              const toHours = toDate.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
              const toMinutes = toDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

              const formattedDay = { ...day, selectedDate: moment(day.date).format('YYYY-MM-DD'), fromTime: `${fromHours}:${fromMinutes}`, toTime: `${toHours}:${toMinutes}` }

              return <LessonStyled key={day.id} onClick={() => setSelectedDay(formattedDay)} >{`${fromHours}:${fromMinutes} - ${toHours}:${toMinutes}`}</LessonStyled>
            })
          }
          )}
        </CalendarWrapperStyled>
      </CalendarContentWrapperStyled>
    </WrapperStyled>
  )
}
