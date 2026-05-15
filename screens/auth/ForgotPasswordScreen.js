import { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Field } from './LoginScreen';

const STEPS = { EMAIL: 'EMAIL', SENT: 'SENT' };

export default function ForgotPasswordScreen({ navigation }) {
  const { forgotPassword } = useAuth();
  const [email, setEmail]   = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep]     = useState(STEPS.EMAIL);

  const handleSend = async () => {
    if (!email.trim())                    { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email))     { setError('Enter a valid email'); return; }
    setLoading(true);
    try {
      await forgotPassword(email.trim().toLowerCase());
      setStep(STEPS.SENT);
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'Failed to send reset code.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.bigEmoji}>{step === STEPS.SENT ? '📬' : '🔐'}</Text>
            <Text style={styles.headerTitle}>
              {step === STEPS.SENT ? 'Check Your Email' : 'Forgot Password?'}
            </Text>
            <Text style={styles.headerSub}>
              {step === STEPS.SENT
                ? `We sent a 6-digit code to\n${email}`
                : "No worries! Enter your email and we'll send a reset code"}
            </Text>
          </LinearGradient>

          <View style={styles.card}>
            {step === STEPS.EMAIL ? (
              <>
                <Field
                  label="Email Address"
                  icon="📧"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={t => { setEmail(t); setError(''); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={error}
                />

                <TouchableOpacity style={styles.primaryBtn} onPress={handleSend} disabled={loading} activeOpacity={0.85}>
                  <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
                    {loading
                      ? <ActivityIndicator color="#fff" />
                      : <Text style={styles.primaryBtnText}>Send Reset Code</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.successBox}>
                  <Text style={styles.successText}>
                    Didn't receive it?{' '}
                    <Text style={styles.resendLink} onPress={() => { setStep(STEPS.EMAIL); }}>
                      Try again
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => navigation.navigate('Otp', { email: email.trim().toLowerCase(), mode: 'reset' })}
                  activeOpacity={0.85}
                >
                  <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
                    <Text style={styles.primaryBtnText}>Enter Code</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backToLoginText}>← Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  scroll: { flexGrow: 1 },

  header: { paddingTop: 20, paddingBottom: 40, alignItems: 'center', paddingHorizontal: 24 },
  backBtn: { position: 'absolute', top: 20, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 26, color: '#fff', lineHeight: 32, marginLeft: -2 },
  bigEmoji: { fontSize: 56, marginBottom: 14 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center' },
  headerSub: { fontSize: 14, color: '#ffffffcc', textAlign: 'center', lineHeight: 20 },

  card: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -18, padding: 26, flex: 1 },

  primaryBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 16, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  primaryBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  successBox: { backgroundColor: '#fff5f5', borderRadius: 12, padding: 16, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#FF385C' },
  successText: { fontSize: 14, color: '#555', lineHeight: 21 },
  resendLink: { color: '#FF385C', fontWeight: '700' },

  backToLogin: { alignItems: 'center', marginTop: 8 },
  backToLoginText: { fontSize: 14, color: '#FF385C', fontWeight: '600' },
});
