import StyledButton from './StyledButton';
import { PlusOutlined } from '@ant-design/icons';

const AddButton = (props) => {
  return (
    <StyledButton
      type='primary'
      icon={<PlusOutlined />}
      margin='0 0 14px 0'
      onClick={() => props.onClick()}
    />
  )
}

export default AddButton