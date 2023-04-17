import styled from 'styled-components'
import { Colors } from '../../../utils/Colors'
import { CommonDisplayFlexColumn } from '../../CommonStyles'

// export const <name> = styled.div`

// `;

export const SummaryContentValue = .9;

export const SummaryContentContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100%;
    width: 100%;
    font-family: 'Raleway', sans-serif;
    font-size: ${SummaryContentValue}rem;
    font-weight: 300;
    & > span {
        font-family: 'Raleway', sans-serif;
        font-size: ${SummaryContentValue + .2}rem;
        font-weight: 900;
    }
    & > svg {
        color: ${Colors.lightGreen};
        margin: ${SummaryContentValue}rem 0 0 0;
        font-size: ${SummaryContentValue + .8}rem;
    }
    & > p {
        color: ${Colors.blue};
        font-size: ${SummaryContentValue + .6}rem;
        font-weight: 900;
        @media (max-width: 1200px){
            font-size: ${SummaryContentValue + .2}rem;
    }
    }
`;

// export const SummaryContentAddContainer = styled(SummaryContentContainer)`
//     min-height: 100%;
//     margin: 1em 0 0 0;
// `;

export const SummaryContentItemContainer = styled(SummaryContentContainer)`
    min-height: 100%;
    width: 100%;
    align-items: flex-start;
    /* margin: 0 2rem 0 2rem; */
    @media (max-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

export const SummaryContentItem = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: ${SummaryContentValue}rem;
    font-weight: 500;
    & > span {
        font-weight: 900;
    }
    @media (max-width: 1200px) {
        text-align: center;
    }
`;

export const SummaryContentChooseFile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SummaryContentAddButtonContainer = styled.div`
    & > svg {
        color: ${Colors.lightGreen};
        margin: 1em 0 1em 0;
        font-size: ${SummaryContentValue + .6}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const SummaryContentBackButtonContainer = styled.div`
    & > svg {
        color: ${Colors.red};
        margin: 1em 0 1em 0;
        font-size: ${SummaryContentValue + .6}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const SummaryContentAddForm = styled.div`
    display: flex;
    margin: 1em 0 0 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    & > svg {
        color: ${Colors.lightGreen};
        margin: 1em 0 1em 0;
        font-size: ${SummaryContentValue + .9}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const SummaryContentBasicContainer = styled(CommonDisplayFlexColumn)`
    width: 30%;
    align-items: flex-start;
    @media (max-width: 1200px) {
        width: 50%;
    }
    @media (max-width: 800px) {
        width: 65%;
    }
`;

export const SummaryContentAddContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    margin: 0 0 1em 0;
`;

export const SummaryContentAddLabel = styled.label`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: ${SummaryContentValue}rem;
`;

export const SummaryContentAddInput = styled.input`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: ${SummaryContentValue}rem;
    width: 100%;
    height: 40px;
    padding: 0 0 0 1em;
    border-radius: 12px;
    box-shadow: 4px 4px 7px rgba(155, 155, 155, 0.35);
    opacity: 0.7;
`;

export const SummaryContentItemWrapper = styled.div`
    margin: 0.5em 0em 0.5em 1em;
    @media (max-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        border-bottom: 1px solid ${Colors.darkGray};
        margin: 1rem 0 0 0;
        padding: 0 0 .5rem 0;
    }
`;

export const SummaryContentIconWrapper = styled.span`
    & > svg {
        color: ${Colors.red};
        margin: 0 0 0 1em;
        font-size: ${SummaryContentValue}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
        @media (max-width: 1200px) {
            margin: 0.5rem 0 0 0;
        }
    }
`;




