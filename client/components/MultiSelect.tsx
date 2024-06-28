import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface MultiSelectComponentProps {
  itemOptions: string[];
  value: string[];
  onChange: (selectedItems: string[]) => void;
  selectOne?: boolean;
}

const  MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({itemOptions, value, onChange, selectOne=false}) => {

  const [selectedItems, setSelectedItems] = useState<string[]>(value);

  useEffect(() => {onChange(selectedItems);}, [selectedItems]);

  function toggleItemSelection (selectedItem: string) {
    setSelectedItems((prevSelectedItems) => {
      if (selectOne) {
        return [selectedItem];
      }
      if (prevSelectedItems.includes(selectedItem)) {
        return prevSelectedItems.filter((item) => item !== selectedItem);
      } else {
        return [...prevSelectedItems, selectedItem];
      }
    });
  };

  return (
    <View className='justify-center h-20'>
      <FlatList
        horizontal={true}
        data={itemOptions}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          className={`h-full flex justify-center p-3 mx-2 bg-yellow rounded-lg
            ${selectedItems.includes(item) ? 'bg-blue' : ''}`}
            onPress={() => {       
              toggleItemSelection(item);
            }}
          >
            <Text className={`text-base text-black ${selectedItems.includes(item) ? 'text-white' : ''}`}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;