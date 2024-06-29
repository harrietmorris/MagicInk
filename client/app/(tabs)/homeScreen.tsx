import { View, Text } from 'react-native'
import FaveStories from '@/components/Home/FaveStories' 
import AllStories from '@/components/Home/AllStories'

const homeScreen = () => {


  return (
    <View className='flex-1 bg-dark-grey'>
      <View className='flex flex-col' >
        <AllStories />
        <FaveStories />
      </View>
    </View>
  )
}

export default homeScreen;