import { GetUserProvider } from '@/context/globalContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function Layout() {
  const { colorScheme } = useColorScheme();

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
