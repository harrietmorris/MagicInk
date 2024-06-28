import { View , Text} from 'react-native'
import HomeStories from '@/components/HomeStories';
import FaveStories from '@/components/FaveStories';

const homeScreen = () => {


  return (
    <View className ='flex-1 bg-blackish'>
    <View className='flex flex-col justify-center' >
      <Text className='text-green text-3xl font-bold mb-4 mt-2 text-center'>All Stories</Text>
      <HomeStories />
      <Text className='text-green text-3xl font-bold mt-2 mb-4 text-center'>Favorite Stories</Text>
      <FaveStories/>
    </View>
    </View>
  )
}



export default homeScreen;