import { BloodDonor, Event, HelpRequest, Job } from './types';

export const prayerTimes = [
  { name: 'Fajr', time: '04:52 AM', isNext: false },
  { name: 'Dhuhr', time: '12:28 PM', isNext: false },
  { name: 'Asr', time: '03:48 PM', isNext: false },
  { name: 'Maghrib', time: '06:55 PM', isNext: true },
  { name: 'Isha', time: '08:12 PM', isNext: false }
];

export const dailyVerse = {
  text: "And whoever saves one life, it is as if he had saved mankind entirely.",
  reference: "Surah Al-Ma'idah 5:32"
};

export const dailyHadith = {
  text: "The best of people are those who are most beneficial to people.",
  reference: "Al-Mu’jam al-Awsat"
};

export const initialDonors: BloodDonor[] = [
  {
    id: 'bd-1',
    fullName: 'Imran Al-Siddiq',
    bloodGroup: 'O+',
    mobile: '+91 98765 43211',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    lastDonated: '2 months ago',
    isAvailable: true
  },
  {
    id: 'bd-2',
    fullName: 'Sajida Khatun',
    bloodGroup: 'B-',
    mobile: '+91 98765 43212',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    lastDonated: '3 months ago',
    isAvailable: true
  },
  {
    id: 'bd-3',
    fullName: 'Faisal Jameel',
    bloodGroup: 'A+',
    mobile: '+91 98765 43213',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    lastDonated: 'Never',
    isAvailable: true
  },
  {
    id: 'bd-4',
    fullName: 'Zara Yasmin',
    bloodGroup: 'AB+',
    mobile: '+91 98765 43214',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    lastDonated: '5 months ago',
    isAvailable: true
  }
];

export const initialEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Free Mega Medical Checkup Camp',
    description: 'Providing free diagnostic consultations, general wellness checkups, and basic prescription support to underserved families.',
    date: 'July 10, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Welfare Trust Ground, 5th block, Bengaluru',
    type: 'Medical',
    registeredCount: 142,
    image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_600,h_400,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg'
  },
  {
    id: 'evt-2',
    title: 'Monsoon Blood Donation Drive',
    description: 'Join hands with Ahmed Volunteers force to restock regional blood banks during high demand monsoon months.',
    date: 'July 18, 2026',
    time: '10:00 AM - 05:00 PM',
    location: 'Bilal Community Hall, Bengaluru',
    type: 'Blood',
    registeredCount: 89,
    image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_600,h_400,g_auto/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg'
  }
];

export const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Office Administrator Assistant',
    company: 'Ahmed Tech & Logistics solutions',
    location: 'Bengaluru (On-site)',
    type: 'Full-time',
    salary: '₹18,000 - ₹24,000 / mo',
    description: 'Seeking a detail-oriented office assistant to manage scheduling, document entry, client calls, and basic accounting files.',
    requirements: [
      'Basic knowledge of MS Excel and MS Word',
      'Good communication skills in Urdu/Kannada/English',
      'High school diploma or degree'
    ]
  },
  {
    id: 'job-2',
    title: 'Delivery Executive Partners',
    company: 'Eco-Fast Logistics',
    location: 'Bengaluru (Flexible)',
    type: 'Part-time / Flex',
    salary: '₹12,000 - ₹18,000 + incentives / mo',
    description: 'Flexible delivery partner roles with weekly payouts. Requires two-wheeler vehicle and valid driving license.',
    requirements: [
      'Must own a smartphone and a registered two-wheeler',
      'Valid driving license',
      'Punctual and reliable character'
    ]
  }
];

export const initialRequests: HelpRequest[] = [
  {
    id: 'req-1',
    type: 'Medical Help',
    applicantName: 'Arshad Mahmood (You)',
    mobile: '+91 98765 43210',
    description: 'Applied for subsidy coverage for family cardiac bypass bills at City General Hospital.',
    amountRequested: '₹35,000 Coverage',
    status: 'In Progress',
    date: '2026-06-25'
  }
];
