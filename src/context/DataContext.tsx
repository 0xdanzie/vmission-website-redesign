'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { events as defaultEvents, VMEvent } from '@/data/events';
import { courses as defaultCourses, Course } from '@/data/courses';
import { teachings as defaultTeachings, Teaching } from '@/data/teachings';
import { publications as defaultPublications, Publication } from '@/data/publications';
import { acharyas as defaultAcharyas, Acharya } from '@/data/acharyas';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { dbToTeaching, teachingToDb } from '@/lib/teachings-mapper';
import {
  dbToAcharya,
  acharyaToDb,
  dbToCourse,
  courseToDb,
  dbToEvent,
  eventToDb,
  dbToPublication,
  publicationToDb,
  dbToInquiry,
  inquiryToDb,
  dbToDonation,
  donationToDb,
  Inquiry,
  DonationRecord,
  DatabaseDonationRow,
} from '@/lib/cms-mappers';

export type { Inquiry, DonationRecord };

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: '[DEMO] Suresh Varma (Demo Seeker)',
    email: 'demo-suresh@example.com',
    phone: '+91 98000 00001',
    purpose: 'Ashram Visit / Stay',
    message: 'Seeking accommodation for 3 days for self-study and meeting Poojya Guruji in October.',
    date: '2026-08-28',
    status: 'New',
  },
  {
    id: 'inq-2',
    name: '[DEMO] Meenakshi Iyer (Demo Student)',
    email: 'demo-meenakshi@example.com',
    phone: '+91 98000 00002',
    purpose: 'Course Enrollment',
    message: 'Submitted answers to Tattva Bodha Lesson 1 questionnaire. Awaiting review.',
    date: '2026-08-27',
    status: 'In Review',
  },
  {
    id: 'inq-3',
    name: '[DEMO] Dr. R. K. Joshi (Demo Donor)',
    email: 'demo-rkjoshi@example.com',
    phone: '+91 98000 00003',
    purpose: 'Donation / 80-G Query',
    message: 'Need the 80-G receipt for our annual Bhiksha contribution transferred via NEFT.',
    date: '2026-08-25',
    status: 'Resolved',
  },
];

