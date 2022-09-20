import StyledModal from './StyledModal';
import { Input, InputNumber, Form, message, Button } from 'antd';
import { useState } from 'react';

const AddSupplyKindModal = (props) => {
  const [form] = Form.useForm();
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
    const data = await result.json();
    if (result.ok) {
      message.success('新增物資種類成功');
      props.onOk({kindNumber, kindName}); // 修改parent component state(data等等)
      form.resetFields();
    } else {
      message.error(data.message);
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
    <StyledModal
      key='addSupplyKindModal'
      title='新增物資種類'
      closable={false}
      visible={props.visible}
      onOk={() => message.success('s')}
      onCancel={() => {}}
      confirmLoading={isLoading}
      footer={[
        <Button onClick={()=>props.onCancel()}>取消</Button>,
        <Button 
          disabled={btnDisabled}
          type='primary'
          onClick={()=>addSupplyKind()}
        >
          送出
        </Button>
      ]}
    >
      <Form
        form={form}
        key='addSupplyForm'
      >
        <div className='form-div'>
          <Form.Item 
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
          </Form.Item>

          <Form.Item 
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
          </Form.Item>
        </div>

      </Form>
    </StyledModal>
  )
}

export default AddSupplyKindModal