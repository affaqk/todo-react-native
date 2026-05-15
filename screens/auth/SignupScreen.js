import { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Field, Divider } from './LoginScreen';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                              e.name    = 'Full name is required';
    if (!form.email.trim())                             e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))         e.email   = 'Enter a valid email';
    if (!form.phone.trim())                             e.phone   = 'Phone number is required';
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone   = 'Enter a valid phone number';
    if (!form.password)                                 e.password = 'Password is required';
    else if (form.password.length < 6)                 e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm)                e.confirm = 'Passwords do not match';
    if (!agreed)                                        e.agreed  = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const strength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: '#ef4444', width: '33%' };
    if (p.length < 10 || !/[A-Z]/.test(p) || !/\d/.test(p)) return { label: 'Medium', color: '#f97316', width: '66%' };
    return { label: 'Strong', color: '#22c55e', width: '100%' };
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signup({ name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), password: form.password });
      navigation.navigate('Otp', { email: form.email.trim().toLowerCase(), mode: 'verify' });
    } catch (err) {
      const msg = err?.response?.data?.message ?? 'Signup failed. Please try again.';
      Alert.alert('Signup Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const pw = strength();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSub}>Join FoodDash and start ordering!</Text>
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Your Details</Text>

            <Field label="Full Name" icon="👤" placeholder="John Doe" value={form.name} onChangeText={t => set('name', t)} error={errors.name} autoCapitalize="words" />
            <Field label="Email Address" icon="📧" placeholder="you@example.com" value={form.email} onChangeText={t => set('email', t)} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
            <Field label="Phone Number" icon="📱" placeholder="+1 234 567 8900" value={form.phone} onChangeText={t => set('phone', t)} keyboardType="phone-pad" error={errors.phone} />

            <Field
              label="Password"
              icon="🔒"
              placeholder="Create a strong password"
              value={form.password}
              onChangeText={t => set('password', t)}
              secureTextEntry={!showPass}
              error={errors.password}
              rightAction={
                <TouchableOpacity onPress={() => setShowPass(v => !v)}>
                  <Text style={styles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              }
            />

            {/* Password strength */}
            {pw && (
              <View style={styles.strengthWrap}>
                <View style={styles.strengthBar}>
                  <View style={[styles.strengthFill, { width: pw.width, backgroundColor: pw.color }]} />
                </View>
                <Text style={[styles.strengthLabel, { color: pw.color }]}>{pw.label}</Text>
              </View>
            )}

            <Field
              label="Confirm Password"
              icon="🔒"
              placeholder="Repeat your password"
              value={form.confirm}
              onChangeText={t => set('confirm', t)}
              secureTextEntry={!showConfirm}
              error={errors.confirm}
              rightAction={
                <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                  <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              }
            />

            {/* Terms */}
            <TouchableOpacity style={styles.termsRow} onPress={() => { setAgreed(v => !v); setErrors(e => ({ ...e, agreed: '' })); }} activeOpacity={0.8}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.agreed ? <Text style={styles.errorText}>{errors.agreed}</Text> : null}

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup} disabled={loading} activeOpacity={0.85}>
              <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.primaryBtnGrad}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.primaryBtnText}>Create Account</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <Divider />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.switchLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  scroll: { flexGrow: 1 },

  header: { paddingTop: 16, paddingBottom: 36, alignItems: 'center', paddingHorizontal: 24 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 26, color: '#fff', lineHeight: 32, marginLeft: -2 },
  logoBox: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#ffffff30', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1.5, borderColor: '#ffffff55', marginTop: 10 },
  logoEmoji: { fontSize: 32 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#ffffffcc' },

  form: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -18, padding: 26, flex: 1 },
  formTitle: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginBottom: 20 },

  eyeIcon: { fontSize: 20 },

  strengthWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: -10, marginBottom: 14 },
  strengthBar: { flex: 1, height: 4, backgroundColor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' },
  strengthFill: { height: '100%', borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontWeight: '600', width: 50, textAlign: 'right' },

  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 6 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  checkboxChecked: { backgroundColor: '#FF385C', borderColor: '#FF385C' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  termsText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },
  termsLink: { color: '#FF385C', fontWeight: '600' },
  errorText: { fontSize: 12, color: '#FF385C', marginBottom: 12 },

  primaryBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 14, marginBottom: 22, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  primaryBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  switchText: { fontSize: 14, color: '#888' },
  switchLink: { fontSize: 14, color: '#FF385C', fontWeight: '700' },
});
