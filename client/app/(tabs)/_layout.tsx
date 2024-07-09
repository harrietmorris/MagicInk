import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import ChangeProfilesButton from '@/components/Profiles/ChangeProfilesButton';
import LogOutButton from '@/components/buttons/LogOut';
import { useColorScheme } from 'nativewind';

const SIZE = 28;

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  const BACKGROUND_COLOR = colorScheme === 'dark' ? '#333233' : '#fff';

  //TODO: change icons
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#91EE91', tabBarStyle: { backgroundColor: BACKGROUND_COLOR } }}>
      <Tabs.Screen
        name='homeScreen'
        options={{
          headerStyle: {
            backgroundColor: BACKGROUND_COLOR,
          },
          headerRight: ChangeProfilesButton,
          title: '',
          tabBarIcon: ({ color }) => <FontAwesome size={SIZE} name='home' color={color} />,
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen
        name='newStoryScreen'
        options={{
          title: 'Create Story',
          tabBarIcon: ({ color }) => <FontAwesome size={SIZE} name='pencil' color={color} />,
          headerShown: false,
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen
        name='keepReadingScreen'
        options={{
          title: 'Keep Reading',
          tabBarIcon: ({ color }) => <FontAwesome size={SIZE} name='book' color={color} />,
          headerShown: false,
          tabBarLabel: () => null, 
        }}
      />
      <Tabs.Screen
        name='settingsScreen'
        options={{
          title: '',
          headerStyle: {
            backgroundColor: BACKGROUND_COLOR,
          },
          headerRight: ChangeProfilesButton,
          headerLeft: LogOutButton,
          tabBarIcon: ({ color }) => <FontAwesome size={SIZE} name='cog' color={color} />,
          tabBarLabel: () => null, 
        }}  
      />
    </Tabs>
  );
}
