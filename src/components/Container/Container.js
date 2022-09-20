import styled from "styled-components";

export const Container = styled.div`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ bgcolor }) => bgcolor || ''};
  padding: ${({ padding }) => padding || '0 20px'};
  display: ${({ display }) => display || 'block'};
  float: ${({float}) => float || 'none'};
  margin: ${({ m }) => m || '0 auto'};
  margin-top: ${({mt}) => mt || 'auto'};
  max-width: 100%;
  justify-content: ${({jc}) => jc ||'center'};
  align-items: center;
  text-align: ${({textAlign}) => textAlign || 'start'};
  border: ${({border}) => border || 'none'};
  border-radius: ${({bradius}) => bradius || '0'};
  box-shadow: ${({shadow}) => shadow || 'none'};
  z-index: 0;

  h1 {
    font-size: 6vmin;
  }
  p {
    font-size: 5vmin
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 6vmin;
    }
  }
`;