import StyledForm from './StyledForm';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, message, Select, Space, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

const {Option} = Select;
const {Item} = StyledForm;

/*
新增一個state計所有的物資？？？
1. supplyList { kind, {exp, qty}[] }
kind => supplyList.map((e)=>e.kind)
exp => supplyList
  .filter(el=>el.expAndQty.length>0)
  .map((s, j) => (
    <Option key={`s${i}o${j}1`} value={s.supplyKind}>
      {s.kindName}
    </Option>
  ))
2. supplyList { kind, exp, qty }
kind => supplyList((e) => {})
*/

const TakeSupplyForm = () => {

  const [form] = StyledForm.useForm();
  const [supplyList, setSupplyList] = useState([]);
  const [expDisabled, setExpDisabled] = useState([]); // {true or false, data[]}
  const [quantityDisabled, setQuantityDisabled] = useState([]);// {true or false, data[]}
  const [people, setPeople] = useState([]);
  const [fieldsNull, setFieldsNull] = useState([]);
  const [peopleNull, setPeopleNull] = useState(true);

  const getExpAndQty = async () => {
    try {
      const res = await fetch(`/supply/exp`);
      const data = await res.json();
      setSupplyList(data);
    } catch (e) {
      console.log(e);
      message.error('取得物資資訊時發生錯誤');
    }
  }

  const getPeople = async () => {
    try {
      const result = await fetch('/people');
      const data = await result.json();
      setPeople(data);
    } catch (e) {
      console.log(e.message);
      message.error('取得人員資訊時發生錯誤');
    }
  }

  const checkField = (i, e) => {
    fieldsNull[i] = e == null;
    setFieldsNull([...fieldsNull]);
  }

  const submit = async () => {
    try{
      const pid = form.getFieldValue('pid');
      const listValue = form.getFieldValue('supplyList');
      if (listValue === null || listValue === undefined || listValue.length === 0) {
        message.error('請新增領取物資');
        return;
      }
        const res = await fetch(`/supply/${pid}`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(listValue)
      });
      if (res.ok) {
        message.success('成功領取物資');
        form.resetFields();
        setFieldsNull([]);
      }
    } catch(e) {
      console.log(e);
      message.error('領取物資時發生錯誤');
    }
  }

  useEffect(() => {
    getExpAndQty();
    getPeople();
  }, [])

  return (
    <StyledForm form={form} key='takeSupplyForm' name='takeSupplyForm'>
      <StyledForm.List name="supplyList">
      {(fields, {add, remove}) => (
      <>
        {fields.map((field, i) => (
          <Space 
            key={i}
            align='baseline'
            style={{
              display:'flex', justifyContent: 'center'
            }}
          >

            <Item 
              name={[i, 'supplyKind']} key={`select${i}`}
              rules={[{
                required: true,
                message: '請選擇物資種類'
              }]}
            >
              <Select 
                disabled={!fieldsNull[3*i]}
                key={`kindSelect${i}`} 
                className='kindSelect' 
                placeholder='物資種類'
                onChange={(e)=>{
                  checkField(3*i, e)
                  if(e !== null && e !== undefined) {
                    expDisabled[i][0] = false;
                    expDisabled[i][1] = supplyList
                      .filter(el => el.supplyKind === e)[0].expAndQty
                      .map(v => {
                        return {
                          expiredDate: v.expiredDate,
                          quantity: v.quantity
                        }
                      })
                    setExpDisabled([...expDisabled]);
                  }
                  form.setFieldValue(['supplyList', i, 'expiredDate'], null);
                  form.setFieldValue(['supplyList', i, 'quantity'], null);
                }}
              >
                {
                  supplyList
                    .filter(el=>el.expAndQty.length>0)
                    .map((s, j) => (
                      <Option key={`s${i}o${j}1`} value={s.supplyKind}>
                        {s.kindName}
                      </Option>
                    ))
                }
              </Select>
            </Item>

            <Item
              name={[i, 'expiredDate']}
              className='kindSelect' 
              key={`exp${i}`}
              rules={[{
                required: true,
                message: '請選擇過期日'
              }]}
            >
              <Select
                key={`expSelect${i}`}
                disabled={expDisabled[i][0] || !fieldsNull[3*i+1]}
                placeholder='過期日期'
                onChange={((e) => {
                  checkField(3*i+1, e);
                  if (e !== null && e !== undefined) {
                    const kind = form.getFieldValue(['supplyList', i, 'supplyKind']);
                    quantityDisabled[i][0] = false;
                    quantityDisabled[i][1] = expDisabled[i][1].filter(el => 
                      el.expiredDate === e
                    )[0].quantity
                    setQuantityDisabled([...quantityDisabled]);
                    const index = supplyList.findIndex(el=>el.supplyKind===kind);
                    supplyList[index].expAndQty = supplyList[index].expAndQty.filter((el)=>
                      el.expiredDate !== e
                    )
                    setSupplyList([...supplyList]);
                  }
                  form.setFieldValue(['supplyList', i, 'quantity'], null);
                })}
              >
                {
                  expDisabled[i][1].map((e, j) => (
                    <Option 
                      key={`s${i}o${j}2`}
                      value={e.expiredDate}
                    >
                      {e.expiredDate}
                    </Option>
                  ))
                }
              </Select>
            </Item>

            <Item 
              name={[i, 'quantity']} 
              key={`quantity${i}`}
              rules={[{
                required: true,
                message: '請輸入物資數量'
              }]}
            >
              <InputNumber 
                disabled={quantityDisabled[i][0]}
                key={`q${i}`} 
                placeholder='數量' 
                onChange={(e) => checkField(3*i+2, e)}
                min='1' 
                max={`${quantityDisabled[i][1]}`}
              />
            </Item>
            
            <MinusCircleOutlined 
              key={`remove${i}`} 
              onClick={()=>{
                const kind = form.getFieldValue(['supplyList', i, 'supplyKind']);
                const exp = form.getFieldValue(['supplyList', i, 'expiredDate']);
                if (kind && exp) {
                  const index = supplyList.findIndex(e => e.supplyKind === kind);
                  supplyList[index].expAndQty.push({
                    expiredDate: exp,
                    quantity: quantityDisabled[i][1]
                  })
                }
                setExpDisabled(
                  expDisabled.filter((exp, j) => j !== i));
                setQuantityDisabled(
                  quantityDisabled.filter((q, j) => j !== i));
                setFieldsNull(
                  fieldsNull.filter((e, index) =>
                    index !== 3*i &&
                    index !== 3*i+1 &&
                    index !== 3*i+2
                  )
                );
                remove(i)
              }}
            />
          </Space>
        ))}
        <Item key='addSupply'>
          <Button 
            type='dashed' 
            className='addSupply' 
            block
            icon={<PlusOutlined />}
            onClick={()=>{
              expDisabled.push([true, []]);
              quantityDisabled.push([true, []]);
              setExpDisabled(expDisabled);
              fieldsNull.push(true, true, true);
              setFieldsNull([...fieldsNull]);
              add();
            }}
          >
            新增領取物資
          </Button>
        </Item>
      </>
      )}
      </StyledForm.List>

      <Item 
        key='people'
        name='pid'
        rules={[{
          required: true,
          message: '請選擇領取的人員'
        }]}
      >
        <Select 
          key='peopleSelect' 
          className='kindSelect'
          placeholder='領取人員'
          onChange={(e) => {
            setPeopleNull(e==null);
          }}
        >
          {
            people.map((p, i) => (
              <Option value={p.pid} key={`people${i}`}>
                {p.name}
              </Option>
            ))
          }
        </Select>
      </Item>

      <Item>
        <Button 
          disabled={
            fieldsNull.length === 0
            || fieldsNull.filter(e=>e===true).length>=1
            || peopleNull
          }
          type="primary" 
          htmlType="submit" 
          onClick={()=>submit()}>
          領取
        </Button>
      </Item>

    </StyledForm>
  )
}

export default TakeSupplyForm;