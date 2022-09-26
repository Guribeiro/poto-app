import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Container, Touchable, Icon, UserAvatar } from './styles';
import { ApplicationState } from '@shared/store';
import { AuthenticationState } from '@shared/store/ducks/authentication/types';


type TabBarStyle = {
  display: 'none' | 'flex';
};

type RoutesNameVariations = {
  [key: string]: {
    name: string;
    icon: string;
  };
};

const routesNameVariations: RoutesNameVariations = {
  FeedRoutes: {
    name: 'Feed',
    icon: 'home',
  },
  ProfileRoutes: {
    name: 'Perfil',
    icon: 'user',
  },
  PostForm: {
    name: 'Post',
    icon: 'user',
  },
};

interface StateProps {
  authentication: AuthenticationState;
}

type TabBarProps = BottomTabBarProps & StateProps;


const TabBar = ({
  navigation,
  descriptors,
  state,
  authentication
}: TabBarProps): JSX.Element => {
  const { data } = authentication;
  const { user } = data;

  const uri = user.avatar ?
    `http://10.0.0.175:3333/files/avatars/${user.avatar}` :
    `https://ui-avatars.com/api/?name=${user.full_name}&length=1`;

  const routes = Object.keys(descriptors).map(item => descriptors[item].route);

  const focusedOptions = descriptors[state.routes[state.index].key]
    .options as BottomTabNavigationOptions;

  return (
    <Container>
      {routes.map((route, index) => {
        const { icon, name } = routesNameVariations[route.name];

        return (
          <Touchable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            selected={index === state.index}
          >
            {name === 'Perfil' ? (
              <UserAvatar source={{ uri }} />
            ) : (
              <Icon name={icon} selected={index === state.index} />
            )}
          </Touchable>
        );
      })}
    </Container>
  );
};

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
})

export default connect(mapStateToProps)(TabBar)
