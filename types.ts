
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'Hair' | 'Skin' | 'Nails' | 'Body';
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
