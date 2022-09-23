import { useTheme } from '@shared/hooks/theme';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Title, SelectColorButton, Color } from './styles';

import { colors } from '@shared/utils/themes/colors';

interface SettingsModalProps {
  onRequestClose(): void;
}

const ChangeThemeModal = ({ onRequestClose }: SettingsModalProps): JSX.Element => {

  const { theme, changeMainColor } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <Container>
        <Content>
          <Title>Alterar cor principal</Title>
          <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
            {colors.map((color) => (
              <SelectColorButton key={color} onPress={() => changeMainColor({ color })}>
                <Color color={color} selected={theme.palette.colors.secondary === color} />
              </SelectColorButton>
            ))}
          </ScrollView>
        </Content>
      </Container>
    </TouchableWithoutFeedback>

  )
}

export default ChangeThemeModal;
