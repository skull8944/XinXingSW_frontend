import SupplyKindTable from '../../components/DataTable/SupplyKindTable';
import useModal from '../../hooks/useModal';
import AddSupplyKindModal from '../../components/Modal/AddSupplyKindModal';
import AddButton from '../../components/Button/AddButton';
import { Container } from '../../components/Container/Container';
import { useEffect, useState } from 'react';

const SupplyKind = () => {

  const [supplyKinds, setSupplyKinds] = useState([]);
  const addSupplyKindModal = useModal();
  
  const getSupplyKinds = async () => {
    const res = await fetch('/kind');
    const data = await res.json();
    if (res.ok) {
      setSupplyKinds(data);
    } else {
      alert (data.message);
    }    
  }

  const deleteKindFromArr = (deletedKind) => {
    setSupplyKinds(supplyKinds.filter((i) => i.kindNumber !== deletedKind))
  }

  useEffect(() => {
    getSupplyKinds()
  },[])
  

  return (
    <Container
      width='100%'
      margin='0'
      padding='15px'
    >

      <Container textAlign='center'>
        <p>物資種類</p>
      </Container>

      <Container textAlign='end' mt='0'>
        <AddButton onClick={addSupplyKindModal.openModal} />
      </Container>

      <Container margin='20px 0 0 0'>
        <SupplyKindTable 
          data={supplyKinds}
          deleteKind={deleteKindFromArr}
        />
      </Container>

      <AddSupplyKindModal 
        visible={addSupplyKindModal.visible}
        confirmLoading={addSupplyKindModal.confirmLoading}
        onOk={(e) => {
          setSupplyKinds(supplyKinds.concat(e));
          addSupplyKindModal.closeModal();
        }}
        onCancel={addSupplyKindModal.closeModal}
      />
      
    </Container>
  )
}

export default SupplyKind;