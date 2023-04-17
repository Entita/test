import styled from 'styled-components'
import { CommonDisplayFlexRow } from '../CommonStyles'


export const AdminContainer = styled(CommonDisplayFlexRow)`
  min-height: 100vh;
  @media (max-width: 700px) {
      /* we write media query into constants */
      flex-flow: column;
      /* flex-direction: column-reverse; */
  }
`;