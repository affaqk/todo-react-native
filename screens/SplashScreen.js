import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const DOT_COUNT = 18;
const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
  id: i,
  top: Math.random() * height,
  left: Math.random() * width,
  size: Math.random() * 8 + 4,
  delay: Math.random() * 1200,
  duration: Math.random() * 2000 + 2000,
}));

function FloatingDot({ top, left, size, delay, duration }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.5, duration: duration / 2, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.1, duration: duration / 2, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(translateY, { toValue: -16, duration: duration / 2, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: duration / 2, useNativeDriver: true }),
          ]),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.dot,
        { top, left, width: size, height: size, borderRadius: size / 2, opacity, transform: [{ translateY }] },
      ]}
    />
  );
}

export default function SplashScreen({ onFinish }) {
  const bgOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringScale   = useRef(new Animated.Value(0.3)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textSlide   = useRef(new Animated.Value(24)).current;
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // background fade in
      Animated.timing(bgOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),

      // ring pulse behind logo
      Animated.parallel([
        Animated.spring(logoScale,   { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(ringScale,   { toValue: 1.4, tension: 40, friction: 6, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 0.25, duration: 600, useNativeDriver: true }),
      ]),

      // app name slides up
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(textSlide,   { toValue: 0,  duration: 450, useNativeDriver: true }),
      ]),

      // tagline fades in
      Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),

      // pause then exit
      Animated.delay(900),
      Animated.timing(exitOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: exitOpacity }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        <LinearGradient
          colors={['#312e81', '#4f46e5', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Floating background dots */}
        {dots.map(d => (
          <FloatingDot key={d.id} {...d} />
        ))}

        {/* Bottom wave decoration */}
        <View style={styles.waveBottom} />
        <View style={styles.waveTop} />

        {/* Center content */}
        <View style={styles.center}>

          {/* Glow ring */}
          <Animated.View
            style={[styles.ring, { transform: [{ scale: ringScale }], opacity: ringOpacity }]}
          />

          {/* Logo circle */}
          <Animated.View
            style={[styles.logoWrap, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}
          >
            <LinearGradient
              colors={['#ffffff22', '#ffffff44']}
              style={styles.logoGradient}
            >
              <Text style={styles.logoIcon}>✓</Text>
            </LinearGradient>
          </Animated.View>

          {/* App name */}
          <Animated.Text
            style={[
              styles.appName,
              { opacity: textOpacity, transform: [{ translateY: textSlide }] },
            ]}
          >
            MyTodos
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
            Stay organized. Stay ahead.
          </Animated.Text>

          {/* Divider dots */}
          <Animated.View style={[styles.dividerRow, { opacity: tagOpacity }]}>
            {[0, 1, 2].map(i => (
              <View key={i} style={[styles.dividerDot, i === 1 && styles.dividerDotLarge]} />
            ))}
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.Text style={[styles.footer, { opacity: tagOpacity }]}>
          Made with ♥
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  waveBottom: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: width + 80,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#ffffff12',
    transform: [{ rotate: '-5deg' }],
  },
  waveTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: width * 0.85,
    height: 220,
    borderRadius: 120,
    backgroundColor: '#ffffff0a',
    transform: [{ rotate: '15deg' }],
  },
  ring: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ffffff15',
  },
  logoWrap: {
    width: 110,
    height: 110,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff55',
    borderRadius: 32,
  },
  logoIcon: {
    fontSize: 58,
    color: '#fff',
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#c4b5fd',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff55',
  },
  dividerDotLarge: {
    width: 22,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 44,
    alignSelf: 'center',
    fontSize: 13,
    color: '#a5b4fc',
    letterSpacing: 0.5,
  },
});
