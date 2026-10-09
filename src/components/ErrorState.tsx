import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';

const theme = FoodRadarTheme || BiteRadarTheme;

interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
  title?: string;
  canOpenSettings?: boolean;
  onOpenSettings?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  onRetry,
  message = 'Radar sensors could not determine nearby food places. Please check your network or try again.',
  title = 'Unable to detect location',
  canOpenSettings = false,
  onOpenSettings,
  retryLabel = 'Retry Scanning',
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>⚠️</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{message}</Text>

      <View style={styles.actionsContainer}>
        {canOpenSettings && onOpenSettings && (
          <Pressable
            style={({ pressed }) => [styles.settingsButton, pressed && styles.buttonPressed]}
            onPress={onOpenSettings}
            accessibilityRole="button"
            accessibilityLabel="Open device settings">
            <Text style={styles.settingsButtonText}>Open Device Settings</Text>
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => [styles.retryButton, pressed && styles.buttonPressed]}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}>
          <Text style={styles.retryButtonText}>{retryLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 36,
    backgroundColor: theme.colors.surface,
    marginHorizontal: 16,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: theme.colors.errorRedBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 13.5,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: theme.radii.full,
    elevation: 2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 160,
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: theme.radii.full,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  settingsButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 13.5,
    fontWeight: '700',
  },
});
