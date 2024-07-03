import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

interface BlueButtonProps {
    onPress: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const BlueButton: React.FC<BlueButtonProps> = ({ onPress, title, style }) => {
    return (
        <StyledPressable
            onPress={onPress}
            className="bg-green rounded-full px-4 py-2"
            style={style}
        >
            <StyledText className="text-grey text-lg font-bold">
                {title}
            </StyledText>
        </StyledPressable>
    );
};

export default BlueButton;