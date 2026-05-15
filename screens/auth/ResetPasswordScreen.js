import { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Field } from './LoginScreen';

export default function ResetPasswordScreen({ navigation, route }) {
  const { email, otp } = route.params;
  const { resetPassword } = useAuth();

  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [errors, setErrors]         = useState({});
  const [done, setDone]             = useState(false);

  const validate = () => {
    const e = {};
    if (!password)               e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    if (password !== confirm)    e.confirm  = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword: password });
      setDone(true);
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message ?? 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <LinearGradient colors={['#FF385C', '#FF6B35']} style={styles.header}>
          <Text style={styles.bigEmoji}>🎉</Text>
          <Text style={styles.headerTitle}>Password Reset!</Text>
          <Text style={styles.headerSub}>Your password has been updated successfully</Text>
        </LinearGradient>
        <View style={styles.card}>
          <View style={styles.successIllustration}>
            <Text style={styles.successCircleEmoji}>✅</Text>
          </View>
          <Text style={styles.successTitle}>All Done!</Text>
          <Text style={styles.successSub}>You can now sign in with your new password.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.85}>
            <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
              <Text style={styles.primaryBtnText}>Back to Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.bigEmoji}>🔒</Text>
            <Text style={styles.headerTitle}>New Password</Text>
            <Text style={styles.headerSub}>Set a strong password for your account</Text>
          </LinearGradient>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create New Password</Text>

            <Field
              label="New Password"
              icon="🔒"
              placeholder="Enter new password"
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

            <Field
              label="Confirm New Password"
              icon="🔒"
              placeholder="Repeat new password"
              value={confirm}
              onChangeText={t => { setConfirm(t); setErrors(e => ({ ...e, confirm: '' })); }}
              secureTextEntry={!showConfirm}
              error={errors.confirm}
              rightAction={
                <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                  <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              }
            />

            {/* Password rules */}
            <View style={styles.rulesBox}>
              {[
                ['6+ characters', password.length >= 6],
                ['Uppercase letter', /[A-Z]/.test(password)],
                ['Number included', /\d/.test(password)],
              ].map(([rule, passed]) => (
                <View key={rule} style={styles.ruleRow}>
                  <Text style={[styles.ruleDot, passed && styles.ruleDotPassed]}>{passed ? '✓' : '○'}</Text>
                  <Text style={[styles.ruleText, passed && styles.ruleTextPassed]}>{rule}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleReset} disabled={loading} activeOpacity={0.85}>
              <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.primaryBtnText}>Reset Password</Text>}
              </LinearGradient>
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
  bigEmoji: { fontSize: 52, marginBottom: 12 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 6 },
  headerSub: { fontSize: 14, color: '#ffffffcc', textAlign: 'center' },

  card: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -18, padding: 26, flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginBottom: 20 },

  eyeIcon: { fontSize: 20 },

  rulesBox: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 14, marginBottom: 20, gap: 8 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleDot: { fontSize: 14, color: '#ccc', width: 20, textAlign: 'center' },
  ruleDotPassed: { color: '#22c55e' },
  ruleText: { fontSize: 13, color: '#aaa' },
  ruleTextPassed: { color: '#22c55e', fontWeight: '600' },

  primaryBtn: { borderRadius: 14, overflow: 'hidden', shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  primaryBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  successIllustration: { alignItems: 'center', paddingVertical: 30 },
  successCircleEmoji: { fontSize: 80 },
  successTitle: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', textAlign: 'center', marginBottom: 8 },
  successSub: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 28, lineHeight: 21 },
});
