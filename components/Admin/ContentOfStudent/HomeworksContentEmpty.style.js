import styled from 'styled-components'
import { CommonDisplayFlexColumn} from '../../CommonStyles'
import { Colors } from '../../../utils/Colors'

export const HomeworkContentValue = 1;

export const HomeworksContentEmptyPhrase = styled.span`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    color: ${Colors.blue};
    font-size: ${HomeworkContentValue + .5}rem;
    @media (max-width: 1000px) {
        font-size: ${HomeworkContentValue}rem;
    }
`;

export const HomeworksContentContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    margin: 1em 0 1em 0;
    & > svg {
        color: ${Colors.darkGray};
        margin: 1em 0 0 0;
        font-size: ${HomeworkContentValue + .8}rem;
    }
`;

export const HomeworksContentMainContainer = styled(CommonDisplayFlexColumn)`
    width: 100%;
    align-items: flex-end;
`;