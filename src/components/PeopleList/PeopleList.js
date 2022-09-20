import StyledList from './StyledList';
import useModal from '../../hooks/useModal';
import AddPeopleModal from '../Modal/AddPeopleModal';
import DeletePeopleModal from '../Modal/DeletePeopleModal';
import { PlusCircleOutlined, MinusCircleFilled, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Container } from '../Container/Container';
import { message, Spin } from 'antd';

const PeopleList = () => {

  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deletedPeopleId, setDeletedPeopleId] = useState();
  
  const addPeopleModal = useModal();
  const deletePeopleModal = useModal();

  const deletePeople = async () => {
    setConfirmLoading(true)
    const result = await fetch(`/people/${deletedPeopleId}`, 
      {method: 'delete'}
    );
    const data = await result.json();
    if (result.ok) {
      message.success('成功刪除人員');
      setPeople(people.filter((e) => e.pid !== deletedPeopleId));
    } else {
      message.error(data.message);
    }
    setConfirmLoading(false);
    deletePeopleModal.closeModal();
    setDeletedPeopleId(null);
  }
    
  const getPeople = async () => {
    try {
      const result = await fetch('/people');
      const data = await result.json();
      setPeople(data);
    } catch (e) {
      console.log(e.message);
      message.error(e.message)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPeople().catch((e) => {
      alert(e.message);
      setIsLoading(false);
    })
  }, [])

  return (
    <Spin spinning={isLoading}>      
      <StyledList>
        {
          people.length === 0
          ? <p>還沒有人員</p>
          : people.map((people, i) => 
            <StyledList.Item
              key={`key${i}`}
              extra={
                <MinusCircleFilled
                  key={`minus${i}`}
                  className='deletePeople' 
                  style={{color: 'red'}}
                  onClick={(e) => {
                    setDeletedPeopleId(people.pid)
                    deletePeopleModal.openModal(people.name);
                  }}
                />
              }
            >
              <StyledList.Item.Meta 
                avatar={<UserOutlined />}
                title={people.name}
                key={`p${i}`}
              />
            </StyledList.Item>          
          )
        }
        <Container width='100%' textAlign='center'>
          <PlusCircleOutlined
            id='plusPeople'
            key='plusPeople'
            style={{ 
              fontSize: window.innerWidth < 768 ? '6vmin' : '3.5vmin',
              marginTop: 35,
              color: '#636363'
            }}
            onClick={() => {addPeopleModal.openModal()}}
          />
        </Container>
      </StyledList>
      <AddPeopleModal
        visible={addPeopleModal.visible}
        confirmLoading={confirmLoading}
        onOk={getPeople}
        onCancel={addPeopleModal.closeModal}
      />
      <DeletePeopleModal
        visible={deletePeopleModal.visible}
        name={deletePeopleModal.modalData}
        confirmLoading={confirmLoading}
        onOk={async () => {
          setConfirmLoading(true);
          await deletePeople();
          setConfirmLoading(false)
        }}
        onCancel={deletePeopleModal.closeModal}
      />
    </Spin>
  )
}

export default PeopleList;