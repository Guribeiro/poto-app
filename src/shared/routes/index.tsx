import { NavigationContainer } from '@react-navigation/native';

import AuthenticationRoutes from '../../modules/authentication/routes';


const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AuthenticationRoutes />
    </NavigationContainer>
  )
}

export default Routes;