import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

const config = {
  success: (props: ToastProps) => {
    return (
      <BaseToast
        {...props}
        style={{ backgroundColor: '#151417', borderLeftColor: '#27ae60' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: '#fff'
        }}
      />
    )
  },
  error: (props: ToastProps) => {
    return (
      <BaseToast
        {...props}
        style={{ backgroundColor: '#151417', borderLeftColor: '#e74c3c' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: '#fff'
        }}
      />
    )
  },
};


export { config }
