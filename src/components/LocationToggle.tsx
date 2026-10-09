import React from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';
import { LocationPinIcon } from './Icons';

const theme = FoodRadarTheme || BiteRadarTheme;

interface LocationToggleProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

export function LocationToggle({ isEnabled, onToggle, disabled = false }: LocationToggleProps) {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Leading icon badge */}
        <View
          style={[
            styles.iconWrapper,
            isEnabled && styles.iconWrapperActive,
          ]}>
          <LocationPinIcon
            size={18}
            color={isEnabled ? theme.colors.primary : theme.colors.textSecondary}
          />
        </View>

        {/* Text descriptions */}
        <View style={styles.textGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Enable Location</Text>
            {isEnabled && (
              <View style={styles.activeTag}>
                <View style={styles.activeDot} />
                <Text style={styles.activeTagText}>Active</Text>
              </View>
            )}
          </View>
          <Text style={styles.helperText}>
            Enable your location to discover food places near you.
          </Text>
        </View>

        {/* Native React Native Switch */}
        <View style={styles.switchWrapper}>
          <Switch
            value={isEnabled}
            onValueChange={onToggle}
            disabled={disabled}
            trackColor={{
              false: '#DED8CE',
              true: theme.colors.primary,
            }}
            thumbColor={
              Platform.OS === 'android'
                ? isEnabled
                  ? '#FFFFFF'
                  : '#F5F3EF'
                : '#FFFFFF'
            }
            ios_backgroundColor="#DED8CE"
            accessibilityLabel="Enable Location toggle"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconWrapperActive: {
    backgroundColor: theme.colors.surfaceAccentLight,
  },
  textGroup: {
    flex: 1,
    paddingRight: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.successGreenBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.radii.full,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.successGreen,
  },
  activeTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.successGreen,
  },
  helperText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    fontWeight: '400',
  },
  switchWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
