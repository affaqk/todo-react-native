import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const team = [
  { name: 'Alex Johnson', role: 'Founder & CEO' },
  { name: 'Sarah Lee', role: 'Lead Designer' },
  { name: 'Marcus Chen', role: 'Senior Developer' },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>✓</Text>
          </View>
          <Text style={styles.appName}>MyTodos</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.body}>
            MyTodos is a simple, clean productivity app designed to help you stay on top of your
            daily tasks. Organize your life one task at a time — add, complete, edit, and remove
            todos with ease.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.body}>
            We believe that staying organized should be effortless. Our goal is to give you a
            distraction-free experience that puts your tasks front and center.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>The Team</Text>
          {team.map((member, index) => (
            <View key={index} style={[styles.memberRow, index < team.length - 1 && styles.memberBorder]}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:affaq020@gmail.com')}>
            <Text style={styles.link}>affaq020@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 30 },
  hero: { alignItems: 'center', marginBottom: 28 },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  logoText: { fontSize: 38, color: '#fff' },
  appName: { fontSize: 26, fontWeight: '700', color: '#1a1a1a' },
  version: { fontSize: 13, color: '#aaa', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  body: { fontSize: 15, color: '#555', lineHeight: 22 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  memberBorder: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#4f46e5' },
  memberName: { fontSize: 15, fontWeight: '600', color: '#1a1a1a' },
  memberRole: { fontSize: 13, color: '#888', marginTop: 2 },
  link: { fontSize: 15, color: '#4f46e5', textDecorationLine: 'underline' },
});
