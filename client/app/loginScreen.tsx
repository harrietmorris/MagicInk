import { useDataContext } from '@/context/globalContext';
import { getUser } from '@/services/apiService';
import { UserType } from '@/types';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, Pressable, TextInput } from 'react-native';

export default function loginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<UserType>>();

  const { setUser } = useDataContext();

  useEffect(() => {
    async function setup() {
      const user = await getUser(1);
      setUser(user);
    }
    setup();
  }, []);

  const onSubmit = (data: Partial<UserType>) => {
    console.log(data);
    router.replace('/keepReadingScreen');
  };

  return (
    <>
      <View className='m-8 flex flex-col'>
        {
          <>
            <Text>Enter the world of magic!</Text>
            <Text>Username</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-5 py-2 text-lg border-green border-4 bg-white mb-2'
                  placeholder='Username'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='email'
              defaultValue=''
            />
            <Text>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-5 py-2 text-lg border-green border-4 bg-white mb-2'
                  placeholder='Username'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='password'
              defaultValue=''
            />
            <Pressable
              className='bg-dark-orange rounded-full px-4 py-2 w-44'
              onPress={handleSubmit(onSubmit)}
            >
              <Text className='text-white text-lg font-bold text-center'>Login</Text>
            </Pressable>
          </>
        }
      </View>
    </>
  );
}

//  //TODO: review asChild & Pressable
// <Link href='/profilesScreen' asChild>
//   <Pressable>
//     <Text>Login Page</Text>
//   </Pressable>
// </Link>
