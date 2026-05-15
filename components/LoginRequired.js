import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginRequired({ navigation, message }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>🔒</Text>
      </View>
      <Text style={styles.title}>Login Required</Text>
      <Text style={styles.sub}>{message ?? 'Please sign in to access this feature.'}</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.85}>
        <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.loginBtnGrad}>
          <Text style={styles.loginBtnText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('Signup')} activeOpacity={0.85}>
        <Text style={styles.signupBtnText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36, backgroundColor: '#f7f7f7' },
  iconWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff0f3', alignItems: 'center', justifyContent: 'center', marginBottom: 20, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 },
  icon: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  sub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21, marginBottom: 32 },
  loginBtn: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 12, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  loginBtnGrad: { paddingVertical: 15, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  signupBtn: { width: '100%', borderRadius: 14, borderWidth: 2, borderColor: '#FF385C', paddingVertical: 14, alignItems: 'center' },
  signupBtnText: { color: '#FF385C', fontSize: 16, fontWeight: '700' },
});
