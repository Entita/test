import React from 'react'
import axios from 'axios'
import Footer from '../Footer'
import { Colors } from '../../utils/Colors'
import { FaPlusCircle } from 'react-icons/fa'
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'
import { AddSendButton, AdminAddLesson, AdminLessonCountContainer, AdminLessonCountInput, AdminLessonTimeInput, AdminLessonsContainer, AdminLesson, AdminCustomFontThin, AdminCustomFontBold, AdminRowDays, AdminDayItem, AdminDaysContainer, AdminLabel, AdminInputStyled, AdminButtonContainer, AdminFormContainer, AddBackButton, AdminAddContainer } from './AdminAddPage.style'

function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function AddPage({ setAddPage, setNotification }) {
  // style button 
  const styleMinus = { color: Colors.red, fontSize: "1.2em", cursor: "pointer" };
  const stylePlus = { color: Colors.lightGreen, fontSize: "1.2em", cursor: "pointer" };
  // student
  const [studentPassword] = React.useState(generateRandomString(10));
  const studentNameRef = React.useRef();
  const studentSurnameRef = React.useRef();
  const studentUsernameRef = React.useRef();
  const studentPlanRef = React.useRef();
  // representative
  const [representativePassword] = React.useState(generateRandomString(10));
  const representativeNameRef = React.useRef();
  const representativeSurnameRef = React.useRef();
  const representativePhoneRef = React.useRef();
  const [isRepresentative, setIsRepresentative] = React.useState(false);
  // lesson
  const lessonRefs = React.useRef([]);
  const [lessonCount, setLessonCount] = React.useState(1);
  const lessonDate = new Date().toJSON().slice(0, 10);

  const addStudent = () => {
    const name = studentNameRef.current.value;
    const surname = studentSurnameRef.current.value;
    const username = studentUsernameRef.current.value;
    const plan = studentPlanRef.current.value.split(',');
    const password = studentPassword;
    let representativeName = "";
    let representativeSurname = "";
    let representativePhone = "";
    if (isRepresentative) {
      representativeName = representativeNameRef.current.value;
      representativeSurname = representativeSurnameRef.current.value;
      representativePhone = representativePhoneRef.current.value;
    }

    // if (name.length > 0) return;

    let lectures = [];
    for (const key of Object.keys(lessonRefs.current)) {
      const lesson = lessonRefs.current[key];
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

      lectures.push({ from: fromDate, to: toDate })
    }

    axios('user', {
      method: 'POST',
      data: {
        role: 'student',
        name,
        surname,
        username,
        password,
        representativeName,
        representativeSurname,
        representativePhone,
        representativePassword,
        lectures,
        plan,
      }
    })
      .then((data) => console.log(data.data))
  }

  return (
    <>
      <AdminAddContainer>
        <AdminFormContainer>
          <FontsHeaderBold>add student</FontsHeaderBold>
          <AdminButtonContainer>
            <AdminLabel><FontsThin>name</FontsThin></AdminLabel>
            <AdminInputStyled type="text" placeholder="name" ref={studentNameRef} onChange={() => studentUsernameRef.current.value = studentNameRef.current.value.slice(0, 3).toLowerCase() + studentSurnameRef.current.value.slice(0, 3).toLowerCase()}></AdminInputStyled>
          </AdminButtonContainer>
          <AdminButtonContainer>
            <AdminLabel><FontsThin>surname</FontsThin></AdminLabel>
            <AdminInputStyled type="text" placeholder="surname" ref={studentSurnameRef} onChange={() => studentUsernameRef.current.value = studentNameRef.current.value.slice(0, 3).toLowerCase() + studentSurnameRef.current.value.slice(0, 3).toLowerCase()}></AdminInputStyled>
          </AdminButtonContainer>
          <AdminButtonContainer>
            <AdminLabel><FontsThin>username (auto)</FontsThin></AdminLabel>
            <AdminInputStyled type="text" placeholder="username" ref={studentUsernameRef}></AdminInputStyled>
          </AdminButtonContainer>
          <AdminButtonContainer>
            <AdminLabel><FontsThin>password (auto)</FontsThin></AdminLabel>
            <AdminInputStyled type="text" placeholder="password" value={studentPassword} readOnly></AdminInputStyled>
          </AdminButtonContainer>
          <AdminButtonContainer>
            <AdminLabel><FontsThin>study plan</FontsThin></AdminLabel>
            <AdminInputStyled type="text" placeholder="(separate string with commas)" ref={studentPlanRef} onChange={() => studentPlanRef.current.value = studentPlanRef.current.value.split(',')}></AdminInputStyled>
          </AdminButtonContainer>
          <AdminLabel><FontsThin>count of hours</FontsThin></AdminLabel>
          <AdminLessonsContainer>
            {[...Array(lessonCount)].map((el, index) =>
              <AdminLesson key={index}>
                <AdminLessonTimeInput type="date"
                  ref={(el) => lessonRefs.current[index] = { day: el, from: lessonRefs.current[index]?.from, to: lessonRefs.current[index]?.to }}
                  min={lessonDate}
                ></AdminLessonTimeInput>
                <AdminLessonTimeInput type="time"
                  ref={(el) => lessonRefs.current[index] = { from: el, day: lessonRefs.current[index]?.day, to: lessonRefs.current[index]?.to }}
                ></AdminLessonTimeInput>
                <AdminLessonTimeInput type="time"
                  ref={(el) => lessonRefs.current[index] = { to: el, from: lessonRefs.current[index]?.from, day: lessonRefs.current[index]?.day }}
                  onChange={({ target }) => {
                    const from = lessonRefs.current[index]?.from.value;
                    const fromHour = Number(from.split(':')[0]) || 0
                    const fromMinute = Number(from.split(':')[1]) || 0
                    const toHour = Number(target.value.split(':')[0]) || 0
                    const toMinute = Number(target.value.split(':')[1]) || 0

                    if (!from || (fromHour >= toHour || (fromHour > toHour && fromMinute >= toMinute) || (fromHour + 1 === toHour && fromMinute > toMinute))) target.value = '';
                  }}
                ></AdminLessonTimeInput>
              </AdminLesson>
            )}
          </AdminLessonsContainer>
          <AdminAddLesson onClick={() => setLessonCount(prevCount => prevCount + 1)}>
            <span>add new lesson day</span><FaPlusCircle style={stylePlus} />
          </AdminAddLesson>
          <div>
            <AdminCustomFontThin>
              <AdminLabel htmlFor="under-age">if student is under aged or need legal representative</AdminLabel>
              <AdminInputStyled type="checkbox" id="under-age" name="under-age" value={isRepresentative} onChange={() => setIsRepresentative(prevState => !prevState)} />
            </AdminCustomFontThin>
          </div>
          {isRepresentative
            ?
            <>
              <FontsHeaderBold>representative</FontsHeaderBold>
              <AdminButtonContainer>
                <AdminLabel><FontsThin>name</FontsThin></AdminLabel>
                <AdminInputStyled type="text" placeholder="name" ref={representativeNameRef}></AdminInputStyled>
              </AdminButtonContainer>
              <AdminButtonContainer>
                <AdminLabel><FontsThin>surname</FontsThin></AdminLabel>
                <AdminInputStyled type="text" placeholder="surname" ref={representativeSurnameRef}></AdminInputStyled>
              </AdminButtonContainer>
              <AdminButtonContainer>
                <AdminLabel><FontsThin>password (auto)</FontsThin></AdminLabel>
                <AdminInputStyled type="text" placeholder="password" value={representativePassword} readOnly></AdminInputStyled>
              </AdminButtonContainer>
              <AdminButtonContainer>
                <AdminLabel><FontsThin>phone number</FontsThin></AdminLabel>
                <AdminInputStyled type="tel" ref={representativePhoneRef}></AdminInputStyled>
              </AdminButtonContainer>
            </>
            :
            <></>}
        </AdminFormContainer>
        <AddSendButton onClick={() => {
          if (!(studentNameRef.current.value.length > 0)) {
            setNotification("Name Not Inserted");
          }
          else if (!(studentSurnameRef.current.value.length > 0)) {
            setNotification("Surname Not Inserted");
          }
          else if (!(studentPlanRef.current.value.length > 0)) {
            setNotification("Plan Not Inserted");
          }
          else if (!(lessonRefs.current[0].day.value.length > 0)) {
            setNotification("Date Is Not Defined");
          }
          else if (!(lessonRefs.current[0].from.value.length > 0)) {
            setNotification("Date Time 'From' Is Not Defined");
          }
          else if (!(lessonRefs.current[0].to.value.length > 0)) {
            setNotification("Date Time 'To' Is Not Defined");
          }
          else if (isRepresentative) {
            if (!(representativeNameRef.current.value.length > 0)) {
              setNotification("Representative Name Not Inserted");
            }
            else if (!(representativeSurnameRef.current.value.length > 0)) {
              setNotification("Representative Surname Not Inserted");
            }
            else if (!(representativePhoneRef.current.value.length > 0)) {
              setNotification("Student Phone Not Inserted");
            }
            else {
              addStudent()
              setNotification("Student Was Created!");
              document.location.reload()
            }
          }
          else {
            addStudent()
            setNotification("Student Was Created! #goodNotification");
            document.location.reload()
          }
        }
        }>create</AddSendButton>
        <AddBackButton onClick={() => setAddPage(false)}>back to dashboard</AddBackButton>
      </AdminAddContainer>
      <Footer />
    </>
  )
}

