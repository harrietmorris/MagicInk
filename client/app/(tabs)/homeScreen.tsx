import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getAllProfiles, getSelectedProfile, getUser, getAllStoriesByProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import axios from 'axios';
import { StoryType } from '@/types';



const homeScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 2.5;
  const router = useRouter()
  const [stories, setStories] = useState<StoryType[]>([]); // actual state

  const { setUser, setSelectedProfile, setProfiles, selectedProfile } = useDataContext();
  // TODO: remove this one authentication is implemented
  useEffect(() => {
    async function setup() {
      const user = await getUser(1);
      setUser(user);
      const profiles = await getAllProfiles(user.id);
      setProfiles(profiles);
      setSelectedProfile(profiles[0]);
    }
    setup();
  }, [])

  useEffect(() => {
    async function renderStoriesbyProfile() {
      const storiesByProfile = await getAllStoriesByProfile(1);
      setStories(storiesByProfile)
    };

    renderStoriesbyProfile();
  }, [stories]);

  //might be innefficient to unmount and remount component everytime a story is added.

  //should take an argument 'storyId"
  function handlePress(storyId: number) {
    router.push("/keepReadingScreen")
    //should also update context used for keep reading page
  }

  return (
    <View>
      <Text>homeScreen</Text>
      <View style={styles.container}>
        {stories.map((element) => (
          <Pressable key={element.id} onPress={() => handlePress(element.id)} style={[styles.square, { width: squareSize, height: squareSize }]}>
            <Text style={styles.text}>{element.title}</Text>
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