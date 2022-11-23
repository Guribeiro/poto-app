import { View } from 'react-native';
import { Text } from "@shared/common/components/Text"

import { useRoute } from '@react-navigation/native';

const Post = (): JSX.Element => {

  const { params } = useRoute();

  console.log(params);
  return (
    <View>
      <Text>Post screen</Text>
    </View>
  )
}

export default Post;
