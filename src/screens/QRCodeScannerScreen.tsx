import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ScannedItem } from "../components/ScannedItem";
import { LinearGradientBackground } from "../components/LinearGradientBackground";
import ScannerFrame from "../components/ScannerFrame";
import { useIsFocused } from "@react-navigation/native";

// Array that will hold scanned qr codes
var scannedQRCodes: { id: String; itemValue: String }[] = [];

export default function QRCodeScannerScreen() {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  //const [permission, requestPermission] = Camera.useCameraPermissions();
  const [permission, requestPermission] = useCameraPermissions();
  // console.log(`permission? ${permission?.granted}`);
  const [hasPermission, setHasPermission] = useState(false);

  const [scanned, setScanned] = useState(false);

  const [scannedQRs, setScannedQRs] = useState<object[]>([]);

  useEffect(() => {
    getCameraPermissions();
    // if (!permission) ...

    // if (!permission.granted) ...
    //console.log(permission);
  }, []);

  const getCameraPermissions = async () => {
    console.log("await, request permission");
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log("after status");
    setHasPermission(status === "granted");
  };

  // switch()

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === (false || null)) {
  //   return <Text>No access to camera</Text>;
  // }
  // // This keeps the screen from going black on android
  if (isFocused === false) {
    console.log("User is somewhere else");
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = (type: string, data: string) => {
    let myScannedCodes = scannedQRCodes;
    //scannedQRCodes.push({ id: Math.random().toString(), itemValue: data });
    myScannedCodes.push({ id: Math.random().toString(), itemValue: data });
    //setScannedQRs(scannedQRCodes);
    setScannedQRs(myScannedCodes);
    setScanned(true);
    console.log(`scannedQRCodes ${JSON.stringify(scannedQRCodes)}`);
    //console.log("scanned array = " + scannedQRs);
    // navigation.navigate("ScannedItemScreen", {
    //   scannedQRCode: data,
    //   scannedType: type
    // })
  };

  const removeItem = (itemId: number) => {
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
    if (url.includes("https://") || url.includes("http://")) {
      Linking.openURL(url);
    } else {
      Alert.alert("Invalid URL", "This is not a valid url", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const onBarCodeScanned = (scannedData: any) => {
    console.log("scanned " + JSON.stringify(scannedData.data));
    setScanned(true);
    openLink(scannedData.data);
  };

  const scannedData = {
    type: 256,
    target: 677,
    raw: "suppp",
    data: "suppp",
    cornerPoints: [
      { y: 118.57142639160156, x: 184.85714721679688 },
      { y: 242.57142639160156, x: 169.42857360839844 },
      { y: 260.8571472167969, x: 255.14285278320312 },
      { y: 136.85714721679688, x: 270.5714416503906 },
    ],
    boundingBox: {
      size: { width: 142.2857208251953, height: 101.14286041259766 },
      origin: { y: 169.42857360839844, x: 118.57142639160156 },
    },
  };

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  if (!hasPermission) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          This app needs your permission in order to scan QR Codes.
        </Text>
        <Button onPress={openSettings} title='grant permission' />
      </View>
    );
  }

  return (
    <>
      <LinearGradientBackground />
      {hasPermission ? (
        <>
          {scanned ? (
            <View style={styles.flatlistContainer}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 30 }}>
                  Scanned Item{scannedQRCodes.length > 1 ? "s" : ""}
                </Text>
              </View>

              <FlatList
                // data={dummyData}
                data={scannedQRs}
                renderItem={(item: { id: number; itemValue: string }) => (
                  <ScannedItem
                    id={item.id}
                    data={item.itemValue}
                    remove={() => {
                      removeItem(item.id);
                    }}
                    open={() => openLink(item.itemValue)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />

              <View
                style={{
                  marginTop: 10,
                  marginBottom: 40,
                  alignItems: "center",
                }}
              >
                <Pressable onPress={() => setScanned(false)}>
                  <Ionicons name='scan-circle-sharp' size={60} color='black' />
                </Pressable>

                <Text>Scan Again</Text>
              </View>
            </View>
          ) : (
            <CameraView
              style={styles.camera}
              ref={cameraRef}
              onBarcodeScanned={(e) => onBarCodeScanned(e)}
              //onBarCodeScanned={onBarCodeScanned}
            >
              <ScannerFrame />
              <View style={{ height: 60 }}></View>
            </CameraView>
          )}
        </>
      ) : (
        // <View style={styles.container}>
        //   <Text style={{ textAlign: 'center' }}>Start Scanning</Text>
        //   <Button onPress={() => setShowQRCodeScanner(true)} title="Start Scanning" />
        // </View>
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            You don't have camera permission
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {},
  camera: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 20,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
