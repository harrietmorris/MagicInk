import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getAllStoriesByProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';
import FavButton from '@/components/buttons/favButton';



const homeScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 2.5;
  const router = useRouter()

  const { allStories, setAllStories, setSelectedStory, selectedProfile ,selectedStory} = useDataContext();


  useEffect(() => {
    async function renderStoriesbyProfile() {
      if (selectedProfile) {
        const storiesByProfile = await getAllStoriesByProfile(selectedProfile.id);
        setAllStories(storiesByProfile)
      }
    };

    renderStoriesbyProfile();
  }, [selectedStory,selectedProfile]);

  function handlePress(story: StoryType) {
    setSelectedStory(story)
    router.push("/keepReadingScreen")
  }

  return (
    <View>
      <Text>homeScreen</Text>
      <View style={styles.container}>
        {allStories.map((element) => (
          <Pressable key={element.id} onPress={() => handlePress(element)} style={[styles.square, { width: squareSize, height: squareSize }]}>
            <Text style={styles.text}>{element.title}</Text>
            <FavButton storyId={element.id} />
          </Pressable>
        ))}
      </View>
    </View>
  )
}



//AI generated styling just for testing
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Arrange buttons horizontally
    flexWrap: 'wrap', // Wrap buttons to multiple lines if needed
    justifyContent: 'space-around', // Distribute buttons evenly
    alignItems: 'center',
  },
  square: {
    backgroundColor: '#add8e6', // Change background color as desired
    borderRadius: 5,
    margin: 10, // Adjust margin for spacing
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  text: {
    fontSize: 16, // Adjust font size as desired
    color: '#000', // Text color
  },
});


export default homeScreen;