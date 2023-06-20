import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { BottomTabsNavigator } from './src/navigation/BottomTabsNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
}
