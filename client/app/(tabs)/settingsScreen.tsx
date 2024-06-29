import Settings from "@/components/Settings"
import { View } from "react-native"

const settingsScreen = () => {
    return (
        <View className="flex-1 flex-col dark:bg-dark-grey justify-between p-8">
            <Settings />
        </View>
    )
};

export default settingsScreen