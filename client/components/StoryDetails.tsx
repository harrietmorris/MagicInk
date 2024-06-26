import { Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { Link } from 'expo-router';
import { getLastReadLocation, saveLastReadLocation } from '@/storage';

const StoryDetails = () => {
  const [lastReadLocation, setLastReadLocation] = useState(0);
  const { selectedProfile, selectedStory } = useDataContext();
  const scrollViewRef = useRef(null);

  //TODO: review whether to save selected story to database - when app closes/refreshes, user loses KeepReading story
  useEffect(() => {
    if (!selectedStory || !selectedProfile) return;
    const location = getLastReadLocation(selectedProfile.id, selectedStory.id);
    setLastReadLocation(location || 0);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: location, animated: false });
    }
  }, [selectedStory]);

  function handleRead(location: number) {
    if (!selectedStory || !selectedProfile) return;
    saveLastReadLocation(selectedProfile.id, selectedStory.id, location);
    setLastReadLocation(location);
  }

  return (
    <SafeAreaView style={styles.container}>
      {selectedStory ? (
        <>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            onScroll={(event) => handleRead(event.nativeEvent.contentOffset.y)}
            scrollEventThrottle={16}
          >
            <Text style={styles.title}>{selectedStory.title}</Text>
            <Text style={styles.text}>{selectedStory.storyString}</Text>
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
