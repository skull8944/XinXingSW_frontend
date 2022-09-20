import { Drawer } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  text-align: left;

  .ant-drawer-body {
    padding: 0;
    background-color: #afafaf;
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