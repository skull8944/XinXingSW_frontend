import React from 'react';
import { Container } from '../../components/Container/Container';
import TakeSupplyForm from '../../components/Form/TakeSupplyForm';

const TakeSupply = () => {
  return (
    <Container
      width='100%'
      margin='0'
      padding='15px'
    >

      <Container textAlign='center'>
        <p>領取物資</p>
      </Container>

      <TakeSupplyForm />

    </Container>
  )
}

export default TakeSupply