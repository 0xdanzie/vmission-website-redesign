'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { events as defaultEvents, VMEvent } from '@/data/events';
import { courses as defaultCourses, Course } from '@/data/courses';
import { teachings as defaultTeachings, Teaching } from '@/data/teachings';
import { publications as defaultPublications, Publication } from '@/data/publications';
import { acharyas as defaultAcharyas, Acharya } from '@/data/acharyas';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  date: string;
  status: 'New' | 'In Review' | 'Resolved';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  category: string;
  amount: number;
  date: string;
  method: 'UPI' | 'NEFT/RTGS' | 'Cheque';
  utrNumber: string;
  receiptStatus: 'Issued' | 'Pending';
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Suresh Varma',
    email: 'suresh.varma@example.com',
    phone: '+91 98261 44552',
    purpose: 'Ashram Visit / Stay',
    message: 'Seeking accommodation for 3 days for self-study and meeting Poojya Guruji in October.',
    date: '2026-08-28',
    status: 'New',
  },
  {
    id: 'inq-2',
    name: 'Meenakshi Iyer',
    email: 'm.iyer@example.com',
    phone: '+91 94440 12890',
    purpose: 'Course Enrollment',
    message: 'Submitted answers to Tattva Bodha Lesson 1 questionnaire. Awaiting review.',
    date: '2026-08-27',
    status: 'In Review',
  },
  {
    id: 'inq-3',
    name: 'Dr. R. K. Joshi',
    email: 'rkjoshi@example.com',
    phone: '+91 98930 55123',
    purpose: 'Donation / 80-G Query',
    message: 'Need the 80-G receipt for our annual Bhiksha contribution transferred via NEFT.',
    date: '2026-08-25',
    status: 'Resolved',
  },
];

const DEFAULT_DONATIONS: DonationRecord[] = [
  {
    id: 'don-1',
    donorName: 'Smt. Kamala Devi',
    category: 'Daily Annadanam & Bhiksha',
    amount: 5100,
    date: '2026-08-28',
    method: 'UPI',
    utrNumber: '324158920148',
    receiptStatus: 'Issued',
  },
  {
    id: 'don-2',
    donorName: 'Rajesh & Sunita Agarwal',
    category: 'Brahmachari & Student Sponsorship',
    amount: 25000,
    date: '2026-08-27',
    method: 'NEFT/RTGS',
    utrNumber: 'HDFCN262409812',
    receiptStatus: 'Issued',
  },
  {
    id: 'don-3',
    donorName: 'Amitabh Sharma',
    category: 'Temple Puja & Ashram Upkeep',
    amount: 2100,
    date: '2026-08-26',
    method: 'UPI',
    utrNumber: '323984102941',
    receiptStatus: 'Pending',
  },
  {
    id: 'don-4',
    donorName: 'Ishaan Trivedi',
    category: 'Free Publications & Digital Outreach',
    amount: 3000,
    date: '2026-08-24',
    method: 'NEFT/RTGS',
    utrNumber: 'SBIN002948194',
    receiptStatus: 'Issued',
  },
];

interface DataContextType {
  events: VMEvent[];
  courses: Course[];
  teachings: Teaching[];
  publications: Publication[];
  acharyas: Acharya[];
  inquiries: Inquiry[];
  donations: DonationRecord[];

  // Event actions
  addEvent: (event: Omit<VMEvent, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<VMEvent>) => void;
  deleteEvent: (id: string) => void;

  // Course actions
  addCourse: (course: Omit<Course, 'id' | 'slug'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Teaching actions
  addTeaching: (teaching: Omit<Teaching, 'id'>) => void;
  updateTeaching: (id: string, updated: Partial<Teaching>) => void;
  deleteTeaching: (id: string) => void;

  // Publication actions
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, updated: Partial<Publication>) => void;
  deletePublication: (id: string) => void;

  // Inquiry actions
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;

  // Donation actions
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date'>) => void;
  updateDonationStatus: (id: string, status: DonationRecord['receiptStatus']) => void;

  // Reset to original audit defaults
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<VMEvent[]>(defaultEvents);
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [teachings, setTeachings] = useState<Teaching[]>(defaultTeachings);
  const [publications, setPublications] = useState<Publication[]>(defaultPublications);
  const [acharyas] = useState<Acharya[]>(defaultAcharyas);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [donations, setDonations] = useState<DonationRecord[]>(DEFAULT_DONATIONS);

  // Load from localStorage on client side mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('vm_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedCourses = localStorage.getItem('vm_courses');
      if (savedCourses) setCourses(JSON.parse(savedCourses));

