import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { FontsHeaderBold, FontsThin, FontsBold } from '../CommonStyles'


// little help ->  ``; 
// StudentIP =StudentInfoPanel

export const StudentIPFontsHeaderBold = styled(FontsHeaderBold)`
  font-size: 1.6rem;
`;

export const StudentIPFontsThin = styled(FontsThin)`
  font-size: 1.8rem;
`;

export const StudentIPButtonFontsBold = styled(FontsBold)`
  font-size: 1.2rem;
  color: white;
`;

export const StudentIPItemContainer = styled.div`
  margin: 0 0 2em 0;
  padding: 0 0 2em 2em;
  border-bottom: 1px solid black;
`;

export const StudentIPContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  min-height: 100vh;
  margin: 1em 1em 0em 0em;
  transition: 0.4s;
  /* background: green; */
  @media (max-width: 1200px) {
    /* we write media query into constants */
    width: 100%;
    margin: 2em 2em 2em 2em;
  }
`; 

export const StudentIPButton = styled.button`
  border: 1px solid white;
  cursor: pointer;
  border-radius: 30px;
  background-color: ${Colors.orange};
  padding: 1.2em 0 1.2em 0;
  transition: 0.7s;
  @media (max-width: 1000px) {
    /* we write media query into constants */
    margin: 0 6em 0 6em;
  }
  :hover{
    background-color: rgba(232, 152, 107, 0.7);
    margin: 0 2em 0em 2em;
  }
`