import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import CodesScreen from '../screens/Codes';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name='Scanner'
        component={QRCodeScannerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='qr-code-outline' size={24} color='black' />
            ) : (
              <Ionicons name='qr-code-outline' size={24} color='grey' />
            ),
        }}
      />
      <Tab.Screen
        name='Codes'
        component={CodesScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name='list' size={24} color='black' />
            ) : (
              <Entypo name='list' size={24} color='grey' />
            ),
        }}
      />
      <Tab.Screen
        name='About'
        component={AboutScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name='infocirlce' size={24} color='black' />
            ) : (
              <AntDesign name='infocirlce' size={24} color='grey' />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
