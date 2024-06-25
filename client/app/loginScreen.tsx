import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function loginScreen() {
  return (
    <View>
     {/*  //TODO: review asChild & Pressable*/}
      <Link href='/profilesScreen' asChild>
        <Pressable>
          <Text>Login Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}
