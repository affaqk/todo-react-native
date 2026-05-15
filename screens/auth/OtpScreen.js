import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function OtpScreen({ navigation, route }) {
  const { email, mode } = route.params; // mode: 'verify' (signup) | 'reset' (forgot password)
  const { verifyOtp, resendOtp } = useAuth();

  const [digits, setDigits]         = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading]       = useState(false);
  const [resendCountdown, setCountdown] = useState(RESEND_SECONDS);
  const [resending, setResending]   = useState(false);
  const inputRefs                   = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (resendCountdown === 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const handleDigit = (text, index) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const otp = digits.join('');

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH) { Alert.alert('Incomplete', 'Please enter the full 6-digit code.'); return; }
    setLoading(true);
    try {
      await verifyOtp({ email, otp, mode });
      if (mode === 'reset') {
        navigation.navigate('ResetPassword', { email, otp });
      }
      // For 'verify' (signup): verifyOtp sets user → auth screens unmount → user lands on app
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'Invalid or expired code. Please try again.';
      Alert.alert('Verification Failed', msg);
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendOtp({ email, mode });
      setCountdown(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message ?? 'Could not resend code.');
    } finally {
      setResending(false);
    }
  };

  const isVerify = mode === 'verify';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* Header */}
        <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.bigEmoji}>{isVerify ? '✉️' : '🔑'}</Text>
          <Text style={styles.headerTitle}>{isVerify ? 'Verify Your Email' : 'Enter Reset Code'}</Text>
          <Text style={styles.headerSub}>
            We sent a {OTP_LENGTH}-digit code to{'\n'}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Enter OTP Code</Text>
          <Text style={styles.cardSub}>The code expires in 10 minutes</Text>

          {/* OTP boxes */}
          <View style={styles.otpRow}>
            {digits.map((d, i) => (
              <TextInput
                key={i}
                ref={el => inputRefs.current[i] = el}
                style={[styles.otpBox, d && styles.otpBoxFilled]}
                value={d}
                onChangeText={t => handleDigit(t, i)}
                onKeyPress={e => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={i === 0}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, otp.length < OTP_LENGTH && styles.primaryBtnDisabled]}
            onPress={handleVerify}
            disabled={loading || otp.length < OTP_LENGTH}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={otp.length === OTP_LENGTH ? ['#FF385C', '#FF6B35'] : ['#ddd', '#ddd']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.primaryBtnGrad}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={[styles.primaryBtnText, otp.length < OTP_LENGTH && styles.primaryBtnTextDim]}>
                    {isVerify ? 'Verify Account' : 'Verify Code'}
                  </Text>}
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive it? </Text>
            {resendCountdown > 0 ? (
              <Text style={styles.countdownText}>Resend in {resendCountdown}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={resending}>
                {resending
                  ? <ActivityIndicator size="small" color="#FF385C" />
                  : <Text style={styles.resendLink}>Resend Code</Text>}
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.changeEmail} onPress={() => navigation.goBack()}>
            <Text style={styles.changeEmailText}>← Change email address</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  header: { paddingTop: 20, paddingBottom: 40, alignItems: 'center', paddingHorizontal: 24 },
  backBtn: { position: 'absolute', top: 20, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 26, color: '#fff', lineHeight: 32, marginLeft: -2 },
  bigEmoji: { fontSize: 52, marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8 },
  headerSub: { fontSize: 14, color: '#ffffffcc', textAlign: 'center', lineHeight: 21 },
  emailHighlight: { fontWeight: '700', color: '#fff' },

  card: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -18, padding: 26, flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#aaa', marginBottom: 28 },

  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 32 },
  otpBox: { width: 46, height: 56, borderRadius: 12, borderWidth: 2, borderColor: '#eee', fontSize: 22, fontWeight: '800', color: '#1a1a1a', backgroundColor: '#f8f8f8' },
  otpBoxFilled: { borderColor: '#FF385C', backgroundColor: '#fff5f5' },

  primaryBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 24, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  primaryBtnDisabled: { shadowOpacity: 0, elevation: 0 },
  primaryBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
  primaryBtnTextDim: { color: '#aaa' },

  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  resendText: { fontSize: 14, color: '#888' },
  resendLink: { fontSize: 14, color: '#FF385C', fontWeight: '700' },
  countdownText: { fontSize: 14, color: '#bbb' },

  changeEmail: { alignItems: 'center' },
  changeEmailText: { fontSize: 13, color: '#FF385C', fontWeight: '600' },
});
