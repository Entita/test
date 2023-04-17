import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { FontsHeaderBold, FontsThin, FontsBold, CommonDisplayFlexColumn, CommonDisplayFlex } from '../CommonStyles'

// little help ->  ``; 

export const HeadingNormalFontSize = 2.5;
export const HeadingSmallFontSize = 1.9;
export const NormalFontSize = 1.1;
export const SmallFontSize = .9;

export const SimpleContainer = styled(CommonDisplayFlexColumn)`
    /* nothing to do here */
`;

export const StudentMCContainer = styled(CommonDisplayFlexColumn)`
    justify-content: flex-start;
    align-items: stretch;
    width: 70vw;
    min-height: 100vh;
    /* background-color: #55917F; */
    @media (max-width: 1200px) {
        /* we write media query into constants */
        width: 100%;
        min-height: 70vh;
    }
`;

export const StudentMCNextLesson = styled(CommonDisplayFlexColumn)`
    background-color: ${Colors.yellow};
    border-radius: 25px;
    margin: 1em 1em 1em 1em;
    padding: 4em 0 4em 0;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.35);
`;

export const StudentMCFontsDate = styled(FontsHeaderBold)`
    font-size: 3.5rem;
    /* color: ${Colors.white}; */
    color: white;
`;

export const StudentMCFontsHomeworks = styled(FontsHeaderBold)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${HeadingNormalFontSize}rem;
    color: black;
    margin-bottom: 0.3em;
    @media (max-width: 1200px) {
        font-size: ${HeadingSmallFontSize}rem;
    }
`;

export const StudentMCFontsFiles = styled(FontsHeaderBold)`
    font-size: ${HeadingNormalFontSize}rem;
    color: ${Colors.white};
    margin-bottom: 0.3em;
    @media (max-width: 1200px) {
        font-size: ${HeadingSmallFontSize}rem;
    }
`;

export const StudentMCFontsWordList = styled(FontsHeaderBold)`
    font-size: ${HeadingNormalFontSize}rem;
    color: ${Colors.white};
    margin-bottom: 0.3em;
    @media (max-width: 1200px) {
        font-size: ${HeadingSmallFontSize}rem;
    }
`;

export const StudentMCFontsSummary = styled(FontsHeaderBold)`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: ${HeadingNormalFontSize}rem;
    /* color: ${Colors.white}; */
    color: white;
    margin-bottom: 0.3em;
    @media (max-width: 1200px) {
        font-size: ${HeadingSmallFontSize}rem;
    }
`;

export const StudentMCFontsBold = styled(FontsBold)`
    font-size: 1.5rem;
    color: white;
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
`;

export const StudentMCFontsHomeworksItem = styled(FontsThin)`
    font-size: ${NormalFontSize}rem;
    color: black;
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
    margin: 0em 0.7em 0.5em 0em;
    @media (max-width: 1200px) {
        font-size: ${SmallFontSize}rem;
    }
`;

export const StudentMCFontsSectionItems = styled(FontsThin)`
    display: flex;
    flex-direction: column;
    font-size: ${NormalFontSize}rem;
    color: ${Colors.white};
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
    @media (max-width: 1200px) {
        font-size: ${SmallFontSize}rem;
    }
`;

export const StudentMCFontsSectionItem = styled.a`
    color: ${Colors.white};
    text-decoration: none;
    font-weight: 400;
    transition: .6s;
    &:hover{
        transform: scale(1.03);
    }
`;

export const StudentMCFontsSectionLinkItem = styled.a`
    font-family: 'Raleway', sans-serif;
    font-size: ${NormalFontSize}rem;
    color: ${Colors.white}; 
    text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
    @media (max-width: 1200px) {
        font-size: ${SmallFontSize}rem;
    } 
    &:visited {
        color: ${Colors.darkGray};
    } 
`;

export const StudentMCHomeworks = styled(CommonDisplayFlexColumn)`
    background-color: white;
    /* align-items: flex-start; */
    border-radius: 25px;
    margin: 0em 1em 1em 1em;
    padding: 1em 2em 1em 2em;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.25);
`;

export const StudentMCFiles = styled(CommonDisplayFlexColumn)`
    background-color: ${Colors.lightGreen};
    border-radius: 25px;
    margin: 0em 1em 1em 1em;
    padding: 1.5em 0em 1.5em 0em;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.5);
`;

export const StudentMCWordList = styled(CommonDisplayFlexColumn)`
    background-color: ${Colors.blue};
    border-radius: 25px;
    padding: 1em 2em 1.5em 2em;
    margin: 0em 1em 1em 1em;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.5);
`;

export const StudentMCSummaryFirstPart = styled(CommonDisplayFlexColumn)`
    // background-color: ${Colors.red};
    border: 7px solid ${Colors.red};
    border-radius: 25px;
    padding: 1em 2em 1em 2em;
    margin: 0em 1em 1em 1em;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    align-items: flex-start;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.5);
`;

export const StudentMCSummarySecondPart = styled(CommonDisplayFlexColumn)`
    background-color: ${Colors.red};
    border-radius: 25px;
    padding: 1em 2em 1em 2em;
    margin: 0em 1em 1em 1em;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    align-items: flex-start;
    box-shadow: -4px 4px 6px rgba(155, 155, 155, 0.5);
`;

export const StudentMCFilesItems = styled(CommonDisplayFlex)`
    align-content: flex-start;
    flex-wrap: wrap;
    margin: 0em 5em 0em 5em;
`;

export const SimpleDiv = styled.div`
    // nothing yet
`;

export const StudentListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    margin-top: 1em;
    > input{
        cursor: pointer;
        margin: 0 0 0 1em;
    }
    /* > p+p {
        font-weight: 400;
        filter:  ${({ editable }) => editable ? opacity(1.6) : 'None'};
        text-decoration:  ${({ editable }) => editable ? 'line-through' : 'None'};
    } 
    */
`;

export const StudentMCDescription = styled.p`
    font-weight: 400;
    margin: 0 0 0 .3em;
    /* transition: .6s;
    filter:  ${({ editable }) => editable ? 'opacity(.6)' : 'None'};
    text-decoration:  ${({ editable }) => editable ? 'line-through' : 'None'}; */
`;

export const StudentUnorderedList = styled.ul`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

export const StudentMCHomeworkDoneContainer = styled.div`
    & > svg {
        color: ${Colors.lightGreen};
        margin: 0 0 0 1em;
        font-size: 1.3rem;
        transition: .6s;
        cursor: pointer;
        &:hover{
            transform: scale(1.18);
        }
    }
`;

export  const StudentMCSummaryButtonContainer = styled.div`
    & > svg {
        color: ${({ editable }) => editable ? Colors.red : Colors.white };
        font-size: 1.3rem;
        transition: .6s;
        cursor: pointer;
        margin: ${({ editable }) => editable ? "1em 0 0 0" : "None"};
        &:hover{
            transform: scale(1.18);
        }
    }
`;

export const StudentMCSummaryColumnContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
`;

export const StudentMCSummaryItem = styled.div`
    margin: 1rem 0 0 0;
    & > span{
        font-weight: 600;
    }
`;
