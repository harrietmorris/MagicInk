import { View, Modal, TextInput, Text, Pressable} from 'react-native'
import React, { useState } from 'react'

interface NameEditProps {
    visible: boolean;
    currentName: string;
    onClose: () => void;
    onSave: (newName: string) => void;
  }
  
  const NameEdit = ({ visible, currentName, onClose, onSave }: NameEditProps) => {
    const [newName, setNewName] = useState(currentName);
    
    const handleSave = () => {
        onSave(newName);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
        
        <View className='flex-1 justify-center items-center bg-[#000000]/[0.8]'>
          <View className='w-4/5 bg-blue p-5 rounded-lg'>
            <TextInput
              className="border-b border-white mb-5 text-2xl font-bold text-white p-2"
              placeholder="Enter new profile name"
              value={newName}
              onChangeText={setNewName}
            />
            <View className='flex-row justify-center'>
              <Pressable className='bg-grey rounded-md py-2 px-4 m-2 w-28' onPress={onClose}>
              <Text className='text-white font-semibold text-lg text-center'>Cancel</Text>
            </Pressable>
              <Pressable className='bg-grey rounded-md py-2 px-4 m-2 w-28' onPress={handleSave}>
                <Text className='text-white font-semibold text-lg text-center'>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>

        </Modal>
 
    );
  };


  export default NameEdit;