const DEFAULT_DONATIONS: DonationRecord[] = [
  {
    id: 'don-1',
    donorName: '[DEMO] Smt. Kamala Devi (Demo Devotee)',
    category: 'Daily Annadanam & Bhiksha',
    amount: 5100,
    date: '2026-08-28',
    method: 'UPI',
    utrNumber: 'DEMO-UTR-324158',
    verificationStatus: 'Verified',
    receiptStatus: 'Issued',
  },
  {
    id: 'don-2',
    donorName: '[DEMO] Rajesh & Sunita Agarwal (Demo Devotees)',
    category: 'Brahmachari & Student Sponsorship',
    amount: 25000,
    date: '2026-08-27',
    method: 'NEFT/RTGS',
    utrNumber: 'DEMO-UTR-HDFC26',
    verificationStatus: 'Verified',
    receiptStatus: 'Issued',
  },
  {
    id: 'don-3',
    donorName: '[DEMO] Amitabh Sharma (Demo Devotee)',
    category: 'Temple Puja & Ashram Upkeep',
    amount: 2100,
    date: '2026-08-26',
    method: 'UPI',
    utrNumber: 'DEMO-UTR-323984',
    verificationStatus: 'Pending',
    receiptStatus: 'Pending',
  },
  {
    id: 'don-4',
    donorName: '[DEMO] Ishaan Trivedi (Demo Devotee)',
    category: 'Free Publications & Digital Outreach',
    amount: 3000,
    date: '2026-08-24',
    method: 'NEFT/RTGS',
    utrNumber: 'DEMO-UTR-SBIN00',
    verificationStatus: 'Verified',
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
  addEvent: (event: Omit<VMEvent, 'id'> & { id?: string }) => Promise<VMEvent | void>;
  updateEvent: (id: string, updated: Partial<VMEvent>) => Promise<VMEvent | void>;
  deleteEvent: (id: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
  isLoadingEvents: boolean;

  // Course actions
  addCourse: (course: Omit<Course, 'id' | 'slug'> & { id?: string; slug?: string }) => Promise<Course | void>;
  updateCourse: (id: string, updated: Partial<Course>) => Promise<Course | void>;
  deleteCourse: (id: string) => Promise<void>;
  refreshCourses: () => Promise<void>;
  isLoadingCourses: boolean;

  // Teaching actions
  addTeaching: (teaching: Omit<Teaching, 'id'>) => Promise<Teaching | void>;
  updateTeaching: (id: string, updated: Partial<Teaching>) => Promise<Teaching | void>;
  deleteTeaching: (id: string) => Promise<void>;
  refreshTeachings: () => Promise<void>;
  isLoadingTeachings: boolean;

  // Publication actions
  addPublication: (pub: Omit<Publication, 'id'> & { id?: string }) => Promise<Publication | void>;
  updatePublication: (id: string, updated: Partial<Publication>) => Promise<Publication | void>;
  deletePublication: (id: string) => Promise<void>;
  refreshPublications: () => Promise<void>;
  isLoadingPublications: boolean;

  // Acharya actions
  addAcharya: (acharya: Omit<Acharya, 'sort_order'> & { sort_order?: number }) => Promise<Acharya | void>;
  updateAcharya: (slug: string, updated: Partial<Acharya>) => Promise<Acharya | void>;
  deleteAcharya: (slug: string) => Promise<void>;
  refreshAcharyas: () => Promise<void>;
  isLoadingAcharyas: boolean;

  // Inquiry actions
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'> & { id?: string; date?: string; status?: Inquiry['status'] }) => Promise<Inquiry | void>;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  refreshInquiries: () => Promise<void>;
  isLoadingInquiries: boolean;

  // Role context
  userRole: 'admin' | 'editor' | null;
  isAdmin: boolean;
  refreshUserRole: () => Promise<void>;

  // Donation actions
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'verificationStatus'> & { id?: string; date?: string; verificationStatus?: DonationRecord['verificationStatus']; notes?: string }) => Promise<DonationRecord | void>;
  logAdminDonation: (donation: Omit<DonationRecord, 'id' | 'date'> & { id?: string; date?: string; notes?: string }) => Promise<DonationRecord>;
  updateDonationStatus: (id: string, status: NonNullable<DonationRecord['receiptStatus']>) => Promise<void>;
  updateDonationVerification: (id: string, status: DonationRecord['verificationStatus']) => Promise<void>;
  updateDonationReceipt: (id: string, status: NonNullable<DonationRecord['receiptStatus']>) => Promise<void>;
  deleteDonation: (id: string) => Promise<void>;
  refreshDonations: () => Promise<void>;
  isLoadingDonations: boolean;

  // Reset to original audit defaults
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<VMEvent[]>(defaultEvents);
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [teachings, setTeachings] = useState<Teaching[]>(defaultTeachings);
  const [publications, setPublications] = useState<Publication[]>(defaultPublications);
  const [acharyas, setAcharyas] = useState<Acharya[]>(defaultAcharyas);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [donations, setDonations] = useState<DonationRecord[]>(DEFAULT_DONATIONS);
  const [userRole, setUserRole] = useState<'admin' | 'editor' | null>(null);
  const isAdmin = userRole === 'admin';

  const [isLoadingTeachings, setIsLoadingTeachings] = useState(true);
  const [isLoadingAcharyas, setIsLoadingAcharyas] = useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingPublications, setIsLoadingPublications] = useState(true);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);

  const refreshUserRole = async () => {
    if (!isSupabaseConfigured()) {
      setUserRole(null);
      return;
    }
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('admin_profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (profile && (profile.role === 'admin' || profile.role === 'editor')) {
          setUserRole(profile.role);
          return;
        }
      }
      setUserRole(null);
    } catch (e) {
      console.warn('Failed to load user role from admin_profiles:', e);
      setUserRole(null);
    }
  };

  // Sync to localStorage
  const save = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Supabase Fetchers
  // ---------------------------------------------------------------------------
  const refreshTeachings = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingTeachings(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('teachings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setTeachings(data.map(dbToTeaching));
      }
    } catch (e) {
      console.warn('Supabase fetch teachings error, using cached/default:', e);
    } finally {
      setIsLoadingTeachings(false);
    }
  };

  const refreshAcharyas = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingAcharyas(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('acharyas')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setAcharyas(data.map(dbToAcharya));
      }
    } catch (e) {
      console.warn('Supabase fetch acharyas error, using cached/default:', e);
    } finally {
      setIsLoadingAcharyas(false);
    }
  };

  const refreshCourses = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingCourses(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setCourses(data.map(dbToCourse));
      }
    } catch (e) {
      console.warn('Supabase fetch courses error, using cached/default:', e);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const refreshEvents = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingEvents(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false });

      if (!error && data && data.length > 0) {
        setEvents(data.map(dbToEvent));
      }
    } catch (e) {
      console.warn('Supabase fetch events error, using cached/default:', e);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const refreshPublications = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingPublications(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setPublications(data.map(dbToPublication));
      }
    } catch (e) {
      console.warn('Supabase fetch publications error, using cached/default:', e);
    } finally {
      setIsLoadingPublications(false);
    }
  };

  const refreshInquiries = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingInquiries(false);
      return;
    }
    setIsLoadingInquiries(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInquiries(data.map(dbToInquiry));
      }
    } catch (e) {
      console.warn('Supabase fetch inquiries error, using cached/default:', e);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const refreshDonations = async () => {
    if (!isSupabaseConfigured()) {
      setIsLoadingDonations(false);
      return;
    }
    setIsLoadingDonations(true);
    try {
      const supabase = createClient();
      // Route through secured RPC get_staff_donations to enforce role-based column filtering
      const { data, error } = await supabase.rpc('get_staff_donations');

      if (!error && data) {
        setDonations((data as DatabaseDonationRow[]).map(dbToDonation));
      } else if (error) {
        console.warn('Supabase fetch donations RPC error, using cached/default:', error);
      }
    } catch (e) {
      console.warn('Supabase fetch donations error, using cached/default:', e);
    } finally {
      setIsLoadingDonations(false);
    }
  };

  // Load live Supabase data on mount with fallback
  useEffect(() => {
    const initData = () => {
      try {
        const CURRENT_DATA_VERSION = 'v4d_forensic_verified';
        const savedVersion = localStorage.getItem('vm_data_version');
        const isOutdated = savedVersion !== CURRENT_DATA_VERSION;

        if (isOutdated) {
          localStorage.setItem('vm_data_version', CURRENT_DATA_VERSION);
          localStorage.removeItem('vm_publications');
          localStorage.removeItem('vm_events');
          localStorage.removeItem('vm_courses');
        }

        const savedInq = localStorage.getItem('vm_inquiries');
        if (savedInq) {
          try {
            setInquiries(JSON.parse(savedInq));
          } catch {}
        }

        const savedDon = localStorage.getItem('vm_donations');
        if (savedDon) {
          try {
            setDonations(JSON.parse(savedDon));
          } catch {}
        }
      } catch (e) {
        console.warn('LocalStorage error in DataProvider:', e);
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(initData);
      } else {
        setTimeout(initData, 50);
      }
    }

    if (!isSupabaseConfigured()) {
      setIsLoadingTeachings(false);
      setIsLoadingAcharyas(false);
      setIsLoadingCourses(false);
      setIsLoadingEvents(false);
      setIsLoadingPublications(false);
      setIsLoadingInquiries(false);
      setIsLoadingDonations(false);
      return;
    }

    refreshUserRole();
    refreshTeachings();
    refreshAcharyas();
    refreshCourses();
    refreshEvents();
    refreshPublications();
    refreshInquiries();
    refreshDonations();

    let authSubscription: { unsubscribe: () => void } | null = null;
    try {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange(() => {
        refreshUserRole();
        refreshDonations();
      });
      authSubscription = data?.subscription ?? null;
    } catch (e) {
      console.warn('Supabase auth state listener error:', e);
    }

    return () => {
      authSubscription?.unsubscribe();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Acharyas Methods
  // ---------------------------------------------------------------------------
  const addAcharya = async (aData: Omit<Acharya, 'sort_order'> & { sort_order?: number }) => {
    const slug = aData.slug || aData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const sort_order = aData.sort_order ?? acharyas.length;
    const is_published = aData.is_published ?? true;
    const newAcharya: Acharya = { ...aData, slug, sort_order, is_published };

    setAcharyas((prev) => [...prev, newAcharya]);

    try {
      const supabase = createClient();
      const dbPayload = acharyaToDb(newAcharya);
      const { data, error } = await supabase.from('acharyas').insert(dbPayload).select().single();
      if (!error && data) {
        const persisted = dbToAcharya(data);
        setAcharyas((prev) => prev.map((a) => (a.slug === slug ? persisted : a)));
        return persisted;
      } else if (error) {
        console.error('Supabase addAcharya error:', error);
      }
    } catch (e) {
      console.warn('Supabase addAcharya network error:', e);
    }
    return newAcharya;
  };

  const updateAcharya = async (slug: string, updated: Partial<Acharya>) => {
    setAcharyas((prev) => prev.map((a) => (a.slug === slug ? { ...a, ...updated } : a)));

    try {
      const supabase = createClient();
      const dbPayload = acharyaToDb(updated);
      const { data, error } = await supabase
        .from('acharyas')
        .update(dbPayload)
        .eq('slug', slug)
        .select()
        .single();

      if (!error && data) {
        const persisted = dbToAcharya(data);
        setAcharyas((prev) => prev.map((a) => (a.slug === slug ? persisted : a)));
        return persisted;
      } else if (error) {
        console.error('Supabase updateAcharya error:', error);
      }
    } catch (e) {
      console.warn('Supabase updateAcharya network error:', e);
    }
  };

  const deleteAcharya = async (slug: string) => {
    setAcharyas((prev) => prev.filter((a) => a.slug !== slug));

    try {
      const supabase = createClient();
      const { error } = await supabase.from('acharyas').delete().eq('slug', slug);
      if (error) {
        console.error('Supabase deleteAcharya error:', error);
      }
    } catch (e) {
      console.warn('Supabase deleteAcharya network error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Courses Methods
  // ---------------------------------------------------------------------------
  const addCourse = async (courseData: Omit<Course, 'id' | 'slug'> & { id?: string; slug?: string }) => {
    const rawSlug = courseData.slug || courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const id = courseData.id || rawSlug;
    const slug = rawSlug;
    const sort_order = courseData.sort_order ?? courses.length;
    const is_published = courseData.is_published ?? true;
    const newCourse: Course = { ...courseData, id, slug, sort_order, is_published };

    setCourses((prev) => [...prev, newCourse]);
    save('vm_courses', [...courses, newCourse]);

    try {
      const supabase = createClient();
      const dbPayload = courseToDb(newCourse);
      const { data, error } = await supabase.from('courses').insert(dbPayload).select().single();
      if (!error && data) {
        const persisted = dbToCourse(data);
        setCourses((prev) => prev.map((c) => (c.id === id ? persisted : c)));
        return persisted;
      } else if (error) {
        console.error('Supabase addCourse error:', error);
      }
    } catch (e) {
      console.warn('Supabase addCourse network error:', e);
    }
    return newCourse;
  };

  const updateCourse = async (id: string, updated: Partial<Course>) => {
    setCourses((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c));
      save('vm_courses', next);
      return next;
    });

    try {
      const supabase = createClient();
      const dbPayload = courseToDb(updated);
      const { data, error } = await supabase
        .from('courses')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const persisted = dbToCourse(data);
        setCourses((prev) => prev.map((c) => (c.id === id ? persisted : c)));
        return persisted;
      } else if (error) {
        console.error('Supabase updateCourse error:', error);
      }
    } catch (e) {
      console.warn('Supabase updateCourse network error:', e);
    }
  };

  const deleteCourse = async (id: string) => {
    setCourses((prev) => {
      const next = prev.filter((c) => c.id !== id);
      save('vm_courses', next);
      return next;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) {
        console.error('Supabase deleteCourse error:', error);
      }
    } catch (e) {
      console.warn('Supabase deleteCourse network error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Events Methods
  // ---------------------------------------------------------------------------
  const addEvent = async (eventData: Omit<VMEvent, 'id'> & { id?: string }) => {
    const rawSlug = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const id = eventData.id || `event-${rawSlug}-${Date.now()}`;
    const is_published = eventData.is_published ?? true;
    const newEvent: VMEvent = { id, ...eventData, is_published };

    setEvents((prev) => {
      const next = [newEvent, ...prev];
      save('vm_events', next);
      return next;
    });

    try {
      const supabase = createClient();
      const dbPayload = eventToDb(newEvent);
      const { data, error } = await supabase.from('events').insert(dbPayload).select().single();
      if (!error && data) {
        const persisted = dbToEvent(data);
        setEvents((prev) => prev.map((e) => (e.id === id ? persisted : e)));
        return persisted;
      } else if (error) {
        console.error('Supabase addEvent error:', error);
      }
    } catch (e) {
      console.warn('Supabase addEvent network error:', e);
    }
    return newEvent;
  };

  const updateEvent = async (id: string, updated: Partial<VMEvent>) => {
    setEvents((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updated } : e));
      save('vm_events', next);
      return next;
    });

    try {
      const supabase = createClient();
      const dbPayload = eventToDb(updated);
      const { data, error } = await supabase
        .from('events')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const persisted = dbToEvent(data);
        setEvents((prev) => prev.map((e) => (e.id === id ? persisted : e)));
        return persisted;
      } else if (error) {
        console.error('Supabase updateEvent error:', error);
      }
    } catch (e) {
      console.warn('Supabase updateEvent network error:', e);
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      save('vm_events', next);
      return next;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        console.error('Supabase deleteEvent error:', error);
      }
    } catch (e) {
      console.warn('Supabase deleteEvent network error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Teaching Methods
  // ---------------------------------------------------------------------------
  const addTeaching = async (tData: Omit<Teaching, 'id'>) => {
    const rawSlug = tData.slug || tData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    const id = (tData as any).id || `teaching-${rawSlug}-${Date.now()}`;
    const slug = rawSlug;
    const is_published = (tData as any).is_published ?? false;

    const newTeaching: Teaching = { id, slug, ...tData, is_published };
    setTeachings((prev) => [newTeaching, ...prev]);

    try {
      const supabase = createClient();
      const dbPayload = teachingToDb(newTeaching as any);
      const { data, error } = await supabase.from('teachings').insert(dbPayload).select().single();
      if (!error && data) {
        const persisted = dbToTeaching(data);
        setTeachings((prev) => prev.map((t) => (t.id === id ? persisted : t)));
        return persisted;
      } else if (error) {
        console.error('Supabase addTeaching error:', error);
      }
    } catch (e) {
      console.warn('Supabase addTeaching network error:', e);
    }
    return newTeaching;
  };

  const updateTeaching = async (id: string, updated: Partial<Teaching>) => {
    setTeachings((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));

    try {
      const supabase = createClient();
      const dbPayload: any = {};
      if (updated.title !== undefined) dbPayload.title = updated.title;
      if (updated.slug !== undefined) dbPayload.slug = updated.slug;
      if (updated.scripture !== undefined) dbPayload.scripture = updated.scripture;
      if (updated.teacher !== undefined) dbPayload.teacher = updated.teacher;
      if (updated.format !== undefined) dbPayload.format = updated.format;
      if (updated.language !== undefined) dbPayload.language = updated.language;
      if (updated.duration !== undefined) dbPayload.duration = updated.duration;
      if (updated.description !== undefined) dbPayload.description = updated.description;
      if (updated.topic !== undefined) dbPayload.topic = updated.topic;
      if (updated.category !== undefined) dbPayload.category_slug = updated.category;
      if (updated.categoryName !== undefined) dbPayload.category_name = updated.categoryName;
      if (updated.src !== undefined) dbPayload.src = updated.src;
      if (updated.audioUrl !== undefined) dbPayload.audio_url = updated.audioUrl;
      if (updated.youtubePlaylistId !== undefined) dbPayload.youtube_playlist_id = updated.youtubePlaylistId;
      if (updated.youtubeVideoId !== undefined) dbPayload.youtube_video_id = updated.youtubeVideoId;
      if (updated.thumbnailSrc !== undefined) dbPayload.thumbnail_src = updated.thumbnailSrc;
      if (updated.is_published !== undefined) dbPayload.is_published = updated.is_published;

      const { data, error } = await supabase
        .from('teachings')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const persisted = dbToTeaching(data);
        setTeachings((prev) => prev.map((t) => (t.id === id ? persisted : t)));
        return persisted;
      } else if (error) {
        console.error('Supabase updateTeaching error:', error);
      }
    } catch (e) {
      console.warn('Supabase updateTeaching network error:', e);
    }
  };

  const deleteTeaching = async (id: string) => {
    setTeachings((prev) => prev.filter((t) => t.id !== id));

    try {
      const supabase = createClient();
      const { error } = await supabase.from('teachings').delete().eq('id', id);
      if (error) {
        console.error('Supabase deleteTeaching error:', error);
      }
    } catch (e) {
      console.warn('Supabase deleteTeaching network error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Publications Methods
  // ---------------------------------------------------------------------------
  const addPublication = async (pubData: Omit<Publication, 'id'> & { id?: string }) => {
    const id = pubData.id || `pub-${Date.now()}`;
    const is_published = pubData.is_published ?? true;
    const newPub: Publication = { id, ...pubData, is_published };

    setPublications((prev) => {
      const next = [newPub, ...prev];
      save('vm_publications', next);
      return next;
    });

    try {
      const supabase = createClient();
      const dbPayload = publicationToDb(newPub);
      const { data, error } = await supabase.from('publications').insert(dbPayload).select().single();
      if (!error && data) {
        const persisted = dbToPublication(data);
        setPublications((prev) => prev.map((p) => (p.id === id ? persisted : p)));
        return persisted;
      } else if (error) {
        console.error('Supabase addPublication error:', error);
      }
    } catch (e) {
      console.warn('Supabase addPublication network error:', e);
    }
    return newPub;
  };

  const updatePublication = async (id: string, updated: Partial<Publication>) => {
    setPublications((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p));
      save('vm_publications', next);
      return next;
    });

    try {
      const supabase = createClient();
      const dbPayload = publicationToDb(updated);
      const { data, error } = await supabase
        .from('publications')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const persisted = dbToPublication(data);
        setPublications((prev) => prev.map((p) => (p.id === id ? persisted : p)));
        return persisted;
      } else if (error) {
        console.error('Supabase updatePublication error:', error);
      }
    } catch (e) {
      console.warn('Supabase updatePublication network error:', e);
    }
  };

  const deletePublication = async (id: string) => {
    setPublications((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save('vm_publications', next);
      return next;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase.from('publications').delete().eq('id', id);
      if (error) {
        console.error('Supabase deletePublication error:', error);
      }
    } catch (e) {
      console.warn('Supabase deletePublication network error:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // Inquiry & Donation Methods (Supabase Backed with Local Cache Fallback)
  // ---------------------------------------------------------------------------
  const addInquiry = async (inq: Omit<Inquiry, 'id' | 'date' | 'status'> & { id?: string; date?: string; status?: Inquiry['status'] }) => {
    const id = inq.id || 'inq-' + Date.now();
    const date = inq.date || new Date().toISOString().split('T')[0];
    const status = inq.status || 'New';
    const newInq: Inquiry = {
      ...inq,
      id,
      date,
      status,
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const dbPayload = inquiryToDb(newInq, false);
        const { error } = await supabase.from('inquiries').insert(dbPayload);
        if (error) {
          console.error('Supabase addInquiry error:', error);
        }
      } catch (e) {
        console.warn('Supabase addInquiry error, saved locally:', e);
      }
    }

    setInquiries((prev) => {
      const next = [newInq, ...prev.filter((i) => i.id !== id)];
      save('vm_inquiries', next);
      return next;
    });

    return newInq;
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, status } : i));
      save('vm_inquiries', next);
      return next;
    });

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
        if (error) {
          console.error('Supabase updateInquiryStatus error:', error);
        }
      } catch (e) {
        console.warn('Supabase updateInquiryStatus network error:', e);
      }
    }
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => {
      const next = prev.filter((i) => i.id !== id);
      save('vm_inquiries', next);
      return next;
    });

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) {
          console.error('Supabase deleteInquiry error:', error);
        }
      } catch (e) {
        console.warn('Supabase deleteInquiry network error:', e);
      }
    }
  };

  const addDonation = async (don: Omit<DonationRecord, 'id' | 'date' | 'verificationStatus'> & { id?: string; date?: string; verificationStatus?: DonationRecord['verificationStatus']; notes?: string }): Promise<DonationRecord | void> => {
    // If an administrator is submitting a pre-verified or custom-status offering via addDonation, route through the secure RPC
    if (don.verificationStatus && don.verificationStatus !== 'Pending') {
      return logAdminDonation({
        donorName: don.donorName,
        category: don.category,
        amount: don.amount,
        method: don.method,
        utrNumber: don.utrNumber,
        donorEmail: don.donorEmail,
        donorPhone: don.donorPhone,
        donorPan: don.donorPan,
        verificationStatus: don.verificationStatus,
        receiptStatus: don.receiptStatus || 'Pending',
        date: don.date,
        notes: don.notes,
      });
    }

    const id = don.id || 'don-' + Date.now();
    const date = don.date || new Date().toISOString().split('T')[0];
    const newDon: DonationRecord = {
      ...don,
      id,
      date,
      // Public submissions are ALWAYS strictly Pending
      verificationStatus: 'Pending',
      receiptStatus: 'Pending',
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        // Exclude server-controlled columns verification_status, receipt_status, and notes on public INSERT
        const dbPayload = donationToDb(newDon, false);
        const { error } = await supabase.from('donations').insert(dbPayload);
        if (error) {
          console.error('Supabase addDonation error:', error);
        }
      } catch (e) {
        console.warn('Supabase addDonation error, saved locally:', e);
      }
    }

    setDonations((prev) => {
      const next = [newDon, ...prev.filter((d) => d.id !== id)];
      save('vm_donations', next);
      return next;
    });

    return newDon;
  };

  const logAdminDonation = async (don: Omit<DonationRecord, 'id' | 'date'> & { id?: string; date?: string; notes?: string }): Promise<DonationRecord> => {
    let createdRecord: DonationRecord = {
      id: don.id || 'don-' + Date.now(),
      donorName: don.donorName.trim(),
      donorEmail: don.donorEmail ? don.donorEmail.trim() : undefined,
      donorPhone: don.donorPhone ? don.donorPhone.trim() : undefined,
      donorPan: don.donorPan ? don.donorPan.trim() : undefined,
      category: don.category.trim(),
      amount: Number(don.amount),
      date: don.date || new Date().toISOString().split('T')[0],
      method: don.method.trim(),
      utrNumber: don.utrNumber.trim(),
      verificationStatus: don.verificationStatus || 'Verified',
      receiptStatus: don.receiptStatus || 'Issued',
      notes: don.notes ? don.notes.trim() : undefined,
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const payload = {
          p_donor_name: don.donorName.trim(),
          p_category: don.category.trim(),
          p_amount: Number(don.amount),
          p_method: don.method.trim(),
          p_utr_number: don.utrNumber.trim(),
          p_donor_email: don.donorEmail ? don.donorEmail.trim() : null,
          p_donor_phone: don.donorPhone ? don.donorPhone.trim() : null,
          p_donor_pan: don.donorPan ? don.donorPan.trim() : null,
          p_verification_status: don.verificationStatus || 'Verified',
          p_receipt_status: don.receiptStatus || 'Issued',
          p_tx_date: don.date || new Date().toISOString().split('T')[0],
          p_notes: don.notes ? don.notes.trim() : null,
        };

        const { data, error } = await supabase.rpc('log_admin_donation', payload);
        if (error) {
          console.error('Supabase logAdminDonation error:', error);
        } else if (data) {
          createdRecord = dbToDonation(data as DatabaseDonationRow);
        }
      } catch (e) {
        console.warn('Supabase logAdminDonation network error:', e);
      }
    }

    setDonations((prev) => {
      const next = [createdRecord, ...prev.filter((d) => d.id !== createdRecord.id)];
      save('vm_donations', next);
      return next;
    });

    return createdRecord;
  };

  const updateDonationVerification = async (id: string, verificationStatus: DonationRecord['verificationStatus']) => {
    setDonations((prev) => {
      const next = prev.map((d) => (d.id === id ? { ...d, verificationStatus } : d));
      save('vm_donations', next);
      return next;
    });

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.rpc('update_donation_verification', {
          p_donation_id: id,
          p_verification_status: verificationStatus,
        });
        if (error) {
          console.error('Supabase updateDonationVerification error:', error);
        }
      } catch (e) {
        console.warn('Supabase updateDonationVerification network error:', e);
      }
    }
  };

  const updateDonationReceipt = async (id: string, receiptStatus: NonNullable<DonationRecord['receiptStatus']>) => {
    setDonations((prev) => {
      const next = prev.map((d) => (d.id === id ? { ...d, receiptStatus } : d));
      save('vm_donations', next);
      return next;
    });

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.rpc('update_donation_receipt', {
          p_donation_id: id,
          p_receipt_status: receiptStatus,
        });
        if (error) {
          console.error('Supabase updateDonationReceipt error:', error);
        }
      } catch (e) {
        console.warn('Supabase updateDonationReceipt network error:', e);
      }
    }
  };

  const updateDonationStatus = async (id: string, receiptStatus: NonNullable<DonationRecord['receiptStatus']>) => {
    return updateDonationReceipt(id, receiptStatus);
  };

  const deleteDonation = async (id: string) => {
    setDonations((prev) => {
      const next = prev.filter((d) => d.id !== id);
      save('vm_donations', next);
      return next;
    });

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { error } = await supabase.rpc('delete_admin_donation', {
          p_donation_id: id,
        });
        if (error) {
          console.error('Supabase deleteDonation error:', error);
        }
      } catch (e) {
        console.warn('Supabase deleteDonation network error:', e);
      }
    }
  };

  const resetToDefaults = () => {
    setEvents(defaultEvents);
    setCourses(defaultCourses);
    setTeachings(defaultTeachings);
    setPublications(defaultPublications);
    setAcharyas(defaultAcharyas);
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
        userRole,
        isAdmin,
        refreshUserRole,
        addEvent,
        updateEvent,
        deleteEvent,
        refreshEvents,
        isLoadingEvents,
        addCourse,
        updateCourse,
        deleteCourse,
        refreshCourses,
        isLoadingCourses,
        addTeaching,
        updateTeaching,
        deleteTeaching,
        refreshTeachings,
        isLoadingTeachings,
        addPublication,
        updatePublication,
        deletePublication,
        refreshPublications,
        isLoadingPublications,
        addAcharya,
        updateAcharya,
        deleteAcharya,
        refreshAcharyas,
        isLoadingAcharyas,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        refreshInquiries,
        isLoadingInquiries,
        addDonation,
        logAdminDonation,
        updateDonationStatus,
        updateDonationVerification,
        updateDonationReceipt,
        deleteDonation,
        refreshDonations,
        isLoadingDonations,
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
