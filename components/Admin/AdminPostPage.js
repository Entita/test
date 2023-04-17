import React from 'react'
import Footer from '../Footer'
import moment from 'moment'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { FaSmileWink, FaCheckCircle } from 'react-icons/fa'
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'
import { PostEmptyMessage, AdminMessagesContainer, PostBackButton, AdminPostContainer, AdminMainContent, AdminListItems, AdminItem, AdminMessages } from './AdminPostPage.style'

export default function PostPage({ setPostPage, setData, data, setNotification }) {
  const [isToggle, setisParent] = useState(false);
  const [filter, setFilter] = React.useState('')
  const payments = React.useMemo(() => data.paymentRequests, [data])
  const apologies = React.useMemo(() => data.apologies, [data])
  const shownData = React.useMemo(() => filter === 'apologies' ? apologies : filter === 'payments' ? payments : [...apologies, ...payments], [filter, apologies, payments])
  const id = getCookie('userCookie')

  const seenApology = async (apology) => {
    await axios('http://localhost:3000/api/lesson.change', {
      method: 'PATCH',
      data: {
        adminId: id,
        apologyId: apology.id,
      }
    }).then(({ data }) => {
      if (data) setData(data)
      else setNotification('Change failed.')
    })
    setNotification(`Apology ${moment(apology.from).format('M.D.YYYY')} Was Seen ! #goodNotification`)
  }

  const createPayment = async (payment) => {
    await axios('http://localhost:3000/api/payment.change', {
        method: 'POST',
        data: {
            adminId: id,
            payment,
        }
    }).then(({ data }) => {
        if (data) setData(data)
        else setNotification('Change failed.')
    })
    setNotification(`Payment ${moment(payment.from).format('M.D.YYYY')} Was Checked ! #goodNotification`)
  }

  return (
    <>
      <AdminPostContainer>
        <AdminMainContent>
          <FontsHeaderBold>post</FontsHeaderBold>
          <AdminListItems>
            <AdminItem><FontsBold>total:</FontsBold></AdminItem><FontsThin>{apologies.length + payments.length}</FontsThin>
            <AdminItem><FontsBold>apologies: </FontsBold></AdminItem><FontsThin>{apologies.length}</FontsThin>
            <AdminItem><FontsBold>payments: </FontsBold></AdminItem><FontsThin>{payments.length}</FontsThin>
            <label><FontsBold>only payments:</FontsBold></label>
            <input type="radio" id="payments" name="toggle_post" checked={filter === 'payments'} onChange={() => setFilter('payments')}></input>

            <label><FontsBold>only apologies:</FontsBold></label>
            <input type="radio" id="apologies" name="toggle_post" checked={filter === 'apologies'} onChange={() => setFilter('apologies')}></input>

            <label><FontsBold>all:</FontsBold></label>
            <input type="radio" id="all" name="toggle_post" checked={filter === ''} onChange={() => setFilter('')}></input>
          </AdminListItems>
          {
            apologies.length + payments.length === 0
            &&
            <PostEmptyMessage>
              <span>You have nothing to read !</span> <FaSmileWink />
            </PostEmptyMessage>
          }
          <AdminMessagesContainer>
            {shownData.map((data, index) => (
              data.amount ? (
                <AdminMessages key={data.id}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{`${data.firstName} ${data.lastName}`}</span>
                    <span> paid the lesson from </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>{moment(data.from).format('D. MMMM HH:mm')}</span>
                    <span> which was worth </span>
                    <span style={{ color: 'purple', fontWeight: 'bold' }}>{`${Math.floor(data.amount)} ,-`}</span>
                  </div>
                  <FaCheckCircle onClick={() => createPayment(data)} />
                </AdminMessages>
              ) : (
                <AdminMessages key={data.id}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{`${data.studentFirstName} ${data.studentLastName}`}</span>
                    <span> apologizes from the lesson on </span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>{moment(data.lessonFrom).format('D. MMMM HH:mm')}</span>
                  </div>
                  <FaCheckCircle onClick={() => seenApology(data)} />
                </AdminMessages>
              )
            ))}
          </AdminMessagesContainer>
        </AdminMainContent>
        <PostBackButton onClick={() => setPostPage(false)}>back to dashboard</PostBackButton>
      </AdminPostContainer>
      <Footer />
    </>
  )
}

