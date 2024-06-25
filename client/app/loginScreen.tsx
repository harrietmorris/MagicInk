import { useDataContext } from '@/context/globalContext';
import { getUser } from '@/services/apiService';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';


export default function loginScreen() {
  const { setUser } = useDataContext();

  useEffect(() => {
    async function setup() {
      const user = await getUser(1);
      setUser(user);

    }
    setup();
  }, [])
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
