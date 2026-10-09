import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { Image } from 'expo-image';
import { FoodRadarTheme, BiteRadarTheme } from '@/constants/bite-radar-theme';
const theme = FoodRadarTheme || BiteRadarTheme;
import { FoodPlace } from '@/types/food';
import { StarIcon, LocationPinIcon, FoodPlaceholderIcon } from './Icons';
import { getFallbackImageForCuisine } from '@/services/food-api';

interface FoodCardProps {
  place: FoodPlace;
  isNearest?: boolean;
  onPress?: () => void;
}

/**
 * Opens Google Maps for the given place.
 * Priority: lat/lng coordinates → place name + address search
 */
async function openInGoogleMaps(place: FoodPlace) {
  let url: string;

  if (
    typeof place.latitude === 'number' &&
    typeof place.longitude === 'number'
  ) {
    // Deep-link directly to coordinates with place name as label
    const label = encodeURIComponent(place.name);
    url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}&query_place_id=${encodeURIComponent(place.id)}&label=${label}`;
  } else {
    // Fall back to a text search
    const query = encodeURIComponent(`${place.name} ${place.address || ''}`);
    url = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      // If Google Maps app isn't installed, open in browser
      await Linking.openURL(url);
    }
  } catch {
    Alert.alert('Error', 'Could not open Google Maps. Please try again.');
  }
}

export function FoodCard({ place, isNearest = false, onPress }: FoodCardProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const cuisineFallback = getFallbackImageForCuisine(place.cuisine);
  const currentImageUri = !useFallback && place.imageUrl ? place.imageUrl : cuisineFallback;

  const isClosedNow = !place.isOpen ||
    (typeof place.openingHours === 'string' &&
     place.openingHours.toLowerCase().startsWith('closed'));

  const hoursColor = isClosedNow
    ? theme.colors.errorRed
    : theme.colors.successGreen;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isNearest && styles.nearestCard,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.rating} stars, ${place.distanceKm} km away`}>

      {/* Thumbnail Section */}
      <View style={styles.imageContainer}>
        {showPlaceholder || !currentImageUri ? (
          <View style={styles.fallbackContainer}>
            <FoodPlaceholderIcon size={46} />
            <Text style={styles.fallbackText}>{place.name ? place.name.slice(0, 1) : '🍽️'}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: currentImageUri }}
            style={styles.image}
            contentFit="cover"
            transition={250}
            cachePolicy="memory-disk"
            priority="high"
            onError={() => {
              if (!useFallback && cuisineFallback && cuisineFallback !== place.imageUrl) {
                setUseFallback(true);
              } else {
                setShowPlaceholder(true);
              }
            }}
          />
        )}

        {/* Distance Badge Floating on Image */}
        <View style={styles.distanceBadge}>
          <LocationPinIcon size={11} color="#FFFFFF" />
          <Text style={styles.distanceText}>{place.distanceKm} km</Text>
        </View>

        {/* Nearest indicator for the closest spot */}
        {isNearest && (
          <View style={styles.nearestBadge}>
            <Text style={styles.nearestBadgeText}>NEAREST</Text>
          </View>
        )}
      </View>

      {/* Details Section */}
      <View style={styles.infoContainer}>
        {/* Row 1: Name and Price */}
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={styles.priceRange}>{place.priceRange}</Text>
        </View>

        {/* Row 2: Rating & Cuisine */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <StarIcon size={13} color={theme.colors.starGold} />
            <Text style={styles.ratingScore}>
              {typeof place.rating === 'number' && place.rating > 0 ? place.rating.toFixed(1) : '—'}
            </Text>
            <Text style={styles.reviewsCount}>({place.reviewsCount ?? 0})</Text>
          </View>

          <View style={styles.dotSeparator} />

          <Text style={styles.cuisine} numberOfLines={1}>
            {place.cuisine}
          </Text>
        </View>

        {/* Row 3: Address / Locality */}
        <View style={styles.addressRow}>
          <LocationPinIcon size={12} color={theme.colors.textTertiary} />
          <Text style={styles.address} numberOfLines={1}>
            {place.address}
          </Text>
        </View>

        {/* Row 4: Hours + Google Maps button */}
        <View style={styles.footerRow}>
          <View style={styles.specialtyTag}>
            <Text style={[styles.openingHours, { color: hoursColor }]} numberOfLines={1}>
              {isClosedNow ? '🔴 ' : '🟢 '}
              {place.openingHours}
            </Text>
          </View>

          {/* Google Maps button */}
          <Pressable
            onPress={() => openInGoogleMaps(place)}
            style={({ pressed }) => [styles.mapsButton, pressed && styles.mapsButtonPressed]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${place.name} in Google Maps`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.mapsButtonText}>📍 Maps</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  nearestCard: {
    borderColor: 'rgba(255, 94, 30, 0.4)',
    borderWidth: 1.5,
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  imageContainer: {
    width: '100%',
    height: 145,
    backgroundColor: theme.colors.surfaceSubtle,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surfaceAccentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
    marginTop: 4,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: theme.radii.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  nearestBadge: {
    position: 'absolute',
    top: 10,
    left: 12,
    backgroundColor: 'rgba(23, 25, 28, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radii.sm,
  },
  nearestBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  infoContainer: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
    marginRight: 8,
  },
  priceRange: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: theme.radii.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  reviewsCount: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.borderStrong,
    marginHorizontal: 8,
  },
  cuisine: {
    flex: 1,
    fontSize: 12.5,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  address: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  specialtyTag: {
    flex: 1,
    marginRight: 10,
  },
  openingHours: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  mapsButton: {
    backgroundColor: '#1A73E8',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.radii.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    elevation: 2,
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mapsButtonPressed: {
    backgroundColor: '#1557B0',
    transform: [{ scale: 0.97 }],
  },
  mapsButtonText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
