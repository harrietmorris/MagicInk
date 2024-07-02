import { View, Text, Pressable, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebaseConfig } from '../../firebaseConfig'
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

interface UploadMediaFileProps {
    onImageUpload: (imageUrl: string) => void
}

const UploadMediaFile: React.FC<UploadMediaFileProps> = ({ onImageUpload }) => {
    const [uploading, setUploading] = useState<boolean>(false)


    const pickAndUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "Sorry, we need camera roll permission to upload images."
            )
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (result.canceled || !result.assets || !result.assets.length) {
            return
        }

        const image = result.assets[0].uri
        setUploading(true)

        try {
            const fileInfo = await FileSystem.getInfoAsync(image)
            const blob = await new Promise<Blob>((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'))
                }
                xhr.responseType = 'blob'
                xhr.open('GET', fileInfo.uri, true)
                xhr.send(null)
            })

            const filename = image.substring(image.lastIndexOf('/') + 1)
            const storageRef = ref(storage, filename)
            await uploadBytes(storageRef, blob)

            const imageUrl = await getDownloadURL(storageRef)

            setUploading(false)
            Alert.alert('Photo uploaded')
            onImageUpload(imageUrl)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }


    return (
        <View>
            <Pressable className="bg-blue rounded-full px-4 py-2" onPress={pickAndUploadImage} disabled={uploading}>
                {uploading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-bold">Upload</Text>}
            </Pressable>
        </View>
    )
}

export default UploadMediaFile
