import { Form } from "antd";
import styled from "styled-components";

const StyledForm = styled(Form)`

  margin: ${({margin}) => margin || '0 auto'};
  text-align: ${({textAlign}) => textAlign || 'center'};

  label {
    font-size: 3vmin;
  }

  p {
    text-align: center;
  }

  .ant-input {
    width: 56%
  }

  .ant-btn {
    width: 120px;
    height: 7%;
    span {
      font-size: 2.5vmin;
    }
  }
  
  .form-div {
    padding-left: 25%;
  }

  .addSupply {    
    width: auto;
    height: auto;
    font-size: 4vmin;
  }

  .kindSelect {
    width: auto;
  }

  .ant-select ant-select-option {
    width: auto
  }

  @media screen and (max-width: 768px) {
    .form-div {
      padding-left: 0%;
    }
    label {
      font-size: 5vmin;
    }
    .ant-input {
      width: 100%
    }
    .ant-btn {
      width: 35%;
      span {
        font-size: 4.2vmin;
      }
    }
    .addSupply {
      width: 50%;
    }
  }
`

export default StyledForm;