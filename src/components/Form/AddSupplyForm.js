import StyledForm from './StyledForm';
import { Select, Button, Space, InputNumber, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddSupplyForm = () => {

  const [supplyKinds, setSupplyKinds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fieldsNull, setFieldsNull] = useState([]);

  const [form] = StyledForm.useForm();
  const {Item} = StyledForm;
  const {Option} = Select;
  
  const getKinds = async () => {
    try {
      const res = await fetch('/kind');
      const data = await res.json();
      if (res.ok) {
        setSupplyKinds(data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      message.error('取得物資種類時發生問題');
    }
  }

  const checkField = (i, e) => {
    fieldsNull[i] = e == null;
    setFieldsNull([...fieldsNull]);
  }

  const submit = async () => {
    try {
      setIsLoading(true);
      const supplyList = form.getFieldValue('supplyList');
      if (supplyList.length >= 1) {
        const res = await fetch('/supply', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(supplyList)
        })
        if (res.ok) {
          form.resetFields(['supplyList']);
          message.success('成功新增物資');
          setFieldsNull([]);
        } else {
          message.error('新增物資時發生問題');
        }
      } else {
        message.error('領取資料不可有空');
        return;
      }
    } catch(e) {
      console.log(e);
      message.error('新增物資時發生問題');
    }
    setIsLoading(false);
  }
  
  useEffect(() => {
    getKinds();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <StyledForm form={form} key='addSupplyForm' name='addSupplyForm'>
        <StyledForm.List name='supplyList'>
        {
          (fields, {add, remove}) => (
            <>
              {
                fields.map((field, i) => (
                  <Space
                    key={i}
                    align='baseline'
                    style={{
                      display:'flex', justifyContent: 'center'
                    }}
                  >

                    <Item
                      key={`supplyKind${i}`}
                      name={[i, 'supplyKind']}
                      rules={[{
                        required: true,
                        message: '請選擇物資種類'
                      }]}
                    >
                      <Select
                        key={`kindSelect${i}`}
                        className='kindSelect'
                        placeholder='物資種類'
                        onChange={(e) => checkField(3*i, e)}
                      >
                        {
                          supplyKinds.map((e, j) => (
                            <Option
                              key={`kind${i}${j}`}
                              value={e.kindNumber}
                            >
                              {e.kindName}
                            </Option>
                          ))
                        }
                      </Select>
                    </Item>

                    <Item 
                      key={`exp${i}`} name={[i, 'expiredDate']}
                      rules={[{
                        required: true,
                        message: '請選過期日期'
                      }]}
                    >
                      <input 
                        type='date' 
                        key={`calender${i}`} 
                        min={new Date().toISOString().split("T")[0]} 
                        onChange={(e) => checkField(3*i+1, e)}
                      />
                    </Item>

                    <Item 
                      key={`q${i}`} 
                      name={[i, 'quantity']}
                      rules={[{
                        required: true,
                        message: '請選擇物資數量'
                      }]}
                    >
                      <InputNumber 
                        key={`quantity${i}`}
                        placeholder='數量'
                        min='1'
                        onChange={(e) => checkField(3*i+2, e)}
                      />
                    </Item>

                    <MinusCircleOutlined 
                      key={`remove${i}`}
                      onClick={() => {
                        setFieldsNull(
                          fieldsNull.filter((e, index) => 
                            index !== 3*i &&
                            index !== 3*i+1 &&
                            index !== 3*i+2
                          ));
                        remove(i);
                      }}
                    />

                  </Space>
                ))
              }

              <Item key='addSupply'>
                <Button 
                  type='dashed' 
                  className='addSupply' 
                  block
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add();
                    fieldsNull.push(true, true, true);
                    setFieldsNull([...fieldsNull]);
                  }}
                >
                  新增物資
                </Button>
              </Item>
            </>
          )
        }
        </StyledForm.List>

        <Item>
          <Button 
            disabled={
              fieldsNull.length === 0 ||
              fieldsNull.filter(e=>e===true).length>=1
            }
            type="primary" 
            htmlType="submit" 
            onClick={()=>submit()}>
            新增
          </Button>
        </Item>

      </StyledForm>
    </Spin>
  )
}

export default AddSupplyForm