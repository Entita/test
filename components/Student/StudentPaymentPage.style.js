import styled, { css } from 'styled-components'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow } from '../CommonStyles'
import { SettingsBackButton } from './StudentSettingsPage.style'
import {Colors} from '../../utils/Colors'

// little help ->  ``; 

export const StudentPaymentMainContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100vh;
`;

export const StudentPaymentContainerInfo = styled(CommonDisplayFlexColumn)`
    height: 20vh;
    width: 50%;
    align-items: flex-start;
    @media (max-width: 900px) {
        width: 70%;
    }
    @media (max-width: 650px) {
        width: 80%;
    }
    @media (max-width: 500px) {
        width: 90%;
    }
`;

export const StudentPaymentContainer = styled(CommonDisplayFlexRow)`
    height: 10vh;
    width: 50%;
    /* align-items: flex-start; */
    justify-content: space-between;
    border-bottom: 1px solid ${Colors.darkGray};
    filter: ${({ sent }) => sent && 'opacity(.5)'};
    @media (max-width: 900px) {
        width: 70%;
    }
    @media (max-width: 650px) {
        width: 80%;
    }
    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        gap: 1rem;
        height: 12vh;
    }
`;

export const StudentContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    font-weight: 900;
    span + span {
        margin: 0 1rem 0 1rem;
        font-weight: 500;
    }
`;

export const StudentBackButton = styled(SettingsBackButton)``;

export const StudentSentButton = styled(SettingsBackButton)`
    font-size: .7rem;
    border-radius: 15px;
    width: 115px;
    height: 25px;
    :hover{
        background-color: ${Colors.lightGreen};
    }
    ${({ disabled }) => disabled ? css`
        cursor: not-allowed;
        :hover{
            background-color: ${Colors.white};
            color: black;
        }
    ` : css`
    `}
`;