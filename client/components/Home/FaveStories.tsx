import { Text,View } from 'react-native'
import { useDataContext } from '@/context/globalContext';
import React from 'react'
import StoryList from '../Stories/StoryList';


const FaveStories = () => {

  const { selectedProfile } = useDataContext();


  return (
    (selectedProfile.favs && selectedProfile.favs.length > 0 ?
      <View>
        <Text className='text-green text-3xl font-bold mt-3 mb-4 text-center'>Favorite Stories</Text>
        <StoryList storyArray={selectedProfile.favs} buttonColor={'dark-orange'}></StoryList>
      </View> :
      <Text className='text-dark-orange text-3xl font-bold mt-3 mb-4 text-center'>No favorites yet</Text>)
  )
}




export default FaveStories