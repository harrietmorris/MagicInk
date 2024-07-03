import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native'
import { storage } from '../../firebaseConfig'
import React, { useState } from 'react'
import pickAndUploadImage from '../utils/PickUploadImg'

interface UploadMediaFileProps {
    onImageUpload: (imageUrl: string) => void
}

const UploadMediaFile = ({ onImageUpload }: UploadMediaFileProps) => {
    const [uploading, setUploading] = useState<boolean>(false)

    return (
        <View>
        <Pressable 
            className="bg-blue rounded-full px-4 py-2" 
            onPress={() => pickAndUploadImage(storage, setUploading, onImageUpload)} 
            disabled={uploading}
        >
            {uploading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-bold">Upload</Text>}
        </Pressable>
    </View>
    )
}

export default UploadMediaFile
