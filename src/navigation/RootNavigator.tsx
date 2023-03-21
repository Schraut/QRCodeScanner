import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  QRCodeScannerScreen: undefined;
};
// undefined means that the route doesn't have params

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen
        options={{
          headerTitle: "HomeScreen",
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

    </Stack.Navigator>
  );
};
