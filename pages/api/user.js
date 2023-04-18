import bcrypt from 'bcrypt'
import User from '../../models/User'
import Lecture from '../../models/Lecture'
import Apology from '../../models/Apology'
import Payment from '../../models/Payment'
import PaymentRequest from '../../models/PaymentRequest'
import Homeworks from '../../models/Homeworks'
import { addLessonChange } from './student.change'
import { dbConnect, UpdateOneFromMongo, findAllFromMongo, findOneFromMongo, getCollectionFromMongo } from '../../utils/dbMongo'

dbConnect();

const filterHomeworks = async(userDb, homeworkIds, admin) => {
  const homeworksDb = await findAllFromMongo(Homeworks, { _id: homeworkIds });

  const homeworks = homeworksDb.map(homework => ({
    id: homework._id,
    title: homework.title,
    description: homework.description,
    date: homework.createdAt
  }));

  return homeworks
}

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const filterLessons = async (lessonIds, admin) => {
  // getting array of lessons from database
  const lessonsDb = await findAllFromMongo(Lecture, { $and: [{ _id: lessonIds }] });

  // format lessons
  const lessons = lessonsDb.map(lesson => ({
    id: lesson._id,
    date: lesson.from,
    changes: lesson.changes,
    statuses: lesson.statuses,
    endDate: lesson.to,
  }));

  let now = new Date().getTime();
  const filteredLessons = await Promise.all(
    lessons.filter(async lesson => {
      const changedLessons = lesson.changes.map(change => new Date(change.from).getTime())
      const statusLessons = lesson.statuses.map(status => new Date(status.from).getTime())
      let lessonDate = new Date(lesson.date);
      let lessonDateEnd = new Date(lesson.endDate);
      if (now > lessonDate.getTime()) {
        // update status to done
        while (now > lessonDate.getTime()) {
          let tempLesson = lessonDate
          let tempLessonEnd = lessonDateEnd

          if (changedLessons.includes(lessonDate.getTime())) {
            const changedLesson = lesson.changes.find(change => new Date(change.from).getTime() === lessonDate.getTime())
            tempLesson = new Date(changedLesson.newFrom)
            tempLessonEnd = new Date(changedLesson.newTo)
          }

          if (!statusLessons.includes(tempLesson.getTime())) {
            await addLessonChange({ _id: lesson.id }, { $push: { statuses: {
              from: tempLesson,
              to: tempLessonEnd,
              status: 'done'
            }}})
            statusLessons.push(tempLesson.getTime())
          }

          lessonDate = addDays(lessonDate, 7)
          lessonDateEnd = addDays(lessonDateEnd, 7)
        }
        return false
      } else return true
    })
  )
  
  filteredLessons.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse()

  return filteredLessons
}

export const getUser = async(filter, password) => {
  const usersDb = await findAllFromMongo(User, filter)
  let userDb = usersDb[0]
  if (password) {
    await Promise.all(
      usersDb.map(async (user) => {
        if (user && await bcrypt.compare(password, user.password)) userDb = user
      })
    )
  }
  // this is responsible for hiding when admin decide that it is no longer wanted to be seen, but still stays in database
  if (!userDb || userDb.disabled) return;
  
  if (userDb.role === 'admin') return getAdmin(userDb);
  else if (userDb.role === 'representative') return getRepresentative(userDb);
  else return getStudent(userDb);
}

const createUser = (data) => {
  return User(data).save()
}

const createLecture = (data) => {
  return Lecture(data).save()
}

const getStudent = async (userDb, admin=false) => {
  let lessonsToPay = []
  const filteredLessons = await filterLessons(userDb.lectures, admin);
  const filteredHomeworks = await filterHomeworks(userDb, userDb.homeworks, admin);
  if (userDb.legalRepresentative === '') lessonsToPay = await getLessonsToPay(filteredLessons)

  return {
    id: userDb._id,
    role: userDb.role,
    firstName: userDb.name,
    lastName: userDb.surname,
    username: userDb.username,
    // password: userDb.password,
    legalRepresentative: userDb.legalRepresentative !== '',
    lessonsToPay,
    lessons: filteredLessons,
    plan: userDb.plan,
    // homeworks: userDb.homeworks,
    homeworks: filteredHomeworks,
    files: userDb.files,
    wordList: userDb.wordList,
    summary: userDb.summary,
    payments: [],
  }
}

