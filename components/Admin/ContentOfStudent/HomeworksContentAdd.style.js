import styled from 'styled-components'
import { CommonDisplayFlexColumn } from '../../CommonStyles'
import { Colors } from '../../../utils/Colors'

// ``;

export const HomeworkContentValue = 1;

export const HomeworksContentAddForm = styled.div`
    display: flex;
    margin: 1em 0 0 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    & > svg {
        color: ${Colors.lightGreen};
        margin: 1em 0 1em 0;
        font-size: ${HomeworkContentValue + .8}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const HomeworksContainer = styled(CommonDisplayFlexColumn)`
    width: 30%;
    align-items: flex-start;
    @media (max-width: 1200px) {
        width: 50%;
    }
    @media (max-width: 800px) {
        width: 65%;
    }
`;

export const HomeworksContentAddContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    margin: 0 0 1em 0;
`;

export const HomeworksContentAddLabel = styled.label`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: ${HomeworkContentValue}rem;

`;

export const HomeworksContentAddInput = styled.input`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: ${HomeworkContentValue}rem;
    width: 100%;
    height: 40px;
    padding: 0 0 0 1em;
    border-radius: 12px;
    box-shadow: 4px 4px 7px rgba(155, 155, 155, 0.35);
    opacity: 0.7;
`;