      const savedTeachings = localStorage.getItem('vm_teachings');
      if (savedTeachings) setTeachings(JSON.parse(savedTeachings));

      const savedPubs = localStorage.getItem('vm_publications');
      if (savedPubs) setPublications(JSON.parse(savedPubs));

      const savedInq = localStorage.getItem('vm_inquiries');
      if (savedInq) setInquiries(JSON.parse(savedInq));

      const savedDon = localStorage.getItem('vm_donations');
      if (savedDon) setDonations(JSON.parse(savedDon));
    } catch (e) {
      console.warn('LocalStorage error in DataProvider:', e);
    }
  }, []);

  // Sync to localStorage
  const save = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  };

  // Event methods
  const addEvent = (eventData: Omit<VMEvent, 'id'>) => {
    const id = 'event-' + Date.now();
    const newEvent: VMEvent = { id, ...eventData };
    setEvents((prev) => {
      const next = [newEvent, ...prev];
      save('vm_events', next);
      return next;
    });
  };

  const updateEvent = (id: string, updated: Partial<VMEvent>) => {
    setEvents((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updated } : e));
      save('vm_events', next);
      return next;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      save('vm_events', next);
      return next;
    });
  };

  // Course methods
  const addCourse = (courseData: Omit<Course, 'id' | 'slug'>) => {
    const slug = courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = 'course-' + Date.now();
    const newCourse: Course = { id, slug, ...courseData };
    setCourses((prev) => {
      const next = [...prev, newCourse];
      save('vm_courses', next);
      return next;
    });
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      save('vm_courses', next);
      return next;
    });
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => {
      const next = prev.filter((c) => c.id !== id);
      save('vm_courses', next);
      return next;
    });
  };

  // Teaching methods
  const addTeaching = (tData: Omit<Teaching, 'id'>) => {
    const id = 'teaching-' + Date.now();
    const newTeaching: Teaching = { id, ...tData };
    setTeachings((prev) => {
      const next = [newTeaching, ...prev];
      save('vm_teachings', next);
      return next;
    });
  };

  const updateTeaching = (id: string, updated: Partial<Teaching>) => {
    setTeachings((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updated } : t));
      save('vm_teachings', next);
      return next;
    });
  };

  const deleteTeaching = (id: string) => {
    setTeachings((prev) => {
      const next = prev.filter((t) => t.id !== id);
      save('vm_teachings', next);
      return next;
    });
  };

  // Publication methods
  const addPublication = (pubData: Omit<Publication, 'id'>) => {
    const id = 'pub-' + Date.now();
    const newPub: Publication = { id, ...pubData };
    setPublications((prev) => {
      const next = [newPub, ...prev];
      save('vm_publications', next);
      return next;
    });
  };

  const updatePublication = (id: string, updated: Partial<Publication>) => {
    setPublications((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p));
      save('vm_publications', next);
      return next;
    });
  };

  const deletePublication = (id: string) => {
    setPublications((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save('vm_publications', next);
      return next;
    });
  };

  // Inquiry methods
  const addInquiry = (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      id: 'inq-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...inq,
    };
    setInquiries((prev) => {
      const next = [newInq, ...prev];
      save('vm_inquiries', next);
      return next;
    });
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, status } : i));
      save('vm_inquiries', next);
      return next;
    });
  };

  // Donation methods
  const addDonation = (don: Omit<DonationRecord, 'id' | 'date'>) => {
    const newDon: DonationRecord = {
      id: 'don-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...don,
    };
    setDonations((prev) => {
      const next = [newDon, ...prev];
      save('vm_donations', next);
      return next;
    });
  };

  const updateDonationStatus = (id: string, receiptStatus: DonationRecord['receiptStatus']) => {
    setDonations((prev) => {
      const next = prev.map((d) => (d.id === id ? { ...d, receiptStatus } : d));
      save('vm_donations', next);
      return next;
    });
  };

  const resetToDefaults = () => {
    setEvents(defaultEvents);
    setCourses(defaultCourses);
    setTeachings(defaultTeachings);
    setPublications(defaultPublications);
    setInquiries(DEFAULT_INQUIRIES);
    setDonations(DEFAULT_DONATIONS);
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        events,
        courses,
        teachings,
        publications,
        acharyas,
        inquiries,
        donations,
        addEvent,
        updateEvent,
        deleteEvent,
        addCourse,
        updateCourse,
        deleteCourse,
        addTeaching,
        updateTeaching,
        deleteTeaching,
        addPublication,
        updatePublication,
        deletePublication,
        addInquiry,
        updateInquiryStatus,
        addDonation,
        updateDonationStatus,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
