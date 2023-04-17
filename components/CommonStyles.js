import styled from 'styled-components'

// ``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
`;


export const FontsHeaderBold = styled.h1`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  text-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 3rem;
  font-weight: 700;
  `;

export const FontsBold = styled.p`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.29rem;
  `;

export const FontsMedium = styled.p`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  `;

export const FontsLight = styled.p`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  `;

export const FontsExtraThin = styled.p`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  font-weight: 200;
  `;

export const FontsThin = styled.p`
  /* text-align: center; */
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  font-size: 1.29rem;
  `;

export const CommonDisplayFlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  `;

export const CommonDisplayFlexColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `;

export const CommonDisplayFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;
