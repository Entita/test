import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow, CommonDisplayFlex } from '../CommonStyles'


export const AdminPostContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100vh;
`;

export const AdminMainContent = styled(CommonDisplayFlexColumn)`
    padding: 4em 4em 4em 4em;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.15);
    border: 1px solid rgba(155, 155, 155, 0.05);
    border-radius: 25px;
    margin: 2em 2em 2em 2em;
    @media (max-width: 750px) {
        padding: 2em 2em 2em 2em;
    }
`;

export const AdminListItems = styled(CommonDisplayFlexRow)`
    flex-wrap: wrap; 
    gap: 1em;
    margin: 2em 0em 1em 0em;
    @media (max-width: 500px) {
        flex-direction: column;
    }

    input {
        cursor: pointer;
    }
`;

export const AdminItem = styled.div``;

export const AdminMessages = styled(CommonDisplayFlexRow)`
    font-family: 'Raleway', sans-serif;
    gap: .3rem;
    margin: 1rem 0 0 0;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 750px) {
        flex-direction: column;
        gap: 0em;
        padding: 0 0 1rem 0;
        border-bottom: 1px solid ${Colors.darkGray};
        text-align: center;
    }
    & > svg {
        color: ${Colors.lightGreen};
        font-size: 1.5rem;
        transition: .6s;
        cursor: pointer;
        &:hover{
            color: ${Colors.red};
            filter: opacity(.6);
            transform: scale(1.1);
        }
        @media (max-width: 750px) {
        margin: 1rem 0 0 0;
    }
    }
`;

export const AdminMessagesContainer = styled.div`
    width: 100%;
`;

export const PostBackButton = styled.button`
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

export const PostEmptyMessage = styled(CommonDisplayFlexColumn)`
    font-family: 'Raleway',sans-serif;
    font-weight: 700;
    color: ${Colors.blue};
    font-size: 1.5rem;
    margin: 1em 0 0 0;
    & > svg {
        color: ${Colors.darkGray};
        margin: 1em 0 0 0;
        font-size: 1.8rem;
    }
    @media (max-width: 1200px)
    {
        font-size: 1.1rem;
    }
`;