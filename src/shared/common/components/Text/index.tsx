import styled from 'styled-components/native';

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  color: ${({ theme }) => theme.palette.colors.texts.light};
`;
