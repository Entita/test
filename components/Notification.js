import React from 'react'
import { WrapperStyled } from './Notification.style'
import { FaWindowClose } from 'react-icons/fa'

export default function Notification({ notification, setNotification }) {
    const [hide, setHide] = React.useState(true)
    const [forceHide, setForceHide] = React.useState(false)

    React.useEffect(() => {
        if (notification !== '') setHide(false)
        if (forceHide) {
            setHide(true)
            setTimeout(() => {
                setNotification('')
                setForceHide(false)
            }, 1000)
        }

        const timeout = setTimeout(() => {
            setHide(true)
            setTimeout(() => {
                setNotification('')
            }, 1000)
        }, 5000)

        return () => clearTimeout(timeout)
    }, [notification, forceHide])

    return (
        <WrapperStyled hidden={hide} goodNotification={notification.includes("#goodNotification")}>
            {notification.slice(0, notification.indexOf("#"))}
            <div onClick={() => setForceHide(true)}>
                <FaWindowClose />
            </div>
        </WrapperStyled>
    )
}
