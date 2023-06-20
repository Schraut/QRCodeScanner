import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='qr-code-outline' size={24} color='black' />
            ) : (
              <Ionicons name='qr-code-outline' size={24} color='grey' />
            ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='settings-sharp' size={24} color='black' />
            ) : (
              <Ionicons name='settings-outline' size={24} color='grey' />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
