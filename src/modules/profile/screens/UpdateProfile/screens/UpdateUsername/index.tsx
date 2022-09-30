import { View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@shared/common/components/Button';
import ScreenHeader from '@shared/common/components/ScreenHeader';
import KeyboardView from '@shared/common/components/KeyboardView';

import InputText from '@modules/authentication/components/InputText';
import { RootEditProfileRouteParams } from '@modules/profile/screens/UpdateProfile/routes'

import { ApplicationState } from '@shared/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';
import { AuthenticationState, UpdateUsernameRequestPayload } from '@shared/store/ducks/authentication/types';
import { useCallback } from 'react';

const Container = styled(View)`
  flex: 1;
`;

const Content = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(.8)}px;

  flex: 1;
  justify-content: center;
`;

const ButtonContainer = styled(View)`
  margin-top: ${({ theme }) => theme.screen.rem(4)}px;
`;

interface FormData {
  username: string;
}

type UpdateNameScreenProps = NativeStackNavigationProp<RootEditProfileRouteParams, 'UpdateName'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  updateUsernameRequest(data: UpdateUsernameRequestPayload): void;
}

const schema = yup.object().shape({
  username: yup.string().min(8)
})

type UpdateNameProps = StateProps & DispatchProps;

const UpdateUsername = ({ updateUsernameRequest, authentication }: UpdateNameProps): JSX.Element => {
  const { goBack } = useNavigation<UpdateNameScreenProps>()

  const { loading, data } = authentication;

  const { user } = data;

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
    }
  });

  const onSubmit = useCallback(({ username }: FormData) => {
    updateUsernameRequest({
      username
    });

    goBack();
  }, [updateUsernameRequest])

  return (
    <KeyboardView>
      <Container>
        <ScreenHeader title='Atualizar username' onPress={goBack} />
        <Content>
          <View>
            <Controller
              name='username'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputText
                  label='username'
                  onChangeText={onChange}
                  value={value}
                  error={error && error.message}
                />
              )}
            />
            <ButtonContainer>
              <Button loading={loading} onPress={handleSubmit(onSubmit)}>Salvar</Button>
            </ButtonContainer>
          </View>
        </Content>
      </Container>
    </KeyboardView>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UpdateUsername);


