import styled from '@emotion/styled';

export const SearchbarBox = styled.header`
  display: flex;
  justify-content: center;
  padding: 12px 24px;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 555px;
  background-color: #fff;
  border-radius: 3px;
`;

export const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    opacity: 1;
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`;

export const SearchbarInput = styled.input`
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 14px;
  padding-right: 4px;

  &::placeholder {
    font-size: 18px;
  }
`;
