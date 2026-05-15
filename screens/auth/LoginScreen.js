import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim())                     e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email';
    if (!password)                         e.password = 'Password is required';
    else if (password.length < 6)         e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      // user state updates → auth screens unmount automatically
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'Login failed. Please try again.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSub}>Sign in to order your favourites</Text>
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Sign In</Text>

            <Field
              label="Email Address"
              icon="📧"
              placeholder="you@example.com"
              value={email}
              onChangeText={t => { setEmail(t); setErrors(e => ({ ...e, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Field
              label="Password"
              icon="🔒"
              placeholder="Enter your password"
              value={password}
              onChangeText={t => { setPassword(t); setErrors(e => ({ ...e, password: '' })); }}
              secureTextEntry={!showPass}
              error={errors.password}
              rightAction={
                <TouchableOpacity onPress={() => setShowPass(v => !v)}>
                  <Text style={styles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              }
            />

            <TouchableOpacity style={styles.forgotWrap} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
              <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.primaryBtnText}>Sign In</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <Divider />

            {/* Social buttons (UI only) */}
            <View style={styles.socialRow}>
              <SocialBtn emoji="🇬" label="Google" />
              <SocialBtn emoji="🔵" label="Facebook" />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.switchLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Shared sub-components ───────────────────────────────────────────────────

export function Field({ label, icon, error, rightAction, ...props }) {
  return (
    <View style={fStyles.wrap}>
      <Text style={fStyles.label}>{label}</Text>
      <View style={[fStyles.inputRow, error && fStyles.inputRowError]}>
        {icon && <Text style={fStyles.icon}>{icon}</Text>}
        <TextInput style={fStyles.input} placeholderTextColor="#bbb" {...props} />
        {rightAction}
      </View>
      {error ? <Text style={fStyles.error}>{error}</Text> : null}
    </View>
  );
}

export function Divider() {
  return (
    <View style={dStyles.row}>
      <View style={dStyles.line} />
      <Text style={dStyles.text}>or continue with</Text>
      <View style={dStyles.line} />
    </View>
  );
}

function SocialBtn({ emoji, label }) {
  return (
    <TouchableOpacity style={sStyles.btn} activeOpacity={0.8}>
      <Text style={sStyles.emoji}>{emoji}</Text>
      <Text style={sStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  scroll: { flexGrow: 1 },

  header: { paddingTop: 30, paddingBottom: 36, alignItems: 'center', paddingHorizontal: 24 },
  logoBox: { width: 72, height: 72, borderRadius: 22, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center', marginBottom: 14, borderWidth: 1.5, borderColor: '#ffffff55' },
  logoEmoji: { fontSize: 38 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 6 },
  headerSub: { fontSize: 14, color: '#ffffffcc' },

  form: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -18, padding: 26, flex: 1, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 8 },
  formTitle: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', marginBottom: 22 },

  forgotWrap: { alignSelf: 'flex-end', marginBottom: 22, marginTop: -8 },
  forgotText: { fontSize: 13, color: '#FF385C', fontWeight: '600' },

  primaryBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 22, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  primaryBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  eyeIcon: { fontSize: 20 },

  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  switchText: { fontSize: 14, color: '#888' },
  switchLink: { fontSize: 14, color: '#FF385C', fontWeight: '700' },
});

const fStyles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, borderWidth: 1.5, borderColor: '#f0f0f0', gap: 10 },
  inputRowError: { borderColor: '#FF385C' },
  icon: { fontSize: 18 },
  input: { flex: 1, fontSize: 15, color: '#1a1a1a' },
  error: { fontSize: 12, color: '#FF385C', marginTop: 4 },
});

const dStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 10 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  text: { fontSize: 12, color: '#aaa' },
});

const sStyles = StyleSheet.create({
  btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: '#eee', borderRadius: 12, paddingVertical: 13, backgroundColor: '#fff' },
  emoji: { fontSize: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
});
