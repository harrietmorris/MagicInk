import { View, Text, Button, StyleSheet, Dimensions, Pressable } from 'react-native'
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { StoryType } from '@/Types';

const screenWidth = Dimensions.get('window').width;
const homeScreen = () => {

  //temporary endpoint:
  const endpoint = 'http://localhost:3000/'
  const squareSize = screenWidth / 2.5;
  const router = useRouter()
const profileId = "Here will go the profile id from the context"
  const [error, setError] = useState('')
  const thing = ['1', '2', '3', ' 4', '5', '6']

  const [stories, setStories] = useState<StoryType[]>([]); // actual state

  useEffect(() => {
    const renderStories = async () => {
      try {
        const response = await axios.get(`${endpoint}/profiles/${profileId}/storiesList`);
        if (response.status === 200) {
          setStories(response.data);
        }
      } catch (error) {
        setError('Network error or other exception');
      }
    };

    renderStories();
  }, [stories]);

  //should take an argument 'storyId"
  function handlePress() {
    router.push("/keepReadingScreen")
    //should also update context used for keep reading page
  }

// Real component:
//   <View>
// <Text>homeScreen</Text>
// <View style={styles.container}>
//   {stories.map((element) => (
//     <Pressable key={element.id} onPress={() => handlePress(element.id)} style={[styles.square, { width: squareSize, height: squareSize }]}>
//       <Text style={styles.text}>{element.title}</Text>
//     </Pressable>

//   ))}
// </View>

// </View>


  return (
    <View>
      <Text>homeScreen</Text>
      <View style={styles.container}>
        {thing.map((element) => (

          <Pressable onPress={() => handlePress()} style={[styles.square, { width: squareSize, height: squareSize }]}>
            <Text style={styles.text}>{element}</Text>
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