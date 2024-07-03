import * as SplashScreen from 'expo-splash-screen';
import { GetUserProvider } from '@/context/globalContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import {useEffect} from 'react';
import {  useFonts, Poppins_500Medium, } from '@expo-google-fonts/poppins';
import 'expo-dev-client';

SplashScreen.preventAutoHideAsync();


export default function Layout() {
  const { colorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    Poppins_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  const BACKGROUND_COLOR = colorScheme === 'dark' ? '#333233' : '#fff';
  const TEXT_COLOR = colorScheme === 'dark' ? '#fff' : '#333233';

  return (
    <GetUserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: BACKGROUND_COLOR,
          },
          headerTintColor: TEXT_COLOR,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: '',
        }}
      >
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GetUserProvider>
  );
}
