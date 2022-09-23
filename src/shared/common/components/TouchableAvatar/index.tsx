import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

import { lighten } from 'polished';
import { Feather } from '@expo/vector-icons'

export const UserAvatarPlusIconContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 10px;
  background: #3498db;
  border-radius: ${({ theme }) => theme.screen.rem(1)}px;
  padding: ${({ theme }) => theme.screen.rem(.4)}px;

`;

export const UserAvatarPlusIcon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
`;

export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(7)}px;
  height: ${({ theme }) => theme.screen.rem(7)}px;
  border-radius: ${({ theme }) => theme.screen.rem(4.5)}px;

  border: 2px solid ${({ theme }) => lighten(.4, theme.palette.colors.secondary)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const UpdateProfileButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.screen.rem(.8)}px;
  border-radius: 5px;
  background: ${({ theme }) => lighten(.1, theme.palette.colors.primary)};
`



interface TouchableAvatarProps {
  onPress(): void;
  source: ImageSourcePropType;
  icon: keyof typeof Feather.glyphMap;
}
const TouchableAvatar = ({ onPress, source, icon }: TouchableAvatarProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <UserAvatar source={source} />
      <UserAvatarPlusIconContainer>
        <UserAvatarPlusIcon name={icon} />
      </UserAvatarPlusIconContainer>
    </TouchableOpacity>
  )
}
export default TouchableAvatar;
