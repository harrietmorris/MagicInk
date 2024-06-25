import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';



interface ProfileButtonProps {
    route: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  profileName: string;
  onPress: () => void;
}



const ProfileButton = ({ route, buttonStyle, textStyle, profileName, onPress }: ProfileButtonProps) => {
    const router = useRouter();

    const reRouter = () => {
        onPress();
        router.push(route);
    };

    return (
        <Pressable style={[styles.button, buttonStyle]} onPress={reRouter}>
          <Text style={[styles.text, textStyle]}>{profileName}</Text>
        </Pressable>
      );
    };

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileButton