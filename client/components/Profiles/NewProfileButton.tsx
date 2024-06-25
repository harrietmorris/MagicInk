import { ViewStyle, TextStyle, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

interface NewProfileButtonProps {
    route: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle; 
}


function NewProfileButton({ route, buttonStyle, textStyle }: NewProfileButtonProps) {
    const router = useRouter();

    const reRouter = () => {
        router.push(route);
    };

    return (
        <Pressable style={[styles.button, buttonStyle]} onPress={reRouter}>
            <Text style={[styles.text, textStyle]}>Create new profile</Text>
        </Pressable>
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

export default NewProfileButton