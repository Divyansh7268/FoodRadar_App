import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';

const theme = FoodRadarTheme || BiteRadarTheme;

const RADAR_SIZE = Math.min(Dimensions.get('window').width - 80, 240);
const CIRCLE_3_SIZE = RADAR_SIZE; // Outer circle
const CIRCLE_2_SIZE = RADAR_SIZE * 0.65; // Middle circle
const CIRCLE_1_SIZE = RADAR_SIZE * 0.35; // Inner circle

interface AnimatedRadarProps {
  statusMessage?: string;
  subtitleMessage?: string;
}

export function AnimatedRadar({
  statusMessage = 'Scanning nearby food spots...',
  subtitleMessage = 'Searching within 2 km radius around you',
}: AnimatedRadarProps = {}) {
  // Animation values initialized with useState lazy initializer (React 19 / React Compiler compliant)
  const [rotateAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(0));
  const [blipAnim] = useState(() => new Animated.Value(0.3));

  useEffect(() => {
    // 1. Continuous smooth 360-degree rotation for the scanning beam
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // 2. Continuous pulsing animation for the center location beacon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Subtle blip fade pulse to mimic detected targets
    const blipAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blipAnim, {
          toValue: 1,
          duration: 1100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(blipAnim, {
          toValue: 0.2,
          duration: 1100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnimation.start();
    pulseAnimation.start();
    blipAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
      blipAnimation.stop();
    };
  }, [rotateAnim, pulseAnim, blipAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.3],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.8, 0.35, 0],
  });

  return (
    <View style={styles.container}>
      {/* Radar Dish Canvas */}
      <View style={[styles.radarDish, { width: RADAR_SIZE, height: RADAR_SIZE }]}>
        {/* Radar concentric circle 3 (Outer) */}
        <View
          style={[
            styles.circle,
            {
              width: CIRCLE_3_SIZE,
              height: CIRCLE_3_SIZE,
              borderRadius: CIRCLE_3_SIZE / 2,
            },
          ]}
        />

        {/* Radar concentric circle 2 (Middle) */}
        <View
          style={[
            styles.circle,
            styles.middleCircle,
            {
              width: CIRCLE_2_SIZE,
              height: CIRCLE_2_SIZE,
              borderRadius: CIRCLE_2_SIZE / 2,
            },
          ]}
        />

        {/* Radar concentric circle 1 (Inner) */}
        <View
          style={[
            styles.circle,
            styles.innerCircle,
            {
              width: CIRCLE_1_SIZE,
              height: CIRCLE_1_SIZE,
              borderRadius: CIRCLE_1_SIZE / 2,
            },
          ]}
        />

        {/* Crosshair grid axes */}
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairVertical} />

        {/* Simulated radar blips (detected food spots) */}
        <Animated.View
          style={[
            styles.radarBlip,
            { top: RADAR_SIZE * 0.25, left: RADAR_SIZE * 0.65, opacity: blipAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.radarBlip,
            { bottom: RADAR_SIZE * 0.22, left: RADAR_SIZE * 0.3, opacity: blipAnim },
          ]}
        />
        <Animated.View
          style={[
            styles.radarBlip,
            { top: RADAR_SIZE * 0.35, left: RADAR_SIZE * 0.22, opacity: blipAnim },
          ]}
        />

        {/* Scanning beam rotating continuously */}
        <Animated.View
          style={[
            styles.beamContainer,
            {
              width: RADAR_SIZE,
              height: RADAR_SIZE,
              transform: [{ rotate: spin }],
            },
          ]}>
          {/* Main scanning ray with glowing tip */}
          <View style={styles.sweepRay}>
            <View style={styles.sweepTipGlow} />
          </View>
          {/* Fading sweep wedge behind the ray */}
          <View style={styles.sweepWedge} />
        </Animated.View>

        {/* Pulsing center location wave */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: pulseScale }],
              opacity: pulseOpacity,
            },
          ]}
        />

        {/* Center location marker */}
        <View style={styles.centerMarker}>
          <View style={styles.centerDot} />
        </View>
      </View>

      {/* Scanning status message */}
      <View style={styles.messageBox}>
        <View style={styles.statusIndicator}>
          <View style={styles.statusPing} />
        </View>
        <Text style={styles.scanningTitle}>{statusMessage}</Text>
        <Text style={styles.scanningSubtitle}>{subtitleMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
  },
  radarDish: {
    borderRadius: 9999,
    backgroundColor: '#FFF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.radarBorder,
    position: 'relative',
    overflow: 'hidden',
    ...theme.shadows.radarGlow,
  },
  circle: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: theme.colors.radarBorder,
  },
  middleCircle: {
    borderColor: 'rgba(255, 94, 30, 0.3)',
    borderStyle: 'dashed',
  },
  innerCircle: {
    borderColor: 'rgba(255, 94, 30, 0.4)',
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.radarGrid,
  },
  crosshairVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: theme.colors.radarGrid,
  },
  radarBlip: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  beamContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sweepRay: {
    width: 2,
    height: '50%',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sweepTipGlow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A45',
    marginTop: -2,
    shadowColor: theme.colors.primary,
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  sweepWedge: {
    position: 'absolute',
    top: 0,
    right: '50%',
    width: '45%',
    height: '50%',
    backgroundColor: 'rgba(255, 94, 30, 0.09)',
    borderTopLeftRadius: 110,
  },
  pulseRing: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.primaryGlow,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  centerMarker: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  messageBox: {
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 24,
  },
  statusIndicator: {
    marginBottom: 8,
  },
  statusPing: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  scanningTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  scanningSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});
