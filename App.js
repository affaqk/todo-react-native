import { useState, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';

import { CartProvider, useCart } from './context/CartContext';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

ExpoSplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Restaurant" component={RestaurantScreen} />
    </HomeStack.Navigator>
  );
}

function TabNavigator() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const map = { Order: '🏠', Cart: '🛒', Profile: '👤' };
          return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{map[route.name]}</Text>;
        },
        tabBarActiveTintColor: '#FF385C',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      })}
    >
      <Tab.Screen name="Order" component={HomeStackNavigator} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: totalItems > 0 ? totalItems : undefined }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAppReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) await ExpoSplashScreen.hideAsync();
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
      <CartProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
