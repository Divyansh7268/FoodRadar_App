import { Platform } from 'react-native';

export const FoodRadarTheme = {
  colors: {
    // Backgrounds
    background: '#FAF8F4', // Warm off-white background
    surface: '#FFFFFF', // Clean white for elevated cards
    surfaceElevated: '#FFFFFF',
    surfaceSubtle: '#F4EFE6', // Soft warm tone for chips, search bars
    surfaceAccentLight: '#FFF2EB', // Very soft orange tint for highlights/pills
    surfaceAccentMedium: '#FFE4D4',

    // Primary Accents
    primary: '#FF5E1E', // Vibrant orange accent
    primaryDark: '#E04808', // Darker shade for active/pressed states
    primaryLight: '#FF7A45', // Lighter orange
    primaryGlow: 'rgba(255, 94, 30, 0.28)',
    primaryFaint: 'rgba(255, 94, 30, 0.08)',

    // Radar specifics
    radarBorder: 'rgba(255, 94, 30, 0.35)',
    radarGrid: 'rgba(255, 94, 30, 0.15)',
    radarSweep: 'rgba(255, 94, 30, 0.45)',
    radarBlip: '#FF3B00',

    // Typography
    textPrimary: '#17191C', // Dark, readable typography
    textSecondary: '#5A606A', // Readable grey
    textTertiary: '#8E94A0', // Subtle muted grey
    textInverse: '#FFFFFF',

    // Status & Badges
    starGold: '#FFA800',
    starBackground: '#FFF8E6',
    successGreen: '#0D8F4F',
    successGreenBg: '#E9F9F0',
    errorRed: '#E53935',
    errorRedBg: '#FDECEC',

    // Borders & Dividers
    border: '#EFEAE1',
    borderStrong: '#E2DBD0',
  },

  radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  shadows: {
    card: Platform.select({
      ios: {
        shadowColor: '#17191C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: '#17191C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
      },
    }),
    cardHover: Platform.select({
      ios: {
        shadowColor: '#FF5E1E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
      android: {
        elevation: 6,
      },
      default: {
        shadowColor: '#FF5E1E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
    }),
    radarGlow: Platform.select({
      ios: {
        shadowColor: '#FF5E1E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
      default: {
        shadowColor: '#FF5E1E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
      },
    }),
  },
} as const;

export const BiteRadarTheme = FoodRadarTheme;
export const colors = FoodRadarTheme.colors;
export const radii = FoodRadarTheme.radii;
export const shadows = FoodRadarTheme.shadows;
export default FoodRadarTheme;


