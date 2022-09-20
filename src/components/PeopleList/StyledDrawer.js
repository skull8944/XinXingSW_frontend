import { Drawer } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  text-align: center;

  .ant-drawer-header {
    text-align: center;
    background-color: #fff;
    box-shadow: 0px -1px 14px #636363;
    
    div {
      font-size: 4vmin;
      padding: 5px 0 5px 0;
    }

    @media screen and (max-width: 768px) {
      div {
        font-size: 7vmin;
      }
    }
  }

  .ant-drawer-body {
    font-size: 3.5vmin;

    @media screen and (max-width: 768px) {
      font-size: 6vmin;
    }
  }

  #plusPeople {
    margin-top: '50px';
    :hover {
      cursor: pointer;
    }
  }

`

export default StyledDrawer;