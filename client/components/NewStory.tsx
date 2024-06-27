import { StyleSheet } from 'react-native';
import { Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MultiSelectComponent from '@/components/MultiSelect';
import { createStory } from '@/services/apiService';
import { FormData } from '@/types';
import { router } from 'expo-router';
import { useDataContext } from '@/context/globalContext';
import { readingLevelOptions } from '@/constants/readingLevels';

export default function NewStory() {
  const { setSelectedStory, selectedProfile } = useDataContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //TODO: when i go to settings once, the default readinglevel changes appropriately, but if i do it twice it won't change again
      readingLevel: selectedProfile?.readingLevel ? [selectedProfile.readingLevel] : ['Kindergarten'],
      location: ['anywhere'],
      readingTime: ['5 minutes'],
      themes: [],
    },
  });

  async function onSubmit(data: FormData) {
    // TODO: Display loading spinner while story is being created
    const profId = selectedProfile?.id ? selectedProfile.id: 1;
    const storyDetails = await createStory(
      profId,
      readingLevelOptions[data.readingLevel[0]],
      data.location[0],
      readingTimeOptions[data.readingTime[0]],
      data.themes,
    );
    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');
  }

  async function handleSuprise() {
    if (!selectedProfile) return;
    const readingLevels = selectedProfile.readingLevel;
    const randomLocation = locationOptions[Math.floor(Math.random() * locationOptions.length)];
    const readingTimes = Object.keys(readingTimeOptions);
    const randomReadingTime = readingTimes[Math.floor(Math.random() * readingTimes.length)];
    // pick two random themes that are not the same
    const randomThemes = [themeOptions[Math.floor(Math.random() * themeOptions.length)]]; 
    let randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    while (randomThemes.includes(randomTheme)) {
      randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    }
    randomThemes.push(randomTheme);

    // TODO: Display loading spinner while story is being created
    const profId = selectedProfile?.id ? selectedProfile.id: 1;
    const storyDetails = await createStory(
      profId,
      readingLevels,
      randomLocation,
      readingTimeOptions[randomReadingTime],
      randomThemes,
    );
    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');
    
  
  }

  const locationOptions = [
    'Ancient Ruins',
    'Enchanted Forest',
    'Castle',
    'Cave',
    'City',
    'Desert',
    'Haunted House',
    'Island',
    'Jungle',
    'Mountains',
    'Ocean',
    'Pirate Ship',
    'School',
    'Sky',
    'Space',
    'Space Station',
    'Underwater',
    'Village'
  ];

  const themeOptions = [
    'Adventure',
    'Animal Friends',
    'Dinosaurs',
    'Fairy Tales',
    'Friendship',
    'Funny',
    'Knights',
    'Magic',
    'Mystery',
    'Mystical Creatures',
    'Pirates',
    'Princesses',
    'Robots',
    'Scary',
    'Space Exploration',
    'Superheroes',
    'Time Travel',
    'Toy Stories',
    'Vampires',
    'Witches'
];

  const readingTimeOptions: { [key: string]: number } = {
    '5 minutes': 5,
    '10 minutes': 10,
    '15 minutes': 15,
    '30 minutes': 30,
    '1 hour': 60,
  };

  return (
    <>
      <Pressable style={styles.button} onPress={handleSuprise}>
        <Text style={styles.buttonText}>Suprise me!</Text>
      </Pressable>

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
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Create your story</Text>
      </Pressable>
    </>
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
