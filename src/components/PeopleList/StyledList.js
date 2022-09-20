import { List } from "antd";
import styled from "styled-components";

const StyledList = styled(List)`
  font-size: 3vmin;
  .ant-list-item-meta-title {
    font-size: 3vmin;
  }
  .deletePeople {
    :hover {
      cursor: pointer
    }
  }
  .ant-divider {
    margin: 0;
    height: 0;
    border: 1px #3d3d3d solid
  }

  @media screen and (max-width: 768px) {
    font-size: 5vmin;
    .ant-list-item {
      padding: 0 5px 0 5px 0;
    }
    .ant-list-item-meta-title {
      font-size: 5vmin;
    }
  }
`;

export default StyledList;