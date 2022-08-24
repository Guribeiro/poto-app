import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

interface ScrollProps extends ScrollViewProps {
  children: ReactNode;
}

const Scroll = ({ children, ...rest }: ScrollProps): JSX.Element => (
  <ScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    {...rest}
  >
    {children}
  </ScrollView>
);

export default Scroll;
