import PageList from "./PageList";
import StyledDrawer from "./StyledDrawer";

const PageDrawer = (props) => {
  return (
    <StyledDrawer
      placement='left'
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
      width={window.innerWidth < 768 ? '70%' : '20%'}
    >
      <PageList />
    </StyledDrawer>
  )
}

export default PageDrawer