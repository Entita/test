import styled from 'styled-components'

// little help ->  ``; 

export const StudentContainer = styled.div`
  display: flex;
  flex-flow: row;
  transition: 0.7s;
  min-height: 100vh;
  box-shadow: 0px 4px 10px rgba(155, 155, 155, 0.35);
  @media (max-width: 1200px) {
      /* we write media query into constants */
      flex-flow: column;
      justify-content: center;
      align-items: center;
  }
`;
