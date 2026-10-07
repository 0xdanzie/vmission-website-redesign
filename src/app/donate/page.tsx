'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import CinematicHero from '@/components/cinematic/CinematicHero';
import CinematicPreFooter from '@/components/cinematic/CinematicPreFooter';
import { useToast } from '@/context/ToastContext';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export interface SevaOfferingItem {
  id: string;
  name: string;
  amountLabel: string;
  numericAmount?: number;
  status: 'DOCUMENTED' | 'CONTACT_ASHRAM';
  note?: string;
}

export interface SevaCategory {
  id: string;
  title: string;
  icon: string;
  desc: string;
  offerings: SevaOfferingItem[];
}

const SEVA_CATEGORIES: SevaCategory[] = [
  {
    id: 'pooja',
    title: 'Pooja & Abhisheka',
    icon: '🪔',
    desc: 'Support daily Archana and Rudrabhishek offerings at Sri Gangeshwar Mahadev Mandir, as well as pujas on auspicious Ashram festivals or personal family occasions.',
    offerings: [
      {
        id: 'pooja-bday',
        name: 'Birthday of You or Your Family Members',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'pooja-anniv',
        name: 'Wedding Anniversary',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'pooja-punya',
        name: 'Death Anniversary (Punyatithi)',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'pooja-shraddha',
        name: 'Shraddha Parva',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'pooja-special',
        name: 'Any Other Special Family Occasion',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'pooja-rudra',
        name: 'Puja & Rudrabhishek (Special Request)',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Arrangements confirmed directly with Ashram office',
      },
      {
        id: 'pooja-ashram-fest',
        name: 'Ashram Occasions (Maha Shivratri, Guru Poornima, Janmastami, Deepawali, Acharya Jayantis)',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Seasonal arrangements as per Ashram calendar',
      },
    ],
  },
  {
    id: 'bhiksha',
    title: 'Bhiksha (Annadanam)',
    icon: '🥣',
    desc: 'Offering food to Sannyasis and seekers is a traditional punya karma. Offerings sustain the daily sattwic meals served to resident Mahatmas, brahmacharis, and students.',
    offerings: [
      {
        id: 'bhiksha-bday',
        name: 'Birthday of You or Your Family Members',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'bhiksha-anniv',
        name: 'Wedding Anniversary',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'bhiksha-punya',
        name: 'Death Anniversary (Punyatithi)',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'bhiksha-shraddha',
        name: 'Shraddha Parva',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'bhiksha-special',
        name: 'Any Other Special Family Occasion',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'bhiksha-onetime',
        name: 'One-Time Meal for All Ashram Inmates',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Arrangement based on resident inmate strength',
      },
      {
        id: 'bhiksha-fullday',
        name: 'Full-Day Bhiksha (3 Meals for All Inmates)',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Arrangement based on resident inmate strength',
      },
      {
        id: 'bhiksha-festival',
        name: 'Festival & Acharya Sanyas Days Bhiksha',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
      },
    ],
  },
  {
    id: 'students',
    title: 'Donations for Students',
    icon: '📖',
    desc: 'Vedanta Ashram conducts 3-Year Residential Vedanta Gurukula Courses totally free. Contributions support all food, books, study materials, and medical care of dedicated students.',
    offerings: [
      {
        id: 'student-bday',
        name: 'Birthday of You or Your Family Members',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'student-anniv',
        name: 'Wedding Anniversary',
        amountLabel: '₹1,001',
        numericAmount: 1001,
        status: 'DOCUMENTED',
      },
      {
        id: 'student-punya',
        name: 'Death Anniversary (Punyatithi)',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'student-shraddha',
        name: 'Shraddha Parva',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'student-special',
        name: 'Any Other Special Family Occasion',
        amountLabel: '₹501',
        numericAmount: 501,
        status: 'DOCUMENTED',
      },
      {
        id: 'student-1m',
        name: 'Student Expenses: For One Month',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Covers books, boarding, clothes, medicine for 1 student',
      },
      {
        id: 'student-1y',
        name: 'Student Expenses: For One Year',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Covers comprehensive annual expenses for 1 student',
      },
      {
        id: 'student-3y',
        name: 'Student Expenses: For Three Years',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Covers entire 3-year Gurukula course duration for 1 student',
      },
    ],
  },
  {
    id: 'publications',
    title: 'Donations for Publications',
    icon: '📜',
    desc: 'Subsidize the printing and free worldwide digital dissemination of scriptural commentaries, the monthly Vedanta Sandesh and Vedanta Piyush ezines, and discourse recordings.',
    offerings: [
      {
        id: 'pub-piyush-ad',
        name: 'Best Wishes Advertisement for Vedanta Piyush (1 Year)',
        amountLabel: '₹5,001 / year',
        numericAmount: 5001,
        status: 'DOCUMENTED',
        note: 'Published across monthly issues for one full year',
      },
      {
        id: 'pub-book-memory',
        name: 'Publishing of Any Scriptural Book in Memory of Someone',
        amountLabel: 'Contact Ashram',
        status: 'CONTACT_ASHRAM',
        note: 'Arrangements confirmed with the editorial team',
      },
    ],
  },
  {
    id: 'maintenance',
    title: 'Ashram: Construction & Maintenance Corpus Fund',
    icon: '🏛️',
    desc: 'Any amount can be offered for recurring Ashram construction, preservation of the temple sanctum, library upkeep, guest kutirs, and solar/water facilities.',
    offerings: [
      {
        id: 'maint-recurring',
        name: 'Recurring Ashram Construction & Maintenance Works',
        amountLabel: '₹1,001 or Multiples',
        numericAmount: 1001,
        status: 'DOCUMENTED',
        note: 'Minimum documented offering ₹1,001; multiples welcome',
      },
    ],
  },
  {
    id: 'medical',
    title: 'Medical Emergency Corpus Fund',
    icon: '🩺',
    desc: 'Special fund dedicated to healthcare, medical consultations, diagnostics, hospitalization, and emergency medicine for resident Ashram inmates and ascetics.',
    offerings: [
      {
        id: 'med-emergency',
        name: 'Emergency Medical Care for Ashram Inmates',
        amountLabel: '₹1,001 or Multiples',
        numericAmount: 1001,
        status: 'DOCUMENTED',
        note: 'Minimum documented offering ₹1,001; multiples welcome',
      },
    ],
  },
];

