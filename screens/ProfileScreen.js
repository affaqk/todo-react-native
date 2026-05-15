import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginRequired from '../components/LoginRequired';

const menuItems = [
  { icon: '📦', label: 'My Orders', sub: 'Track and reorder meals' },
  { icon: '📍', label: 'Saved Addresses', sub: 'Home, Work and more' },
  { icon: '💳', label: 'Payment Methods', sub: 'Cards and wallets' },
  { icon: '❤️', label: 'Favourites', sub: 'Your saved restaurants' },
  { icon: '🎁', label: 'Vouchers & Offers', sub: 'Redeem promo codes' },
  { icon: '⭐', label: 'Rate the App', sub: 'Tell us what you think' },
  { icon: '🔔', label: 'Notifications', sub: 'Manage alerts' },
  { icon: '🔒', label: 'Privacy & Security', sub: 'Account settings' },
  { icon: '💬', label: 'Help & Support', sub: 'FAQs and chat support' },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Text style={styles.header}>Profile</Text>
        <LoginRequired navigation={navigation} message="Sign in to view your profile, orders and more." />
      </SafeAreaView>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => { await logout(); clearCart(); } },
    ]);
  };

  const roleBadge = user.role === 'admin' ? '👑 Admin' : '🌟 Member';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Profile</Text>

        {/* Avatar card */}
        <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>{roleBadge}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileIcon}>✎</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard emoji="📦" value="24" label="Orders" />
          <StatCard emoji="❤️" value="8" label="Favourites" />
          <StatCard emoji="⭐" value="4.8" label="Avg Rating" />
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuRow, i < menuItems.length - 1 && styles.menuRowBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>{item.icon}</Text>
              </View>
              <View style={styles.menuLabel}>
                <Text style={styles.menuLabelText}>{item.label}</Text>
                <Text style={styles.menuSubText}>{item.sub}</Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>FoodDash v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ emoji, value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  scroll: { paddingBottom: 30 },
  header: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginHorizontal: 18, marginTop: 10, marginBottom: 16 },

  profileCard: { marginHorizontal: 16, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14, shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  avatarWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff33', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff66' },
  avatarText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 2 },
  profileEmail: { fontSize: 13, color: '#ffffffbb', marginBottom: 6 },
  memberBadge: { backgroundColor: '#ffffff25', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start' },
  memberBadgeText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  editProfileBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ffffff25', alignItems: 'center', justifyContent: 'center' },
  editProfileIcon: { fontSize: 18, color: '#fff' },

  statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1a1a1a', marginBottom: 2 },
  statLabel: { fontSize: 11, color: '#aaa' },

  menuCard: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 18, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#fff5f5', alignItems: 'center', justifyContent: 'center' },
  menuIconText: { fontSize: 20 },
  menuLabel: { flex: 1 },
  menuLabelText: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginBottom: 1 },
  menuSubText: { fontSize: 12, color: '#aaa' },
  menuChevron: { fontSize: 22, color: '#ccc', fontWeight: '300' },

  logoutBtn: { marginHorizontal: 16, borderRadius: 14, borderWidth: 1.5, borderColor: '#FF385C', paddingVertical: 14, alignItems: 'center', marginBottom: 14 },
  logoutText: { color: '#FF385C', fontWeight: '700', fontSize: 15 },

  version: { textAlign: 'center', color: '#ccc', fontSize: 12, marginBottom: 10 },
});
