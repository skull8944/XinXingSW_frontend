import React from 'react'
import StyledTable from './StyledTable';

const RecordExpandTable = (props) => {

  const expandColumn = [
    {
      title: '編號',
      dataIndex: 'kind',
      align: 'center'
    },
    {
      title: '名稱',
      dataIndex: 'kindName',
      align: 'center'
    },
    {
      title: '數量',
      dataIndex: 'quantity',
      align: 'center'
    },
  ]

  return (
    <StyledTable 
      key='recordExpand'
      rowKey={(data,i)=>`recordExapnd${i}`}
      tableFont={'2.5vmin'}
      columns={expandColumn} 
      dataSource={props.data}  
      pagination={false} 
    />
  )
}

export default RecordExpandTable;