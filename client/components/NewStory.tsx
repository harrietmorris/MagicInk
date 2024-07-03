import { useEffect, useState } from 'react';
import { TextInput, Text, View, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';
import { createImage, createStory } from '@/services/apiService';
import { FormData } from '@/types';
import { router } from 'expo-router';
import { useDataContext } from '@/context/globalContext';
import { readingLevelOptions } from '@/constants/readingLevels';
import OrangeButton from './style/OrangeButton';
import SurpriseButton from './buttons/SurpriseButton';
import { locationOptions, readingTimeOptions } from '../constants/Surprise';
import { storeStoryImage } from '../services/apiStoryImage';

export default function NewStory() {
  const { setSelectedStory, selectedProfile } = useDataContext();
  const [isInteractiveEnabled, setIsInteractiveEnabled] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      readingLevel: selectedProfile?.readingLevel ? [selectedProfile.readingLevel] : ['Kindergarten'],
      location: ['anywhere'],
      readingTime: ['5 minutes'],
      themes: '',
    },
  });

  useEffect(() => {
    if (selectedProfile?.readingLevel) {
      setValue('readingLevel', [selectedProfile.readingLevel]);
    }
  }, [selectedProfile, setValue]);

  async function onSubmit(data: FormData) {
    router.replace('/loadingScreen');

    const profId = selectedProfile?.id ? selectedProfile.id : 1;

    const promiseStory = createStory(
      profId,
      readingLevelOptions[data.readingLevel[0]],
      data.location[0],
      readingTimeOptions[data.readingTime[0]],
      data.themes,
      isInteractiveEnabled,
      isInteractiveEnabled ? 3 : 0,
    );
    const promiseImage = createImage(readingLevelOptions[data.readingLevel[0]], data.location[0], data.themes);

    const [{ status, storyDetails }, image_url] = await Promise.all([promiseStory, promiseImage]);

    if (status === 204) {
      alert('Error creating story. please review your inputs and try again.');
      router.replace('/newStoryScreen');
      return;
    }

    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');

    const filename = `${storyDetails.id}.jpeg`;
    await storeStoryImage(image_url, filename);
  }

  return (
    <>
      <View className='items-center mt-8'>
        <Text>
          <Text className='tracking-tighter font-black text-2xl text-black dark:text-white'>
            Let Your Imagination Run
          </Text>
          <Text className='tracking-tighter font-black text-2xl text-green'> Wild!</Text>
        </Text>
      </View>

      <View className='mt-2'>
        <Text className='text-lg text-blue dark:text-white mt-2 mb-2'>Choose Reading Level</Text>
        <Controller
          name='readingLevel'
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent itemOptions={Object.keys(readingLevelOptions)} value={value} onChange={onChange} />
          )}
        />
      </View>
      <View className='mt-2'>
        <Text className='text-lg text-blue dark:text-white mt-2 mb-2'>Choose Your Location</Text>
        <Controller
          name='location'
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent itemOptions={locationOptions} value={value} onChange={onChange} />
          )}
        />
      </View>
      <View className='mt-2'>
        <Text className='text-lg text-blue dark:text-white mt-2 mb-2'>How long do you want to read for?</Text>
        <Controller
          name='readingTime'
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent itemOptions={Object.keys(readingTimeOptions)} value={value} onChange={onChange} />
          )}
        />
      </View>

      <View className='flex flex-row items-center justify-center'>
        <Text className='text-lg text-blue dark:text-white mx-2'>Interactive Story?</Text>
        <Switch
          value={isInteractiveEnabled}
          onValueChange={() => setIsInteractiveEnabled(!isInteractiveEnabled)}
          thumbColor={isInteractiveEnabled ? '#91EE91' : 'lightgray'}
        ></Switch>
      </View>

      <View>
        <Text className='text-lg text-blue dark:text-white'>Choose Your Adventure</Text>
        <Controller
          name='themes'
          control={control}
          rules={{
            maxLength: { value: 100, message: 'Maximum length is 100 characters!' },
            required: { value: true, message: 'Please enter a theme for your story!' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className='rounded-xl h-20 bg-white text-lg dark:bg-grey border-green border-2 text-black dark:text-white m-1 p-2'
              onChangeText={onChange}
              value={value}
              placeholder='Create your own characters, themes and plots.'
              placeholderTextColor='gray'
            />
          )}
        />
        {errors.themes && <Text className='text-dark-orange text-center'>{errors.themes.message}</Text>}
      </View>

      <View className='items-center '>
        <OrangeButton title='Create!' onPress={handleSubmit(onSubmit)} />
      </View>

      <View className='items-center  border-t-4 border-blue border-dotted pt-4 '>
        <SurpriseButton />
      </View>
    </>
  );
}
