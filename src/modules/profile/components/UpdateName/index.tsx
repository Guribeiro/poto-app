import Touchable from '@shared/common/components/Touchable';

import EditProfileButton from '@modules/settings/components/EditProfileButton';

import {
  Icon,
  Header,
  Container,
  UsernameText,
  TouchableContainer,
  HeaderContent,
  Content,
  EditProfileButtonsContainer,
  EditProfileButtonContainer
} from './styles';


export interface UpdateNameProps {
  onRequestClose(): void;
  label: string;
  field: string;
}

const UpdateName = ({ onRequestClose, field, label }: UpdateNameProps): JSX.Element => {
  return (
    <Container>
    <Header>
      <HeaderContent>
        <TouchableContainer>
          <Touchable onPress={onRequestClose}>
            <Icon name='x' />
          </Touchable>
        </TouchableContainer>
        <UsernameText>Update {field}</UsernameText>
      </HeaderContent>
    </Header>
    <Content>
      <EditProfileButtonsContainer>
        <EditProfileButtonContainer>
          <EditProfileButton
            label={label}
            type='common'
            onPress={() => { }}
          >
            {'user.full_name'}
          </EditProfileButton>
        </EditProfileButtonContainer>
      </EditProfileButtonsContainer>
    </Content>
  </Container >
  )
}


export default UpdateName;
