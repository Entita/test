import styled, { keyframes } from 'styled-components'
import { Colors } from '../utils/Colors'

const dropIn = keyframes`
  from {
    top: -5rem;
  }
  to {
    top: 1rem;
  }
`;

const dropOut = keyframes`
  from {
    top: 1rem;
  }
  to {
    top: -5rem;
  }
`;

export const WrapperStyled = styled.div`
  font-family: 'Raleway', sans-serif;
  position: fixed;
  color: ${Colors.white};
  top: 1rem;
  right: 1rem;
  z-index: 999;
  background-color: ${({ goodNotification }) => goodNotification ? Colors.lightGreen : Colors.red };
  display: flex;
  gap: 8px;
  align-items: center;
  padding: .4rem;
  border-radius: 6px;
  transition: 1s ease;
  animation: ${({ hidden }) => hidden ? dropOut : dropIn} 1s ease;
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  svg {
      cursor: pointer;
  }
`;
