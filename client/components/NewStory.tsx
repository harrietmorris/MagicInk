import { useEffect } from 'react';
import { TextInput, Text, View  } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';
import { createStory } from '@/services/apiService';
import { FormData } from '@/types';
import { router } from 'expo-router';
import { useDataContext } from '@/context/globalContext';
import { readingLevelOptions } from '@/constants/readingLevels';
import OrangeButton from './style/OrangeButton';
import SurpriseButton from './buttons/SurpriseButton';
import { locationOptions, readingTimeOptions } from '../constants/Surprise';

export default function NewStory() {
  const { setSelectedStory, selectedProfile } = useDataContext();

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

    const profId = selectedProfile?.id ? selectedProfile.id: 1;
    const {status, storyDetails} = await createStory(
      profId,
      readingLevelOptions[data.readingLevel[0]],
      data.location[0],
      readingTimeOptions[data.readingTime[0]],
      data.themes,
    );
    if (status === 204) {
      alert('Error creating story. please review your inputs and try again.');
      router.replace('/newStoryScreen');
      return;
    }

    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');
  }

  return (
    <>
      <SurpriseButton/>
      <Text>
        <Text className="font-black text-2xl text-white">Let Your Imagination Run</Text>
        <Text className="font-black text-2xl text-green"> Wild!</Text>
      </Text>
      <View className='m-2'>
        <Text className='text-lg text-white m-2'>Choose Reading Level</Text>
        <Controller
          name='readingLevel'
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent
              itemOptions={Object.keys(readingLevelOptions)}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </View>
      <View className='m-2'>
        <Text  className='text-lg text-white m-2'>Choose Your Location</Text>
        <Controller
          name='location'
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent itemOptions={locationOptions} value={value} onChange={onChange}/>
          )}
        />
      </View>
      <View className='m-2'>
        <Text  className='text-lg text-white m-2'>How long do you want to read for?</Text>
        <Controller
          name='readingTime'
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <MultiSelectComponent
              itemOptions={Object.keys(readingTimeOptions)}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </View>
      <View>
        <Text  className='text-lg text-white'>Choose Your Adventure</Text>
        <Controller
          name='themes'
          control={control}
          rules={{
            maxLength: {value: 100, message: 'Maximum length is 100 characters!'},
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className='rounded-xl h-20 bg-grey text-white m-1 p-2'
              onChangeText={onChange}
              value={value}
              placeholder='Create your own characters, themes and plots.'
              placeholderTextColor='gray'
            />
          )}
        />
        {errors.themes && (
          <Text>{errors.themes.message}</Text>
        )}
      </View>
      <OrangeButton title="Create!" onPress={handleSubmit(onSubmit)}/>
    </>
  );
}
