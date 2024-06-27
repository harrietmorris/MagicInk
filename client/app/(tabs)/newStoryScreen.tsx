import NewStory from '@/components/NewStory';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';


export default function newStoryScreen() {
  return (
    <View style={styles.container}>
      <NewStory />
    </View>
  );
}

// TODO: Match styles with the rest of the app
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 50,
  }
});
