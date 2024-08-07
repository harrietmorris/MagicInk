import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';
import { styled } from 'nativewind';

interface OrangeButtonProps {
    onPress: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

const OrangeButton = ({ onPress, title, style }: OrangeButtonProps) => {
    return (
        <StyledPressable
            onPress={onPress}
            className="bg-dark-orange rounded-full px-4 py-2"
            style={style}
        >
            <StyledText className="text-white text-lg font-bold text-center">
                {title}
            </StyledText>
        </StyledPressable>
    );
};

export default OrangeButton;