import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradientBackground } from '../components/LinearGradientBackground';

export default function AboutScreen() {
  return (
    <>
      <LinearGradientBackground />
      <View style={styles.container}>
        <Text style={styles.text}>
          A very easy and simple to use QR code and barcode scanner.
        </Text>
        <Pressable onPress={() => console.log('privacy policy')}>
          <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
