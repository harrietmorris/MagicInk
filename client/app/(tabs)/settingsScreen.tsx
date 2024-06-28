import Settings from "@/components/Settings"
import { View } from "react-native"
import { StyleSheet } from 'react-native';



const settingsScreen = () => {
    return (
        <View className="flex-1 bg-blackish items-center justify-center">
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