import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

interface OptionsButtonProps {
    onPress: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const OptionsButton = ({ onPress, title, style }: OptionsButtonProps) => {
    return (
        <StyledPressable
            onPress={onPress}
            className="bg-light-orange rounded-lg px-4 py-2"
            style={style}
        >
            <StyledText className="text-white text-lg font-bold text-center">
                {title}
            </StyledText>
        </StyledPressable>
    );
};

export default OptionsButton;