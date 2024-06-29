import { View, Text } from 'react-native'
import FaveStories from '@/components/Home/FaveStories' 
import AllStories from '@/components/Home/AllStories'

const homeScreen = () => {


  return (
    <View className='flex-1 bg-dark-grey'>
      <View className='flex flex-col' >
        <Text className='text-green text-3xl font-bold mb-4 mt-3 text-center'>All Stories</Text>
        <AllStories />
        <Text className='text-green text-3xl font-bold mt-3 mb-4 text-center'>Favorite Stories</Text>
        <FaveStories />
      </View>
    </View>
  )
}

export default homeScreen;