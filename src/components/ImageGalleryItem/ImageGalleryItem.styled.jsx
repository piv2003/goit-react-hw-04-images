import styled from '@emotion/styled';

export const ImageItem = styled.li`
  & img {
    width: 100%;
    height: 235px;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 15px;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1),
      0px 10px 10px 0px rgba(0, 0, 0, 0.1), 0px 12px 10px 0px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.03);
      cursor: zoom-in;
    }
  }
`;
