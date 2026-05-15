import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import TodoScreen from './screens/TodoScreen';
import AboutScreen from './screens/AboutScreen';
import TermsScreen from './screens/TermsScreen';

const Tab = createBottomTabNavigator();

const icons = {
  Todos: '☑',
  About: 'ℹ',
  Terms: '📄',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: () => (
              <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>
            ),
            tabBarActiveTintColor: '#4f46e5',
            tabBarInactiveTintColor: '#aaa',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopColor: '#eee',
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen name="Todos" component={TodoScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Terms" component={TermsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
