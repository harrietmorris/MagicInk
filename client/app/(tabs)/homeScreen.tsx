import { View, Text, Button, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { StoryType } from '@/types';

const screenWidth = Dimensions.get('window').width;
const homeScreen = () => {

  //temporary endpoint:
  const endpoint = 'http://localhost:3000/'
  const squareSize = screenWidth / 2.5;
  const router = useRouter()
  const profileId = "Here will go the profile id from the context"
  const [error, setError] = useState('')

  const mock: StoryType[] = [
    {
      id: 1,
      title: "The Enchanted Forest",
      storyString: "Once upon a time in a forest filled with magical creatures...",
      prompt: "Write a story about a forest where everything is enchanted.",
      model: "GPT-4",
      readingTime: 15,
      themes: ["Fantasy", "Adventure", "Magic"]
    },
    {
      id: 2,
      title: "The Lost Treasure",
      storyString: "In a small village by the sea, there was a legend of a lost treasure...",
      prompt: "Create a tale about a treasure hunt that takes place by the sea.",
      model: "GPT-3.5",
      readingTime: 20,
      themes: ["Adventure", "Mystery", "Historical"]
    },
    {
      id: 3,
      title: "A Day in Space",
      storyString: "Astronauts aboard the ISS encounter a strange phenomenon...",
      prompt: "Describe a day in the life of astronauts in space with an unexpected event.",
      model: "GPT-4",
      readingTime: 10,
      themes: ["Science Fiction", "Space", "Exploration"]
    },
    {
      id: 4,
      title: "The Robot's Journey",
      storyString: "In a future world, a robot sets out on a journey to find its creator...",
      prompt: "Narrate a story about a robot seeking its origins in a futuristic world.",
      model: "GPT-4",
      readingTime: 18,
      themes: ["Science Fiction", "Journey", "Technology"]
    },
    {
      id: 5,
      title: "The Hidden Village",
      storyString: "Deep in the mountains, there exists a village hidden from the world...",
      prompt: "Tell a story about a hidden village that no one knows about.",
      model: "GPT-3.5",
      readingTime: 12,
      themes: ["Mystery", "Fantasy", "Discovery"]
    },
    {
      id: 6,
      title: "The Time Traveler",
      storyString: "A scientist discovers the secret to time travel and ventures into the past...",
      prompt: "Write a story about a scientist who travels back in time and the challenges they face.",
      readingTime: 22,
      themes: ["Science Fiction", "Time Travel", "Adventure"]
    }
  ];
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
  function handlePress(storyId:number) {
    router.push("/keepReadingScreen")
    //should also update context used for keep reading page
  }


 

  return (
    <View>
      <Text>homeScreen</Text>
      <View style={styles.container}>
        {mock.map((element) => (
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