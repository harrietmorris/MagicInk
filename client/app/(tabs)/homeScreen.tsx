import { View, Text, Button, StyleSheet, Dimensions, ViewStyle } from 'react-native'
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width; 
const homeScreen = () => {

  //temporary endpoint:
  const endpoint = 'http://localhost:3000/'


  const [stories, setStories] = useState([]); // State to store fetched data
  const [error, setError] = useState('')
  const thing = ['1', '2', '3', ' 4', '5']

  useEffect(() => {
    const renderStories = async () => {
      try {
        const response = await axios.get(`${endpoint}/profiles/:profileId/storiesList`);
        if (response.status === 200) {
          setStories(response.data);
        }
      } catch (error) {
        setError('Network error or other exception');
      }
    };

    renderStories(); 
  }, [stories]);


  return (
    <View style={styles.container}>
      <Text>homeScreen</Text>
      <Link href="/keepReadingScreen">Keep Reading</Link>
      {thing.map((element) => (
        <Button  
         title={element}
                 />
      ))}
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
  button: {
    height: (screenWidth - 20) / 2, // Match width for square shape
    backgroundColor: '#4CAF50', // Example color
    padding: 10,
    borderRadius: 0, // Remove rounded corners for square shape
  },
});


export default homeScreen;