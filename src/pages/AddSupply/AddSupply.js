import React from 'react';
import { Container } from '../../components/Container/Container';
import AddSupplyForm from '../../components/Form/AddSupplyForm';

const AddSupply = () => {
  return (
    <Container
      width='100%'
      margin='0'
      padding='15px'
    >

      <Container textAlign='center'>
        <p>新增物資</p>
      </Container>

      <AddSupplyForm />

    </Container>  )
}

export default AddSupply