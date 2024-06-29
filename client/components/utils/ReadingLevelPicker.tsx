import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { readingLevelOptions } from '@/constants/readingLevels';

interface ReadingLevelPickerProps {
  selectedValue: string | undefined;
  onValueChange: (value: string) => void;
}

const ReadingLevelPicker: React.FC<ReadingLevelPickerProps> = ({ selectedValue, onValueChange }) => {
  return (
      <View className='bg-grey w-full rounded-full px-4 py-1 border border-green text-white'>
        <Picker
          style={{ color: '#ffffff' }}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          dropdownIconColor='#ffffff'
          selectionColor='#ffffff'
        >
          {Object.keys(readingLevelOptions).map((level) => (
            <Picker.Item key={level} label={`${level}`} value={level} style={{ backgroundColor: "#333333", color: '#ffffff' }} />
          ))}
        </Picker>
      </View>

  );
};

export default ReadingLevelPicker;