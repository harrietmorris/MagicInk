import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import ChangeProfilesButton from '@/components/Profiles/ChangeProfilesButton';
import LogOutButton from '@/components/buttons/LogOut';

export default function TabLayout() {

  //TODO: change icons
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name='homeScreen'
        options={{
          headerRight: ChangeProfilesButton,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='newStoryScreen'
        options={{
          title: 'Create Story',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='pencil' color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='keepReadingScreen'
        options={{
          title: 'Keep Reading',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='book' color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='settingsScreen'
        options={{
          title: '',
          headerRight: ChangeProfilesButton,
          headerLeft: LogOutButton,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />,
        }}
      />
    </Tabs>
  );
}
