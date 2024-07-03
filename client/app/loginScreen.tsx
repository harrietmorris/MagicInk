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

  const {width, height} = Dimensions.get('window');

  const imgHeight = height/2

  return (
    <>
      <View className='flex-1 dark:bg-dark-grey items-center'>

        <View className='aspect-square'>
          <Image source={require('../assets/images/magicInkLogo.png')} className='w-full' style={{height: imgHeight}} resizeMode='cover'></Image>
        </View>
        <View className='bg-black dark:bg-grey'>
        <View className='bg-blue dark:bg-grey border-tl-lg m-50'>
<Text>HELLO</Text>


        </View>
        </View>
            {/* <Text className='text-2xl font-extrabold text-black dark:text-white text-center'>
              Step into a realm of endless adventures!
            </Text>
            <Text className='text-2xl font-bold mt-12 mb-4 text-black dark:text-white'>Username</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-5 py-4 text-lg border-green border-2 bg-white dark:bg-grey text-black dark:text-white  mb-2'
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
            <Text className='text-2xl font-bold mt-12 mb-4 text-black dark:text-white'>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='rounded-full px-5 py-4 text-lg border-green border-2 bg-white dark:bg-grey text-black dark:text-white mb-2'
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
            <View className='justify-center content-center items-center mt-8'>
              <Pressable className='bg-dark-orange rounded-full px-4 py-2 w-44' onPress={handleSubmit(onSubmit)}>
                <Text className='text-white text-lg font-bold text-center'>Login</Text>
              </Pressable>
            </View> */}
          
        
      </View>
    </>
  );
}