import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
//import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ScannedItem } from '../components/ScannedItem';

// Array that will hold scanned qr codes
var scannedQRCodes: { id: String; itemValue: String }[] = [];

export default function QRCodeScannerScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);

  const [scanned, setScanned] = useState(false);

  const [scannedQRs, setScannedQRs] = useState<object[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // setInterval(function () {
    //   fadeIn();
    // }, 1000);
    //fadeOut();
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  type ScannedProps = {
    type: string;
    data: string;
  };

  const handleBarCodeScanned = ({ type, data }: ScannedProps) => {
    scannedQRCodes.push({ id: Math.random().toString(), itemValue: data });
    setScannedQRs(scannedQRCodes);
    setScanned(true);
    console.log(`scannedQRCodes ${JSON.stringify(scannedQRCodes)}`);
    //console.log("scanned array = " + scannedQRs);
    // navigation.navigate("ScannedItemScreen", {
    //   scannedQRCode: data,
    //   scannedType: type
    // })
  };

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  const removeItem = (itemId: String) => {
    console.log(`removeItem(), to remove = ${itemId}`);
    // var index = scannedQRCodes.indexOf(itemToRemove);
    // if (index !== -1) {
    //   scannedQRCodes.splice(index, 1);
    //   setScannedQRs(scannedQRCodes);
    // }
    const filteredData = scannedQRCodes.filter((item) => item.id !== itemId);
    scannedQRCodes = filteredData;
    setScannedQRs(filteredData);
  };

  const renderScannedItem = ({ item }: any) => {
    return (
      <ScannedItem
        id={item.id}
        data={item.itemValue}
        remove={() => {
          removeItem(item.id);
        }}
        open={() => openLink(item.itemValue)}
      />
    );
  };

  const openLink = async (url: string) => {
    if (url.includes('https://')) {
      Linking.openURL(url);
    } else {
      Alert.alert('Invalid URL', 'This is not a valid url', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };
  return (
    <>
      <View style={styles.container}>
        {hasPermission ? (
          <>
            {scanned ? (
              <View style={styles.flatlistContainer}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 30 }}>
                    Scanned Item{scannedQRCodes.length > 1 ? 's' : ''}
                  </Text>
                </View>

                <FlatList
                  data={scannedQRCodes}
                  renderItem={renderScannedItem}
                  keyExtractor={(item) => item.id}
                />
                <View style={{ marginTop: 10 }}>
                  <Button
                    title='Scan Again'
                    onPress={() => setScanned(false)}
                  />
                </View>
              </View>
            ) : (
              <Camera
                style={styles.camera}
                ref={cameraRef}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              >
                <View // this takes up whole screen and centers the square
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View // main container
                    style={{
                      height: 300,
                      width: 300,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            height: 10,
                            width: 30,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                        <View
                          style={{
                            height: 10,
                            width: 30,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            height: 20,
                            width: 10,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                        <View
                          style={{
                            height: 20,
                            width: 10,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                      </View>
                    </View>

                    {/* <Animated.View style={[{ opacity: fadeAnim }]}> */}
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'red',
                      }}
                    />
                    {/* </Animated.View> */}

                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            height: 20,
                            width: 10,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                        <View
                          style={{
                            height: 20,
                            width: 10,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            height: 10,
                            width: 30,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                        <View
                          style={{
                            height: 10,
                            width: 30,
                            backgroundColor: '#000000',
                          }}
                        ></View>
                      </View>
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </>
        ) : (
          // <View style={styles.container}>
          //   <Text style={{ textAlign: 'center' }}>Start Scanning</Text>
          //   <Button onPress={() => setShowQRCodeScanner(true)} title="Start Scanning" />
          // </View>
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>
              You don't have camera permission
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  cameraContainer: {},
  camera: {
    height: '100%',
  },
  flatlistContainer: {},

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  top: {},
});
