import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';

const theme = FoodRadarTheme || BiteRadarTheme;

/**
 * Clean, lightweight, zero-dependency vector-styled icons
 * guaranteeing 100% compatibility across all Android, iOS, and Expo Go setups.
 */

export function RadarHeaderIcon({ size = 28 }: { size?: number }) {
  const outerSize = size;
  const innerSize = size * 0.55;
  const dotSize = size * 0.22;

  return (
    <View style={[styles.radarContainer, { width: outerSize, height: outerSize }]}>
      <View
        style={[
          styles.radarOuterCircle,
          {
            width: outerSize,
            height: outerSize,
            borderRadius: outerSize / 2,
            borderColor: theme.colors.primary,
          },
        ]}
      />
      <View
        style={[
          styles.radarMiddleCircle,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            borderColor: theme.colors.primary,
          },
        ]}
      />
      <View
        style={[
          styles.radarDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: theme.colors.primary,
          },
        ]}
      />
      {/* Decorative sweep line */}
      <View
        style={[
          styles.radarNeedle,
          {
            width: outerSize / 2,
            backgroundColor: theme.colors.primary,
          },
        ]}
      />
    </View>
  );
}

export function LocationPinIcon({ size = 16, color }: { size?: number; color?: string }) {
  const c = color || theme.colors.primary;
  return (
    <View style={[styles.pinWrapper, { width: size, height: size * 1.2 }]}>
      <View
        style={[
          styles.pinHead,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: c,
          },
        ]}>
        <View
          style={[
            styles.pinHole,
            {
              width: size * 0.38,
              height: size * 0.38,
              borderRadius: (size * 0.38) / 2,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.pinPoint,
          {
            borderTopColor: c,
            borderLeftWidth: size * 0.35,
            borderRightWidth: size * 0.35,
            borderTopWidth: size * 0.45,
          },
        ]}
      />
    </View>
  );
}

export function StarIcon({ size = 15, color }: { size?: number; color?: string }) {
  const c = color || theme.colors.starGold;
  return (
    <Text style={{ fontSize: size, color: c, lineHeight: size + 2, fontWeight: '700' }}>
      ★
    </Text>
  );
}

export function FoodPlaceholderIcon({ size = 48 }: { size?: number }) {
  return (
    <View style={[styles.placeholderBox, { width: size, height: size }]}>
      <Text style={{ fontSize: size * 0.5 }}>🍽️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  radarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  radarOuterCircle: {
    position: 'absolute',
    borderWidth: 2,
    opacity: 0.85,
  },
  radarMiddleCircle: {
    position: 'absolute',
    borderWidth: 1.5,
    opacity: 0.6,
  },
  radarDot: {
    position: 'absolute',
  },
  radarNeedle: {
    position: 'absolute',
    height: 1.5,
    top: '50%',
    left: '50%',
    transform: [{ rotate: '-45deg' }, { translateX: 2 }],
    opacity: 0.75,
  },
  pinWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pinHead: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinHole: {
    backgroundColor: '#FFFFFF',
  },
  pinPoint: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  placeholderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAccentLight,
    borderRadius: 12,
  },
});
