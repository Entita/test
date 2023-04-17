import styled from 'styled-components'

import { Colors } from '../../utils/Colors'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow, CommonDisplayFlex } from '../CommonStyles'


export const StudentSettingMainContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100vh;
    width: 100vw;
    gap: 1em;
`;

export const SettingsSendButton = styled.button`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: black;
    background-color: ${Colors.white};
    border-radius: 25px;
    width: 230px;
    height: 50px;
    transition: 0.7s;
    :hover{
        color: white;
        background-color: ${Colors.lightGreen};
    }
`;

export const SettingsBackButton = styled(SettingsSendButton)`
    :hover{
        background-color: ${Colors.orange};
    }
`;

export const SettingsKeyAttribute = styled.span`
    font-family: 'Raleway', sans-serif;
    text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.08);
    font-size: 1rem;
    font-weight: 900;
`;

export const SettingsKeyInputAttribute = styled.input`
    font-family: 'Raleway', sans-serif;
    padding: 0.2em 0.5em 0.2em 0.5em;
    font-weight: 100;
    font-size: 1.29rem;
    min-width: 90px;
    border-radius: 10px;
    border: 1px solid rgba(155, 155, 155, 0.05);
    box-shadow: -3px 3px 8px rgba(155, 155, 155, 0.25);
    background-color: ${({ editable }) => editable ? Colors.lightGray : 'transparent'};
`;

export const StudentSettingContainer = styled(CommonDisplayFlexColumn)`
    /* background-color: ${Colors.beige}; */
    border-radius: 10px;
    border: 1px solid rgba(155, 155, 155, 0.05);
    box-shadow: -5px 5px 9px rgba(155, 155, 155, 0.55);
    padding: 1em 3em 3em 3em;
    align-items: flex-start;
    & > h1{
        margin: 0 0 .3em 0;
        /* color: ${Colors.white} */
    }
`;

export const StudentSettingAttributesContainer = styled(CommonDisplayFlexRow)`
    gap: 1em;
`;

export const StudentSettingButtonContainer = styled.span`
    & > svg {
        font-size: 1.5rem;
        color: ${Colors.lightGreen};
        transition: .6s;   
        cursor: pointer;
        &:hover {
        filter: opacity(.6)
    }
    }
`;

export const StudentSettingButtonsContainer = styled(CommonDisplayFlex)`
    width: 100%;
    margin: 1em 0 0 0;
    justify-content: flex-end;
    gap: .8em;
`;



