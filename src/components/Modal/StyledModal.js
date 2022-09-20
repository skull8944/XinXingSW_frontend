import { Modal } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-size: 3vmin;
  }

  label {
    font-size: 2.5vmin;
  }

  .center-primary-btn {
    width: 14vmin;
    height: 5vmin;
    border-radius: 11px;
    font-size: 2.35vmin;
  }

  @media screen and (max-width: 768px) {
    .ant-modal-title {
      font-size: 5vmin;
    }    
    label {
      font-size: 5vmin
    }
    button {
      width: 22vmin;
      height: 7.7vmin;
      border-radius: 11px;
      font-size: 4vmin;
    }
    .center-primary-btn {
      width: 22vmin;
      height: 100%;
      font-size: 4vmin;
    }
  }
`

export default StyledModal;