import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { readingLevelOptions } from '@/constants/readingLevels';
import { Controller, set, useForm } from 'react-hook-form';
import { ProfileType } from '@/types';
import { newProfile } from '@/services/apiService';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import OrangeButton from '../style/OrangeButton';
import SelectPicture from '../SelectPicture';

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
              className='rounded-full px-5 py-3 text-lg border-green border-2 bg-grey text-white mb-2'
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
          rules={{ required: 'Reading level is required' }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={value}
                dropdownIconColor='#91EE91'
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                {Object.keys(readingLevelOptions).map((level) => (
                  <Picker.Item key={level} label={`${level}`} value={level} />
                ))}
              </Picker>
            </View>
          )}
          name='readingLevel'
          defaultValue=''
        />
        {errors.readingLevel && <Text className='text-dark-orange text-center'>{errors.readingLevel.message}</Text>}
      </View>
      <View className='justify-center content-center items-center mt-8'>
        <OrangeButton title='Create Profile' onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};

//TODO: review styling with nativeWind with Picker components
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#91EE91',
    backgroundColor: '#333333',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  picker: {
    color: '#FFFFFF',
  },
});

export default ProfileForm;
