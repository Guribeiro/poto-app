import { Platform, Image } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { ENDPOINT_URL } from '@env';
import { RootAppParamsList } from '@modules/app/routes';

import { ApplicationState } from '@shared/store';
import { useLocation } from '@shared/hooks/location';
import { FeedState } from '@shared/store/ducks/feed/types';
import * as FeedActions from '@shared/store/ducks/feed/actions';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';


import CustomMapCallout from './CustomMapCallout';
import CustomMapMarker from './CustomMapMarker';

import { MapViewContainer } from './styles';

interface StateProps {
  feed: FeedState;
}

type ExploreProps = StateProps;

type ExploreScreenProps = BottomTabNavigationProp<RootAppParamsList, 'Explore'>

const Explore = ({ feed }: ExploreProps): JSX.Element => {

  const { data: posts, loading } = feed;
  const { location } = useLocation();

  const { navigate } = useNavigation<ExploreScreenProps>()

  if (loading) {
    return <FullScreenLoading />
  }

  return (
    <MapViewContainer
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      mapType={Platform.OS == "android" ? "none" : "standard"}
      initialRegion={{
        latitude: location?.latitude!,
        longitude: location?.longitude!,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {posts.map(post => {
        const postUri = post.photo ?
          `${ENDPOINT_URL}/files/posts/${post.photo}` :
          `https://ui-avatars.com/api/?name=${post.user.full_name}&length=1`;

        return (
          <CustomMapMarker
            key={post.id}
            coordinate={{
              latitude: post.latitude,
              longitude: post.longitude,
            }}
          >
            <CustomMapCallout
              tooltip
              title={post.user.username}
              onPress={() => navigate('FeedRoutes', { screen: 'PostDetails', params: { post_id: post.id } })}
            >
              <Image resizeMode='contain' source={{ uri: postUri }} style={{ width: '100%', height: 80, borderRadius: 4 }} />
            </CustomMapCallout>

          </CustomMapMarker>
        )
      })
      }
    </MapViewContainer >
  )
}

const mapStateToProps = ({ feed }: ApplicationState) => ({
  feed,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ ...FeedActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
