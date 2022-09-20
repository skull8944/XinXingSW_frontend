import { Input, Form, Button, message } from 'antd';
import { useState } from 'react';
import StyledModal from './StyledModal';

const AddPeopleModal = (props) => {

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const addPeople = async () => {
    setConfirmLoading(true);
    try {
      let name = form.getFieldValue('name');
  
      const res = await fetch('/people', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name
        })
      })
  
      const data = await res.json();
  
      if (res.ok) {
        await props.onOk();
        form.resetFields();
        message.success('成功新增人員');
      } else {
        message.error(data.message);
      }
    } catch(e) {
      console.log(e);
      message.error(e.message);
    }

    setConfirmLoading(false);
  }

  const checkField = () => {
    let name = form.getFieldValue('name');
    if (name == null || name === '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }
    
  return (
    <StyledModal
      closable={false}
      key='addPeopleModal'
      title='新增人員'
      visible={props.visible}
      confirmLoading={confirmLoading}
      footer= {[
        <Button onClick={() => props.onCancel()}>取消</Button>,
        <Button 
          disabled={btnDisabled}
          type='primary'
          onClick={() => addPeople()}
        >
          送出
        </Button>
      ]}
    >
      <div style={{width: '90%', margin: '0 auto'}} id='9487'>
        <Form form={form} >

          <div style={{padding: '0 25px 0 25px'}}>
            <Form.Item
              label='人員名稱'
              key='name'
              name='name'
              rules={[
                {
                  required: true,
                  message: '請輸入人員名稱'
                }
              ]}
            >
              <Input style={{margin: '0 0 20px 0'}} onChange={checkField} />
            </Form.Item>
          </div>
        </Form>
      </div>
    </StyledModal>
  )
}

export default AddPeopleModal;