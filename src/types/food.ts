export interface FoodPlace {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewsCount: number;
  address: string;
  distanceKm: number;
  imageUrl: string;
  priceRange: string;
  isOpen: boolean;
  openingHours: string;
  specialty: string;
  latitude?: number;
  longitude?: number;
}

export type ScanStatus = 'idle' | 'scanning' | 'results' | 'empty' | 'error';
