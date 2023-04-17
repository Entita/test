import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { CommonDisplayFlexColumn, CommonDisplayFlexRow } from '../CommonStyles'

export const DropDown = styled(CommonDisplayFlexColumn)`
    width: 100%;
    height: 100%;
`;

export const StudentContainer = styled(CommonDisplayFlexRow)`
    justify-content: space-between;
    min-width: 40vw;
    transition: 0.7s;
    width: 100%;
    border-bottom: 1px solid black;
    cursor: pointer;
    & > svg {
        color: ${Colors.lightGreen}; 
        font-size: 2.3rem; 
        transform: ${({ state }) => state ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
    `;

export const MenuItems = styled(CommonDisplayFlexRow)`
    width: 100%;
    justify-content: space-between;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    margin: 0 0 1em 0;
    @media (max-width: 1000px) {
      /* we write media query into constants */
      flex-direction: column;
      width: 100%;
    }
`;

export const MenuItem = styled.span`
    font-family: 'Raleway', sans-serif;
    font-weight: ${({ selected }) => selected ? 700 : 400};
    font-size: 1rem;
    cursor: pointer;
`;

export const ContentContainer = styled(CommonDisplayFlexRow)`
    position: relative;
    width: 95%;
    /* padding: 3em; */
    background-color: ${Colors.creameWhite};
    border-radius: 10px;
    justify-content: space-between;
    padding: 1em 0 1em 0;
    @media (max-width: 1000px) {
      /* we write media query into constants */
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 1em 0 0 0;
    }
`;