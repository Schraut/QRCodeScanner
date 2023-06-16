import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ScannedItem } from '../components/ScannedItem';
import { LinearGradientBackground } from '../components/LinearGradientBackground';
import ScannerFrame from '../components/ScannerFrame';

// Array that will hold scanned qr codes
var scannedQRCodes: { id: String; itemValue: String }[] = [];

const dummyData = [
  { id: 1, itemValue: 'www.google.com' },
  { id: 2, itemValue: 'https://reactnative.dev/docs/flatlist' },
  { id: 3, itemValue: 'https://docs.expo.dev/versions/latest/sdk/sharing/' },
  { id: 4, itemValue: 'www.google.com' },
];

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
      <LinearGradientBackground />
      {hasPermission ? (
        <>
          {scanned ? (
            <View style={styles.flatlistContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>
                  Scanned Item{scannedQRCodes.length > 1 ? 's' : ''}
                </Text>
              </View>

              <FlatList
                // data={dummyData}
                data={scannedQRCodes}
                renderItem={({ item }) => (
                  <ScannedItem
                    id={item.id}
                    data={item.itemValue}
                    remove={() => {
                      removeItem(item.id);
                    }}
                    open={() => openLink(item.itemValue)}
                  />
                )}
                keyExtractor={(item) => item.id}
              />

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 40,
                  alignItems: 'center',
                }}
              >
                <Pressable onPress={() => setScanned(false)}>
                  <Ionicons name='scan-circle-sharp' size={60} color='black' />
                </Pressable>

                <Text>Scan Again</Text>
              </View>
            </View>
          ) : (
            <Camera
              style={styles.camera}
              ref={cameraRef}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
              <ScannerFrame />
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
    </>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {},
  camera: {
    height: '100%',
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 20,
  },

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
