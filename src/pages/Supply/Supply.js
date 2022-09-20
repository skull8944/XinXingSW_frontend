import React from 'react';
import { Container } from '../../components/Container/Container';
import SupplyTable from '../../components/DataTable/SupplyTable';

const Supply = () => {
  return (
    <Container 
      width='100%'
      margin='0'
      padding='15px'
    >

      <Container textAlign='center'>
        <p>物資總覽</p>
      </Container>
      
      <SupplyTable />

    </Container>
  )  
}

export default Supply