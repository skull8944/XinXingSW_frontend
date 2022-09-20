import StyledTable from "./StyledTable";
import RecordExpandTable from "./RecordExpandTable";
import { useState, useEffect } from "react";
import { 
  PlusOutlined, 
  MinusOutlined, 
  DownOutlined, 
  UpOutlined 
} from "@ant-design/icons";
import { Spin } from "antd";

const recordColumn = [
  {
    title: '領取/新增',
    dataIndex: 'inOrOut',
    align: 'center',
    render: (x) => (
      x === 1
      ? <MinusOutlined style={{color:'red', fontSize: '4vmin'}} />
      : <PlusOutlined style={{color:'green', fontSize:'4vmin'}} />
    )
  },
  {
    title: '領取人',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '日期',
    dataIndex: 'date',
    align: 'center'
  },
]

  const RecordTable = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
  
    useEffect(() => {
  
      const fetchData = async () => {
        setIsLoading(true);
        const data = await fetch('/record');
        const json = await data.json();
        console.log(json)
        setData(json);
        setIsLoading(false);
      }
  
      fetchData().catch(console.error);
  
    }, []);

    return (
      <Spin spinning={isLoading}>
        <StyledTable
          rowKey={(data)=>`${data.inOrOut}-${data.date}-${data.kind}`}
          columns={recordColumn}
          dataSource={data}
          bordered={true}
          expandable={{
            expandedRowRender: record => (
              <RecordExpandTable data={record.expand} />
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
  }

export default RecordTable;