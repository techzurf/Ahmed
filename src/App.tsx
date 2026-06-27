import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Users,
  Compass,
  Briefcase,
  LifeBuoy,
  Phone,
  Droplet,
  Calendar,
  ChevronRight,
  Sparkles,
  ExternalLink,
  BookOpen,
  MapPin,
  Clock,
  Shield,
  Bell,
  CheckCircle,
  Volume2,
  QrCode,
  Play,
  Send,
  AlertTriangle,
  Lock,
  LogOut,
  Mail,
  Award,
  Video
} from 'lucide-react';

// Domain imports
import { BloodDonor, Event, HelpRequest, Job, UserProfile } from './types';
import {
  initialDonors,
  initialEvents,
  initialJobs,
  initialRequests
} from './data';

// Subcomponents
import BloodDonorNetwork from './components/mobile/sub/BloodDonorNetwork';
import VolunteerModule from './components/mobile/sub/VolunteerModule';
import EventsScreen from './components/mobile/sub/EventsScreen';
import IslamicCorner from './components/mobile/sub/IslamicCorner';
import HelpSupportScreen from './components/mobile/sub/HelpSupportScreen';
import JobPortalScreen from './components/mobile/sub/JobPortalScreen';
import { useLanguage } from './LanguageContext';

// Ahmed's professional portrait (friendly, respectful mature community leader)
const AHMED_PORTRAIT = "https://res.cloudinary.com/dv16a8l1l/image/upload/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg";

