import { Table } from "antd";
import styled from "styled-components";

const StyledTable = styled(Table)`
  margin: ${({margin}) => margin || 0};
  padding: ${({padding}) => padding || 0};
  width: ${({width}) => width || '100%'};
  font-size: 5vmin;

  .ant-table table {
    font-size:  ${({tableFont}) => tableFont || '3vmin'};
  }

  p {
    font-size: 4vmin;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 5vmin
    }
    .ant-table table {
      font-size: 5.2vmin;
    }
  }
`

export default StyledTable;