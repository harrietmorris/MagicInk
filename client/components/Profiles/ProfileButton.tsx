import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { ProfileType } from '@/Types';
import axios, { AxiosResponse } from 'axios';


interface ProfileButtonProps {
    route: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle; 
    profileName: string;

}



const ProfileButton = ({ route, buttonStyle, textStyle, profileName }: ProfileButtonProps) => {

    const router = useRouter();

    const reRouter = () => {
        router.push(route);
    };

    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={reRouter}>
            <Text style={[styles.text, textStyle]}>{profileName}</Text>
        </TouchableOpacity>
    );

}

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