
import { Appointment, Inquiry } from '../types';

const APPOINTMENTS_KEY = 'gs_appointments';
const INQUIRIES_KEY = 'gs_inquiries';

export const storageService = {
  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAppointment: (appointment: Omit<Appointment, 'id' | 'status'>): Appointment => {
    const appointments = storageService.getAppointments();
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    appointments.push(newAppointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return newAppointment;
  },

  getInquiries: (): Inquiry[] => {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry => {
    const inquiries = storageService.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    return newInquiry;
  }
};
