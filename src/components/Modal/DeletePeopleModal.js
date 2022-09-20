import React from 'react'
import StyledModal from './StyledModal'

const DeletePeopleModal = (props) => {
  return (
    <StyledModal
      key='deletePeopleModal'
      title='刪除人員'
      closable={false}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      confirmLoading={props.confirmLoading}
    >
      <p>確定刪除"{props.name}"?</p>
    </StyledModal>
  )
}

export default DeletePeopleModal;