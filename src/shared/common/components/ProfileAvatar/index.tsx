import { Image, ImageProps } from 'react-native';
import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Avatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(7)}px;
  height: ${({ theme }) => theme.screen.rem(7)}px;
  border-radius: ${({ theme }) => theme.screen.rem(4.5)}px;

  border: 2px solid ${({ theme }) => lighten(.4, theme.palette.colors.secondary)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

type ProfileAvatarProps = ImageProps;

const ProfileAvatar = ({ ...props }: ProfileAvatarProps): JSX.Element => {
  return (
    <Avatar {...props} />
  )
}

export default ProfileAvatar;
