import React, { useState } from 'react';
import StyledForm from './StyledForm';
import { Button, InputNumber, Input, Spin } from 'antd';

const AddSupplyKindForm = () => {

  const [form] = StyledForm.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const addSupplyKind = async () => {
    setIsLoading(true);

    let kindName = form.getFieldValue('supplyName');
    let kindNumber = form.getFieldValue('supplyNumber');
    
    const result = await fetch('/kind', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kindNumber, 
        kindName
      }),
    })
    const message = await result.json();
    if (result.ok) {
      alert(message.message)
      console.log('success\n', message);
    } else {
      alert(message.message);
      console.log(message);
    }

    setIsLoading(false);
  }
  
  const checkField = () => {

    let kindName = form.getFieldValue('supplyName');
    let kindNumber = form.getFieldValue('supplyNumber');
    if (kindName == null || kindName === '' || kindNumber == null || kindNumber <= 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }

  }

  return (
    <Spin spinning={isLoading}>
      <StyledForm
        form={form}
      >
        <div className='form-div'>
          <StyledForm.Item 
            label='物資編號'
            name='supplyNumber'
            key='supplyNumber'
            rules={[
              {
                required: true,
                message: '請輸入物資編號'
              },
              {
                validator: (_, value) =>
                  value > 0 ? Promise.resolve() : Promise.reject(new Error('編號必須大於0'))
              }
            ]}
          >
            <InputNumber onChange={checkField} />
          </StyledForm.Item>

          <StyledForm.Item 
            label='物資名稱'
            name='supplyName'
            key='supplyName'
            rules={[
              {
                required: true,
                message: '請輸入物資名稱'
              }
            ]}
          >
            <Input onChange={checkField} />
          </StyledForm.Item>
        </div>

        <div style={{width: '100%', textAlign: 'center', margin: '0 auto'}}>
          <Button 
            disabled={btnDisabled}
            type='primary' 
            htmlType='submit' 
            onClick={addSupplyKind}
          >
            送出
          </Button>
        </div>

      </StyledForm>
    </Spin>
  )
}

export default AddSupplyKindForm