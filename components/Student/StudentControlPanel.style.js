import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { FontsBold, CommonDisplayFlexColumn } from '../CommonStyles'


// little help ->  ``; 
// StudentCP = StudentControlPanel

export const StudentCPContainer = styled(CommonDisplayFlexColumn)`
    justify-content: flex-start;
    width: 15vw;
    min-height: 90vh;
    background-color: ${Colors.darkGray};
    padding-top: 1em;
    gap: 2em;
    box-shadow: 4px 4px 7px rgba(155, 155, 155, 0.35);
    /* transition: 0.6s; */
    @media (max-width: 1200px) {
        /* we write media query into constants */
        width: 100%;
        min-height: 20vh;
        padding: 2em 0 2em 0;
        // flex-flow: row;
        justify-content: center;
        transition: 3s;
    }
`;

export const StudentCPFontsBold = styled(FontsBold)`
    font-size: 1.5rem;
    color: white;
    text-shadow: -4px 5px 8px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
    cursor: pointer;
    :hover{
        font-size: 1.55rem;
    }
`;

export const StudentCPChildFontsBold = styled(StudentCPFontsBold)`
    font-size: 1.5rem;
    color: ${Colors.orange};
    text-transform: uppercase;
    :hover{
        font-size: 1.55rem;
    }
`;