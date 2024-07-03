import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

interface MultiSelectComponentProps {
  itemOptions: string[];
  value: string[];
  onChange: (selectedItems: string[]) => void;
  selectOne?: boolean;
}

const  MultiSelectComponent= ({itemOptions, value, onChange}:MultiSelectComponentProps ) => {

  const [selectedItems, setSelectedItems] = useState<string[]>(value);

  useEffect(() => {setSelectedItems(value);}, [value]);

  function toggleItemSelection (selectedItem: string) {
    const newSelectedItems = [selectedItem];
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  return (
    <View className='justify-center'>
      <FlatList
        horizontal={true}
        data={itemOptions}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Pressable
          className={`flex justify-center p-4 mr-4 bg-yellow rounded-lg
            ${selectedItems.includes(item) ? 'bg-blue' : ''}`}
            onPress={() => {       
              toggleItemSelection(item);
            }}
          >
            <Text className={`text-base text-black ${selectedItems.includes(item) ? 'text-white' : ''}`}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;