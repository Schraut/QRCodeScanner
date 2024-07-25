import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/navigation/BottomTabsNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
    // </Provider>
  );
}
