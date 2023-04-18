import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'cookies-next';
import { FontsHeaderBold, FontsLight, FontsExtraThin, FontsBold } from '../CommonStyles'
import { LoginButtonStyled, LoginInputStyled, LoginFormStyled, LoginLabelStyled, LoginInputCheckboxStyled, LoginButtonContainer, LoginButtonBottomContainer, LoginContainer } from './Login.style'

export default function LoginForm({ setData, setNotification }) {
    const [isParent, setIsParent] = useState(false);
    const [userName, setUserName] = useState("");
    const [userNumber, setNumber] = useState("");
    const [userPassword, setPassword] = useState("");


    function sendData() {
        axios('user', {
            method: 'PUT',
            data: {
                userName,
                userNumber,
                userPassword
            }
        })
            .then((data) => {
                if (data.data) {
                    setCookie('userCookie', data.data.id, { maxAge: 600000 });
                    setData(data.data);
                    Router.push('/dashboard')
                } else {
                    // instead of this you should make user friendly modal
                    setNotification('Wrong credentials !')
                }
            })
    }


    const handleChange = event => {
        setIsParent(current => !current);
    };

    return (
        <LoginFormStyled>
            {/* <LoginContainer> */}


            <LoginContainer>
                <FontsHeaderBold >login</FontsHeaderBold >
                {isParent
                    ?
                    <LoginButtonContainer>
                        <FontsLight>telephone</FontsLight>
                        <LoginInputStyled type="number" name="phone" placeholder="" value={userNumber} onChange={({ target }) => setNumber(target.value)} />
                    </LoginButtonContainer >
                    :
                    <LoginButtonContainer >
                        <FontsLight>username</FontsLight>
                        <LoginInputStyled type="text" name="username" placeholder="" value={userName} onChange={({ target }) => setUserName(target.value)} />
                    </LoginButtonContainer >

                }

                <LoginButtonBottomContainer>
                    <FontsLight>password</FontsLight>
                    <LoginInputStyled type="password" name="password" placeholder="" value={userPassword} onChange={({ target }) => setPassword(target.value)}></LoginInputStyled>

                </LoginButtonBottomContainer>

                <LoginLabelStyled>
                    <LoginInputCheckboxStyled type="checkbox" value={isParent} onChange={handleChange}></LoginInputCheckboxStyled>
                    <FontsExtraThin>login as representative</FontsExtraThin>
                </LoginLabelStyled>

                <LoginButtonStyled onClick={() => sendData()}><FontsBold>login</FontsBold></LoginButtonStyled>
            </LoginContainer>



            {/* </LoginContainer> */}
        </LoginFormStyled>
    )
}