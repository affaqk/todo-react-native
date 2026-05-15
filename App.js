import { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import * as ExpoSplashScreen from 'expo-splash-screen';

import TodoScreen from './screens/TodoScreen';
import AboutScreen from './screens/AboutScreen';
import TermsScreen from './screens/TermsScreen';
import SplashScreen from './screens/SplashScreen';

// Keep the native splash visible until we're ready
ExpoSplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const icons = {
  Todos: '☑',
  About: 'ℹ',
  Terms: '📄',
};

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Simulate asset loading / initialization work
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAppReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;

  if (!splashDone) {
    return (
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <SplashScreen onFinish={() => setSplashDone(true)} />
      </SafeAreaProvider>
    );
  }

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
