import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';
import { RadarHeaderIcon, LocationPinIcon } from './Icons';

const theme = FoodRadarTheme || BiteRadarTheme;

export function InitialLocationPrompt() {
  return (
    <View style={styles.container}>
      {/* Decorative radar graphic placeholder */}
      <View style={styles.graphicRingOuter}>
        <View style={styles.graphicRingMiddle}>
          <View style={styles.graphicRingInner}>
            <RadarHeaderIcon size={44} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Ready to find great bites?</Text>
      <Text style={styles.description}>
        Switch on location to activate the live radar. FoodRadar will instantly discover and rank
        the best food places within 2 km of your current position.
      </Text>

      {/* Feature perks */}
      <View style={styles.perksContainer}>
        <View style={styles.perkItem}>
          <View style={styles.perkDot}>
            <LocationPinIcon size={12} color={theme.colors.primary} />
          </View>
          <Text style={styles.perkText}>2 km real-time proximity radius</Text>
        </View>

        <View style={styles.perkItem}>
          <View style={styles.perkDot}>
            <Text style={{ fontSize: 11, color: theme.colors.primary }}>⚡</Text>
          </View>
          <Text style={styles.perkText}>Instant sorted results with nearest spot first</Text>
        </View>

        <View style={styles.perkItem}>
          <View style={styles.perkDot}>
            <Text style={{ fontSize: 11, color: theme.colors.primary }}>⭐</Text>
          </View>
          <Text style={styles.perkText}>Top-rated local favorites and verified reviews</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 8,
  },
  graphicRingOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(255, 94, 30, 0.18)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFBF7',
  },
  graphicRingMiddle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 94, 30, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicRingInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: theme.colors.surfaceAccentLight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  perksContainer: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
    ...theme.shadows.card,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  perkDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.surfaceAccentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perkText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    flex: 1,
  },
});
