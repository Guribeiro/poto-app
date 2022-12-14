import { View } from 'react-native';
import { Callout, MapCalloutProps } from 'react-native-maps';
import styled from 'styled-components/native';

import { Text } from '@shared/common/components/Text';
import Spacer from '@shared/common/components/Spacer';

const Container = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(.4)}px;
  background: ${({ theme }) => theme.palette.colors.primary};
  width: ${({ theme }) => theme.screen.rem(8)}px;

  border-radius: ${({ theme }) => theme.screen.rem(.3)}px;

  align-items: center;
  justify-content: center;
`;

const DescriptionContainer = styled(View)`
`;

const Description = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(.8, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  color: ${({ theme }) => theme.palette.colors.texts.light};
`;

type CustomMapCalloutMapCalloutProps = MapCalloutProps & {
  title?: string;
  description?: string;
}

const CustomMapCallout = ({ title, description, children, ...rest }: CustomMapCalloutMapCalloutProps): JSX.Element => {
  return (
    <Callout {...rest}>
      <Container>
        {children}
        {description && (
          <DescriptionContainer>
            <Spacer size={8} />
            <Description>{description}</Description>
          </DescriptionContainer>
        )}
      </Container>
    </Callout>
  )
}

export default CustomMapCallout;
