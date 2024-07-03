import { Text, ScrollView, SafeAreaView, View, Pressable } from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import { useDataContext } from '@/context/globalContext';
import { router } from 'expo-router';
import FavButton from './buttons/favButton';
import OrangeButton from './style/OrangeButton';
import DeleteStoryBtn from './buttons/DeleteStoryBtn';
import { updateStory } from '@/services/apiService';
import * as Speech from 'expo-speech';

const voice = 'en-gb-x-gbg-local';

const splitTextIntoChunks = (text: string, chunkSize: number) => {
  const regex = new RegExp(`(.{1,${chunkSize}})(\\s|$)`, 'g');
  return text.match(regex) || [];
};

const StoryDetails = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const { selectedStory, selectedProfile, setSelectedStory } = useDataContext();
  let lastOptions: string[] | RegExpMatchArray = [];

  if (!selectedStory) {
    router.replace('/newStoryScreen');
    return null;
  }

  let storyText = selectedStory?.storyString || '';
  if (storyText && selectedStory) {
    storyText = storyText.replaceAll('*', '');
    // Prepare interactive story options
    if (selectedStory.chooseYourStory) {
      const options = storyText.match(/(\d:.+)/g) || [];
      if (options.length > 0) {
        lastOptions = options.slice(-3);
        } else {
          lastOptions = [];
        }
        options.forEach(option => {
          storyText = storyText.replace(option, '');
        });
    }
  }
  // Split text into chunks for speech
  const charLimit = Speech.maxSpeechInputLength;
  const chunks = splitTextIntoChunks(storyText, charLimit);

  const handleSpeechEnd = useCallback(() => {
    if (currentChunk < chunks.length - 1 && isSpeaking) {
      setCurrentChunk(prev => prev + 1);
    } else {
      setIsSpeaking(false);
    }
  }, [currentChunk, isSpeaking]);

  useEffect(() => {
    if (isSpeaking && chunks.length > 0) {
      Speech.speak(chunks[currentChunk], {
        onDone: handleSpeechEnd,
        voice
      });
    }
  }, [isSpeaking, currentChunk, handleSpeechEnd]);

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      if (currentChunk === 0 && selectedStory) Speech.speak(selectedStory?.title, { voice })
      setIsSpeaking(true);
    }
  };



  const handleContinueStory = async (option: string) => {
    if (!selectedProfile || !selectedStory) {
      return;
    }
    router.replace('/loadingScreen');
    const optionNumber = option.split(':')[0];
    const response = await updateStory(selectedProfile.id, selectedStory.id, optionNumber);
    const storyDetails = response!.storyDetails;
    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');
  };

  return (
    <SafeAreaView className='mx-8 mt-20 flex-1'>
      {selectedStory ? (
        <>
          <View className='flex flex-row justify-between mb-5 items-center'>
            <DeleteStoryBtn storyId={selectedStory.id} />
            <Pressable onPress={toggleSpeech}>
              <Text className='text-2xl'>
                {isSpeaking ? '🔇': '🔊' }
              </Text>
            </Pressable>
            <FavButton storyId={selectedStory.id} />
          </View>
          <Text className='text-3xl mb-5 text-green font-black tracking-tighter'>{selectedStory.title}</Text>
          <ScrollView>
            <Text className='text-black dark:text-white text-base'>{storyText}</Text>
          { selectedStory.chooseYourStory
          && selectedStory.currentBreakpoint < selectedStory.breakpoints
          && lastOptions.map((option, index) => (
            <View className='p-1' key={index}>
              <OrangeButton title={option} onPress={() => {handleContinueStory(option);}} />
            </View>
          ))}
          </ScrollView>
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <OrangeButton
            onPress={() => {
              router.replace('/newStoryScreen');
            }}
            title='Create a new story!'
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default StoryDetails;
