import { View, Text, Pressable, StyleSheet, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebaseConfig } from '../../firebaseConfig'
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDataContext } from '@/context/globalContext'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

interface UploadMediaFileProps {
    onImageUpload: (imageUrl: string) => void
}

const UploadMediaFile: React.FC<UploadMediaFileProps> = ({ onImageUpload }) => {
    const { user } = useDataContext()
    const [image, setImage] = useState<string | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera roll permission to upload images.`
            )
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })

            if (!result.canceled) {
                setImage(result.assets[0].uri)
            }
        }
    }

    const uploadMedia = async () => {
        if (!image) return

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
            setImage(null)
            onImageUpload(imageUrl)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const renderImage = (image: string) => {
        if (image.startsWith('../')) {
            return null;
            // return <Image source={require(image)} style={{ width: 300, height: 300, borderRadius: 150 }} />
        } else {
            return <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 150 }} />
        }
    }

    return (
        <View>
            <Pressable style={styles.button} onPress={pickImage}>
                <Text>Pick Image</Text>
            </Pressable>
            <View>
                {image && renderImage(image)}
                <Pressable style={styles.button} onPress={uploadMedia} disabled={uploading}>
                    <Text>{uploading ? 'Uploading...' : 'Upload Image'}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default UploadMediaFile

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
})