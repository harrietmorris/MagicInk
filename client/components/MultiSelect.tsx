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
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={itemOptions}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
            onPress={() => {
              toggleItemSelection(item);
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// TODO: Match styles with the rest of the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 80
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 60
  },
  selectedItem: {
    backgroundColor: '#c6e2ff',
  },
  itemText: {
    fontSize: 16,
  },
});

export default MultiSelectComponent;