import { useState, useCallback, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';

import { AuthProvider, useAuth }  from './context/AuthContext';
import { CartProvider, useCart }  from './context/CartContext';

// Screens
import SplashScreen         from './screens/SplashScreen';
import HomeScreen           from './screens/HomeScreen';
import RestaurantScreen     from './screens/RestaurantScreen';
import CartScreen           from './screens/CartScreen';
import ProfileScreen        from './screens/ProfileScreen';

// Auth screens
import LoginScreen          from './screens/auth/LoginScreen';
import SignupScreen         from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import OtpScreen            from './screens/auth/OtpScreen';
import ResetPasswordScreen  from './screens/auth/ResetPasswordScreen';

ExpoSplashScreen.preventAutoHideAsync();

const Tab       = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Root      = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home"       component={HomeScreen} />
      <HomeStack.Screen name="Restaurant" component={RestaurantScreen} />
    </HomeStack.Navigator>
  );
}

function BottomTabs() {
  const { totalItems } = useCart();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const map = { Order: '🏠', Cart: '🛒', Profile: '👤' };
          return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{map[route.name]}</Text>;
        },
        tabBarActiveTintColor: '#FF385C',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#f0f0f0', height: 64, paddingBottom: 10, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      })}
    >
      <Tab.Screen name="Order"   component={HomeStackNavigator} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: totalItems > 0 ? totalItems : undefined }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root navigator — always shows main tabs, auth screens slide on top when !user
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={s.loading}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {/* Main app — always accessible for browsing */}
      <Root.Screen name="Main" component={BottomTabs} />

      {/* Auth screens — only in the stack when user is NOT logged in */}
      {!user && (
        <Root.Group screenOptions={{ animation: 'slide_from_right' }}>
          <Root.Screen name="Login"         component={LoginScreen} />
          <Root.Screen name="Signup"        component={SignupScreen} />
          <Root.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Root.Screen name="Otp"           component={OtpScreen} />
          <Root.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Root.Group>
      )}
    </Root.Navigator>
  );
}

export default function App() {
  const [appReady, setAppReady]   = useState(false);
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
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f7' },
});
