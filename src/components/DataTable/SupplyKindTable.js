import StyledTable from './StyledTable';
import useModal from '../../hooks/useModal';
import DeleteSupplyKindModal from '../Modal/DeleteSupplyKindModal'
import { useState } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import { message } from 'antd';

const SupplyKindTable = (props) => {
  const [deletedKindNumber, setDeletedKind] = useState();

  const deleteSupplyKindModal = useModal();

  const deleteKind = async () => {
    deleteSupplyKindModal.setConfirmLoading(true);
    const res = await fetch(`/kind/${deletedKindNumber}`, {method: 'delete'});
    const data = await res.json();
    if (res.ok) {
      props.deleteKind(deletedKindNumber);
      message.success('成功刪除物資種類');
    } else {
      message.error(data.message);
    }
    deleteSupplyKindModal.setConfirmLoading(false);
    deleteSupplyKindModal.closeModal();
  }

  const cols = [
    {
      title: '編號',
      dataIndex: 'kindNumber',
      key: 'kindNumber',
      align: 'center'
    },
    {
      title: '名稱',
      dataIndex: 'kindName',
      key: 'kindName',
      align: 'center'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (i) => 
        <MinusOutlined 
          style={{
            color: 'red'
          }}
          onClick={() => {
            setDeletedKind(i.kindNumber);
            deleteSupplyKindModal.openModal(i.kindName);
          }}
        />
    }
  ]

  return (
    <>
      <StyledTable
        rowKey={(data,i)=>`kindRow${i}`}
        loading={props.isLoading}
        columns={cols}
        dataSource={props.data}
      />
      <DeleteSupplyKindModal
        visible={deleteSupplyKindModal.visible}
        onOk={deleteKind}
        onCancel={deleteSupplyKindModal.closeModal}
        confirmLoading={deleteSupplyKindModal.confirmLoading}
        kindName={deleteSupplyKindModal.modalData}
      />
    </>
  )
}

export default SupplyKindTable