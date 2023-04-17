import styled from 'styled-components'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow, CommonDisplayFlex } from '../../CommonStyles'
import { Colors } from '../../../utils/Colors'

export const WordListContentValue = .9;

export const WordListContentURL = styled.p`
    font-size: ${WordListContentValue}rem;
    text-align: center;
    @media (max-width: 389px){
        font-size: ${WordListContentValue - .3}rem;
    }
`;

export const WordListAttributes = styled.div`
    
`;

export const WordListKeyAttribute = styled.span`
    font-family: 'Raleway', sans-serif;
    text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.08);
    font-size: ${WordListContentValue}rem;
    font-weight: 900;
`;

export const WordListKeyInputAttribute = styled.input`
    font-family: 'Raleway', sans-serif;
    margin: 1em 0 1em 0.5em;
    padding: 0.3em;
    border-radius: 10px;
    border: 1px solid rgba(155, 155, 155, 0.05);
    box-shadow: -3px 3px 5px rgba(155, 155, 155, 0.15);
    background-color: ${({ editable }) => editable ? Colors.lightGray : 'transparent'};
`;

export const WordListContentURLContainer = styled(CommonDisplayFlex)`
    height: 100%;
    width: 100%;
    > ${WordListContentURL} {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        margin: 1em 0 1em 0;
        cursor: pointer;
    }
`;

export const WordListContentEmptyPhrase = styled.span`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    color: ${Colors.blue};
    font-size: ${WordListContentValue + .6}rem;
    @media (max-width: 1200px){
        font-size: ${WordListContentValue + .2}rem;
    }
`;

export const WordListContentContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    margin: 1em 0 1em 0;
    & > svg {
        color: ${Colors.darkGray};
        margin: 1em 0 0 0;
        font-size: ${WordListContentValue + .9}rem;
    }
`;

export const WordListContentMainContainer = styled(CommonDisplayFlexRow)`
    width: 100%;
    height: 100%;
    align-items: flex-end;
`;

export const WordListSVGContainer = styled.div`
    & > svg {
        color: ${Colors.lightGreen};
        font-size: ${WordListContentValue + .6}rem;
        cursor: pointer;
        transition: .6s;
        &:hover{
            filter: opacity(.6);
            transform: scale(1.1);
        }
    }

`;