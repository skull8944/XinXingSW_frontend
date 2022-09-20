import React from 'react'
import StyledModal from './StyledModal';

const DeleteSupplyKindModal = (props) => {
  return (
    <StyledModal
      title='刪除物資種類'
      key='deleteSupplyKindModal'
      closable={false}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      confirmLoading={props.confirmLoading}
    >
      <p>{`確定刪除"${props.kindName}"?`}</p>
    </StyledModal>
  )
}

export default DeleteSupplyKindModal;