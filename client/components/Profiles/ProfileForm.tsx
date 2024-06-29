import { View, Text, TextInput} from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { Controller, useForm } from 'react-hook-form';
import { ProfileType } from '@/types';
import { newProfile } from '@/services/apiService';
import { router } from 'expo-router';
import OrangeButton from '../style/OrangeButton';
import SelectPicture from '../SelectPicture';
import ReadingLevelPicker from '../utils/ReadingLevelPicker';

const ProfileForm = () => {


  const { profiles, setProfiles, setSelectedProfile, user } = useDataContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ProfileType>>({
    defaultValues: {
      picture: '1'
    },
  });

  const onSubmit = async (data: Partial<ProfileType>) => {
    try {
      if (!user) return;
      data.userId = user.id;
      const addProfile = await newProfile(user.id, data as ProfileType);
      setProfiles([...profiles, addProfile]);
      setSelectedProfile(addProfile);
      router.replace('/homeScreen');
    } catch (error) {
      console.error('Error creating profile', error);
    }
  };

  return (
    <>
      <View>
        <Text className='text-4xl font-extrabold color-green mb-10'>Create New Profile</Text>
        <Text className='text-2xl font-bold mb-2 text-white'>Name</Text>
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='rounded-full px-5 py-4 text-lg border-green border-2 bg-grey text-white mb-2'
              placeholder='Name'
              placeholderTextColor='white'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='name'
          defaultValue=''
        />
        {errors.name && <Text className='text-dark-orange text-center'>{errors.name.message}</Text>}

        <Text className='text-2xl font-bold mt-12 mb-2 text-white'>Picture</Text>
        <SelectPicture control={control} />


        <Text className='text-2xl font-bold mb-2 text-white'>Choose Reading Level</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View >
              <ReadingLevelPicker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              />
            </View>
          )}
          name='readingLevel'
          defaultValue='value'
        />

        <View className='justify-center content-center items-center mt-8'>
          <OrangeButton title='Create Profile' onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
  );
};


export default ProfileForm;
