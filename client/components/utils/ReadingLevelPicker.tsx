import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { readingLevelOptions } from '@/constants/readingLevels';
import { useColorScheme } from 'nativewind';

interface ReadingLevelPickerProps {
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
}

const ReadingLevelPicker = ({ selectedValue, onValueChange }: ReadingLevelPickerProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className='w-full rounded-full px-4 py-1 border-2 border-green bg-white dark:bg-grey'>
      <Picker
        style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        dropdownIconColor={colorScheme === 'dark' ? 'white' : 'black'}
        selectionColor={colorScheme === 'dark' ? '#333233' : 'white'}
      >
        {Object.keys(readingLevelOptions).map((level) => (
          <Picker.Item
            key={level}
            label={`${level}`}
            value={level}
            style={{
              backgroundColor: colorScheme === 'dark' ? '#333233' : '#ffffff',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ReadingLevelPicker;