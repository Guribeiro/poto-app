import { Platform, KeyboardAvoidingView } from 'react-native';
import { ReactNode } from 'react';

type KeyboardViewProps = {
  children: ReactNode;
};

const KeyboardView = ({ children }: KeyboardViewProps): JSX.Element => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
