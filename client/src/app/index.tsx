// import { Text, View } from '@/components/Themed';

import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function loginScreen() {
  return (
    <View>
      <Link href='/homeScreen' asChild>
        <Pressable>
          <Text>Login Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}
