import styled from 'styled-components'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow } from '../../CommonStyles'
import { Colors } from '../../../utils/Colors'

export const HomeworkContentValue = .9;

export const HomeworksContentShowMainContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    align-items: flex-end;
    @media (max-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

export const HomeworksContentShowContainer = styled(CommonDisplayFlexRow)`
    width: 100%;
    justify-content: flex-start;
    /* margin: 0em 0em 1em 0em; */
    & > svg {
        color: ${Colors.red};
        font-size: ${HomeworkContentValue}rem;
        cursor: pointer;
        transition: .6s;
        margin: .5em 0em .5em 1em;
        &:hover{
            filter: opacity(.6);
            transform: scale(1.1);
        }
        @media (max-width: 1000px) {
        margin: 0.5em 0em 0em 1em;
        }
    }
    @media (max-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        border-bottom: 1px solid ${Colors.darkGray};
        margin: 1rem 0 0 0;
        padding: 0 0 0.5rem 0;
        width: 90%;
    }
`;

export const HomeworksContentShowTitleItem = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: ${HomeworkContentValue}rem;
    & > span { 
        font-weight: 900;
    }
    margin: 0.5em 0em .5em 1em;
    @media (max-width: 1000px) {
        margin: 0.5em 0em 0em 1em;
    }
`;

export const HomeworksContentShowContentItem = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: ${HomeworkContentValue}rem;
    font-weight: 400;
    margin: 0 .5em 0 0;
`;

export const HomeworksContentShowContentEditContainer = styled.div`
    margin: .5em 0em 0em 0em;
    & > svg {
        color: ${({ editable }) => editable ?  Colors.red : Colors.lightGreen};
        font-size: ${HomeworkContentValue + .6}rem;
        cursor: pointer;
        transition: .6s;
        &:hover{
            filter: opacity(.6);
            transform: scale(1.1);
        }
    }
`;