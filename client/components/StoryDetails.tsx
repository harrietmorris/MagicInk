import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const StoryDetails = () => {
  //TODO: import selectedStory from context
  const [selectedStory, setSelectedStory] = useState({})

  const id = "1";
  useEffect(() => {
    // getStoryById(id).then((result: any) => {
    //   console.log('🚀 ~ useEffect ~ data:', result.data);
    // })
  }, [])

  return (
    <View>
      <Text>Story Title Here</Text>
      {/* <Text>{ }</Text> */}
    </View>
  );
}

export default StoryDetails;
