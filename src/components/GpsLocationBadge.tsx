import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';
import { Coordinates } from '@/hooks/use-device-location';
import { LocationPinIcon } from './Icons';

const theme = FoodRadarTheme || BiteRadarTheme;

interface GpsLocationBadgeProps {
  coordinates: Coordinates;
}

export function GpsLocationBadge({ coordinates }: GpsLocationBadgeProps) {
  const { latitude, longitude, accuracy } = coordinates;

  const latFormatted = `${Math.abs(latitude).toFixed(5)}° ${latitude >= 0 ? 'N' : 'S'}`;
  const lngFormatted = `${Math.abs(longitude).toFixed(5)}° ${longitude >= 0 ? 'E' : 'W'}`;
  const accuracyFormatted = accuracy !== null ? `±${Math.round(accuracy)} m` : 'N/A';

  return (
    <View style={styles.container}>
      {/* Success Message Bar */}
      <View style={styles.successRow}>
        <View style={styles.successDot} />
        <Text style={styles.successText}>Location detected successfully</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: theme.colors.successGreenBg,
    borderRadius: theme.radii.sm,
    marginBottom: 8,
  },
  successDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.successGreen,
  },
  successText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.successGreen,
  },
  detailsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceAccentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    flex: 1,
  },
  devTag: {
    backgroundColor: theme.colors.surfaceAccentMedium,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radii.xs,
  },
  devTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.borderStrong,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7E6',
    borderRadius: theme.radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFE0A3',
    gap: 6,
  },
  disclaimerIcon: {
    fontSize: 13,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11.5,
    color: '#8A5800',
    fontWeight: '600',
    lineHeight: 16,
  },
});
