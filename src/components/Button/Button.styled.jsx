import styled from '@emotion/styled';

export const Button = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  background-color: #3c4eb4;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    10px 10px 12px 0px rgba(0, 0, 0, 0.2), 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: #0d164e;
    color: #f792e6;
  }
`;
