import styled from 'styled-components'
import { CommonDisplayFlexColumn } from '../CommonStyles'


export const SideContainer = styled(CommonDisplayFlexColumn)`
  width: 10vw;
  min-height: 100vh;
  gap: 3em;
  transition: 0.7s;
  cursor: pointer;
  & > svg {
    transition: 0.6s;
    &:hover{
      transform: scale(1.1);
      filter: opacity(.8);
    }
  }
  @media (max-width: 700px) {
      /* we write media query into constants */
      min-height: 10vh;
      width: 100%;
      flex-flow: row;
  }
`;