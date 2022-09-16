import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import ChildList from "./src/ChildList";

export default function App() {
  return (
    <View style={styles.container}>
      <ChildList children={["Аня", "Влада"]}></ChildList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
