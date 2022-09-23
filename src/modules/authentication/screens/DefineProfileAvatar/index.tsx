import { useForm } from 'react-hook-form';
import { Alert, Platform } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '../../../../shared/common/components/Container';
import InputText from '../../components/Input';
import Spacer from '../../../../shared/common/components/Spacer';
import TouchableAvatar from '@shared/common/components/TouchableAvatar';
import Button from '@shared/common/components/Button';

import { RootSignupParamsList, DefineProfileAvatarParams } from '../../routes/signup.routes';

import {
  Header,
  Icon,
  Content,
  Title,
  TextContainer,
  SubTitle,
  Form,
  NextButtonContainer
} from './styles';
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
  MediaTypeOptions
} from 'expo-image-picker';

import FullScreenLoading from '@shared/common/components/FullScreenLoading';


interface FormData {
  fullName: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('required field')
})

type DefineProfileAvatarScreenProps = NativeStackNavigationProp<RootSignupParamsList, 'DefineProfileAvatar'>

const DefineProfileAvatar = (): JSX.Element => {
  const [avatar, setAvatar] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { navigate, goBack } = useNavigation<DefineProfileAvatarScreenProps>();
  const { params } = useRoute();

  const { fullName, email, username } = params as DefineProfileAvatarParams;

  const requestMediaLibraryPermissions = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error(
          'Desculpe, não temos permissão de acesso às suas fotos',
        );
      }
    }
  }, []);

  const launchMediaLibrary = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      await requestMediaLibraryPermissions();
      const imagePickerResult = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (imagePickerResult.cancelled) return;


      setAvatar(imagePickerResult.uri);

    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false);
    }
  }, [requestMediaLibraryPermissions]);

  const onSubmit = useCallback(() => {
    if (!avatar) {
      Alert.alert('Selecione sua foto de perfil')
      return
    }

    navigate('DefinePassword', {
      fullName,
      email,
      username,
      avatar
    })

  }, [navigate, fullName, email, avatar])

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <Icon name='x' />
        </TouchableOpacity>
      </Header>
      <Content>
        <Title>Selecione uma foto {'\n'}para o seu perfil</Title>
        <TextContainer>
          <TouchableAvatar
            onPress={launchMediaLibrary}
            source={{ uri: avatar || `https://ui-avatars.com/api/?name=${fullName}&length=1` }}
            icon='plus'
          />
        </TextContainer>

        {avatar && (
          <NextButtonContainer>
            <Button onPress={onSubmit}>
              Prosseguir
            </Button>
          </NextButtonContainer>
        )}

      </Content>
      {loading && <FullScreenLoading />}
      <Spacer size={32} />
    </Container>
  )
}

export default DefineProfileAvatar;
