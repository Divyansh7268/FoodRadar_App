import { FoodPlace } from '@/types/food';

export const MOCK_FOOD_PLACES: FoodPlace[] = [
  {
    id: 'place-1',
    name: 'Sharma Chaat Corner',
    cuisine: 'Street Food • Chaat & Snacks',
    rating: 4.5,
    reviewsCount: 312,
    address: 'Main Market Chowk, Sector 14',
    distanceKm: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    priceRange: '₹',
    isOpen: true,
    openingHours: 'Open • Closes 10:30 PM',
    specialty: 'Dahi Bhalla & Golgappe',
  },
  {
    id: 'place-2',
    name: 'Burger Junction',
    cuisine: 'American • Burgers & Fries',
    rating: 4.2,
    reviewsCount: 184,
    address: 'Galaxy Galleria, Ground Floor',
    distanceKm: 0.6,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    priceRange: '₹₹',
    isOpen: true,
    openingHours: 'Open • Closes 11:00 PM',
    specialty: 'Smash Cheese Burger & Thick Shakes',
  },
  {
    id: 'place-3',
    name: 'Royal Biryani House',
    cuisine: 'Mughlai • Dum Biryani & Kebabs',
    rating: 4.4,
    reviewsCount: 520,
    address: 'Heritage Lane, Near Old Clock Tower',
    distanceKm: 0.9,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    priceRange: '₹₹₹',
    isOpen: true,
    openingHours: 'Open • Closes 11:30 PM',
    specialty: 'Hyderabadi Chicken Dum Biryani',
  },
  {
    id: 'place-4',
    name: 'Cafe Mocha',
    cuisine: 'Artisanal Cafe • Bakery & Coffee',
    rating: 4.3,
    reviewsCount: 247,
    address: 'Olive Arcade, Central Avenue',
    distanceKm: 1.2,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    priceRange: '₹₹',
    isOpen: true,
    openingHours: 'Open • Closes 10:00 PM',
    specialty: 'Cold Brew & Tiramisu Tart',
  },
  {
    id: 'place-5',
    name: 'Gupta South Indian Food',
    cuisine: 'South Indian • Pure Veg Delicacies',
    rating: 4.1,
    reviewsCount: 198,
    address: 'Station Road, Near Metro Gate 3',
    distanceKm: 1.7,
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    priceRange: '₹',
    isOpen: true,
    openingHours: 'Open • Closes 9:30 PM',
    specialty: 'Mysore Masala Dosa & Filter Kaapi',
  },
];

/**
 * Returns mock food places sorted by distance in ascending order.
 */
export function getSortedFoodPlaces(): FoodPlace[] {
  return [...MOCK_FOOD_PLACES].sort((a, b) => a.distanceKm - b.distanceKm);
}
