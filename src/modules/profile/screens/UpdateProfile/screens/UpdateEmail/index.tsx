import { View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Button from '@shared/common/components/Button';
import ScreenHeader from '@shared/common/components/ScreenHeader';
import KeyboardView from '@shared/common/components/KeyboardView';

import InputText from '@modules/authentication/components/InputText';
import { RootEditProfileRouteParams } from '@modules/profile/screens/UpdateProfile/routes'

import { ApplicationState } from '@shared/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';
import { AuthenticationState, UpdateEmailRequestPayload } from '@shared/store/ducks/authentication/types';
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
  email: string;
}

type UpdateEmailScreenProps = NativeStackNavigationProp<RootEditProfileRouteParams, 'UpdateName'>

interface StateProps {
  authentication: AuthenticationState;
}

interface DispatchProps {
  updateEmailRequest(data: UpdateEmailRequestPayload): void;
}

type UpdateEmailProps = StateProps & DispatchProps;

const UpdateEmail = ({ updateEmailRequest, authentication }: UpdateEmailProps): JSX.Element => {
  const { goBack } = useNavigation<UpdateEmailScreenProps>();

  const { loading, data } = authentication;

  const { user } = data;

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: user.email
    }
  });

  const onSubmit = useCallback(({ email }: FormData) => {
    updateEmailRequest({
      email
    });
    goBack();
  }, [updateEmailRequest])

  return (
    <KeyboardView>
      <Container>
        <ScreenHeader title='Atualizar email' onPress={goBack} />
        <Content>
          <View>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputText
                  label='email'
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
  (UpdateEmail);


