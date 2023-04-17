import styled from 'styled-components'
import { Colors } from '../../../utils/Colors'
import { FontsHeaderBold, FontsThin, FontsBold, CommonDisplayFlexColumn } from '../../CommonStyles'

// export const <name> = styled.div`

// `;

export const FileContentValue = .9;
export const FileContentButtonValue = 1.4;

export const FileContentContainer = styled(CommonDisplayFlexColumn)`
    min-height: 100%;
    width: 100%;
    font-family: 'Raleway', sans-serif;
    font-size: ${FileContentValue}rem;
    font-weight: 300;
    & > span {
        font-family: 'Raleway', sans-serif;
        font-size: ${FileContentValue}rem;
        font-weight: 900;
    }
    & > svg {
        color: ${Colors.lightGreen};
        margin: ${FileContentValue}rem 0 0 0;
        font-size: ${FileContentValue * 2}rem;
    }
    & > p {
        color: ${Colors.blue};
        font-size: ${FileContentValue + .6}rem;
        font-weight: 900;
        @media (max-width: 1200px){
            font-size: ${FileContentValue + .2}rem;
    }
    }
    
`;

export const FileContentAddContainer = styled(FileContentContainer)`
    min-height: 100%;
    margin: 1em 0 0 0;
`;

export const FileContentItemContainer = styled(FileContentContainer)`
    min-height: 100%;
    width: 100%;
    align-items: flex-start;
    margin: 0 0 0 2rem;
    gap: 1rem;
    font-family: 'Raleway', sans-serif;
    font-weight: 900;
    @media (max-width: 1200px){
        align-items: center;
        margin: 0 0 0 0;
    }
`;

export const FileContentItem = styled.span`

`;

export const FileContentChooseFile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
        @media (max-width: 1200px){
            display: none;
    }
    }
`;

export const FileContentInput = styled.input.attrs({
    type: 'file',
    default: 'text'
})`
    font-family: 'Raleway', sans-serif;
    font-size: ${FileContentValue}rem;
    font-weight: 300;
    margin: 0 0 0 1rem;
    color: ${Colors.lightGreen};
    background-color: ${Colors.darkGray};
    border-radius: 2px;
  `;

export const FileContentUploadButton = styled.div`
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid rgba(155, 155, 155, 0.05);
    box-shadow: -3px 3px 5px rgba(155, 155, 155, 0.15);
    background-color: ${Colors.white};
    margin: 1em 0 0 0;
    padding: .5em .7em .5em .7em;
    transition: 0.6s;
    &:hover{
        color: white;
        background-color: ${Colors.lightGreen};
    }
    @media (max-width: 1000px){
        margin: 1em 0 1em 0;
    }
`;

export const FileContentAddButtonContainer = styled.div`
    & > svg {
        color: ${Colors.lightGreen};
        margin: 1em 0 1em 0;
        font-size: ${FileContentButtonValue}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const FileContentBackButtonContainer = styled.div`
    & > svg {
        color: ${Colors.red};
        margin: 1rem 0 1rem 0;
        font-size: ${FileContentButtonValue}rem;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
            opacity: 0.7;
        }
    }
`;

export const FileContentFile = styled.span`

`;

export const FileContentFilesWrapper = styled.div`
    @media (max-width: 1200px){
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 1rem 0 0 0;
        border-bottom: 1px solid ${Colors.darkGray};
        padding: 1rem 0 1rem 0;
    }
`;

export const FileContentRemoveFile = styled.span`
    margin: 0 0 0 1rem;
    & > svg {
        cursor: pointer;
        color: ${Colors.red};
        transition: .7s;
        &:hover{
            transform: scale(1.1);
        }
        @media (max-width: 1200px){
            margin: 1rem 0 0 0;
        }
    }
`;
