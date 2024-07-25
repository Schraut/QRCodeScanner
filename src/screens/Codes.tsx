import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradientBackground } from '../components/LinearGradientBackground';

export default function CodesScreen() {
  return (
    <>
      <LinearGradientBackground />
      <View style={styles.container}>
        <Text style={styles.text}>Scanned codes will show up here.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 40,
  },
  privacyPolicyText: {
    fontSize: 18,
  },
});
