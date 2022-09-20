import React from 'react'
import { Container } from '../../components/Container/Container'
import ExpiredTable from '../../components/DataTable/ExpiredTable'

const Expired = () => {
  return (
    <Container
      width='100%'
      margin='0'
      padding='15px'
    >

      <Container textAlign='center'>
        <p>3個月內過期物資</p>
      </Container>
      
      <ExpiredTable />

    </Container>
  )
}

export default Expired