type PaymentMethodId =
  | 'neft'
  | 'upi'
  | 'paytm'
  | 'cheque'
  | 'paypal'
  | 'wire'
  | 'western_union';

interface PaymentMethodDef {
  id: PaymentMethodId;
  label: string;
  tag: string;
  title: string;
}

const PAYMENT_METHODS: PaymentMethodDef[] = [
  { id: 'neft', label: 'NEFT / RTGS / IMPS', tag: 'Domestic Bank', title: 'Direct Bank Transfer (Inland India)' },
  { id: 'upi', label: 'UPI Transfer', tag: 'Fast / Mobile', title: 'Unified Payments Interface (UPI)' },
  { id: 'paytm', label: 'PayTM / Mobile', tag: 'eWallet', title: 'PayTM & Mobile Remittance' },
  { id: 'cheque', label: 'Cheque / DD', tag: 'Postal', title: 'Crossed Cheque or Demand Draft' },
  { id: 'paypal', label: 'PayPal (Overseas)', tag: 'International', title: 'PayPal for International Offerings' },
  { id: 'wire', label: 'Telegraphic Wire', tag: 'Foreign NRI', title: 'International Wire Transfer (SWIFT/BIC)' },
  { id: 'western_union', label: 'Western Union', tag: 'Foreign', title: 'Western Union Money Transfer' },
];

