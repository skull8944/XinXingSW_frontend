import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: ${({width}) => width || '40px'};
  height: ${({height}) => height || 'auto'};
  margin: ${({margin}) => margin || '0 auto'};
  padding: ${({padding}) => padding || '5px'};
  border-radius: 11px;
  align-items: center;
  font-weight: bold;
  font-size: 35px;
  svg {
    font-weight: bold;
  }
`

export default StyledButton;