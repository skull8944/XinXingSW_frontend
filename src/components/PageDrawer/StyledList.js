import { List } from "antd";
import styled from "styled-components";

const StyledList = styled(List)`
  margin: 0;
  background-color: #fff;
  font-size: 3vmin;
  .ant-list-item {
    box-shadow: 0px 1px 1px #636363;
    padding: 14px 0 7px 14% ;

    :hover {
      cursor: pointer;
      scale: 1.1;
      background-color: #eeeeee;
    }
  }
  .ant-list-item-meta-title {
    font-size: 3vmin;
  }
  .deletePeople {
    :hover {
      cursor: pointer
    }
  }

  .title-w {    
    .ant-list-item-meta-title {
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 5vmin;
    .ant-list-item-meta-title {
      font-size: 5vmin;
    }
  }
`;

export default StyledList;