const getLessonsToPay = async (lessons) => {
    const newLessons = []
    const paymentsDb = await getCollectionFromMongo(Payment)
    const paymentRequestsDb = await getCollectionFromMongo(PaymentRequest)

    lessons.map(lesson => {
      const changedLessons = lesson.changes.map(change => new Date(change.from).getTime())
      const statusesLessons = lesson.statuses.map(status =>
        (status.status === 'apologized' || status.status === 'cancelled') && new Date(status.from).getTime())
      const payments = paymentsDb.filter(paymentDb => paymentDb.lessonId == lesson.id)
      const paymentRequests = paymentRequestsDb.filter(paymentRequestDb => paymentRequestDb.lessonId == lesson.id)
      
      let now = new Date().getTime();
      let lessonDate = new Date(lesson.date);
      let lessonDateEnd = new Date(lesson.endDate);

      while (now > lessonDate.getTime()) {
        let tempLesson = lessonDate
        let tempLessonEnd = lessonDateEnd

        if (changedLessons.includes(lessonDate.getTime())) {
          const changedLesson = lesson.changes.find(change => new Date(change.from).getTime() === lessonDate.getTime())
          tempLesson = new Date(changedLesson.newFrom)
          tempLessonEnd = new Date(changedLesson.newTo)
        }

        let isCancelled = statusesLessons.includes(tempLesson.getTime())
        let isSent = false
        let isPaid = false
        paymentRequests.map(paymentRequest => {
          if (new Date(paymentRequest.from).getTime() == tempLesson.getTime()) isSent = true
        })
        payments.map(payment => {
          if (new Date(payment.from).getTime() == tempLesson.getTime()) isPaid = true
        })

        if (!isPaid && !isCancelled) {
          newLessons.push({
            id: lesson.id,
            from: tempLesson,
            to: tempLessonEnd,
            sent: isSent,
          })
        }

        lessonDate = addDays(lessonDate, 7)
      }
    })

    newLessons.sort((a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()).reverse()
    return newLessons
}

const getRepresentative = async (userDb) => {
  const children = []
  const lessonsToPay = []
  await Promise.all(userDb.child.map(async childId => {
    const childDb = await findOneFromMongo(User, { _id: childId })
    const child = await getStudent(childDb)
    const lessons = await getLessonsToPay(child.lessons)

    children.push(child)
    lessonsToPay.push(...lessons)
  }))

  return {
    id: userDb._id,
    role: userDb.role,
    firstName: userDb.name,
    lastName: userDb.surname,
    username: userDb.username,
    legalRepresentative: userDb.legalRepresentative !== '',
    lessons: [],
    plan: userDb.plan,
    homeworks: [],
    files: [],
    wordList: userDb.wordList,
    summary: userDb.summary,
    payments: [],
    lessonsToPay,
    children: children,
  }
}

const getAdmin = async (userDb) => {
  const studentsDb = (await findAllFromMongo(User, { role: 'student' })).filter(student => !student.disabled)
  const filteredStudents = await Promise.all(studentsDb.map(async student => await getStudent(student, true)))
  const apologiesDb = await findAllFromMongo(Apology, { seen: false })
  const paymentRequestsDb = await getCollectionFromMongo(PaymentRequest)
  const apologies = []
  await Promise.all(
    apologiesDb.map(async apologyDb => {
      const student = await filteredStudents.find(student => student.id == apologyDb.studentId)

      if (student)
        apologies.push({
          id: apologyDb._id,
          studentFirstName: student.firstName,
          studentLastName: student.lastName,
          lessonFrom: apologyDb.from,
          createdAt: apologyDb.createdAt,
        })
    })
  )
  const paymentRequests = await Promise.all(
    paymentRequestsDb.map(async paymentRequestDb => {
      const user = await findOneFromMongo(User, { _id: paymentRequestDb.studentId })

      return {
        id: paymentRequestDb._id,
        firstName: user.name,
        lastName: user.surname,
        userId: paymentRequestDb.studentId,
        lessonId: paymentRequestDb.lessonId,
        createdAt: paymentRequestDb.createdAt,
        amount: paymentRequestDb.amount,
        from: paymentRequestDb.from,
      }
    })
  )

  return {
    id: userDb._id,
    role: userDb.role,
    firstName: userDb.name,
    lastName: userDb.surname,
    students: filteredStudents,
    apologies,
    paymentRequests,
    post: [],
  }
}

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    // user
    case 'GET':
      const { userCookie } = query;
      
      const userData = await getUser({ _id: userCookie })

      res.status(200).json( userData );
      break;
    case 'PUT':
      // getting data from login about user
      const { userName, userNumber, userPassword } = body;

      let user;
      // find user in collection if exists
      if (userNumber) user = await getUser({ phone: userNumber }, userPassword)
      else user = await getUser({ username: userName }, userPassword)

      // return null or object to login
      res.status(200).json( user );
      break;
    case 'POST':
      try {
        const {
          role,
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
          summary,
        } = body;
        const legalRepresentative = representativeName.length > 0;
        // creating salt for hash from bcrypt library
        const salt = await bcrypt.genSalt(10)
        let representative;
        let student;

        if (legalRepresentative) {
          // hashing the password using bcrypt lib
          const representativeHashedPassword = await bcrypt.hash(representativePassword, salt)
          const studentHashedPassword = await bcrypt.hash(password, salt)
          const representativeExist = await findOneFromMongo(User, { phone: representativePhone })
          if ( representativeExist !== null){
            student = await createUser({
              role,
              name,
              surname,
              username,
              plan,
              summary,
              password: studentHashedPassword,
              legalRepresentative: representativeExist._id
            });
           
            await UpdateOneFromMongo(User, { _id: representativeExist._id}, { $push: { child: student._id }})
          }
          else {
            representative = await createUser({
              role: 'representative',
              name: representativeName,
              surname: representativeSurname,
              phone: representativePhone,
              password: representativeHashedPassword,
            });

            student = await createUser({
              role,
              name,
              surname,
              username,
              plan,
              summary,
              password: studentHashedPassword,
              legalRepresentative: representative._id
            });

            await UpdateOneFromMongo(User, { _id: representative._id }, { $push: { child: student._id }})
          }
        } else {
          // hashing the password using bcrypt lib
          const studentHashedPassword = await bcrypt.hash(password, salt)

          student = await createUser({
            role,
            name,
            surname,
            username,
            plan,
            summary,
            password: studentHashedPassword,
          });
        }

        lectures.forEach(async (lecture) => {
          const lectureDb = await createLecture({
            from: lecture.from,
            to: lecture.to,
            studentId: student._id,
          });

          await UpdateOneFromMongo(User, { _id: student._id }, { $push: { lectures: lectureDb._id } })
        });
        // if (legalRepresentative) await UpdateOneFromMongo(User, { _id: representative._id }, { $push: { child: student._id }})

        
        res.status(200).json({ data: 'updated data' });
      } catch {
        res.status(500).json({ failed: true });
      }
      break;
    default:
      break;
  }
}
