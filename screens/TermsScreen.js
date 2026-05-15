import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By downloading or using MyTodos, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the app.',
  },
  {
    title: '2. Use of the App',
    body: 'MyTodos is provided for personal, non-commercial use. You agree not to misuse the app, attempt to gain unauthorized access, or use it for any unlawful purpose.',
  },
  {
    title: '3. Data & Privacy',
    body: 'All your tasks are stored locally on your device. We do not collect, transmit, or share your personal data or task information with any third parties.',
  },
  {
    title: '4. Intellectual Property',
    body: 'All content, design, and code within MyTodos are the intellectual property of the MyTodos team. You may not reproduce, distribute, or create derivative works without prior written permission.',
  },
  {
    title: '5. Disclaimer of Warranties',
    body: 'The app is provided "as is" without any warranties of any kind. We do not guarantee that the app will be error-free, secure, or available at all times.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the maximum extent permitted by law, the MyTodos team shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app.',
  },
  {
    title: '7. Changes to Terms',
    body: 'We reserve the right to modify these terms at any time. Continued use of the app after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: '8. Contact',
    body: 'If you have any questions about these Terms and Conditions, please contact us at affaq020@gmail.com.',
  },
];

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Terms & Conditions</Text>
        <Text style={styles.lastUpdated}>Last updated: May 15, 2026</Text>

        <View style={styles.intro}>
          <Text style={styles.introText}>
            Please read these Terms and Conditions carefully before using MyTodos. These terms
            govern your use of the application.
          </Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 30 },
  pageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  lastUpdated: { fontSize: 13, color: '#aaa', marginBottom: 20 },
  intro: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
  },
  introText: { fontSize: 14, color: '#4f46e5', lineHeight: 21 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  body: { fontSize: 14, color: '#555', lineHeight: 22 },
});
