import { Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { Link } from 'expo-router';
import FavButton from './buttons/favButton';

const StoryDetails = () => {
  const { selectedStory } = useDataContext();

  //TODO: review whether to save selected story to database - when app closes/refreshes, user loses KeepReading story

  return (
    <SafeAreaView style={styles.container}>
      {selectedStory ? (
        <>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{selectedStory.title}</Text>
            <Text style={styles.text}>{selectedStory.storyString}</Text>
            <FavButton storyId={selectedStory.id} />
          </ScrollView>
        </>
      ) : (
        <Link href='/newStoryScreen'>Create A New Story</Link>
      )}
    </SafeAreaView>
  );
};

//TODO: fix scroll
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
  text: {
    fontSize: 16,
  },
});

export default StoryDetails;
