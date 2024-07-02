import { View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { Controller, useForm } from 'react-hook-form';
import { ProfileType } from '@/types';
import { newProfile } from '@/services/apiService';
import { router } from 'expo-router';
import OrangeButton from '../style/OrangeButton';
import ReadingLevelPicker from '../utils/ReadingLevelPicker';
import UploadMediaFile from './UploadMedia';
import ImageChoice from '../utils/ImageChoice';
import BlueButton from '../style/BlueButton';

const ProfileForm = () => {


  const { profiles, setProfiles, setSelectedProfile, user } = useDataContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Partial<ProfileType>>({
    defaultValues: {
      picture: '1'
    },
  });

  const [imgModalVisible, setImgModalVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState<string>('1');

  useEffect(() => {
    setValue('picture', currentImg);
  }, [currentImg, setValue]);


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

  const handleImageUpdate = (newImg: string) => {
    setCurrentImg(newImg);
  };


  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View>
        <Text className='text-4xl font-extrabold color-green mb-10'>Create New Profile</Text>
        <Text className='text-2xl font-bold mb-2 dark:text-white'>Name</Text>
        <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='rounded-full px-5 py-4 text-lg border-green border-2 bg-white dark:bg-grey dark:text-white mb-2'
              placeholder='Name'
              placeholderTextColor='grey'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='name'
          defaultValue=''
        />
        {errors.name && <Text className='text-dark-orange text-center'>{errors.name.message}</Text>}

        <Text className="text-2xl font-bold mt-12 mb-2 dark:text-white">Picture</Text>
        <Pressable className="mb-4" onPress={() => setImgModalVisible(true)}>
          <Text className="text-lg">Choose avatar</Text>
        </Pressable>
        <BlueButton onPress={() => setImgModalVisible(true) } title={'Choose avatar'} />
        <UploadMediaFile onImageUpload={handleImageUpdate} />

        <Controller
          control={control}
          name="picture"
          render={({ field }) => (
            <View>
              <Text>Selected Image: {currentImg}</Text>
            </View>
          )}
        />

        <Text className='text-2xl font-bold mb-2 mt-10 dark:text-white'>Choose Reading Level</Text>
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

        <ImageChoice
          imgVisible={imgModalVisible}
          currentImg={currentImg}
          onClose={() => setImgModalVisible(false)}
          onSave={handleImageUpdate}
        />
      </View>
      </ScrollView>
  );
};


export default ProfileForm;