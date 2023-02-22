import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen";
import ScannedItemScreen from "../screens/ScannedItemScreen";


const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        options={{
          headerTitle: "Home",
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "QRCodeScannerScreen",
        }}
        name="QRCodeScannerScreen"
        component={QRCodeScannerScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "ScannedItemScreen",
        }}
        name="ScannedItemScreen"
        component={ScannedItemScreen}
      />
    </Stack.Navigator>
  );
};
