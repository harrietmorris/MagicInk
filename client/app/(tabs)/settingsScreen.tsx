import Settings from "@/components/Settings"
import { View } from "react-native"
import { StyleSheet } from 'react-native';



const settingsScreen = () => {
    return (
        <View className="flex-grow bg-blackish items-center justify-between p-8">
            <Settings />
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }})


export default settingsScreen