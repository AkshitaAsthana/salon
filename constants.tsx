
import React from 'react';
import { Service, Review } from './types';
import { Scissors, Sparkles, Heart, Clock, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export const SALON_DETAILS = {
  name: "Generations Salon",
  category: "Beauty Parlour",
  rating: 5.0,
  reviewsCount: 29,
  address: "4229 SE Federal Hwy, Stuart, FL 34997, United States",
  phone: "+1 772-283-5884",
  hours: {
    weekdays: "9:00 AM - 5:00 PM",
    weekend: "Closed"
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Precision Haircut & Style',
    description: 'A transformative haircut experience including consultation, relaxing wash, and signature blow-dry finish.',
    price: '$65+',
    duration: '60 min',
    category: 'Hair',
    image: 'https://picsum.photos/seed/haircut/800/600'
  },
  {
    id: '2',
    name: 'Full Balayage Artistry',
    description: 'Custom hand-painted highlights for a sun-kissed, natural-looking dimension tailored to your hair.',
    price: '$180+',
    duration: '180 min',
    category: 'Hair',
    image: 'https://picsum.photos/seed/color/800/600'
  },
  {
    id: '3',
    name: 'Revitalizing Facial',
    description: 'Customized skin treatment focusing on deep cleansing, exfoliation, and hydration.',
    price: '$95+',
    duration: '75 min',
    category: 'Skin',
    image: 'https://picsum.photos/seed/facial/800/600'
  },
  {
    id: '4',
    name: 'Luxe Manicure & Spa',
    description: 'Complete nail shaping, cuticle care, and massage followed by premium gel polish application.',
    price: '$45+',
    duration: '45 min',
    category: 'Nails',
    image: 'https://picsum.photos/seed/nails/800/600'
  },
  {
    id: '5',
    name: 'Bridal Styling Package',
    description: 'Full bridal hair and makeup trial and day-of styling for the modern elegant bride.',
    price: 'Custom',
    duration: 'Varied',
    category: 'Hair',
    image: 'https://picsum.photos/seed/bridal/800/600'
  },
  {
    id: '6',
    name: 'Keratin Smoothing Treatment',
    description: 'Professional smoothing therapy that eliminates frizz and reduces styling time for up to 5 months.',
    price: '$250+',
    duration: '150 min',
    category: 'Hair',
    image: 'https://picsum.photos/seed/keratin/800/600'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Johnson',
    rating: 5,
    content: 'The best salon in Stuart! I’ve been coming to Generations for years. The attention to detail and friendly atmosphere is unmatched.',
    date: '2 months ago',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 'r2',
    author: 'Emily Davis',
    rating: 5,
    content: 'Absolutely loved my balayage. It looks so natural! They really listen to what you want and offer expert advice.',
    date: '1 month ago',
    avatar: 'https://i.pravatar.cc/150?u=emily'
  },
  {
    id: 'r3',
    author: 'Michael Thompson',
    rating: 5,
    content: 'Top tier service. Clean, professional, and consistent. Highly recommend to anyone looking for quality.',
    date: '3 weeks ago',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  }
];

export const GALLERY_IMAGES = [
  'https://picsum.photos/seed/sal1/600/600',
  'https://picsum.photos/seed/sal2/600/600',
  'https://picsum.photos/seed/sal3/600/600',
  'https://picsum.photos/seed/sal4/600/600',
  'https://picsum.photos/seed/sal5/600/600',
  'https://picsum.photos/seed/sal6/600/600',
];
