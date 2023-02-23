import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScannedItem from '../components/ScannedItem';
import { ScannedItemModal } from '../components/ScannedItemModal';

var keyGenerator = 0;
// array to hold scanned qr codes
var scannedQRCodes = [];
export default function QRCodeScannerScreen({ navigation }) {

  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);

  const [scanned, setScanned] = useState(false);

  const [scannedQRs, setScannedQRs] = useState([]);


  const [modalVisible, setModalVisible] = useState(false);

  const [scannedInfo, setScannedInfo] = useState("default");


  useEffect(() => {
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

  // const handleBarCodeScanned = ({ type, data }) => {
  //   // console.log("data = " + data);
  //   // console.log("type = " + type);
  //   setScanned(true);

  // };

  const handleBarCodeScanned = ({ type, data }) => {

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


  const removeItem = (itemId) => {
    console.log(`removeItem(), to remove = ${itemId}`)
    // var index = scannedQRCodes.indexOf(itemToRemove);
    // if (index !== -1) {
    //   scannedQRCodes.splice(index, 1);
    //   setScannedQRs(scannedQRCodes);
    // }
    const filteredData = scannedQRCodes.filter(item => item.id !== itemId);
    scannedQRCodes = filteredData;
    setScannedQRs(filteredData);
  }

  const renderScannedItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { setScannedInfo(item.itemValue); setModalVisible(true); }}>
        <ScannedItem
          id={item.id}
          data={item.itemValue}
          onPress={() => { removeItem(item.id); }} />
      </TouchableOpacity>
    )

  }
  return (
    <>

      <View style={styles.container}>

        {hasPermission ?
          <>
            {scanned ?
              <View style={styles.flatlistContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 30 }}>Scanned Item{scannedQRCodes.length > 1 ? "s" : ""}</Text>
                </View>

                <FlatList
                  data={scannedQRCodes}
                  renderItem={renderScannedItem}
                  keyExtractor={(item) => item.id}
                />
                <View style={{ marginTop: 10 }} >
                  <Button title="Scan Again" onPress={() => setScanned(false)} />
                </View>

              </View>

              :
              <View style={styles.cameraContainer}>
                {/* <View style={styles.top}></View> */}
                <BarCodeScanner style={styles.camera} ref={cameraRef} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
        <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity> */}
                  </View>
                </BarCodeScanner>
              </View>
            }

          </>
          :
          // <View style={styles.container}>
          //   <Text style={{ textAlign: 'center' }}>Start Scanning</Text>
          //   <Button onPress={() => setShowQRCodeScanner(true)} title="Start Scanning" />
          // </View>
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>You don't have camera permission</Text>
          </View>
        }
      </View>
      <ScannedItemModal modalVisible={modalVisible} closeModal={() => setModalVisible(false)} scanned={scannedInfo} />
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  flatlistContainer: {

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
    fontWeight: 'bold',
    color: 'white',
  },
});
