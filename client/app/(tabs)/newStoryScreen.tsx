import { StyleSheet } from 'react-native';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';

export default function newStoryScreen () {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      themes: [],
      location: ['anywhere'],
      readingLevel: ['Kindergarten'],
      readingTime: ['5 minutes'],
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  }

  const readingLevelOptions = [
    'Kindergarten',
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
  ];

  const locationOptions = [
    'Castle',
    'Jungle',
    'Mountains',
    'Ocean',
    'City',
    'Space',
    'Underwater',
  ];

  const themeOptions = [
    'Adventure',
    'Horror',
    'Pirates',
    'Cowboys',
    'Magic',
    'Mystical',
    'Vampires',
  ];

  const readingTimeOptions = [
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
  ];

  return (
    <View style={styles.container}>
      
      {/* TODO: Make this button functional */}
      <Button title='Suprise me!'/>

      <Text style={styles.title}>Your reading level</Text>
      <Controller
        name="readingLevel"
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent itemOptions={readingLevelOptions} value={value} onChange={onChange} selectOne={true}/>
        )}
      />

      <Text style={styles.title}>Choose your location</Text>
      <Controller
        name="location"
        control={control}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent itemOptions={locationOptions} value={value} onChange={onChange} selectOne={true}/>
        )}
      />

      <Text style={styles.title}>How long do you want to read for?</Text>    
      <Controller
        name="readingTime"
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent itemOptions={readingTimeOptions} value={value} onChange={onChange} selectOne={true}/>
        )}
      />

      <Text style={styles.title}>Choose your own adventure</Text>
      <Controller
        name="themes"
        control={control}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent itemOptions={themeOptions} value={value} onChange={onChange} />
        )}
      />
      <Button title='Create your story' onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

// TODO: Match styles with the rest of the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
