import React from 'react';
import { ImageStyle, StyleProp, Text, View, Image} from 'react-native';

import { profilePictures } from '@/constants/profilePictures';
import { useAssets } from 'expo-asset';



interface RenderImageProps {
  imageUrl: string | null;
  style?: StyleProp<ImageStyle>;
}



const RenderImage: React.FC<RenderImageProps> = ({ imageUrl, style }) => {

    if (!imageUrl) return <View/>
    const handleFind = () => {
        const found = profilePictures.find((pic) => pic.id === imageUrl)
        console.log('found', found)
        return found!.src
      }
      let resolvedSrc;

    if (!imageUrl.startsWith('https://')) {
      let localUrl = handleFind();
      let numUrl = Number(localUrl);
      resolvedSrc = Image.resolveAssetSource(numUrl)
      console.log('resolved local', resolvedSrc);
    }
    else {
        resolvedSrc = {uri : imageUrl}

        console.log('resolved online', resolvedSrc);
    }
    

    return <Image source={resolvedSrc} style={style} /> 

    // const num = Number(imageUrl)    
    // console.log('image url', imageUrl);
    // console.log('num', num);
    // const test = Image.resolveAssetSource(num)
    // const [assets, error] = useAssets([require('../../assets/images/profiles/2.png')]);
    // console.log()
    // console.log('assets 0',assets?.length && assets[0])
    // console.log('asset', assets?.length && assets[0].uri);
    // if (assets?.length) {
    //     return <Image source={test} /> 
    // }
    // else {
    //     <View/>
    // }
    
    

//   const renderImage = (image: string) => {
//     console.log('image', image)
//     if (!image) return <View/>
//     return <Image source={foundSrc}></Image>;
//     // if (image.startsWith('../')) {
//     //     console.log('renderImg component')
//     //     return null;
//     // //   return <Image source={require(image)} style={style} />;
//     // } else if (image.startsWith('https://')) {
//     //   return <Image source={{ uri: image }} style={style} />;
//     // } else {
//     //   console.warn(`Unsupported image source: ${image}`);
//     //   return null; 
//     // }
//   };

//   return renderImage(imageUrl);
};

export default RenderImage;