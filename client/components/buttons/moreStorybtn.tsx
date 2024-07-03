import { Pressable, View } from 'react-native'
import { useDataContext } from '@/context/globalContext';
import { ProfileType, StoryType } from '@/types';
import { continueStory, getSelectedProfile } from '@/services/apiService';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import PopUp from '../utils/PopUp';
import { router } from 'expo-router';

interface FavButtonProps {
    story: StoryType;
}

const MoreStory: React.FC<FavButtonProps> = ({ story }) => {
    const { selectedProfile, setSelectedProfile, selectedStory, setSelectedStory } = useDataContext();
    const [modalVisible, setModalVisible] = useState(false);


    const addChapter = async () => {
        router.replace('/loadingScreen')
        try {
            if (selectedProfile && story) {
                const updatedStory = await continueStory(selectedProfile.id, story.id, story)
                setSelectedStory(updatedStory)
            }
        } catch (e) {
            console.error('did not add chapter', e)
        }
        router.replace('/keepReadingScreen');

    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)}>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
            <PopUp
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onConfirm={addChapter}
                message='Continue this adventure?'
            />
        </View>
    );
};


export default MoreStory;