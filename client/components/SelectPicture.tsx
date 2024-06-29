import { FlatList, TouchableOpacity, Image } from 'react-native';
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
              <TouchableOpacity onPress={() => handleSelectImage(item, onChange)}>
                <Image
                  source={item.src}
                  className={`m-2 rounded-lg ${selectedImage.id === item.id ? 'w-[100px] h-[100px]' : 'w-[90px] h-[90px]'}`} 
                />
              </TouchableOpacity>
            )}
          />
        )}
        />
    </>
  )
}