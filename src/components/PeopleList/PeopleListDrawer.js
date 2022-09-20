import React from 'react'
import PeopleList from './PeopleList'
import StyledDrawer from './StyledDrawer'

const PeopleListDrawer = (props) => {
  return (
    <StyledDrawer
      title="人員列表"
      placement='right'
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
      width={window.innerWidth < 768 ? '70%' : '20%'}
    >
      <PeopleList />
    </StyledDrawer>
  )
}

export default PeopleListDrawer