export default function DonatePage() {
  const { showToast } = useToast();
  const { addDonation } = useData();

  // Active Category State
  const [selectedCat, setSelectedCat] = useState<SevaCategory>(SEVA_CATEGORIES[0]);
  const [selectedOffering, setSelectedOffering] = useState<SevaOfferingItem>(SEVA_CATEGORIES[0].offerings[0]);

  // Active Method State (Desktop tabs & Mobile Accordion)
  const [activeMethodId, setActiveMethodId] = useState<PaymentMethodId>('neft');
  const [mobileExpandedMethod, setMobileExpandedMethod] = useState<PaymentMethodId | null>('neft');

  // Acknowledgement form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [amount, setAmount] = useState('1001');
  const [method, setMethod] = useState('NEFT / RTGS');
  const [utrNumber, setUtrNumber] = useState('');
  const [txDate, setTxDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Truthful acknowledgement state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);

  const methodsSectionRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard`, 'success');
    }
  };

  const copyAllDomesticBankDetails = () => {
    const text = `Beneficiary Name: Vedanta Parmarthik Sewa Trust
Account Number: 02811000003766
Account Type: Savings Account
Bank: HDFC Bank
Branch: Annapoorna Road Branch, Indore
IFSC Code: HDFC0001771
MICR Code: 452240003`;
    copyToClipboard(text, 'All domestic banking details');
  };

  const copyAllWireDetails = () => {
    const text = `Account Name: Swami Atmananda Saraswati
Account Number: 0281100004040
Bank: HDFC Bank Ltd.
Branch: Annapoorna Road, Indore – 452009, India
SWIFT Code: HDFCINBB
BIC: HDFCINBBXXX
IFSC Code: HDFC0001771
MICR Code: 452240003`;
    copyToClipboard(text, 'All foreign wire remittance details');
  };

  const handleSelectOffering = (cat: SevaCategory, offering: SevaOfferingItem) => {
    setSelectedCat(cat);
    setSelectedOffering(offering);
    if (offering.numericAmount) {
      setAmount(String(offering.numericAmount));
    }
    showToast(`Selected: ${offering.name} (${offering.amountLabel})`, 'info');
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateProofForm = () => {
    const errs: Record<string, string> = {};
    if (!donorName.trim()) errs.name = 'Full name is required.';
    if (!donorEmail.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!utrNumber.trim()) {
      errs.utr = 'Transaction reference / UTR number is required.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePrepareAcknowledgement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProofForm()) {
      showToast('Please correct the highlighted fields.', 'error');
      return;
    }

    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 1001;
    const resolvedMethod = method.includes('UPI') ? 'UPI' : method.includes('Cheque') ? 'Cheque' : 'NEFT/RTGS';

    setIsSubmitting(true);
    setTimeout(() => {
      // Save locally to DataContext for session memory & admin view
      addDonation({
        donorName: donorName.trim(),
        category: `${selectedCat.title} — ${selectedOffering.name}`,
        amount: numericAmount,
        method: resolvedMethod,
        utrNumber: utrNumber.trim(),
        receiptStatus: 'Pending',
      });
      setIsSubmitting(false);
      setIsPrepared(true);
      showToast('Acknowledgement details prepared for transmission.', 'success');
    }, 400);
  };

  const purposeString = `${selectedCat.title}: ${selectedOffering.name}`;

  const ackEmailSubject = `[Seva Offering Notification] ${purposeString} - ${donorName || 'Devotee'}`;
  const ackEmailBody = `Hari Om Vedanta Ashram Office,

Please find below the details of my sacred offering made to Vedanta Parmarthik Sewa Trust:

• Donor Full Name: ${donorName}
• Email: ${donorEmail}
• Phone / WhatsApp: ${donorPhone || 'Not provided'}
• PAN (for Section 80-G compliance): ${donorPan || 'Not provided'}
• Seva Purpose: ${purposeString}
• Offering Amount: ₹${amount}
• Payment Method: ${method}
• Transaction Reference / UTR Number: ${utrNumber}
• Transaction Date: ${txDate}

Kindly reconcile this offering with your bank credits and acknowledge receipt.

With reverent regards,
${donorName}`;

  const ackEmailHref = `mailto:vmission@gmail.com?subject=${encodeURIComponent(
    ackEmailSubject
  )}&body=${encodeURIComponent(ackEmailBody)}`;

  const ackWhatsAppHref = `https://wa.me/919826959480?text=${encodeURIComponent(
    `*Hari Om Vedanta Ashram*\n\nHere are details of my Seva offering:\n• *Donor:* ${donorName}\n• *Purpose:* ${purposeString}\n• *Amount:* ₹${amount}\n• *Method:* ${method}\n• *UTR / Ref:* ${utrNumber}\n• *Date:* ${txDate}\n• *Email:* ${donorEmail}\n• *PAN:* ${donorPan || 'N/A'}\n\nPlease verify and acknowledge.`
  )}`;

  // Render Method Content Helper
  const renderMethodContent = (methodId: PaymentMethodId) => {
    switch (methodId) {
      case 'neft':
        return (
          <>
            <p className={styles.methodIntroText}>
              For electronic fund transfers from any bank account within India via NEFT, RTGS, or IMPS. Please use the exact verified details below:
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Beneficiary Name</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankValText}>Vedanta Parmarthik Sewa Trust</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('Vedanta Parmarthik Sewa Trust', 'Beneficiary Name')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Account Number</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>02811000003766</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('02811000003766', 'Account Number')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Account Type</span>
                <span className={styles.bankValText}>Savings Account</span>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Bank Name</span>
                <span className={styles.bankValText}>HDFC Bank</span>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Branch Address</span>
                <span className={styles.bankValText}>Annapoorna Road Branch, Indore – 452009</span>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>IFSC Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>HDFC0001771</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('HDFC0001771', 'IFSC Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>MICR Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>452240003</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('452240003', 'MICR Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.methodActionFooter}>
              <button
                type="button"
                className={styles.btnActionCopyAll}
                onClick={copyAllDomesticBankDetails}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy All Banking Details
              </button>
              <span className={styles.taxNoticeSummary}>
                All donations of Rs 1,000.00 and above can avail IT Exemption u/s 80-G
              </span>
            </div>
          </>
        );

      case 'upi':
        return (
          <>
            <p className={styles.methodIntroText}>
              Direct instant UPI transfers can be made using your preferred mobile payment app (BHIM, Google Pay, PhonePe, Paytm, or bank UPI apps).
            </p>

            <div className={styles.upiGrid}>
              <div className={styles.upiItemCard}>
                <div>
                  <div className={styles.upiLabel}>Trust General Seva &amp; Offerings</div>
                  <div className={styles.upiSub}>Vedanta Parmarthik Sewa Trust Official VPA</div>
                  <div className={styles.upiAddress}>vedantaparmarthicsew.65038308@hdfcbank</div>
                </div>
                <button
                  type="button"
                  className={styles.btnCopyMini}
                  onClick={() =>
                    copyToClipboard(
                      'vedantaparmarthicsew.65038308@hdfcbank',
                      'Trust UPI ID'
                    )
                  }
                >
                  Copy UPI ID
                </button>
              </div>

              <div className={styles.upiItemCard}>
                <div>
                  <div className={styles.upiLabel}>Pujya Guruji Swami Atmanandaji (Guru Dakshina)</div>
                  <div className={styles.upiSub}>Direct Acharya Dakshina VPA</div>
                  <div className={styles.upiAddress}>swatma@upi</div>
                </div>
                <button
                  type="button"
                  className={styles.btnCopyMini}
                  onClick={() => copyToClipboard('swatma@upi', 'Swami Atmananda UPI ID')}
                >
                  Copy UPI ID
                </button>
              </div>

              <div className={styles.upiItemCard}>
                <div>
                  <div className={styles.upiLabel}>Swamini Amitanandaji</div>
                  <div className={styles.upiSub}>Direct Acharya Dakshina VPA</div>
                  <div className={styles.upiAddress}>swamita@upi</div>
                </div>
                <button
                  type="button"
                  className={styles.btnCopyMini}
                  onClick={() => copyToClipboard('swamita@upi', 'Swamini Amitananda UPI ID')}
                >
                  Copy UPI ID
                </button>
              </div>

              <div className={styles.upiItemCard}>
                <div>
                  <div className={styles.upiLabel}>Swamini Samatanandaji</div>
                  <div className={styles.upiSub}>Direct Acharya Dakshina VPA</div>
                  <div className={styles.upiAddress}>swsamata@upi</div>
                </div>
                <button
                  type="button"
                  className={styles.btnCopyMini}
                  onClick={() => copyToClipboard('swsamata@upi', 'Swamini Samatananda UPI ID')}
                >
                  Copy UPI ID
                </button>
              </div>

              <div className={styles.upiItemCard}>
                <div>
                  <div className={styles.upiLabel}>Swamini Poornanandaji</div>
                  <div className={styles.upiSub}>Direct Acharya Dakshina VPA</div>
                  <div className={styles.upiAddress}>swpoorna@okhdfcbank</div>
                </div>
                <button
                  type="button"
                  className={styles.btnCopyMini}
                  onClick={() => copyToClipboard('swpoorna@okhdfcbank', 'Swamini Poornananda UPI ID')}
                >
                  Copy UPI ID
                </button>
              </div>
            </div>

            <p className={styles.stepDesc}>
              After completing your UPI transfer, please note the UPI Reference Number (12 digits) and inform the Ashram via the acknowledgement form below.
            </p>
          </>
        );

      case 'paytm':
        return (
          <>
            <p className={styles.methodIntroText}>
              Offerings can be remitted via PayTM wallet or direct mobile number transfer to the verified Trust account.
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Registered Account Name</span>
                <span className={styles.bankValText}>Vedanta Parmarthik Sewa Trust</span>
              </div>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>PayTM / Mobile Number</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>+91 98269 59480</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('+919826959480', 'PayTM Number')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <p className={styles.stepDesc}>
              Please mention your name and the Seva purpose in the PayTM transaction remarks.
            </p>
          </>
        );

      case 'cheque':
        return (
          <>
            <p className={styles.methodIntroText}>
              Crossed Cheques or Demand Drafts should be made payable to the Trust and sent by registered post or courier to the Ashram address.
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Cheque Payee Name</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankValText}>Vedanta Parmarthik Sewa Trust</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('Vedanta Parmarthik Sewa Trust', 'Payee Name')}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Mailing Postal Address</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankValText}>
                    Vedanta Ashram, 2948, Sector-E, Sudama Nagar, Inside Shankaracharya Gate, Indore – 452009, M.P., India
                  </span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() =>
                      copyToClipboard(
                        'Vedanta Ashram, 2948, Sector-E, Sudama Nagar, Inside Shankaracharya Gate, Indore – 452009, M.P., India',
                        'Mailing Address'
                      )
                    }
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <p className={styles.stepDesc}>
              Please write your full name, PAN, postal address, and the chosen Seva purpose on the reverse of the cheque or in an accompanying note.
            </p>
          </>
        );

      case 'paypal':
        return (
          <>
            <p className={styles.methodIntroText}>
              Overseas devotees and international seekers wishing to make an offering in foreign currency can utilize the official verified PayPal link:
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Beneficiary Handle</span>
                <span className={styles.bankValText}>Swami Atmananda Saraswati</span>
              </div>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Official PayPal Link</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>https://www.paypal.me/swatma</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('https://www.paypal.me/swatma', 'PayPal Link')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.methodActionFooter}>
              <a
                href="https://www.paypal.me/swatma"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnActionExternal}
                aria-label="Open official PayPal link (opens in new tab)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Continue to PayPal (paypal.me/swatma)
              </a>
              <span className={styles.taxNoticeSummary}>
                Direct international link for devotees abroad
              </span>
            </div>
          </>
        );

      case 'wire':
        return (
          <>
            <p className={styles.methodIntroText}>
              For wire transfers originating from outside India (foreign NRI accounts or overseas remitters), please route payments through international telegraphic wire transfer:
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Account Name</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankValText}>Swami Atmananda Saraswati</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('Swami Atmananda Saraswati', 'Account Name')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Account Number</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>0281100004040</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('0281100004040', 'Foreign Account Number')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Bank Name</span>
                <span className={styles.bankValText}>HDFC Bank Ltd.</span>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Branch Address</span>
                <span className={styles.bankValText}>Annapoorna Road, Indore – 452009, India</span>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>SWIFT Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>HDFCINBB</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('HDFCINBB', 'SWIFT Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>BIC Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>HDFCINBBXXX</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('HDFCINBBXXX', 'BIC Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>IFSC Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>HDFC0001771</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('HDFC0001771', 'IFSC Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className={styles.bankRow}>
                <span className={styles.bankKey}>MICR Code</span>
                <div className={styles.bankValGroup}>
                  <span className={styles.bankVal}>452240003</span>
                  <button
                    type="button"
                    className={styles.btnCopyMini}
                    onClick={() => copyToClipboard('452240003', 'MICR Code')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.methodActionFooter}>
              <button
                type="button"
                className={styles.btnActionCopyAll}
                onClick={copyAllWireDetails}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy All Foreign Remittance Details
              </button>
              <span className={styles.taxNoticeSummary}>
                Designated foreign account for international remittances
              </span>
            </div>
          </>
        );

      case 'western_union':
        return (
          <>
            <p className={styles.methodIntroText}>
              For international offerings remitted through Western Union:
            </p>

            <div className={styles.bankDetailsTable}>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Receiver Name</span>
                <span className={styles.bankValText}>Swami Atmananda Saraswati</span>
              </div>
              <div className={styles.bankRow}>
                <span className={styles.bankKey}>Destination City &amp; Country</span>
                <span className={styles.bankValText}>Indore, Madhya Pradesh, India</span>
              </div>
            </div>

            <p className={styles.stepDesc}>
              After transmitting the funds, please send an email to{' '}
              <a href="mailto:vmission@gmail.com" style={{ color: 'var(--vm-gerua)', fontWeight: 600 }}>
                vmission@gmail.com
              </a>{' '}
              providing the 10-digit Money Transfer Control Number (MTCN), sender full name, city/country of origin, and transfer amount so the Ashram office can claim and credit the remittance.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  const activeMethodDef = PAYMENT_METHODS.find((m) => m.id === activeMethodId)!;

  return (
    <div className={styles.mainWrap}>
      {/* 8.1 Seva Hero with Focal Positioning */}
      <CinematicHero
        badge="VEDANTA MISSION · SEVA"
        title="Seva"
        lead="In the sacred Gurukula tradition, the supreme wisdom of Advaita Vedanta is shared freely with all sincere seekers without commercial fees. The Ashram, its teachings, daily temple worship, and student welfare are sustained entirely through voluntary Seva and reverent offerings (Dana)."
        backdropImage="/images/vmission/ashram/gangeshwar-dome-closeup.jpg"
        backdropAlt="Sri Gangeshwar Mahadev Mandir dome and sanctum at Vedanta Ashram"
        backdropPositionClass={styles.donateHeroBackdrop}
        focalPoint={{ desktop: { x: 50, y: 28 }, mobile: { x: 50, y: 20 } }}
        ctas={[
          { label: 'EXPLORE SEVA OFFERINGS ↓', href: '#seva-purposes', variant: 'primary' },
          { label: 'VIEW PAYMENT METHODS', href: '#offering-methods', variant: 'outline' },
        ]}
      />

      {/* 8.2 Seva Context */}
      <section className={styles.contextSection} aria-label="The Spirit of Seva">
        <div className={styles.contextContainer}>
          <span className={styles.contextEyebrow}>Participation &amp; Support</span>
          <h2 className={styles.contextTitle}>The Spirit of Dana</h2>
          <p className={styles.contextText}>
            For centuries, the Gurukula system has flourished on mutual reverence: teachers impart self-knowledge unconditionally, and society supports the ashram facilities so that the teaching of Vedanta continues unhindered. Every contribution made to the Ashram directly supports this continuity.
          </p>
          <div className={styles.trustAttribution}>
            <span aria-hidden="true">🏛️</span>
            <span>Managed and administered by <strong>Vedanta Parmarthik Sewa Trust</strong>, Indore</span>
          </div>
        </div>
      </section>

      {/* 8.3 Where Seva Takes Form & Documented Offerings */}
      <section
        id="seva-purposes"
        ref={categoriesSectionRef}
        className={styles.categoriesSection}
        aria-label="Seva Categories and Documented Amounts"
      >
        <div className={styles.categoriesContainer}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Forms of Support</span>
            <h2 className={styles.sectionMainTitle}>Where Seva Takes Form</h2>
            <p className={styles.sectionLead}>
              Review the documented offering options below. Select an occasion or purpose to pre-fill your acknowledgement details for the Ashram office.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {SEVA_CATEGORIES.map((cat) => {
              const isCatActive = selectedCat.id === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`${styles.categoryCard} ${isCatActive ? styles.categoryCardActive : ''}`}
                >
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardIcon} aria-hidden="true">
                      {cat.icon}
                    </span>
                    {isCatActive && <span className={styles.selectedBadge}>Active Category</span>}
                  </div>

                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <p className={styles.categoryDesc}>{cat.desc}</p>

                  {/* Documented Offerings Breakdown */}
                  <div className={styles.offeringsTableWrap}>
                    <div className={styles.offeringsTableHead}>
                      <span>Occasion / Purpose</span>
                      <span>Documented Amount</span>
                    </div>

                    {cat.offerings.map((offering) => {
                      const isItemSelected =
                        selectedCat.id === cat.id && selectedOffering.id === offering.id;
                      return (
                        <div key={offering.id} className={styles.offeringRow}>
                          <span className={styles.offeringName}>
                            {offering.name}
                            {offering.note && (
                              <small style={{ display: 'block', fontSize: '0.75rem', color: 'var(--vm-text-muted)' }}>
                                {offering.note}
                              </small>
                            )}
                          </span>

                          <div className={styles.offeringMeta}>
                            {offering.status === 'DOCUMENTED' ? (
                              <span className={styles.amountBadgeDocumented}>
                                {offering.amountLabel}
                              </span>
                            ) : (
                              <span className={styles.amountBadgeContact}>
                                {offering.amountLabel}
                              </span>
                            )}

                            <button
                              type="button"
                              className={styles.btnSelectOffering}
                              onClick={() => handleSelectOffering(cat, offering)}
                              aria-label={`Select ${offering.name} offering`}
                            >
                              {isItemSelected ? 'Selected ✓' : 'Select'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Actual Donation Mechanism */}
      <section
        id="offering-methods"
        ref={methodsSectionRef}
        className={styles.methodsSection}
        aria-label="Payment Methods"
      >
        <div className={styles.methodsContainer}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Giving Mechanism</span>
            <h2 className={styles.sectionMainTitle}>Choose an Offering Method</h2>
            <p className={styles.sectionLead}>
              Select your preferred transfer channel below. Exact, verified banking details and official payment routes are provided without intermediary charges.
            </p>
          </div>

          {/* Active Purpose Reminder Banner */}
          <div className={styles.activePurposeBanner}>
            <div className={styles.activePurposeText}>
              Selected Purpose: <strong>{selectedCat.title}</strong> — {selectedOffering.name} ({selectedOffering.amountLabel})
            </div>
            <button
              type="button"
              className={styles.changePurposeBtn}
              onClick={() => {
                if (categoriesSectionRef.current) {
                  categoriesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Explore Other Offerings ↑
            </button>
          </div>

          {/* Desktop 2-Column Method Selector */}
          <div className={styles.desktopMethodsGrid}>
            {/* Left Column: Method Tabs */}
            <nav className={styles.methodsNavList} aria-label="Donation payment methods">
              {PAYMENT_METHODS.map((m) => {
                const isActive = activeMethodId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`${styles.methodTabBtn} ${isActive ? styles.methodTabActive : ''}`}
                    onClick={() => setActiveMethodId(m.id)}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <span>{m.label}</span>
                    <span className={styles.methodTabTag}>{m.tag}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Column: Active Method Card */}
            <div className={styles.activeMethodCard} role="tabpanel">
              <div className={styles.activeMethodHeader}>
                <h3 className={styles.activeMethodTitle}>{activeMethodDef.title}</h3>
                <span className={styles.activeMethodCategoryBadge}>
                  Purpose: {selectedCat.title}
                </span>
              </div>

              {renderMethodContent(activeMethodId)}
            </div>
          </div>

          {/* Mobile Accordion View */}
          <div className={styles.mobileAccordion}>
            {PAYMENT_METHODS.map((m) => {
              const isExpanded = mobileExpandedMethod === m.id;
              return (
                <div key={m.id} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={`${styles.accordionHeaderBtn} ${isExpanded ? styles.accordionHeaderActive : ''}`}
                    onClick={() => setMobileExpandedMethod(isExpanded ? null : m.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>{m.label}</span>
                    <span className={styles.accordionIcon}>{isExpanded ? '−' : '+'}</span>
                  </button>
                  <div className={styles.accordionPanel} hidden={!isExpanded}>
                    <div className={styles.activeMethodHeader} style={{ marginBottom: 'var(--space-4)' }}>
                      <h4 className={styles.activeMethodTitle} style={{ fontSize: '1.25rem' }}>
                        {m.title}
                      </h4>
                    </div>
                    {renderMethodContent(m.id)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. After Your Offering & Truthful Acknowledgement Workflow */}
      <section
        id="acknowledgement"
        ref={formSectionRef}
        className={styles.afterOfferingSection}
        aria-label="After Your Offering & Acknowledgement"
      >
        <div className={styles.afterContainer}>
          <div className={styles.afterGrid}>
            {/* Left: Step-by-Step Institutional Instructions */}
            <div>
              <span className={styles.sectionEyebrow}>Acknowledgement Process</span>
              <h2 className={styles.sectionMainTitle} style={{ textAlign: 'left' }}>
                After Your Offering
              </h2>
              <p className={styles.sectionLead} style={{ textAlign: 'left' }}>
                Follow these three simple steps so the Ashram accounts team can identify your credit on their bank statements and acknowledge your offering.
              </p>

              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber} aria-hidden="true">
                    1
                  </div>
                  <div>
                    <h3 className={styles.stepTitle}>Complete Your Transfer</h3>
                    <p className={styles.stepDesc}>
                      Transmit your sacred offering using any of the verified channels above (NEFT, UPI, Cheque, Wire, or PayPal).
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber} aria-hidden="true">
                    2
                  </div>
                  <div>
                    <h3 className={styles.stepTitle}>Prepare Acknowledgement</h3>
                    <p className={styles.stepDesc}>
                      Enter your transaction reference number and details in the form. The system will format a clear notification message.
                    </p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <div className={styles.stepNumber} aria-hidden="true">
                    3
                  </div>
                  <div>
                    <h3 className={styles.stepTitle}>Send Directly to Ashram</h3>
                    <p className={styles.stepDesc}>
                      Transmit your prepared message to <strong>vmission@gmail.com</strong> or WhatsApp <strong>+91 98269 59480</strong>. The Ashram office will verify the entry and issue your official receipt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Truthful Proof Preparation Form & Action Centre */}
            <div>
              <div className={styles.proofFormCard}>
                <div className={styles.proofFormHeader}>
                  <h3 className={styles.proofFormTitle}>Inform the Ashram</h3>
                  <p className={styles.proofFormDesc}>
                    Your transaction details can be shared with the Ashram for follow-up and acknowledgement.
                  </p>
                </div>

                {!isPrepared ? (
                  <form onSubmit={handlePrepareAcknowledgement} noValidate>
                    <div className={styles.proofFormGrid}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="donor-name">
                          Donor Full Name <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="donor-name"
                          type="text"
                          className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`}
                          value={donorName}
                          onChange={(e) => {
                            setDonorName(e.target.value);
                            if (formErrors.name) setFormErrors((p) => ({ ...p, name: '' }));
                          }}
                          placeholder="e.g. Smt. Kamala Devi"
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.name}
                        />
                        {formErrors.name && (
                          <span className={styles.errorText}>{formErrors.name}</span>
                        )}
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="donor-email">
                          Email Address <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="donor-email"
                          type="email"
                          className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                          value={donorEmail}
                          onChange={(e) => {
                            setDonorEmail(e.target.value);
                            if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                          }}
                          placeholder="kamala@example.com"
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.email}
                        />
                        {formErrors.email && (
                          <span className={styles.errorText}>{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.proofFormGrid}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="donor-phone">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          id="donor-phone"
                          type="tel"
                          className={styles.input}
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="donor-pan">
                          PAN (for 80-G Tax Exemption)
                        </label>
                        <input
                          id="donor-pan"
                          type="text"
                          className={styles.input}
                          value={donorPan}
                          onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className={styles.proofFormGrid}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="offering-amount">
                          Offering Amount (₹ / Currency) <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="offering-amount"
                          type="text"
                          className={styles.input}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="1001"
                          required
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="payment-method-select">
                          Payment Method Used
                        </label>
                        <select
                          id="payment-method-select"
                          className={styles.select}
                          value={method}
                          onChange={(e) => setMethod(e.target.value)}
                        >
                          <option value="NEFT / RTGS">NEFT / RTGS / IMPS</option>
                          <option value="UPI">UPI Transfer</option>
                          <option value="PayTM">PayTM / Mobile Transfer</option>
                          <option value="Cheque">Crossed Cheque / Demand Draft</option>
                          <option value="PayPal">PayPal (Overseas)</option>
                          <option value="Telegraphic Wire">Telegraphic Wire Transfer</option>
                          <option value="Western Union">Western Union</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.proofFormGrid}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="utr-number">
                          Transaction Ref / UTR / MTCN <span className={styles.required}>*</span>
                        </label>
                        <input
                          id="utr-number"
                          type="text"
                          className={`${styles.input} ${formErrors.utr ? styles.inputError : ''}`}
                          value={utrNumber}
                          onChange={(e) => {
                            setUtrNumber(e.target.value);
                            if (formErrors.utr) setFormErrors((p) => ({ ...p, utr: '' }));
                          }}
                          placeholder="e.g. 324158920148 or UPI Ref"
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.utr}
                        />
                        {formErrors.utr && (
                          <span className={styles.errorText}>{formErrors.utr}</span>
                        )}
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="tx-date">
                          Transfer Date
                        </label>
                        <input
                          id="tx-date"
                          type="date"
                          className={styles.input}
                          value={txDate}
                          onChange={(e) => setTxDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.proofFieldFull}>
                      <label className={styles.label} htmlFor="selected-purpose-display">
                        Seva Purpose
                      </label>
                      <input
                        id="selected-purpose-display"
                        type="text"
                        className={styles.input}
                        value={`${selectedCat.title} — ${selectedOffering.name}`}
                        readOnly
                        style={{ backgroundColor: 'var(--vm-sand)', color: 'var(--vm-walnut)', cursor: 'default' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className={styles.submitProofBtn}
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? 'Organizing Details...' : 'Prepare Acknowledgement Message →'}
                    </button>
                  </form>
                ) : (
                  <div className={styles.preparedAckCard} role="region" aria-label="Prepared Acknowledgement Details">
                    <div className={styles.preparedHeader}>
                      <div className={styles.preparedCheckIcon} aria-hidden="true">
                        ✓
                      </div>
                      <h4 className={styles.preparedTitle}>Transaction Details Prepared</h4>
                    </div>

                    <p className={styles.preparedExplanation}>
                      Your transaction details have been organized. As the website does not process credit cards or store private financial credentials, please share this acknowledgement summary directly with the Ashram office via Email or WhatsApp below. The accounts team will verify the credit against bank records and issue your official receipt.
                    </p>

                    <div className={styles.summaryDetailsTable}>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Donor Name:</span>
                        <span className={styles.summaryVal}>{donorName}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Email Address:</span>
                        <span className={styles.summaryVal}>{donorEmail}</span>
                      </div>
                      {donorPhone && (
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryKey}>Phone:</span>
                          <span className={styles.summaryVal}>{donorPhone}</span>
                        </div>
                      )}
                      {donorPan && (
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryKey}>PAN (for 80-G):</span>
                          <span className={styles.summaryVal}>{donorPan}</span>
                        </div>
                      )}
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Seva Purpose:</span>
                        <span className={styles.summaryVal}>{purposeString}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Offering Amount:</span>
                        <span className={styles.summaryVal}>₹{amount}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Method:</span>
                        <span className={styles.summaryVal}>{method}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>UTR / Transaction Ref:</span>
                        <span className={styles.summaryVal}>{utrNumber}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryKey}>Date:</span>
                        <span className={styles.summaryVal}>{txDate}</span>
                      </div>
                    </div>

                    <div className={styles.ackActionsGroup}>
                      <a
                        href={ackEmailHref}
                        className={styles.btnAckEmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Send prepared transaction email to Ashram"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Send via Email to Ashram (vmission@gmail.com)
                      </a>

                      <a
                        href={ackWhatsAppHref}
                        className={styles.btnAckWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Send prepared transaction message to Ashram WhatsApp"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        Send via WhatsApp (+91 98269 59480)
                      </a>

                      <button
                        type="button"
                        className={styles.btnAckCopy}
                        onClick={() => copyToClipboard(ackEmailBody, 'Acknowledgement summary')}
                      >
                        Copy Acknowledgement Summary
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.btnResetAck}
                      onClick={() => {
                        setIsPrepared(false);
                        setUtrNumber('');
                      }}
                    >
                      ← Edit Details or Prepare Another Offering
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Tax / Legal Information Section */}
      <section className={styles.taxSection} aria-label="Tax Exemption & Statutory Note">
        <div className={styles.taxContainer}>
          <div className={styles.taxPlate}>
            <div className={styles.taxHeader}>
              <span className={styles.taxTag}>Statutory Note</span>
              <h3 className={styles.taxTitle}>Section 80-G Tax Exemption</h3>
            </div>
            <p className={styles.taxNoticeText}>
              All donations of <strong>Rs 1,000.00 and above</strong> made to <strong>Vedanta Parmarthik Sewa Trust</strong> can avail IT Exemption u/s 80-G of the IT Act. Donors requesting 80-G tax exemption receipts are requested to share their Permanent Account Number (PAN) and mailing address with the Ashram office for formal accounting reconciliation.
            </p>
          </div>
        </div>
      </section>

      {/* Seva Closing */}
      <CinematicPreFooter
        tag="PARAMARTHA SEVA"
        sanskrit="सहयज्ञाः प्रजाः सृष्ट्वा पुरोवाच प्रजापतिः । अनेन प्रसविष्यध्वमेष वोऽस्त्विष्टकामधुक् ॥"
        heading="Sustain the Tradition"
        subheading="Bhagavad Gita 3.10"
        description="“Having created mankind along with Yajna (selfless offering) in the beginning, the Creator said: By this shall you prosper; let this be the cow that yields the milk of your desired fulfillment.”"
        ctas={[
          { label: 'Explore Teachings', href: '/teachings', variant: 'primary' },
          { label: 'Connect with Ashram', href: '/contact', variant: 'outline' },
          { label: 'About the Trust', href: '/about#trusts', variant: 'outline' },
        ]}
      />
    </div>
  );
}
