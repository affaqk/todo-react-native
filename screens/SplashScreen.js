import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  top: Math.random() * height,
  left: Math.random() * width,
  size: Math.random() * 10 + 6,
  delay: Math.random() * 1500,
  duration: Math.random() * 2000 + 2500,
}));

const FOOD_ICONS = ['🍔', '🍕', '🍣', '🥤', '🍜', '🌮', '🍩', '🥗'];

function Bubble({ top, left, size, delay, duration }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.45, duration: duration / 2, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.05, duration: duration / 2, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(translateY, { toValue: -20, duration: duration / 2, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
          ]),
        ]),
      ])
    ).start();
  }, []);
  return (
    <Animated.View
      style={[styles.bubble, { top, left, width: size, height: size, borderRadius: size / 2, opacity, transform: [{ translateY }] }]}
    />
  );
}

export default function SplashScreen({ onFinish }) {
  const bg      = useRef(new Animated.Value(0)).current;
  const logo    = useRef(new Animated.Value(0)).current;
  const logoSc  = useRef(new Animated.Value(0.2)).current;
  const ring    = useRef(new Animated.Value(0)).current;
  const ringSc  = useRef(new Animated.Value(0.2)).current;
  const title   = useRef(new Animated.Value(0)).current;
  const titleY  = useRef(new Animated.Value(30)).current;
  const sub     = useRef(new Animated.Value(0)).current;
  const icons   = useRef(new Animated.Value(0)).current;
  const exit    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bg, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.parallel([
        Animated.spring(logoSc, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
        Animated.timing(logo,   { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(ringSc, { toValue: 1.5, tension: 38, friction: 6, useNativeDriver: true }),
        Animated.timing(ring,   { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(title,  { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]),
      Animated.timing(sub,   { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.timing(icons, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(900),
      Animated.timing(exit, { toValue: 0, duration: 480, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: exit }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bg }]}>
        <LinearGradient
          colors={['#FF385C', '#FF6B35', '#FFAD00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {BUBBLES.map(b => <Bubble key={b.id} {...b} />)}

        {/* top blob */}
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />

        <View style={styles.center}>
          {/* glow ring */}
          <Animated.View style={[styles.ring, { opacity: ring, transform: [{ scale: ringSc }] }]} />

          {/* logo */}
          <Animated.View style={[styles.logoWrap, { opacity: logo, transform: [{ scale: logoSc }] }]}>
            <LinearGradient colors={['#ffffff30', '#ffffff55']} style={styles.logoGrad}>
              <Text style={styles.logoIcon}>🍽️</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.Text style={[styles.appName, { opacity: title, transform: [{ translateY: titleY }] }]}>
            FoodDash
          </Animated.Text>

          <Animated.Text style={[styles.tagline, { opacity: sub }]}>
            Cravings delivered fast 🚀
          </Animated.Text>

          {/* food icon strip */}
          <Animated.View style={[styles.iconStrip, { opacity: icons }]}>
            {FOOD_ICONS.map((ic, i) => (
              <Text key={i} style={styles.foodIcon}>{ic}</Text>
            ))}
          </Animated.View>
        </View>

        <Animated.Text style={[styles.footer, { opacity: sub }]}>
          Made with ❤️ for food lovers
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bubble: { position: 'absolute', backgroundColor: '#fff' },
  blobTop: {
    position: 'absolute', top: -100, right: -80,
    width: width * 0.8, height: 280, borderRadius: 140,
    backgroundColor: '#ffffff15', transform: [{ rotate: '20deg' }],
  },
  blobBottom: {
    position: 'absolute', bottom: -80, left: -60,
    width: width * 0.85, height: 220, borderRadius: 110,
    backgroundColor: '#ffffff10', transform: [{ rotate: '-8deg' }],
  },
  ring: {
    position: 'absolute',
    width: 180, height: 180, borderRadius: 90,
    borderWidth: 2, borderColor: '#fff',
    backgroundColor: '#ffffff18',
  },
  logoWrap: {
    width: 120, height: 120, borderRadius: 36,
    overflow: 'hidden', marginBottom: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35, shadowRadius: 22,
    elevation: 18,
  },
  logoGrad: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#ffffff50', borderRadius: 36,
  },
  logoIcon: { fontSize: 62 },
  appName: {
    fontSize: 46, fontWeight: '800', color: '#fff',
    letterSpacing: 1.5, marginBottom: 8,
  },
  tagline: {
    fontSize: 16, color: '#ffe0b2', letterSpacing: 0.4, marginBottom: 28,
  },
  iconStrip: {
    flexDirection: 'row', gap: 10,
    backgroundColor: '#ffffff20',
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 30,
  },
  foodIcon: { fontSize: 22 },
  footer: {
    position: 'absolute', bottom: 46, alignSelf: 'center',
    fontSize: 13, color: '#ffe0c0', letterSpacing: 0.4,
  },
});
