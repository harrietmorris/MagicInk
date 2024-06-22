import { Stack } from 'expo-router/stack';
//this is a test
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
