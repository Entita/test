import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { LoginButtonContainer, LoginInputStyled } from '../Login/Login.style'
import { FontsBold, FontsThin, CommonDisplayFlexColumn, CommonDisplayFlexRow, CommonDisplayFlex } from '../CommonStyles'

// little help ``;

export const AdminAddContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100vh;
`;
export const AddBackButton = styled.button`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: black;
    background-color: ${Colors.white};
    border-radius: 25px;
    padding: 1rem 4rem 1rem 4rem;
    margin: 0 0 3rem 0;
    transition: 0.7s;
    :hover{
        color: white;
        background-color: ${Colors.orange};
    }
`;

export const AddSendButton = styled(AddBackButton)`
    :hover{
        color: white;
        background-color: ${Colors.lightGreen};
    }
`;

export const AdminFormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // background-color: grey;
    margin: 2em 0em 2em 0em;
    padding: 2em;
    transition: 0.7s;
    border-radius: 25px;
    border: 1px solid rgba(155, 155, 155, 0.05);
    box-shadow: -3px 3px 5px rgba(155, 155, 155, 0.15);
    :hover{
        box-shadow: -5px 5px 7px rgba(155, 155, 155, 0.3);
    }
    @media (max-width: 700px) {
        padding: 1em;
    }
`;

export const AdminButtonContainer = styled(LoginButtonContainer)`
    //nothing to change
`;

export const AdminInputStyled = styled(LoginInputStyled)`
    // nothing changed yet
`;

export const AdminLabel = styled.label`
    margin: 1em 0em 0em 0em;
`;

export const AdminCustomFontBold = styled(FontsBold)`
    font-size: 0.8em;
`;

export const AdminCustomFontThin = styled(FontsThin)`
    font-size: 0.9em;
`;

export const AdminLessonsContainer = styled(CommonDisplayFlexColumn)`
    align-items: flex-end;
    gap: 1em;
    margin: 1em 0em 1em 0em;
`;

export const AdminLesson = styled(CommonDisplayFlexRow)`
    justify-content: flex-start;
    gap: 1em;
    transition: 0.7s;
    color: rgba(0, 0, 0, 0.45);
    @media (max-width: 700px) {
        gap: 0.5em;
        flex-direction: column;
        box-shadow: -1px 1px 10px rgba(155, 155, 155, 0.45);
        padding: 1em 2em 1em 2em;
        border-radius: 15px;
    }
    :hover{
        color: black;
    }
`;

export const AdminLessonCountContainer = styled(CommonDisplayFlex)`
    gap: 1em;
`;

export const AdminLessonCountInput = styled.input`
    box-shadow: -1px 1px 10px rgba(155, 155, 155, 0.45);
    padding-left: 10px;
    width: 45px;
    height: 30px;
    border-radius: 8px;
`;

export const AdminLessonTimeInput = styled(AdminLessonCountInput)`
    box-shadow: -1px 1px 10px rgba(155, 155, 155, 0.45);
    padding-left: 10px;
    width: 80px;
    height: 30px;
    border-radius: 8px;
`;

export const AdminAddLesson = styled(CommonDisplayFlexRow)`
    margin: 0em 0em 1em 0em;
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    gap: 0.5em;
    cursor: pointer;
`;
