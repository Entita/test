import styled, { css } from 'styled-components'
import { Colors } from '../../utils/Colors'
import { FontsHeaderBold, FontsBold, CommonDisplayFlexColumn } from '../CommonStyles'

export const StudentApologizeContainer = styled(CommonDisplayFlexColumn)`
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  margin: 5rem 0 0 0;

  .SingleDatePicker {
    place-self: center;
    margin-bottom: 1rem;
    
  }
  .SingleDatePicker__withBorder {
    place-self: center;
    margin-bottom: 1rem;
    :hover{
       background-color: ${Colors.lightGreen};
    }
  }

  .SingleDatePickerInput__withBorder {
    border-radius: 18px;
    overflow: hidden;
    margin: 0 0 1.5rem 0;
    transition: .6s;
    :hover{
       color: ${Colors.white};
       background-color: ${Colors.lightGreen};
    }
  }
`;

export const ApologizeTitle = styled(FontsHeaderBold)`
  font-size: 3.5rem;
  @media (max-width: 700px) {
      /* we write media query into constants */
      font-size: 1.7rem;
  }
`;

export const ApologizeLabel = styled(FontsBold)`
  font-size: 2rem;
  @media (max-width: 700px) {
      /* we write media query into constants */
      font-size: 1.7rem;
  }
`;

export const ApologizeInput = styled.input`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 1.3rem;
  margin: 0 0 2rem 0; 
  border: 1px solid ${Colors.beige};
  padding: .5rem 1rem .5rem 1rem;
  border-radius: 18px;
  transition: 0.7s;
  @media (max-width: 700px) {
      /* we write media query into constants */
      font-size: 1rem;
  }
  :hover{
      border-color: ${Colors.lightGreen};
    }
`;

export const ApologizeForm = styled.div`
    display: flex;
    flex-flow: column;
    margin: 3rem 0 0 0;
`;

export const ApologizeSendButton = styled.button`
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: black;
    background-color: ${Colors.white};
    border-radius: 25px;
    padding: 1rem 4rem 1rem 4rem;
    margin: 0 0 3rem 0;

    ${({ disabled }) => disabled ? css`
        cursor: not-allowed;
    ` : css`
        transition: 0.7s;
        :hover{
            color: white;
            background-color: ${Colors.lightGreen};
        }
    `}
`;

export const ApologizeBackButton = styled(ApologizeSendButton)`
    :hover{
        background-color: ${Colors.orange};
    }
`;
