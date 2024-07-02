import React from 'react';
import { ImageStyle, StyleProp, View, Image} from 'react-native';
import { profilePictures } from '@/constants/profilePictures';

interface RenderImageProps {
  imageUrl: string | null;
  style?: StyleProp<ImageStyle>;
}

const RenderImage: React.FC<RenderImageProps> = ({ imageUrl, style }) => {

    if (!imageUrl) return <View/>

    const handleFind = () => {
        const found = profilePictures.find((pic) => pic.id === imageUrl)
        return found!.src
      }
      let resolvedSrc;

    if (!imageUrl.startsWith('https://')) {
      let localUrl = handleFind();
      let numUrl = Number(localUrl);
      resolvedSrc = Image.resolveAssetSource(numUrl)
    }
    else {
        resolvedSrc = {uri : imageUrl}
    }
    return <Image source={resolvedSrc} style={style} /> 
};

export default RenderImage;