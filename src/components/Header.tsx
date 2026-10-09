import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';
import { LocationPinIcon } from './Icons';

const theme = FoodRadarTheme || BiteRadarTheme;

interface HeaderProps {
  radiusLabel?: string;
}

export function Header({ radiusLabel = 'Within 2 km' }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Top row: Brand & Radius Badge */}
      <View style={styles.topRow}>
        {/* Logo Image */}
        <Image
          source={require('../../assets/images/FoodRadar_Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Search radius indicator */}
        <View style={styles.radiusBadge}>
          <LocationPinIcon size={12} color={theme.colors.primary} />
          <Text style={styles.radiusText}>{radiusLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 6,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 88,
    width: 88,
  },
  radiusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surfaceAccentLight,
    borderWidth: 1,
    borderColor: theme.colors.surfaceAccentMedium,
  },
  radiusText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
