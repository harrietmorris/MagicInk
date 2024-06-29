import Settings from "@/components/Settings"
import { View } from "react-native"

const settingsScreen = () => {
    return (
        <View className="flex-grow bg-dark-grey items-center justify-between p-8">
            <Settings />
        </View>
    )
};

export default settingsScreen