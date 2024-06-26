import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useDataContext } from '@/context/globalContext'
import { readingLevelOptions } from '@/constants/readingLevels'
import { Controller, useForm } from 'react-hook-form'
import { ProfileType } from '@/types'
import { newProfile } from '@/services/apiService'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router'


const ProfileForm = () => {
    const {profiles, setProfiles, setSelectedProfile, user} = useDataContext();
    const { control, handleSubmit, formState: { errors } } = useForm<Partial<ProfileType>>();

    const onSubmit = async (data: Partial<ProfileType>) => {
      try {
          if (!user) return;
          data.userId = user.id;
          const addProfile = await newProfile(data as ProfileType, user.id);
          setProfiles([...profiles, addProfile]);
          setSelectedProfile(addProfile);
          router.replace('/homeScreen');
      } catch (error) {
          console.error('Error creating profile', error);
      }
  };

  return (
    <View>

      <Text>Name:</Text>
      <Controller
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
              />
          )}
          name="name"
          defaultValue=""
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            {/* TODO: implement avatar feature - either by user upload or pre-selected options? */}
      <Text>Picture: upload... currently not working</Text>

      <Text>Choose reading Level:</Text>
      <Controller
          control={control}
          rules={{ required: 'Reading level is required' }}
          render={({ field: { onChange, value } }) => (
              <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={{ height: 50, width: 200 }}
              >
                  {Object.keys(readingLevelOptions).map((level) => (
                      <Picker.Item key={level} label={`${level}`} value={level} />
                  ))}
              </Picker>
          )}
          name="readingLevel"
          defaultValue=""
      />
      {errors.readingLevel && <Text style={styles.errorText}>{errors.readingLevel.message}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create Profile</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
},
buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
},
errorText: {
    color: 'red',
    marginTop: 5,
},
});

export default ProfileForm
