import styled from 'styled-components'
import { Colors } from '../../utils/Colors'
import { FontsHeaderBold, FontsThin, FontsBold, CommonDisplayFlexColumn, CommonDisplayFlexRow } from '../CommonStyles'

export const MainContainer = styled(CommonDisplayFlexColumn)`
  justify-content: flex-start;
  min-height: 100vh;
  width: 90vw;
  transition: 0.7s;
  margin: 1em 0 0 0;
  @media (max-width: 700px) {
      /* we write media query into constants */
      width: 100%;
  }
`;

export const MainHeaderContainer = styled(CommonDisplayFlexRow)`
  justify-content: space-around;
  width: 90vw;
  @media (max-width: 1000px) {
      /* we write media query into constants */
      flex-flow: column;
      justify-content: center;
      align-items: center;
  }
`

export const MainHeaderUser = styled(CommonDisplayFlexRow)`
  gap: 1em;
  height: 10vh;
`

export const MainHeaderRole = styled.div`
  height: 10vh;
`

export const MainHeaderName = styled.div`
  /* background-color: red; */
`

export const MainHeaderTitle = styled(FontsHeaderBold)`
  font-size: 3.5rem;
  @media (max-width: 700px) {
      /* we write media query into constants */
      font-size: 1.7rem;
  }
`

export const MainHeaderTitleRole = styled(FontsThin)`
  font-size: 1.5rem;
  @media (max-width: 1000px) {
      /* we write media query into constants */
      display: none;
  }
`

export const MainHeaderNextLesson = styled(CommonDisplayFlexColumn)`
  background-color: ${Colors.lightGreen};
  padding: 0.5em 2em 0.5em 2em;
  border-radius: 25px;
  color: white;
  transition: 0.7s;
  @media (max-width: 1000px) {
      /* we write media query into constants */
      padding: 0.7em 7em 0.7em 7em;
  }
  @media (max-width: 700px) {
      /* we write media query into constants */
      padding: 0.5em 4em 0.5em 4em;
  }
`

export const MainHeaderNextLessonTitle = styled(FontsBold)`
  font-size: 2rem;
  @media (max-width: 700px) {
      /* we write media query into constants */
      font-size: 1.5rem;
  }
`

export const MainHeaderLessonTitleTime = styled(FontsThin)`
  font-size: 1rem;
`

export const AdminListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const AdminUnorderedList = styled.ul`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

export const AdminStudentsContainer = styled(CommonDisplayFlexColumn)`
    margin: 2em 0 0 0;
    gap: 6px;
    // height: calc(100vh - 94px - 2em);
    min-height: 100vh;
    gap: 2em;
    width: 80%;
`;