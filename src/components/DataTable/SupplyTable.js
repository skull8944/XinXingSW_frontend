import StyledTable from './StyledTable';
import SupplyExpandTable from './SupplyExpandTable';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const supplyColumns = [
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
    title: '總數',
    dataIndex: 'sum',
    align: 'center'
  },
];

const SupplyTable = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch('/supply');
      const json = await data.json();
      setData(json);
      setIsLoading(false);
    }

    fetchData().catch(console.error);

  }, []);

  return (
    <Spin spinning={isLoading}>
      <StyledTable
        key='supplyTable'
        rowKey={(data,i)=>`supplyRow${i}`}
        columns={supplyColumns} 
        dataSource={data}
        bordered={true}
        loading={props.loading ?? false}
        size='large'
        expandable={{
          expandedRowRender: supply => (
            <SupplyExpandTable data={supply.expAndQty} />
          ),
          expandIcon: ({expanded, onExpand, record}) =>
            expanded 
            ? <UpOutlined 
                style={{color:'grey'}} 
                onClick={e => onExpand(record, e)} 
              />
            : <DownOutlined 
                style={{color:'grey'}}
                onClick={e => onExpand(record, e)} 
              />
        }}
      />
    </Spin> 
  );
};

export default SupplyTable;