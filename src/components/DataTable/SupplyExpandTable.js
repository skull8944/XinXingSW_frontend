import React from 'react'
import StyledTable from './StyledTable'

const SupplyExpandTable = (props) => {

  const expandColumn = [
    {
      title: '過期日',
      dataIndex: 'expiredDate',
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
      key='supplyExpand'
      rowKey={(data, i)=>`supplyExpand${i}`}
      tableFont='2.5vmin'
      columns={expandColumn}
      dataSource={props.data}  
      pagination={false} 
    />
  )
}

export default SupplyExpandTable