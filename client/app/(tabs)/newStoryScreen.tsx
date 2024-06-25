import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';
import { createStory } from '@/services/apiService';
import { FormData } from '@/types';
import { router } from 'expo-router';
import { useDataContext } from '@/context/globalContext';

export default function newStoryScreen() {
  const dataContext = useDataContext()
  if (!dataContext) return null; //TODO: review null state of dataContext
  const { setSelectedStory } = dataContext;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      readingLevel: ['Kindergarten'],
      location: ['anywhere'],
      readingTime: ['5 minutes'],
      themes: [],
    },
  });

  async function onSubmit(data: FormData) {
    // TODO: Display loading spinner while story is being created
    const storyDetails = await createStory(
      readingLevelOptions[data.readingLevel[0]],
      data.location[0],
      readingTimeOptions[data.readingTime[0]],
      data.themes,
    );
    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');
  }

  const readingLevelOptions: { [key: string]: string } = {
    'Kindergarten': 'BR40L - 230L',
    '1st Grade': 'BR120L - 295L',
    '2nd Grade': '107L - 545L',
    '3rd Grade': '415L - 760L',
    '4th Grade': '635L - 950L',
    '5th Grade': '770L - 1080L',
    '6th Grade': '855L - 1165L',
    '7th Grade': '925L +',
  };

  const locationOptions = ['Castle', 'Jungle', 'Mountains', 'Ocean', 'City', 'Space', 'Underwater'];

  const themeOptions = ['Adventure', 'Scary', 'Pirates', 'Cowboys', 'Magic', 'Mystical', 'Vampires'];

  const readingTimeOptions: { [key: string]: number } = {
    '5 minutes': 5,
    '10 minutes': 10,
    '15 minutes': 15,
    '30 minutes': 30,
    '1 hour': 60,
  };

  return (
    <View style={styles.container}>
      {/* TODO: Make this button functional */}
      <Button title='Suprise me!' />

      <Text style={styles.title}>Your reading level</Text>
      <Controller
        name='readingLevel'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent
            itemOptions={Object.keys(readingLevelOptions)}
            value={value}
            onChange={onChange}
            selectOne={true}
          />
        )}
      />

      <Text style={styles.title}>Choose your location</Text>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent itemOptions={locationOptions} value={value} onChange={onChange} selectOne={true} />
        )}
      />

      <Text style={styles.title}>How long do you want to read for?</Text>
      <Controller
        name='readingTime'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <MultiSelectComponent
            itemOptions={Object.keys(readingTimeOptions)}
            value={value}
            onChange={onChange}
            selectOne={true}
          />
        )}
      />

      <Text style={styles.title}>Choose your own adventure</Text>
      <Controller
        name='themes'
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
