import Feather from '@expo/vector-icons/Feather'
import styled, { css } from 'styled-components/native'
import { Size } from '@shared/types/types'

interface Props {
  name?: keyof typeof Feather.glyphMap
}

interface StylesProps {
  active?: boolean
  color?: string
  size?: Size
}

type IconProps = StylesProps & Props

export const StyledIcon = styled(Feather)<StylesProps>`
  color: ${({ theme }) => theme.palette.colors.texts.light};
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;

  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.palette.colors.red};
    `}

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ size, theme }) =>
    size &&
    css`
      font-size: ${theme.screen.rem(size, true)}px;
    `}
`

const Icon = ({
  name,
  color,
  active = false,
  size = 1.6,
}: IconProps): JSX.Element => {
  return <StyledIcon name={name} active={active} color={color} size={size} />
}

export default Icon
