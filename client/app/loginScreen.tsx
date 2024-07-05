import { useDataContext } from '@/context/globalContext';
import { getUser } from '@/services/apiService';
import { UserType } from '@/types';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, Pressable, TextInput, Image, Dimensions } from 'react-native';

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
    router.replace('/profilesScreen');
  };

  const { width, height } = Dimensions.get('window');

  const imgHeight = height / 2;

  return (
    <>
      <View className='flex-1 dark:bg-dark-grey items-center'>
        <View className='w-full'>
          <Image
            source={require('../assets/images/magicInkLogo.png')}
            className='w-full'
            style={{ height: imgHeight }}
            resizeMode='cover'
          ></Image>
        </View>

        <View className='flex-1 w-full flex-col justify-around bg-[#FEF7D8] dark:bg-dark-grey pb-8 pt-4'>
          <View className='px-8 py-2 flex w-full'>
            <Text className='text-2xl font-extrabold text-blue dark:text-white text-center'>
              Step into a realm of endless adventures!
            </Text>
          </View>

          <View className='px-8 py-2 flex w-full'>
            <Text className='text-lg font-bold text-black dark:text-white'>Username</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-4 py-3 w-full text-lg border-blue border-2 bg-white dark:bg-grey text-black dark:text-white '
                  placeholder='Username'
                  placeholderTextColor='grey'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='email'
              defaultValue=''
            />
          </View>

          <View className='px-8 py-2 flex w-full'>
            <Text className='text-lg font-bold text-black dark:text-white mt-2'>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-4 py-3 w-full text-lg border-blue border-2 bg-white dark:bg-grey text-black dark:text-white'
                  placeholder='Password'
                  placeholderTextColor='grey'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='password'
              defaultValue=''
            />
          </View>

          <View className='px-8 py-2 flex w-full'>
            <View className='content-center items-center'>
              <Pressable className='bg-blue rounded-full px-4 py-2 w-44' onPress={handleSubmit(onSubmit)}>
                <Text className='text-white text-lg font-bold text-center'>Login</Text>
              </Pressable>
            </View>
          </View>

          <View className='content-center items-center'>
            <Text className='font-bold dark:text-white'>Don't have an account?</Text>
            <Text className='text-dark-orange font-bold'>Register here</Text>
          </View>
        </View>
      </View>
    </>
  );
}
