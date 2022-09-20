import React from 'react';
import StyledTable from './StyledTable';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';

const expiredColumn = [
  {
    title: '編號',
    dataIndex: 'supplyKind',
    align: 'center'
  },
  {
    title: '名稱',
    dataIndex: 'kindName',
    align: 'center'
  },
  {
    title: '日期',
    dataIndex: 'expiredDate',
    align: 'center'
  },
  {
    title: '數量',
    dataIndex: 'quantity',
    align: 'center'
  },
]

const ExpiredTable = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = await fetch('/supply/expired');
    const json = await data.json();
    setData(json);
    setIsLoading(false);
  }

  useEffect(() => {

    fetchData().catch(console.error);

  }, []);

  return (
    <Spin spinning={isLoading}>
      <StyledTable 
        key='expiredTable'
        columns={expiredColumn} 
        dataSource={data}
        bordered={true}
        rowKey={(e,i)=>`expRow${i}`}
        size='large'
      />
    </Spin>
  )
}

export default ExpiredTable