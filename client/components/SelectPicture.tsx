import { FlatList, Pressable, Image } from 'react-native';
import { Controller} from 'react-hook-form';
import { profilePictures } from '@/constants/profilePictures';
import { Control } from 'react-hook-form';
import { ProfilePicture } from '@/types';
import { useState } from 'react';

export default function SelectPicture (
  { control }: { control: Control }
) {

  const [selectedImage, setSelectedImage] = useState(profilePictures[0]);

  const handleSelectImage = (image: ProfilePicture, onChange: (id: string) => void) => {
    setSelectedImage(image);
    onChange(image.id);
  };

  return (
    <>
      <Controller
        control={control}
        name="picture"
        render={({ field: { onChange } }) => (
          <FlatList
            data={profilePictures}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            horizontal={true}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelectImage(item, onChange)}>
                <Image
                  source={item.src}
                  className={`m-2 rounded-lg ${selectedImage.id === item.id ? 'w-[20rem]" h-[20rem]' : 'w-20 h-20'}`} 
                />
              </Pressable>
            )}
          />
        )}
        />
    </>
  )
}