export default function App() {
  const { language, setLanguage, t } = useLanguage();

  // App states
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'community' | 'updates' | 'profile'>('home');
  const [currentScreen, setCurrentScreen] = useState<'main' | 'blood' | 'islamic' | 'support' | 'jobs' | 'events' | 'admin' | 'volunteer'>('main');

  // Login inputs
  const [loginName, setLoginName] = useState('Arshad Mahmood');
  const [loginPhone, setLoginPhone] = useState('+91 98765 43210');
  const [loginBlood, setLoginBlood] = useState('O+');

  // Application-wide state
  const [donors, setDonors] = useState<BloodDonor[]>(initialDonors);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [jobs] = useState<Job[]>(initialJobs);
  const [requests, setRequests] = useState<HelpRequest[]>(initialRequests);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Arshad Mahmood',
    bloodGroup: 'O+',
    profilePhoto: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_thumb,w_150,h_150,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
    volunteerStatus: 'Not Registered',
    serviceHours: 0,
    communityPoints: 0,
    certificates: []
  });

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      title_en: 'Monsoon Flood Relief Packets',
      title_ta: 'மழைக்கால வெள்ள நிவாரணப் பொதிகள்',
      msg_en: 'Ahmed has dispatched 250 food supply kits to rural waterlogged areas.',
      msg_ta: 'வெள்ளத்தால் பாதிக்கப்பட்ட கிராமப்புற பகுதிகளுக்கு 250 உணவு விநியோகப் பொதிகளை அகமது அனுப்பியுள்ளார்.',
      time_en: '10 mins ago',
      time_ta: '10 நிமிடங்களுக்கு முன்',
      type: 'info'
    },
    {
      id: '2',
      title_en: 'Emergency A- Blood Required',
      title_ta: 'அவசரம்: ஏ- பிரிவு இரத்தம் தேவை',
      msg_en: 'Immediate donor matched & dispatched for bypass patient at St. Johns.',
      msg_ta: 'செயின்ட் ஜான்ஸ் மருத்துவமனையில் பைபாஸ் நோயாளிக்கு உடனடி கொடையாளர் கண்டறியப்பட்டு அனுப்பப்பட்டார்.',
      time_en: '2 hours ago',
      time_ta: '2 மணிநேரத்திற்கு முன்',
      type: 'urgent'
    },
    {
      id: '3',
      title_en: 'Free Medical Wellness Camp',
      title_ta: 'இலவச மருத்துவ நல முகாம்',
      msg_en: 'Registrations are now active for Ahmed Community Event on July 10th.',
      msg_ta: 'ஜூலை 10 அன்று நடைபெறும் அகமது சமூக நிகழ்விற்கான பதிவுகள் இப்போது தொடங்கியுள்ளன.',
      time_en: '1 day ago',
      time_ta: '1 நாளுக்கு முன்',
      type: 'event'
    }
  ]);

  // Selected preset for Help/Support form
  const [selectedSupportCategory, setSelectedSupportCategory] = useState('Medical Help');

  // Selected news item for modal
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // Active playing video transcript message state
  const [playingVideoMessage, setPlayingVideoMessage] = useState<string | null>(null);

  // Auto transition splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto fade out splash after 2.5 seconds or can continue by click
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || !loginPhone) return;

    setUserProfile((prev) => ({
      ...prev,
      fullName: loginName,
      bloodGroup: loginBlood
    }));
    setIsLoggedIn(true);
    showToast(`${t('login.success', 'Welcome back')}, ${loginName}!`);
  };

  // Core functions
  const addDonor = (newDonor: BloodDonor) => {
    setDonors((prev) => [newDonor, ...prev]);
    showToast(`Registered ${newDonor.fullName} as ${newDonor.bloodGroup} Donor!`);
  };

  const registerVolunteer = () => {
    setUserProfile((prev) => ({
      ...prev,
      volunteerStatus: 'Registered',
      volunteerId: 'ACC-' + Math.floor(1000 + Math.random() * 9000),
      serviceHours: 12,
      communityPoints: 150,
      certificates: ['Ahmed Volunteer Pioneer badge', 'Emergency Relief Certificate']
    }));
    showToast(language === 'ta' ? 'அகமது தன்னார்வலராக விண்ணப்பம் ஏற்கப்பட்டது!' : 'Applied as an official Ahmed Volunteer!');
  };

  const registerEvent = (eventId: string) => {
    setRegisteredEvents((prev) => [...prev, eventId]);
    showToast(language === 'ta' ? 'அகமது சமூக நிகழ்வுக்குப் பதிவு செய்யப்பட்டது!' : 'Registered for Ahmed Community Event!');
  };

  const submitHelpRequest = (newRequest: HelpRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    showToast(language === 'ta' ? 'நல உதவி விண்ணப்பக் கோரிக்கை சமர்ப்பிக்கப்பட்டது!' : 'Welfare aid appeal ticket submitted!');
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3000);
  };

  // Quick helper to route support screen with preselected type
  const openWelfareSupport = (category: string) => {
    setSelectedSupportCategory(category);
    setCurrentScreen('support');
  };

  // Admin panel action: Approve support ticket
  const updateTicketStatus = (ticketId: string, newStatus: 'Pending' | 'In Progress' | 'Approved' | 'Completed') => {
    setRequests(prev => prev.map(req => req.id === ticketId ? { ...req, status: newStatus } : req));
    showToast(`Ticket status updated to ${newStatus}`);
  };

  // Mock News/Updates feed data
  const updatesData = [
    {
      id: 'up-1',
      title_en: 'Free Diagnostics Provided to 350+ Senior Citizens',
      title_ta: '350+ மூத்த குடிமக்களுக்கு இலவச பரிசோதனை வழங்கப்பட்டது',
      desc_en: 'Under the supervision of Ahmed, the monthly free health camp succeeded in diagnostics screening, distributing medication subsidies, and establishing home care nurses.',
      desc_ta: 'அகமதுவின் மேற்பார்வையில், மாதாந்திர இலவச மருத்துவ முகாம் நோய் கண்டறிதல், மருந்து மானியங்கள் விநியோகம் மற்றும் வீட்டு பராமரிப்பு செவிலியர்களை நிறுவுவதில் வெற்றி பெற்றது.',
      image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_600,h_400,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      tag_en: 'Healthcare Support',
      tag_ta: 'சுகாதார ஆதரவு',
      date: 'June 25, 2026'
    },
    {
      id: 'up-2',
      title_en: 'Ahmed Distributes Monthly Food Ration kits',
      title_ta: 'மாதாந்திர உணவு ரேஷன் கிட்களை அகமது விநியோகிக்கிறார்',
      desc_en: 'Ahmed directed the distribution of 500 dry ration kits containing flour, pulses, oil, rice, and child nutritional packets to vulnerable neighborhoods.',
      desc_ta: 'பாதிக்கப்பட்ட சுற்றுப்புறங்களுக்கு மாவு, பருப்பு, எண்ணெய், அரிசி மற்றும் குழந்தைகளுக்கான ஊட்டச்சத்து பாக்கெட்டுகள் அடங்கிய 500 உலர் ரேஷன் கிட்களை விநியோகிக்க அகமது அறிவுறுத்தினார்.',
      image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_600,h_300,g_auto/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      tag_en: 'Food Distribution',
      tag_ta: 'உணவு விநியோகம்',
      date: 'June 20, 2026'
    },
    {
      id: 'up-3',
      title_en: 'Youth Digital Skills Scholarship Program',
      title_ta: 'இளையோர் டிஜிட்டல் திறன் உதவித்தொகை திட்டம்',
      desc_en: 'Providing full educational aid and job training scholarships to community youths to gain web tech certifications, leading directly to career hires.',
      desc_ta: 'இளைஞர்களுக்கு வலைத் தொழில்நுட்பச் சான்றிதழ்களைப் பெறுவதற்கும், நேரடியாகப் பணிகளில் சேருவதற்கும் முழுமையான கல்வி உதவி மற்றும் வேலைப் பயிற்சி உதவித்தொகைகளை வழங்குதல்.',
      image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_500,h_500,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      tag_en: 'Youth Development',
      tag_ta: 'இளைஞர் மேம்பாடு',
      date: 'June 15, 2026'
    }
  ];

  // Ahmed's Community Initiatives
  const initiatives = [
    {
      title_en: 'Free Medical Camps',
      title_ta: 'இலவச மருத்துவ முகாம்கள்',
      desc_en: 'Monthly general medicine diagnostics, free sugar/BP testing, and expert prescription aid.',
      desc_ta: 'மாதாந்திர பொது மருத்துவ பரிசோதனை, இலவச சர்க்கரை/இரத்த அழுத்த பரிசோதனை மற்றும் நிபுணர் மருந்து உதவி.'
    },
    {
      title_en: 'Youth Skill Labs',
      title_ta: 'இளைஞர் திறன் ஆய்வகங்கள்',
      desc_en: 'Empowering youngsters with on-the-job training in computer software, driving, and logistics coordination.',
      desc_ta: 'கணினி மென்பொருள், ஓட்டுநர் பயிற்சி மற்றும் தளவாடங்கள் ஒருங்கிணைப்பில் இளைஞர்களுக்கு பயிற்சி அளித்து மேம்படுத்துதல்.'
    },
    {
      title_en: 'Widow Support Funds',
      title_ta: 'விதவை ஆதரவு நிதிகள்',
      desc_en: 'Direct monthly financial aid allowances ensuring home rations and microloans for household operations.',
      desc_ta: 'மாதாந்திர நேரடி நிதியுதவி மூலம் வீட்டு ரேஷன் மற்றும் சிறுதொழில்களுக்கான நுண்கடன்களை உறுதி செய்தல்.'
    },
    {
      title_en: 'Educational Scholarships',
      title_ta: 'கல்வி உதவித்தொகை',
      desc_en: 'Funding high school and college tuition bills for deserving or orphan children.',
      desc_ta: 'தகுதியான அல்லது ஆதரவற்ற குழந்தைகளின் பள்ளி மற்றும் கல்லூரி கல்வி கட்டணங்களுக்கு நிதியுதவி செய்தல்.'
    }
  ];

  // Gallery items (Ahmed Gallery)
  const galleryItems = [
    {
      title_en: 'Welfare Camp June',
      title_ta: 'ஜூன் நல முகாம்',
      url: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_400,h_300,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      desc_en: 'Free clinical consultations setup',
      desc_ta: 'இலவச மருத்துவ ஆலோசனைகள் வடிவமைப்பு'
    },
    {
      title_en: 'Ration Kits Dispatch',
      title_ta: 'ரேஷன் கிட்கள் விநியோகம்',
      url: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_400,h_300,g_auto/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      desc_en: 'Food aid dry packages delivery',
      desc_ta: 'உணவு உதவி உலர் தொகுப்புகள் விநியோகம்'
    },
    {
      title_en: 'Volunteer Orientation',
      title_ta: 'தன்னார்வலர் வழிகாட்டுதல்',
      url: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_400,h_300,g_north/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      desc_en: 'Youth engagement leadership meet',
      desc_ta: 'இளைஞர் ஈடுபாடு தலைமைத்துவ சந்திப்பு'
    },
    {
      title_en: 'Senior Citizen Support',
      title_ta: 'மூத்த குடிமக்கள் ஆதரவு',
      url: 'https://res.cloudinary.com/dv16a8l1l/image/upload/c_fill,w_400,h_300,g_center/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg',
      desc_en: 'Home healthcare consultations setup',
      desc_ta: 'வீட்டு சுகாதார ஆலோசனைகள் வடிவமைப்பு'
    }
  ];

  // Video messages
  const videoMessages = [
    {
      id: 'v-1',
      title_en: 'Vision of Compassionate Care',
      title_ta: 'கருணைமிக்க கவனிப்பின் பார்வை',
      length_en: '2:40 mins',
      length_ta: '2:40 நிமிடங்கள்',
      transcript_en: '"Our main mission with Ahmed Community Connect is transparent, immediate welfare. We do not represent any political motive. Our drive is purely humanitarian. When a senior citizen needs prescription coverage or a youth seeks a career, the community must act as one single body. We thank our active volunteers for their absolute sincerity."',
      transcript_ta: '"அகமது சமூக இணைப்புடனான எங்களது முக்கிய நோக்கம் வெளிப்படையான, உடனடி நலவாழ்வு ஆகும். நாங்கள் எந்தவொரு அரசியல் நோக்கத்தையும் கொண்டிருக்கவில்லை. எங்களது உந்துதல் முற்றிலும் மனிதநேயம் சார்ந்தது. ஒரு முதியவருக்கு மருத்துவ உதவி தேவைப்படும்போதோ அல்லது ஒரு இளைஞருக்கு வேலை தேவைப்படும்போதோ, சமூகம் ஒரே உடலாகச் செயல்பட வேண்டும். எங்களது தன்னார்வலர்களின் முழுமையான நேர்மைக்கு நன்றி தெரிவிக்கிறோம்."'
    },
    {
      id: 'v-2',
      title_en: 'Empowering Through Education',
      title_ta: 'கல்வி மூலம் மேம்படுத்துதல்',
      length_en: '1:50 mins',
      length_ta: '1:50 நிமிடங்கள்',
      transcript_en: '"To the youth of Bengaluru, seek knowledge and self-reliance. We are expanding our scholarship programs so that no child drops out of secondary school due to finance. Let us build a community that doesn\'t depend on charity, but on dignified careers and strong skills."',
      transcript_ta: '"பெங்களூரு இளைஞர்களே, அறிவையும் சுயசார்பையும் தேடுங்கள். நிதி பற்றாக்குறை காரணமாக எந்தக் குழந்தையும் பள்ளிப் படிப்பை கைவிடாதவாறு எங்கள் கல்வி உதவித்தொகை திட்டங்களை விரிவுபடுத்துகிறோம். தொண்டு நிறுவனங்களைச் சாராமல், கண்ணியமான தொழில்கள் மற்றும் வலுவான திறன்களைக் கொண்ட ஒரு சமூகத்தை உருவாக்குவோம்."'
    }
  ];

  // Main navigation screens controller
  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className="w-full h-full overflow-y-auto px-4 pb-16 bg-[#FAF9F6] flex flex-col gap-4">
            {/* Header */}
            <div className="pt-4 flex flex-col gap-1 shrink-0">
              <span className="text-[8px] font-black tracking-widest text-[#0F5D46] uppercase">{t('home.cohesive', 'CENTRAL DIRECTORY')}</span>
              <h3 className="text-sm font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('services.title', 'Ahmed Community Services')}</h3>
              <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                {t('login.desc', 'Connect directly with our social action lifelines. Tap any card below to register, request assistance, or apply for welfare benefits.')}
              </p>
            </div>

            {/* Grid of services */}
            <div className="grid grid-cols-2 gap-3 pb-4">
              {/* Blood Donation */}
              <div
                onClick={() => setCurrentScreen('blood')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-red-400 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                  <Droplet className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-red-600 transition-colors">{t('comm.blood_title', 'Blood Donation')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('comm.blood_desc', 'Search active O+/B- donors or sign up to save lives.')}</p>
                </div>
              </div>

              {/* Medical Assistance */}
              <div
                onClick={() => openWelfareSupport('Medical Help')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5D46] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-[#0F5D46] transition-colors">{t('services.medical', 'Medical Assistance')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.medical_desc', 'Request hospital bill subsidies, pharmacy aid, or home nurse.')}</p>
                </div>
              </div>

              {/* Educational Support */}
              <div
                onClick={() => openWelfareSupport('Educational Grant')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-[#0F5D46] transition-colors">{t('services.education', 'Educational Support')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.education_desc', 'Get primary/secondary school uniforms, notebooks, and fee support.')}</p>
                </div>
              </div>

              {/* Food Distribution */}
              <div
                onClick={() => openWelfareSupport('Monthly Food Ration Support')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-5 h-5 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-amber-800 transition-colors">{t('services.food', 'Food Distribution')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.food_desc', 'Apply for monthly dry grocery ration kits containing essential grains.')}</p>
                </div>
              </div>

              {/* Scholarship Assistance */}
              <div
                onClick={() => openWelfareSupport('Financial Assistance')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-[#0F5D46] transition-colors">{t('services.scholarship', 'Scholarship Assistance')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.scholarship_desc', 'Sponsorship for college and vocational diplomas.')}</p>
                </div>
              </div>

              {/* Emergency Relief */}
              <div
                onClick={() => {
                  alert(language === 'ta' ? 'ஒருங்கிணைப்பாளர்களுக்கு அவசர செய்தி அனுப்பப்படுகிறது... அகமதுவின் விரைவு நடவடிக்கை குழு 15 நிமிடங்களில் உங்களை அழைக்கும்.' : 'Broadcasting emergency local relief message to coordinators... Ahmed\'s rapid action team will call you within 15 mins.');
                  showToast(language === 'ta' ? 'அவசர எச்சரிக்கை அனுப்பப்பட்டது!' : 'Rapid Emergency Alert broadcasted!');
                }}
                className="bg-red-50 p-4 rounded-2xl border border-red-100 shadow-sm hover:border-red-300 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-red-800 font-display">{t('services.emergency', 'Emergency Relief')}</h4>
                  <p className="text-[9px] text-red-600 font-medium mt-1">{t('services.emergency_desc', 'Instant support trigger for medical surgery or accident transport.')}</p>
                </div>
              </div>

              {/* Women Welfare */}
              <div
                onClick={() => openWelfareSupport('Widow & Orphan Support')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-rose-600 transition-colors">{t('services.women', 'Women Welfare')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.women_desc', 'Widow support, home industry micro-grants, and skill training.')}</p>
                </div>
              </div>

              {/* Senior Citizen Support */}
              <div
                onClick={() => {
                  openWelfareSupport('Medical Help');
                  showToast('Help form loaded. Please mention Senior Citizen Support in description.');
                }}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/30 transition-all cursor-pointer flex flex-col gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-indigo-600 transition-colors">{t('services.senior', 'Senior Citizen Support')}</h4>
                  <p className="text-[9px] text-neutral-400 font-medium mt-1">{t('services.senior_desc', 'Assistance for physical walking aids, glasses, and home diagnostics.')}</p>
                </div>
              </div>

              {/* Youth Development */}
              <div
                onClick={() => setCurrentScreen('jobs')}
                className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:border-amber-400 transition-all cursor-pointer flex flex-col gap-3 col-span-2 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-[#C8A23A]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-800 font-display group-hover:text-amber-800 transition-colors">{t('services.youth', 'Youth Development')}</h4>
                    <p className="text-[9px] text-neutral-400 font-medium mt-0.5">{t('services.youth_desc', 'Connecting youths with office assistants, delivery, and logistics jobs.')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="w-full h-full overflow-y-auto px-4 pb-16 bg-[#FAF9F6] flex flex-col gap-4">
            {/* Header */}
            <div className="pt-4 flex flex-col gap-1 shrink-0">
              <span className="text-[8px] font-black tracking-widest text-[#0F5D46] uppercase font-display">{t('home.cohesive', 'COHESIVE PLATFORM')}</span>
              <h3 className="text-sm font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('comm.membership_title', 'Ahmed Community Membership')}</h3>
            </div>

            {/* Digital Membership Card representing Ahmed Community Connect */}
            <div className="bg-gradient-to-br from-[#0F5D46] to-[#0a4131] text-white rounded-3xl p-5 border border-[#C8A23A]/40 shadow-xl relative overflow-hidden shrink-0">
              {/* Decorative brand overlays */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#C8A23A]/10 rounded-full blur-2xl" />
              <div className="absolute left-0 bottom-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

              {/* Logo, title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center border border-[#C8A23A]/30">
                    <span className="font-display font-black text-[#0F5D46] text-xs">A</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider font-display text-[#C8A23A]">Ahmed Community Connect</span>
                </div>
                <span className="text-[7.5px] font-bold uppercase tracking-widest text-emerald-100 bg-white/10 px-2 py-0.5 rounded border border-white/10">{t('comm.gold_seal', 'Official Member')}</span>
              </div>

              {/* Member detail */}
              <div className="flex gap-4 items-center mt-4">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#C8A23A] p-0.5 shrink-0 overflow-hidden shadow">
                  <img
                    src={userProfile.profilePhoto}
                    alt="Member"
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black tracking-tight uppercase truncate">{userProfile.fullName}</h4>
                  <p className="text-[9px] font-bold text-neutral-300 mt-0.5">{t('comm.member_id', 'MEMBER ID')}: {userProfile.volunteerId || 'ACC-982B'}</p>

                  <div className="grid grid-cols-2 gap-2.5 mt-2 border-t border-white/10 pt-2 text-[8px]">
                    <div>
                      <p className="text-white/50 uppercase font-extrabold tracking-wider">{t('login.blood_label', 'Blood Type')}</p>
                      <p className="text-[10px] font-black text-white">{userProfile.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-white/50 uppercase font-extrabold tracking-wider">{t('comm.issue_date', 'Member Since')}</p>
                      <p className="text-[10px] font-black text-[#C8A23A]">June 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and QR */}
              <div className="mt-5 bg-white/5 rounded-2xl p-3 flex items-center justify-between gap-4 border border-white/10">
                <div>
                  <p className="text-[7px] text-emerald-100/50 uppercase font-bold tracking-wider">{t('comm.volunteer_status', 'Volunteer Status')}</p>
                  <p className="text-[9.5px] text-[#C8A23A] font-black uppercase mt-0.5 font-display">
                    {userProfile.volunteerStatus === 'Registered' ? t('comm.registered', 'Registered') : t('comm.not_registered', 'Not Registered')}
                  </p>
                </div>
                <div className="w-9 h-9 bg-[#FAF9F6] border border-white/10 rounded-xl p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-full h-full text-neutral-800" />
                </div>
              </div>
            </div>

            {/* Trigger to load full Ahmed Volunteers Force submodule */}
            <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3 mt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0F5D46]/5 flex items-center justify-center text-[#0F5D46]">
                  <Users className="w-4.5 h-4.5 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800 font-display">{t('comm.volunteer_title', 'Ahmed Volunteers Force')}</h4>
                  <p className="text-[9px] text-neutral-400 font-bold mt-0.5">{t('comm.volunteer_desc', 'View service hours, badges, and verified mission log')}</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('volunteer')}
                className="w-full py-2 bg-[#0F5D46] text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] transition-all flex items-center justify-center gap-1.5 border border-[#C8A23A]/10 mt-1"
              >
                {t('comm.manage_vol_btn', 'Manage Volunteer Status & Log')}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );

      case 'updates':
        return (
          <div className="w-full h-full overflow-y-auto px-4 pb-16 bg-[#FAF9F6] flex flex-col gap-4">
            {/* Header */}
            <div className="pt-4 flex flex-col gap-1 shrink-0">
              <span className="text-[8px] font-black tracking-widest text-[#0F5D46] uppercase">{t('updates.tag', 'FOUNDATION ANNOUNCEMENTS')}</span>
              <h3 className="text-sm font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('updates.header', 'Ahmed Updates')}</h3>
              <p className="text-[10px] text-neutral-500 font-medium">
                {t('updates.desc', 'Keep up to date with welfare programs, volunteer actions, and community activities directed by Ahmed.')}
              </p>
            </div>

            {/* List of updates */}
            <div className="flex flex-col gap-4">
              {updatesData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNews({
                    title: language === 'ta' ? item.title_ta : item.title_en,
                    desc: language === 'ta' ? item.desc_ta : item.desc_en,
                    image: item.image,
                    tag: language === 'ta' ? item.tag_ta : item.tag_en,
                    date: item.date
                  })}
                  className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:border-[#0F5D46]/20 transition-all cursor-pointer flex flex-col group"
                >
                  <div className="h-32 bg-neutral-100 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={language === 'ta' ? item.title_ta : item.title_en}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <span className="absolute left-3 top-3 px-2 py-0.5 bg-[#0F5D46] text-white text-[8px] font-black uppercase tracking-wider rounded-md border border-[#C8A23A]/20">
                      {language === 'ta' ? item.tag_ta : item.tag_en}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[8.5px] text-neutral-400 font-bold uppercase tracking-wider">
                      <span>{item.date}</span>
                      <span>By Admin</span>
                    </div>
                    <h4 className="text-xs font-black text-neutral-800 font-display leading-snug group-hover:text-[#0F5D46] transition-colors">
                      {language === 'ta' ? item.title_ta : item.title_en}
                    </h4>
                    <p className="text-[10px] text-neutral-500 font-medium leading-relaxed line-clamp-2">
                      {language === 'ta' ? item.desc_ta : item.desc_en}
                    </p>
                    
                    <span className="text-[9px] text-[#0F5D46] font-black uppercase tracking-wider flex items-center gap-1 mt-1">
                      {language === 'ta' ? 'முழு அறிவிப்பை வாசிக்க' : 'Read full announcement'}
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ahmed Gallery section */}
            <div className="flex flex-col gap-2.5 mt-2">
              <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-wider font-display px-1">{t('home.gallery_title', 'Ahmed Gallery')}</h4>
              <div className="grid grid-cols-2 gap-2">
                {galleryItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedNews({
                      title: language === 'ta' ? item.title_ta : item.title_en,
                      desc: language === 'ta' ? item.desc_ta : item.desc_en,
                      image: item.url,
                      tag: language === 'ta' ? 'கேலரி புகைப்படம்' : 'Gallery Snapshot',
                      date: language === 'ta' ? 'களப்பணிப் படம்' : 'Welfare Field Photo'
                    })}
                    className="bg-white rounded-xl border border-neutral-100 p-1.5 shadow-sm hover:border-[#0F5D46]/20 transition-all cursor-pointer group"
                  >
                    <div className="h-20 rounded-lg overflow-hidden bg-neutral-100 relative">
                      <img src={item.url} alt={language === 'ta' ? item.title_ta : item.title_en} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                    </div>
                    <div className="px-1 py-1">
                      <p className="text-[9px] font-black text-neutral-800 truncate">{language === 'ta' ? item.title_ta : item.title_en}</p>
                      <p className="text-[7.5px] text-neutral-400 font-bold mt-0.5 truncate">{language === 'ta' ? item.desc_ta : item.desc_en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="w-full h-full overflow-y-auto px-4 pb-16 bg-[#FAF9F6] flex flex-col gap-4">
            {/* Header */}
            <div className="pt-4 flex flex-col gap-1 shrink-0">
              <span className="text-[8px] font-black tracking-widest text-[#0F5D46] uppercase font-display">{t('profile.header', 'HUMANITARIAN LEADER')}</span>
              <h3 className="text-sm font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('home.portrait_about', 'About Ahmed')}</h3>
            </div>

            {/* Settings & Language Selection Card (MANDATORY SETTINGS PREFERENCE OPTION) */}
            <div className="bg-white p-4.5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                <Shield className="w-4 h-4 text-[#C8A23A]" />
                <h4 className="text-[10px] font-black uppercase text-[#0F5D46] tracking-wider font-display">
                  {t('profile.settings', 'Preferences & Settings')}
                </h4>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-black text-neutral-800">{t('profile.lang_selection', 'App Language')}</p>
                  <p className="text-[8.5px] text-neutral-400 font-bold mt-0.5 leading-snug">
                    {language === 'ta' ? 'அகமது செயலியின் உரை மொழியை மாற்றவும்' : 'Select your preferred user interface language'}
                  </p>
                </div>

                <div className="flex items-center bg-[#FAF9F6] border border-neutral-200/60 rounded-xl p-1 text-[10px] font-black shrink-0">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      language === 'en'
                        ? 'bg-[#0F5D46] text-white shadow'
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    🇬🇧 En
                  </button>
                  <button
                    onClick={() => setLanguage('ta')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      language === 'ta'
                        ? 'bg-[#0F5D46] text-white shadow'
                        : 'text-neutral-500 hover:text-[#0F5D46]'
                    }`}
                  >
                    🇮🇳 தமிழ்
                  </button>
                </div>
              </div>
            </div>

            {/* Main leader info */}
            <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 rounded-full bg-[#0F5D46]/5 p-0.5 border-2 border-[#C8A23A] overflow-hidden shadow bg-neutral-100">
                <img
                  src={AHMED_PORTRAIT}
                  alt="Ahmed"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-neutral-800 font-display">Ahmed</h4>
                <p className="text-[10px] text-[#C8A23A] font-black uppercase tracking-wider mt-0.5">
                  {language === 'ta' ? 'மதிப்பிற்குரிய சமூகத் தலைவர் மற்றும் பரோபகாரர்' : 'Respected Community Leader & Philanthropist'}
                </p>
              </div>

              <p className="text-[10.5px] text-neutral-500 font-medium leading-relaxed max-w-xs italic">
                {language === 'ta'
                  ? '"எளியோருக்கு நாம் எவ்வளவு விரைவாக உதவுகிறோம், இளைஞர்களுக்குக் கல்வி புகட்டுகிறோம், நோயாளிகளை அரவணைக்கிறோம் என்பதில்தான் நமது சமூக வலிமை அடங்கியுள்ளது. உண்மையான தலைமை என்பது முழுமையான பணிவுடனும் வெளிப்படைத்தன்மையுடனும் மக்களுக்குச் சேவை செய்வதே ஆகும்."'
                  : '"Our collective strength is measured by how quickly we support the weak, educate the young, and comfort the sick. True leadership lies in serving communities with complete humility and transparency."'}
              </p>

              <div className="flex gap-2 w-full mt-2.5">
                <a
                  href="mailto:office@ahmedcommunity.org"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Opening executive mail handler...');
                    alert('Simulating draft email to: office@ahmedcommunity.org');
                  }}
                  className="flex-1 py-1.5 bg-[#FAF9F6] border border-neutral-200 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-neutral-100 flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0F5D46]" />
                  {language === 'ta' ? 'அலுவலகத்திற்கு மின்னஞ்சல் செய்க' : 'Email Office'}
                </a>
                <a
                  href="tel:+919876543210"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Simulating direct helpline call to Ahmed\'s central coordinator desk.');
                  }}
                  className="flex-1 py-1.5 bg-[#0F5D46] text-white text-[10px] font-black rounded-lg hover:bg-[#0c4e3b] flex items-center justify-center gap-1.5 border border-[#C8A23A]/15 shadow-sm"
                >
                  <Phone className="w-3 h-3 text-[#C8A23A]" /> {language === 'ta' ? 'மத்திய உதவி எண்' : 'Central Helpline'}
                </a>
              </div>
            </div>

            {/* Vision and Mission */}
            <div className="bg-[#0F5D46] text-white rounded-3xl p-5 border border-[#C8A23A]/20 shadow-md">
              <h4 className="text-[10px] font-black uppercase text-[#C8A23A] tracking-wider font-display mb-1.5">{language === 'ta' ? 'நோக்கம் மற்றும் பார்வை' : 'Vision & Mission'}</h4>
              <div className="flex flex-col gap-2.5 text-[11px] text-emerald-50 leading-relaxed font-sans">
                <p>
                  <strong>{language === 'ta' ? 'சுயசரிதை:' : 'Biography:'}</strong> {language === 'ta'
                    ? 'அகமது பெங்களூருவை தளமாகக் கொண்டவர் மற்றும் 15 ஆண்டுகளுக்கும் மேலான தீவிர தன்னார்வ அனுபவத்தைக் கொண்டவர். மிகவும் மதிக்கப்படும் சமூகப் பிரமுகராக, இவரது கவனம் முற்றிலும் சுகாதார மானியங்கள், அடிப்படை ஆரம்ப/இரண்டாம் நிலை கல்வி நிதியுதவி மற்றும் தளவாட மேம்படுத்தல் ஆகியவற்றில் குவிந்துள்ளது.'
                    : 'Ahmed is based in Bengaluru and holds over 15 years of active volunteer experience. As a highly respected community figure, his focus centers purely on healthcare subsidies, basic primary/secondary education sponsorship, and logistics network optimization.'}
                </p>
                <p>
                  <strong>{language === 'ta' ? 'பார்வை:' : 'Vision:'}</strong> {language === 'ta'
                    ? 'அடிப்படை ஜீவாதாரங்கள் டிஜிட்டல் மயமாக்கப்பட்டு பரவலாக்கப்பட வேண்டும், இதனால் மருத்துவம், இரத்தம் அல்லது நிதி நெருக்கடிகள் ஏற்படும் போது உள்ளூர் சமூகங்கள் சில நிமிடங்களில் பதிலளிக்க முடியும்.'
                    : 'A society where basic lifelines are digitized and decentralized so that medical, blood, or financial crisis receives local community responses within minutes.'}
                </p>
                <p>
                  <strong>{language === 'ta' ? 'நோக்கம்:' : 'Mission:'}</strong> {language === 'ta'
                    ? 'நம்பிக்கை, தன்னார்வத் தொண்டு மற்றும் பரஸ்பர இரக்கத்தின் அடிப்படையில் இயங்கும் ஒரு ஒருங்கிணைந்த நெட்வொர்க்கின் கீழ் இளைஞர்கள், உள்ளூர் வணிகங்கள் மற்றும் சுகாதார வழங்குநர்களை இணைப்பது.'
                    : 'Linking youths, local businesses, and health providers under a unified network that operates strictly on trust, volunteerism, and mutual compassion.'}
                </p>
              </div>
            </div>

            {/* Community Initiatives */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-wider font-display px-1">{t('home.quick_links', 'Community Initiatives')}</h4>
              <div className="grid grid-cols-2 gap-2">
                {initiatives.map((init, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-1">
                    <h5 className="text-[10px] font-black text-neutral-800">{language === 'ta' ? init.title_ta : init.title_en}</h5>
                    <p className="text-[8px] text-neutral-400 font-bold leading-relaxed">{language === 'ta' ? init.desc_ta : init.desc_en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Messages playable section */}
            <div className="bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase text-[#0F5D46] tracking-wider font-display border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#C8A23A]" />
                {t('home.video_title', 'Video Messages')}
              </h4>

              <div className="flex flex-col gap-2">
                {videoMessages.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setPlayingVideoMessage(playingVideoMessage === v.id ? null : v.id)}
                    className="p-2.5 bg-[#FAF9F6] border border-neutral-100 rounded-xl flex items-center justify-between cursor-pointer hover:border-[#0F5D46]/20 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#0F5D46] flex items-center justify-center text-white shrink-0 group-hover:bg-[#0c4e3b] transition-colors">
                        <Play className="w-3.5 h-3.5 text-[#C8A23A] fill-current" />
                      </div>
                      <div>
                        <h5 className="text-[9.5px] font-black text-neutral-800 leading-snug">{language === 'ta' ? v.title_ta : v.title_en}</h5>
                        <p className="text-[8px] text-neutral-400 font-bold">{language === 'ta' ? v.length_ta : v.length_en}</p>
                      </div>
                    </div>

                    <span className="text-[8px] font-black uppercase text-[#0F5D46] bg-[#0F5D46]/5 px-2 py-0.5 rounded">
                      {playingVideoMessage === v.id ? (language === 'ta' ? 'மூடு' : 'Close') : (language === 'ta' ? 'உரை வடிவம்' : 'Transcript')}
                    </span>
                  </div>
                ))}

                <AnimatePresence>
                  {playingVideoMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#0F5D46]/5 border border-[#0F5D46]/10 p-3.5 rounded-xl text-[10px] text-neutral-700 italic leading-relaxed font-sans mt-1"
                    >
                      {language === 'ta'
                        ? videoMessages.find(v => v.id === playingVideoMessage)?.transcript_ta
                        : videoMessages.find(v => v.id === playingVideoMessage)?.transcript_en}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full overflow-y-auto px-4 pb-16 bg-[#FAF9F6] flex flex-col gap-4">
            {/* Header / Dynamic Top Bar */}
            <div className="pt-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0F5D46] border border-[#C8A23A]/20 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <span className="font-display font-black text-[#C8A23A] text-xs">A</span>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-neutral-800 font-display uppercase tracking-tight truncate max-w-[125px]">
                    {t('app.title', 'Ahmed Community Connect')}
                  </h3>
                  <p className="text-[7.5px] text-neutral-400 font-bold uppercase mt-0.5">Bengaluru, IN</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Language Switcher Toggle */}
                <div className="flex items-center bg-white border border-neutral-200/60 rounded-xl p-0.5 shadow-sm text-[9px] font-bold shrink-0">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-1.5 py-0.5 rounded-lg transition-all ${
                      language === 'en'
                        ? 'bg-[#0F5D46] text-white shadow'
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                    title="English"
                  >
                    🇬🇧
                  </button>
                  <button
                    onClick={() => setLanguage('ta')}
                    className={`px-1.5 py-0.5 rounded-lg transition-all ${
                      language === 'ta'
                        ? 'bg-[#0F5D46] text-white shadow'
                        : 'text-neutral-500 hover:text-[#0F5D46]'
                    }`}
                    title="தமிழ்"
                  >
                    🇮🇳
                  </button>
                </div>

                {/* Admin entry point toggle */}
                <button
                  onClick={() => setCurrentScreen('admin')}
                  className="w-7 h-7 rounded-full bg-amber-50 shadow-sm border border-[#C8A23A]/20 flex items-center justify-center text-amber-700 hover:text-amber-800 shrink-0 relative"
                  title="Admin Dashboard"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    showToast(language === 'ta' ? 'வெளியேறினீர்கள்.' : 'Logged out of platform.');
                  }}
                  className="w-7 h-7 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-red-600 shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Welcome Card & Portrait */}
            <div className="bg-gradient-to-br from-[#0F5D46] to-[#0d503c] text-white rounded-3xl p-4.5 border border-[#C8A23A]/30 shadow-md flex items-center justify-between gap-4 relative overflow-hidden shrink-0 group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#C8A23A]/5 rounded-full blur-2xl" />

              <div className="flex gap-3.5 items-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#C8A23A] overflow-hidden shrink-0 shadow-sm bg-[#FAF9F6]">
                  <img
                    src={AHMED_PORTRAIT}
                    alt="Ahmed"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[7px] font-black tracking-widest text-[#C8A23A] uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">WELCOME</span>
                  <h4 className="text-xs font-black text-white font-display mt-1 leading-none tracking-tight">{t('home.welcome', 'Assalamu Alaikum')}</h4>
                  <p className="text-[10px] text-[#C8A23A] font-extrabold mt-1">{t('app.title', 'Ahmed Community Connect')}</p>
                  <p className="text-[9px] text-emerald-100/70 font-medium leading-relaxed mt-1 italic">
                    "{t('app.subtitle', 'Together we serve humanity through compassion, unity and community service.')}"
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Links Widget */}
            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              <div
                onClick={() => setCurrentScreen('events')}
                className="bg-white p-3 rounded-xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/20 transition-all cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0F5D46] border border-emerald-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-neutral-800 font-display group-hover:text-[#0F5D46]">{language === 'ta' ? 'அகமது நிகழ்வுகள்' : 'Ahmed Events'}</h4>
                  <p className="text-[7.5px] text-neutral-400 font-bold">{language === 'ta' ? 'நல முகாம் அட்டவணை' : 'Welfare camps schedule'}</p>
                </div>
              </div>

              <div
                onClick={() => setCurrentScreen('islamic')}
                className="bg-white p-3 rounded-xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/20 transition-all cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0F5D46] border border-emerald-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-neutral-800 font-display group-hover:text-[#0F5D46]">{t('islamic.title', 'Spiritual Corner')}</h4>
                  <p className="text-[7.5px] text-neutral-400 font-bold">{language === 'ta' ? 'தினசரி வசனங்கள் & கவுண்டர்' : 'Daily verses & counter'}</p>
                </div>
              </div>
            </div>

            {/* Ahmed Community Alerts Notification Pane */}
            <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3 shrink-0">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h4 className="text-[9px] font-black uppercase text-neutral-500 tracking-wider font-display">{language === 'ta' ? 'அகமது சமூக எச்சரிக்கைகள்' : 'Ahmed Community Alerts'}</h4>
                <span className="text-[7.5px] text-red-700 font-black bg-red-50 px-2 py-0.5 rounded border border-red-100">{language === 'ta' ? 'நேரடித் தகவல்' : 'Live Feeds'}</span>
              </div>

              <div className="flex flex-col gap-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex gap-2.5 items-start bg-[#FAF9F6] p-2.5 rounded-xl border border-neutral-100">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      alert.type === 'urgent' ? 'bg-red-500' : alert.type === 'event' ? 'bg-amber-500' : 'bg-[#0F5D46]'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center text-[7.5px] text-neutral-400 font-bold">
                        <span className="font-extrabold uppercase tracking-wide text-neutral-600 truncate">
                          {language === 'ta' ? alert.title_ta : alert.title_en}
                        </span>
                        <span>{language === 'ta' ? alert.time_ta : alert.time_en}</span>
                      </div>
                      <p className="text-[9px] text-neutral-500 font-medium leading-relaxed mt-0.5">
                        {language === 'ta' ? alert.msg_ta : alert.msg_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Welfare Stats Panel */}
            <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3 shrink-0">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h4 className="text-[9px] font-black uppercase text-neutral-500 tracking-wider font-display">{language === 'ta' ? 'அறக்கட்டளை ஜீவாதாரங்கள்' : 'Foundation Lifelines'}</h4>
                <span className="text-[7.5px] text-emerald-800 font-black bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{language === 'ta' ? 'தாக்க புள்ளிவிவரங்கள்' : 'Impact Stats'}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center gap-0.5 p-2 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                  <span className="text-xs font-black text-neutral-800 font-mono">1,400+</span>
                  <span className="text-[7px] text-neutral-400 font-extrabold uppercase">{language === 'ta' ? 'உணவு வழங்கப்பட்டது' : 'Rations Sent'}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-0.5 p-2 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                  <span className="text-xs font-black text-neutral-800 font-mono">850+</span>
                  <span className="text-[7px] text-neutral-400 font-extrabold uppercase">{language === 'ta' ? 'மருத்துவ உதவி' : 'Medical Aid'}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-0.5 p-2 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                  <span className="text-xs font-black text-[#0F5D46] font-mono">240+</span>
                  <span className="text-[7px] text-neutral-400 font-extrabold uppercase">{language === 'ta' ? 'தன்னார்வப் படை' : 'Active Force'}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Render Screens
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'blood':
        return (
          <BloodDonorNetwork
            donors={donors}
            onAddDonor={addDonor}
            onBack={() => setCurrentScreen('main')}
          />
        );
      case 'volunteer':
        return (
          <VolunteerModule
            profile={userProfile}
            onRegisterVolunteer={registerVolunteer}
            onBack={() => setCurrentScreen('main')}
          />
        );
      case 'events':
        return (
          <EventsScreen
            events={events}
            onRegisterEvent={registerEvent}
            registeredEvents={registeredEvents}
            onBack={() => setCurrentScreen('main')}
          />
        );
      case 'islamic':
        return <IslamicCorner onBack={() => setCurrentScreen('main')} />;
      case 'support':
        return (
          <HelpSupportScreen
            requests={requests}
            onSubmitRequest={submitHelpRequest}
            onBack={() => setCurrentScreen('main')}
          />
        );
      case 'jobs':
        return <JobPortalScreen jobs={jobs} onBack={() => setCurrentScreen('main')} />;
      case 'admin':
        return renderAdminPanel();
      default:
        return renderTabContent();
    }
  };

  // Ahmed Community Connect Admin panel
  const renderAdminPanel = () => {
    return (
      <div className="w-full h-full overflow-y-auto px-4 pb-12 bg-[#FAF9F6] flex flex-col gap-4">
        {/* Header */}
        <div className="pt-4 flex items-center justify-between shrink-0">
          <button
            onClick={() => setCurrentScreen('main')}
            className="w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-[#0F5D46]"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <div className="text-center">
            <h3 className="text-xs font-black uppercase text-amber-800 tracking-wider font-display">Ahmed Community Connect Admin</h3>
            <p className="text-[8px] text-neutral-400 font-bold uppercase mt-0.5">Control Terminal</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Dashboard statistics */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3 shrink-0">
          <h4 className="text-[9px] font-black uppercase text-neutral-400 tracking-wider font-display border-b border-neutral-100 pb-2">
            Ahmed Community Connect Systems
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-100">
              <p className="text-[7.5px] text-neutral-400 font-bold uppercase">Aid Applications</p>
              <h4 className="text-base font-extrabold text-[#0F5D46] font-display mt-0.5">{requests.length} Active</h4>
            </div>
            <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-100">
              <p className="text-[7.5px] text-neutral-400 font-bold uppercase">Welfare Network Donors</p>
              <h4 className="text-base font-extrabold text-[#0F5D46] font-display mt-0.5">{donors.length} Verified</h4>
            </div>
          </div>
        </div>

        {/* Welfare Requests management */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-wider font-display px-1">Manage Aid Appeal Tickets</h4>

          <div className="flex flex-col gap-2.5">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-2.5"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-[#0F5D46]/5 border border-[#0F5D46]/10 text-[#0F5D46] text-[8px] font-black uppercase tracking-wider rounded-md">
                    {req.type}
                  </span>
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    req.status === 'Pending' ? 'bg-neutral-100 text-neutral-500' :
                    req.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                    req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-[#0F5D46]'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-black text-neutral-800">{req.applicantName}</h5>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-0.5">{req.description}</p>
                </div>

                <div className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider flex justify-between items-center">
                  <span>Req Amt: {req.amountRequested}</span>
                  <span>Phone: {req.mobile}</span>
                </div>

                {/* Status action trigger workflow */}
                <div className="flex gap-2.5 border-t border-neutral-100 pt-2.5 mt-1">
                  <button
                    onClick={() => updateTicketStatus(req.id, 'In Progress')}
                    className="flex-1 py-1 px-2 bg-amber-50 border border-amber-100 text-amber-700 hover:bg-amber-100 text-[8px] font-black uppercase rounded-lg"
                  >
                    Hold / Progress
                  </button>
                  <button
                    onClick={() => updateTicketStatus(req.id, 'Approved')}
                    className="flex-1 py-1 px-2 bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[8px] font-black uppercase rounded-lg"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => updateTicketStatus(req.id, 'Completed')}
                    className="flex-1 py-1 px-2 bg-[#0F5D46]/10 border border-[#0F5D46]/20 text-[#0F5D46] hover:bg-[#0F5D46]/20 text-[8px] font-black uppercase rounded-lg"
                  >
                    Resolve Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render high-fidelity splash screen
  if (showSplash) {
    return (
      <div className="w-full min-h-screen bg-[#111111] flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-md h-screen sm:h-[840px] bg-gradient-to-br from-[#0F5D46] to-[#0a3528] text-white rounded-none sm:rounded-[42px] border-none sm:border-8 sm:border-neutral-800 relative overflow-hidden flex flex-col justify-between p-8 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C8A23A]/10 rounded-full blur-3xl" />
          
          <div className="pt-12 flex flex-col items-center">
            <span className="text-[10px] font-black tracking-widest text-[#C8A23A] uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">{t('splash.welfare', 'WELFARE PORTAL')}</span>
          </div>

          <div className="flex flex-col items-center text-center gap-4 z-10">
            <div className="w-20 h-20 rounded-3xl bg-white/5 border-2 border-[#C8A23A] flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="font-display font-black text-[#C8A23A] text-4xl">A</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <h1 className="text-2xl font-black font-display tracking-tight text-white leading-none">AHMED</h1>
              <p className="text-xs font-black uppercase tracking-widest text-[#C8A23A] leading-none">COMMUNITY CONNECT</p>
            </div>

            <p className="text-[10.5px] text-emerald-100/70 font-bold max-w-xs leading-relaxed px-4 italic">
              Serving Humanity • Empowering Communities • Inspiring Change
            </p>
          </div>

          <div className="pb-12 z-10">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSplash(false)}
              className="w-full py-3.5 bg-[#C8A23A] text-[#0F5D46] text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg border border-white/20 font-display flex items-center justify-center gap-2"
            >
              {t('splash.begin', 'Begin Journey')}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <p className="text-[8px] text-emerald-100/40 text-center mt-3 font-bold uppercase tracking-wider">{t('splash.copyright', 'Ahmed Community Trust © 2026')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Render high-fidelity login screen
  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-[#111111] flex items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-md h-screen sm:h-[840px] bg-[#FAF9F6] text-slate-800 rounded-none sm:rounded-[42px] border-none sm:border-8 sm:border-neutral-800 relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
          {/* Header info & pre-login language selector */}
          <div className="pt-6 flex justify-between items-center px-4">
            <span className="text-[8px] font-black tracking-widest text-[#0F5D46] uppercase">{t('login.secure', 'SECURE DIGITAL ACCESS')}</span>
            
            {/* Language Switcher */}
            <div className="flex items-center bg-white border border-neutral-200/60 rounded-xl p-0.5 shadow-sm text-[9px] font-bold shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded-lg transition-all ${
                  language === 'en' ? 'bg-[#0F5D46] text-white shadow' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                🇬🇧 En
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-1.5 py-0.5 rounded-lg transition-all ${
                  language === 'ta' ? 'bg-[#0F5D46] text-white shadow' : 'text-slate-500 hover:text-[#0F5D46]'
                }`}
              >
                🇮🇳 தமிழ்
              </button>
            </div>
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-4 text-center px-4 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#0F5D46] border border-[#C8A23A]/30 flex items-center justify-center mx-auto shadow-md">
              <span className="font-display font-black text-[#C8A23A] text-2xl">A</span>
            </div>

            <div>
              <h2 className="text-base font-black text-neutral-800 font-display">Welcome to Ahmed Community Connect</h2>
              <p className="text-[10px] text-neutral-500 font-medium leading-relaxed max-w-xs mx-auto mt-1.5 italic">
                {t('login.desc', 'A digital platform dedicated to community service, welfare initiatives, volunteer engagement and public support.')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-3 text-left mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">{t('login.name_label', 'Your Full Name')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('login.name_placeholder', 'e.g. Arshad Mahmood')}
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">{t('login.phone_label', 'Mobile Number')}</label>
                  <input
                    type="tel"
                    required
                    placeholder={t('login.phone_placeholder', '+91...')}
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">{t('login.blood_label', 'Blood Group')}</label>
                  <select
                    value={loginBlood}
                    onChange={(e) => setLoginBlood(e.target.value)}
                    className="w-full px-2 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] shadow-sm border border-[#C8A23A]/10 font-display mt-1"
              >
                {t('login.btn', 'Access Community Platform')}
              </motion.button>
            </form>
          </div>

          <div className="pb-4 text-center">
            <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">Humanitarian Digital Service Platform</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#111111] flex items-center justify-center p-0 sm:p-4">
      {/* Premium Smartphone Framed Container */}
      <div className="w-full max-w-md h-screen sm:h-[840px] bg-[#FAF9F6] text-slate-800 rounded-none sm:rounded-[42px] border-none sm:border-8 sm:border-neutral-800 relative overflow-hidden flex flex-col shadow-2xl">
        {/* Notch / Speaker representation for Premium Look */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-2xl z-50">
          <div className="w-12 h-1 bg-neutral-700 mx-auto rounded-full mt-1.5" />
        </div>

        {/* Toast Notification Container */}
        <AnimatePresence>
          {notificationMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-10 left-4 right-4 z-50 bg-[#0F5D46] text-white p-3.5 rounded-2xl border border-[#C8A23A]/30 shadow-lg flex items-center gap-2.5"
            >
              <CheckCircle className="w-4 h-4 text-[#C8A23A] shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-wider">{notificationMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic App Area */}
        <div className="flex-1 min-h-0 relative z-10 pt-0 sm:pt-6">
          {renderActiveScreen()}
        </div>

        {/* Elegant Bottom Navigation Bar */}
        <div className="h-16 shrink-0 bg-white border-t border-neutral-100 flex items-center justify-around px-3 pb-1 relative z-20 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('home');
              setCurrentScreen('main');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home' && currentScreen === 'main' ? 'text-[#0F5D46]' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">{t('tab.home', 'Home')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('services');
              setCurrentScreen('main');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'services' && currentScreen === 'main' ? 'text-[#0F5D46]' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <LifeBuoy className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">{t('tab.services', 'Services')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('community');
              setCurrentScreen('main');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'community' && currentScreen === 'main' ? 'text-[#0F5D46]' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">{t('tab.community', 'Community')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('updates');
              setCurrentScreen('main');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'updates' && currentScreen === 'main' ? 'text-[#0F5D46]' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">{t('tab.updates', 'Updates')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              setCurrentScreen('main');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' && currentScreen === 'main' ? 'text-[#0F5D46]' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">{t('tab.profile', 'Profile')}</span>
          </button>
        </div>
      </div>

      {/* Detail modal for News Announcements (Ahmed Updates) */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm p-5 border border-[#C8A23A] shadow-2xl flex flex-col gap-4 max-h-[85%] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <span className="px-2.5 py-0.5 bg-[#0F5D46]/5 text-[#0F5D46] text-[8px] font-black uppercase tracking-wider rounded-md">
                  {selectedNews.tag}
                </span>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
                >
                  ✕
                </button>
              </div>

              <div className="h-40 rounded-2xl overflow-hidden bg-neutral-50">
                <img
                  src={selectedNews.image}
                  alt="News Image"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">{selectedNews.date}</span>
                <h3 className="text-sm font-black text-neutral-850 font-display mt-1">{selectedNews.title}</h3>
                <p className="text-[10.5px] text-neutral-600 leading-relaxed font-sans mt-2.5">{selectedNews.desc}</p>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b]"
              >
                {t('btn.close', 'Close View')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
