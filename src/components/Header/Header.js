import { Container } from '../Container/Container';
import { MenuOutlined, TeamOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PeopleListDrawer from '../PeopleList/PeopleListDrawer';
import PageDrawer from '../PageDrawer/PageDrawer';

const Header = () => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };

    const onClose = () => {
      setVisible(false);
    };

    const [pageVisible, setPageVisible] = useState(false);

    const showPageDrawer = () => {
      setPageVisible(true);
    };

    const onPageClose = () => {
      setPageVisible(false);
    };

  return (
    <Container
      width='100%'
      jc='space-between'
      display='flex'
      bgcolor='white'
      padding='20px'
      shadow='0px -1px 14px grey'
    >
      <MenuOutlined 
        style={{ fontSize: '5vmin', color: '#a9a9a9' }} 
        onClick={showPageDrawer}
      />
      <TeamOutlined 
        style={{ fontSize: '5vmin', color: '#a9a9a9' }} 
        onClick={showDrawer}
      />
      <PageDrawer visible={pageVisible} onClose={onPageClose} />
      <PeopleListDrawer visible={visible} onClose={onClose} />
    </Container>
  )
}

export default Header;