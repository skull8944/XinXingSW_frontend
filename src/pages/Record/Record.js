import React from 'react';
import RecordTable from '../../components/DataTable/RecordTable';
import { Container } from '../../components/Container/Container';

const Record = () => {
  return (
    <Container
      width='100%'
      margin='0'
      padding='15px'
    >
      <Container textAlign='center'>
        <p>物資領取/新增紀錄</p>
      </Container>
      <RecordTable />
    </Container>
  )
}

export default Record