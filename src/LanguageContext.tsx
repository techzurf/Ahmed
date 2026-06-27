import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // General
    "app.title": "Ahmed Community Connect",
    "app.subtitle": "Serving Humanity • Empowering Communities • Inspiring Change",
    "btn.back": "Back",
    "btn.cancel": "Cancel",
    "btn.submit": "Submit",
    "btn.save": "Save",
    "btn.close": "Close",
    "btn.apply": "Apply",
    "btn.register": "Register",
    "btn.learn_more": "Learn More",
    "btn.search": "Search",
    "btn.filter": "Filter",
    "btn.logout": "Log Out",
    "search.placeholder": "Search...",
    "status.pending": "Pending",
    "status.inprogress": "In Progress",
    "status.approved": "Approved",
    "status.completed": "Completed",

    // Splash
    "splash.welfare": "WELFARE PORTAL",
    "splash.begin": "Begin Journey",
    "splash.copyright": "Ahmed Community Trust © 2026",

    // Login
    "login.secure": "SECURE DIGITAL ACCESS",
    "login.desc": "A digital platform dedicated to community service, welfare initiatives, volunteer engagement and public support.",
    "login.name_label": "Your Full Name",
    "login.name_placeholder": "e.g. Arshad Mahmood",
    "login.phone_label": "Mobile Number",
    "login.phone_placeholder": "+91...",
    "login.blood_label": "Blood Group",
    "login.btn": "Access Community Platform",
    "login.success": "Welcome back",

    // Tabs
    "tab.home": "Home",
    "tab.services": "Services",
    "tab.community": "Community",
    "tab.updates": "Updates",
    "tab.profile": "Profile",

    // Home Tab
    "home.cohesive": "COHESIVE PLATFORM",
    "home.title": "Ahmed Community",
    "home.welcome": "Assalamu Alaikum,",
    "home.subtitle": "A platform for medical, social, education, and support services.",
    "home.portrait_about": "About Ahmed",
    "home.portrait_desc": "Ahmed is an active social leader, humanitarian worker, and dedicated coordinator of multiple community welfare projects, emergency relief programs, and student support scholarships.",
    "home.hadith_title": "Daily Inspiration",
    "home.video_title": "Video Message from Ahmed",
    "home.quick_links": "Quick Actions",
    "home.gallery_title": "Community Gallery",
    "home.announcements": "Announcements",

    // Services Tab
    "services.medical": "Medical Assistance",
    "services.medical_desc": "Request hospital bill subsidies, pharmacy aid, or home nurse.",
    "services.education": "Educational Support",
    "services.education_desc": "Get primary/secondary school uniforms, notebooks, and fee support.",
    "services.food": "Food Distribution",
    "services.food_desc": "Apply for monthly dry grocery ration kits containing essential grains.",
    "services.scholarship": "Scholarship Assistance",
    "services.scholarship_desc": "Sponsorship for college and vocational diplomas.",
    "services.emergency": "Emergency Relief",
    "services.emergency_desc": "Instant support trigger for medical surgery or accident transport.",
    "services.women": "Women Welfare",
    "services.women_desc": "Widow support, home industry micro-grants, and skill training.",
    "services.senior": "Senior Citizen Support",
    "services.senior_desc": "Assistance for physical walking aids, glasses, and home diagnostics.",
    "services.youth": "Youth Development",
    "services.youth_desc": "Connecting youths with office assistants, delivery, and logistics jobs.",

    // Community Tab
    "comm.membership_title": "Ahmed Community Membership",
    "comm.gold_seal": "VERIFIED MEMBER",
    "comm.member_id": "MEMBER ID",
    "comm.issue_date": "ISSUE DATE",
    "comm.valid_thru": "VALID THRU",
    "comm.points": "Community Points",
    "comm.volunteer_title": "Volunteer Hub",
    "comm.volunteer_desc": "Become a volunteer and support Ahmed's social & emergency response missions.",
    "comm.volunteer_status": "Volunteer Status",
    "comm.volunteer_hours": "Service Hours Logged",
    "comm.registered": "Registered",
    "comm.not_registered": "Not Registered",
    "comm.btn_register": "Register as Ahmed Volunteer",
    "comm.blood_title": "Blood Donor Network",
    "comm.blood_desc": "Connect with volunteer blood donors in times of urgent medical needs.",
    "comm.blood_btn": "Search Donor Database",

    // Updates Tab
    "updates.tag": "Ahmed Updates",
    "updates.header": "Announcements Feed",

    // Profile Tab
    "profile.header": "Your Profile",
    "profile.achievements": "Certificates & Badges",
    "profile.settings": "Preferences & Settings",
    "profile.lang_selection": "App Language",
    "profile.lang_btn": "Switch Language",
    "profile.not_available": "No certificates earned yet. Participate in volunteer events to gain achievements!",

    // Blood Screen
    "blood.network": "Blood Donor Network",
    "blood.require_urgent": "Require Urgent Blood?",
    "blood.urgent_desc": "Broadcast an instant emergency request to nearby matching donors or call coordinators immediately.",
    "blood.btn_emer": "Submit Emergency Call",
    "blood.btn_reg": "Register as Active Donor",
    "blood.search_placeholder": "Search donors by name or location...",
    "blood.available": "Available",
    "blood.not_available": "Busy / Donated recently",
    "blood.last_donated": "Last Donated",
    "blood.city": "City",
    "blood.register_title": "Register as Blood Donor",
    "blood.form_city": "Your City",
    "blood.emer_title": "Emergency Blood Request",
    "blood.emer_desc": "This broadcasts a high-priority push notification to all matching donors in Bengaluru.",
    "blood.emer_phone": "Emergency Contact Number",
    "blood.emer_location": "Hospital Name & Location",
    "blood.emer_units": "Units Required",
    "blood.emer_btn_send": "Broadcast Alert Now",

    // Events Screen
    "events.title": "Ahmed Community Events",
    "events.empowering": "Empowering Communities",
    "events.desc": "Ahmed Community Connect organises weekly medical wellness setups, food kit distribution camps, and emergency blood drives. Participate to make a difference.",
    "events.search_placeholder": "Search campaigns or venues...",
    "events.registered": "Registered!",
    "events.btn_register": "Register for Campaign",
    "events.campaign_details": "Campaign Details",
    "events.time": "Time",
    "events.venue": "Venue",
    "events.participants": "Participants Registered",
    "events.type": "Event Category",

    // Help Screen
    "help.title": "Apply for Welfare Support",
    "help.banner_title": "Ahmed Welfare Fund",
    "help.banner_desc": "Ahmed coordinates direct distribution of educational, medical, and nutritional aid. Fill out this secure appeal for consideration.",
    "help.form_title": "Aid Application Appeal",
    "help.cat_label": "Support Category Needed",
    "help.name_label": "Applicant Full Name",
    "help.phone_label": "Mobile Contact Number",
    "help.amount_label": "Estimated Financial Aid Needed (₹)",
    "help.desc_label": "Explain your situation & welfare need",
    "help.desc_placeholder": "Please provide background details to expedite approval...",
    "help.docs_label": "Upload Supporting Documents (Optional)",
    "help.docs_desc": "Upload prescriptions, fee structures, or ration card copies",
    "help.docs_btn": "Attach Files / Photos",
    "help.submit_btn": "Submit Secure Aid Appeal",
    "help.success": "Welfare aid appeal ticket submitted!",

    // Islamic Screen
    "islamic.title": "Spiritual Corner",
    "islamic.insights": "Insights",
    "islamic.tasbeeh": "Tasbeeh Counter",
    "islamic.prayer_title": "Bengaluru Prayer Times",
    "islamic.verse_title": "Daily Qur'an Verse",
    "islamic.hadith_title": "Prophetic Hadith",
    "islamic.tasbeeh_count": "Zikr Count",
    "islamic.tasbeeh_phrase": "Zikr Phrase",
    "islamic.tasbeeh_reset": "Reset Counter",

    // Jobs Screen
    "jobs.title": "Youth Job Portal",
    "jobs.subtitle": "Connecting youths with entry-level, delivery, retail, and office assistant positions to foster self-reliance.",
    "jobs.search_placeholder": "Search jobs by title or company...",
    "jobs.salary": "Salary",
    "jobs.apply_title": "Apply for Job Role",
    "jobs.resume_label": "Your Bio / Qualifications Resume",
    "jobs.resume_placeholder": "Briefly describe your schooling, skill sets, and job experience...",
    "jobs.btn_apply": "Submit Job Application",
    "jobs.applied_success": "Your job application has been successfully submitted! The employer will contact you soon.",

    // Volunteer Screen
    "vol.title": "Volunteer Hub",
    "vol.lead": "Inspire, Serve & Lead",
    "vol.sub": "Logged in as official Ahmed Community Volunteer. Participate in relief drives and build your track record.",
    "vol.card_title": "VOLUNTEER IDENTITY",
    "vol.id": "VOLUNTEER ID",
    "vol.points": "VOLUNTEER POINTS",
    "vol.hours": "HOURS",
    "vol.quick": "Quick Operations",
    "vol.scan": "Scan Campaign QR",
    "vol.hours_title": "Claim Service Hours",
    "vol.hours_select": "Select Event to Claim Hours",
    "vol.hours_amount": "Hours Spent on Duty",
    "vol.hours_code": "Campaign Coordinator Verification Code",
    "vol.hours_btn": "Submit for Accreditation",
    "vol.leaderboard": "Volunteer Leaderboard",
    "vol.certificates": "Welfare Accreditation",
    "vol.empty_cert": "Complete volunteer missions to earn beautiful digital certificates under Ahmed's signature.",
    "vol.earn": "Verify Service Hours",
    "vol.earn_desc": "Scan QR at community checkpoints to automatically verify your attendance.",
    "vol.earn_btn": "Scan Campaign Check-in QR"
  },
  ta: {
    // General
    "app.title": "அகமது சமூக இணைப்பு",
    "app.subtitle": "மனிதநேய சேவை • சமூக மேம்பாடு • மாற்றத்திற்கான உந்துதல்",
    "btn.back": "பின்செல்",
    "btn.cancel": "ரத்துசெய்",
    "btn.submit": "சமர்ப்பி",
    "btn.save": "சேமி",
    "btn.close": "மூடு",
    "btn.apply": "விண்ணப்பி",
    "btn.register": "பதிவுசெய்",
    "btn.learn_more": "மேலும் அறிய",
    "btn.search": "தேடு",
    "btn.filter": "வடிகட்டி",
    "btn.logout": "வெளியேறு",
    "search.placeholder": "தேடுக...",
    "status.pending": "காத்திருப்பில்",
    "status.inprogress": "செயல்முறையில்",
    "status.approved": "அங்கீகரிக்கப்பட்டது",
    "status.completed": "நிறைவடைந்தது",

    // Splash
    "splash.welfare": "நல வாரிய போர்டல்",
    "splash.begin": "பயணத்தைத் தொடங்கு",
    "splash.copyright": "அகமது சமூக அறக்கட்டளை © 2026",

    // Login
    "login.secure": "பாதுகாப்பான டிஜிட்டல் அணுகல்",
    "login.desc": "சமூக சேவை, நலத்திட்டங்கள், தன்னார்வ ஈடுபாடு மற்றும் பொது ஆதரவுக்கான பிரத்யேக டிஜிட்டல் தளம்.",
    "login.name_label": "உங்கள் முழுப் பெயர்",
    "login.name_placeholder": "உதாரணம்: அர்ஷத் மஹ்மூத்",
    "login.phone_label": "அலைபேசி எண்",
    "login.phone_placeholder": "+91...",
    "login.blood_label": "இரத்தப் பிரிவு",
    "login.btn": "சமூகத் தளத்திற்குள் நுழையவும்",
    "login.success": "மீண்டும் வருக",

    // Tabs
    "tab.home": "முகப்பு",
    "tab.services": "சேவைகள்",
    "tab.community": "சமூகம்",
    "tab.updates": "செய்திகள்",
    "tab.profile": "சுயவிவரம்",

    // Home Tab
    "home.cohesive": "ஒன்றிணைந்த தளம்",
    "home.title": "அகமது சமூகம்",
    "home.welcome": "அஸ்ஸலாமு அலைக்கும்,",
    "home.subtitle": "மருத்துவம், சமூகம், கல்வி மற்றும் ஆதரவு சேவைகளுக்கான தளம்.",
    "home.portrait_about": "அகமது பற்றி",
    "home.portrait_desc": "அகமது ஒரு தீவிர சமூகத் தலைவர், மனிதநேயப் பணியாளர் மற்றும் பல சமூக நலத்திட்டங்கள், அவசரகால நிவாரணத் திட்டங்கள் மற்றும் மாணவர் உதவித்தொகை திட்டங்களின் பிரத்யேக ஒருங்கிணைப்பாளர் ஆவார்.",
    "home.hadith_title": "இன்றைய ஊக்கம்",
    "home.video_title": "அகமதுவின் வீடியோ செய்தி",
    "home.quick_links": "விரைவான செயல்கள்",
    "home.gallery_title": "சமூகக் காட்சியகம்",
    "home.announcements": "அறிவிப்புகள்",

    // Services Tab
    "services.medical": "மருத்துவ உதவி",
    "services.medical_desc": "மருத்துவமனை கட்டண மானியங்கள், மருந்து உதவி அல்லது வீட்டு செவிலியர் தேவையை கோரவும்.",
    "services.education": "கல்வி ஆதரவு",
    "services.education_desc": "பள்ளி சீருடைகள், குறிப்பேடுகள் மற்றும் கட்டண ஆதரவைப் பெறுங்கள்.",
    "services.food": "உணவு விநியோகம்",
    "services.food_desc": "அத்தியாவசிய தானியங்கள் கொண்ட மாதாந்திர உலர் மளிகைப் பொருட்கள் ரேஷன் கிட்களுக்கு விண்ணப்பிக்கவும்.",
    "services.scholarship": "உதவித்தொகை உதவி",
    "services.scholarship_desc": "கல்லூரி மற்றும் தொழிற்கல்வி டிப்ளமோக்களுக்கான நிதியுதவி.",
    "services.emergency": "அவசரகால நிவாரணம்",
    "services.emergency_desc": "மருத்துவ அறுவை சிகிச்சை அல்லது விபத்து போக்குவரத்துக்கான உடனடி ஆதரவு தூண்டுதல்.",
    "services.women": "பெண்கள் நலன்",
    "services.women_desc": "விதவை ஆதரவு, வீட்டுத் தொழில் நுண் மானியங்கள் மற்றும் திறன் பயிற்சி.",
    "services.senior": "முதியோர் ஆதரவு",
    "services.senior_desc": "நடப்பதற்கான உதவிகள், கண்ணாடிகள் மற்றும் வீட்டுப் பரிசோதனைக்கான உதவிகள்.",
    "services.youth": "இளைஞர் மேம்பாடு",
    "services.youth_desc": "அலுவலக உதவியாளர், விநியோகம் மற்றும் தளவாடப் பணிகளுடன் இளைஞர்களை இணைத்தல்.",

    // Community Tab
    "comm.membership_title": "அகமது சமூக உறுப்பினர்",
    "comm.gold_seal": "சரிபார்க்கப்பட்ட உறுப்பினர்",
    "comm.member_id": "உறுப்பினர் ஐடி",
    "comm.issue_date": "வழங்கப்பட்ட தேதி",
    "comm.valid_thru": "காலாவதி தேதி",
    "comm.points": "சமூகப் புள்ளிகள்",
    "comm.volunteer_title": "தன்னார்வலர் மையம்",
    "comm.volunteer_desc": "தன்னார்வலராகி அகமதுவின் சமூக மற்றும் அவசரகால நிவாரணப் பணிகளுக்கு ஆதரவளிக்கவும்.",
    "comm.volunteer_status": "தன்னார்வலர் நிலை",
    "comm.volunteer_hours": "பதிவு செய்யப்பட்ட சேவை நேரம்",
    "comm.registered": "பதிவு செய்யப்பட்டுள்ளது",
    "comm.not_registered": "பதிவு செய்யப்படவில்லை",
    "comm.btn_register": "அகமது தன்னார்வலராகப் பதிவுசெய்",
    "comm.blood_title": "இரத்தத் தான நெட்வொர்க்",
    "comm.blood_desc": "அவசர மருத்துவத் தேவைகளின் போது தன்னார்வ இரத்தக் கொடையாளர்களுடன் இணையுங்கள்.",
    "comm.blood_btn": "கொடையாளர் தரவுத்தளத்தைத் தேடு",

    // Updates Tab
    "updates.tag": "அகமது அறிவிப்புகள்",
    "updates.header": "அறிவிப்புகள் ஊட்டம்",

    // Profile Tab
    "profile.header": "உங்கள் சுயவிவரம்",
    "profile.achievements": "சான்றிதழ்கள் மற்றும் பேட்ஜ்கள்",
    "profile.settings": "விருப்பங்கள் மற்றும் அமைப்புகள்",
    "profile.lang_selection": "பயன்பாட்டு மொழி",
    "profile.lang_btn": "மொழியை மாற்றவும்",
    "profile.not_available": "இன்னும் சான்றிதழ்கள் எதுவும் பெறவில்லை. சான்றிதழ்களைப் பெற தன்னார்வ நிகழ்வுகளில் பங்கேற்கவும்!",

    // Blood Screen
    "blood.network": "இரத்தத் தான நெட்வொர்க்",
    "blood.require_urgent": "அவசர இரத்தம் தேவையா?",
    "blood.urgent_desc": "அருகிலுள்ள கொடையாளர்களுக்கு உடனடி அவசர கோரிக்கையை அனுப்பவும் அல்லது ஒருங்கிணைப்பாளர்களை அழைக்கவும்.",
    "blood.btn_emer": "அவசரகால கோரிக்கையை அனுப்பு",
    "blood.btn_reg": "செயலில் உள்ள கொடையாளராகப் பதிவுசெய்",
    "blood.search_placeholder": "பெயர் அல்லது இருப்பிடம் மூலம் கொடையாளர்களைத் தேடுக...",
    "blood.available": "கிடைக்கக்கூடியவர்",
    "blood.not_available": "தற்போது இயலாது / அண்மையில் தானம் செய்தவர்",
    "blood.last_donated": "கடைசியாக தானம் செய்தது",
    "blood.city": "நகரம்",
    "blood.register_title": "இரத்தக் கொடையாளராகப் பதிவுசெய்",
    "blood.form_city": "உங்கள் நகரம்",
    "blood.emer_title": "அவசரகால இரத்தக் கோரிக்கை",
    "blood.emer_desc": "இது பெங்களூருவில் உள்ள அனைத்து இரத்தக் கொடையாளர்களுக்கும் உயர் முன்னுரிமை அறிவிப்பை அனுப்பும்.",
    "blood.emer_phone": "அவசர தொடர்பு எண்",
    "blood.emer_location": "மருத்துவமனை பெயர் மற்றும் இருப்பிடம்",
    "blood.emer_units": "தேவைப்படும் யூனிட்கள்",
    "blood.emer_btn_send": "அவசர அறிவிப்பை இப்போதே அனுப்பு",

    // Events Screen
    "events.title": "அகமது சமூக நிகழ்வுகள்",
    "events.empowering": "சமூகங்களை மேம்படுத்துதல்",
    "events.desc": "அகமது சமூக இணைப்பு வாராந்திர மருத்துவ முகாம்கள், உணவுப் பொதி விநியோக முகாம்கள் மற்றும் அவசரகால இரத்த முகாம்களை ஒருங்கிணைக்கிறது. மாற்றத்தை ஏற்படுத்த பங்கேற்கவும்.",
    "events.search_placeholder": "முகாம்கள் அல்லது இடங்களைத் தேடுக...",
    "events.registered": "பதிவு செய்யப்பட்டது!",
    "events.btn_register": "முகாமிற்குப் பதிவு செய்",
    "events.campaign_details": "முகாம் விவரங்கள்",
    "events.time": "நேரம்",
    "events.venue": "இடம்",
    "events.participants": "பதிவு செய்த பங்கேற்பாளர்கள்",
    "events.type": "நிகழ்வுப் பிரிவு",

    // Help Screen
    "help.title": "நல உதவிக்கு விண்ணப்பிக்கவும்",
    "help.banner_title": "அகமது நல நிதி",
    "help.banner_desc": "கல்வி, மருத்துவம் மற்றும் ஊட்டச்சத்து உதவிகளை அகமது நேரடியாக வழங்குகிறார். பரிசீலனைக்கு இந்த விண்ணப்பத்தைப் பூர்த்தி செய்யவும்.",
    "help.form_title": "உதவி விண்ணப்பக் கோரிக்கை",
    "help.cat_label": "தேவைப்படும் ஆதரவு வகை",
    "help.name_label": "விண்ணப்பதாரரின் முழுப் பெயர்",
    "help.phone_label": "தொடர்பு எண்",
    "help.amount_label": "மதிப்பிடப்பட்ட உதவித் தொகை (₹)",
    "help.desc_label": "உங்கள் சூழ்நிலை மற்றும் தேவையை விளக்கவும்",
    "help.desc_placeholder": "ஒப்புதலை விரைவுபடுத்த பின்னணி விவரங்களை வழங்கவும்...",
    "help.docs_label": "ஆதார ஆவணங்களைப் பதிவேற்றவும் (விருப்பத்திற்குரியது)",
    "help.docs_desc": "மருந்துச் சீட்டுகள், கட்டண விவரங்கள் அல்லது குடும்ப அட்டை பிரதிகளைப் பதிவேற்றவும்",
    "help.docs_btn": "கோப்புகள் / புகைப்படங்களை இணைக்கவும்",
    "help.submit_btn": "பாதுகாப்பான உதவி கோரிக்கையை சமர்ப்பி",
    "help.success": "நல உதவி கோரிக்கை சமர்ப்பிக்கப்பட்டது!",

    // Islamic Screen
    "islamic.title": "ஆன்மீகப் பகுதி",
    "islamic.insights": "அறிவொளி",
    "islamic.tasbeeh": "தஸ்பீஹ் கவுண்டர்",
    "islamic.prayer_title": "பெங்களூரு தொழுகை நேரங்கள்",
    "islamic.verse_title": "இன்றைய குர்ஆன் வசனம்",
    "islamic.hadith_title": "பொன்மொழி (ஹதீஸ்)",
    "islamic.tasbeeh_count": "திக்ர் எண்ணிக்கை",
    "islamic.tasbeeh_phrase": "திக்ர் வாசகம்",
    "islamic.tasbeeh_reset": "எண்ணிக்கையை மீட்டமை",

    // Jobs Screen
    "jobs.title": "இளையோர் வேலைவாய்ப்பு",
    "jobs.subtitle": "இளைஞர்களை வேலைவாய்ப்புகள் மற்றும் அலுவலக உதவியாளர் பணிகளுடன் இணைத்து அவர்களைத் தன்நம்பிக்கை கொண்டவர்களாக மாற்றுதல்.",
    "jobs.search_placeholder": "பணி அல்லது நிறுவனம் மூலம் தேடுக...",
    "jobs.salary": "சம்பளம்",
    "jobs.apply_title": "பணிக்கு விண்ணப்பிக்கவும்",
    "jobs.resume_label": "உங்கள் சுயவிவரம் / தகுதிகள்",
    "jobs.resume_placeholder": "உங்கள் கல்வி, திறன்கள் மற்றும் பணி அனுபவத்தை சுருக்கமாக விளக்கவும்...",
    "jobs.btn_apply": "வேலை விண்ணப்பத்தைச் சமர்ப்பி",
    "jobs.applied_success": "உங்கள் வேலை விண்ணப்பம் வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது! முதலாளி உங்களை விரைவில் தொடர்புகொள்வார்.",

    // Volunteer Screen
    "vol.title": "தன்னார்வலர் மையம்",
    "vol.lead": "ஈர்க்கவும், சேவை செய்யவும் & வழிநடத்தவும்",
    "vol.sub": "அகமதுவின் அதிகாரப்பூர்வ தன்னார்வலராக உள்நுழைந்துள்ளீர்கள். நிவாரணப் பணிகளில் பங்கேற்று உங்கள் நற்பெயரை வளர்த்துக்கொள்ளுங்கள்.",
    "vol.card_title": "தன்னார்வலர் அடையாளம்",
    "vol.id": "தன்னார்வலர் ஐடி",
    "vol.points": "தன்னார்வலர் புள்ளிகள்",
    "vol.hours": "மணிநேரம்",
    "vol.quick": "விரைவான செயல்பாடுகள்",
    "vol.scan": "முகாம் QR குறியீட்டை ஸ்கேன் செய்",
    "vol.hours_title": "சேவை நேரத்தைக் கோரவும்",
    "vol.hours_select": "சேவை நேரத்தைக் கோர நிகழ்வைத் தேர்ந்தெடுக்கவும்",
    "vol.hours_amount": "பணியாற்றிய மணிநேரம்",
    "vol.hours_code": "முகாம் ஒருங்கிணைப்பாளர் சரிபார்ப்புக் குறியீடு",
    "vol.hours_btn": "சரிபார்ப்புக்குச் சமர்ப்பி",
    "vol.leaderboard": "தன்னார்வலர் தரவரிசை",
    "vol.certificates": "சான்றிதழ்கள்",
    "vol.empty_cert": "அகமதுவின் கையொப்பத்துடன் கூடிய டிஜிட்டல் சான்றிதழ்களைப் பெற தன்னார்வப் பணிகளை முழுமையாக நிறைவு செய்யுங்கள்.",
    "vol.earn": "சேவை நேரங்களைச் சரிபார்க்கவும்",
    "vol.earn_desc": "வருகையைத் தானாகவே சரிபார்க்க முகாம் சோதனைச் சாவடிகளில் QR ஐ ஸ்கேன் செய்யவும்.",
    "vol.earn_btn": "வருகைப்பதிவு QR குறியீட்டை ஸ்கேன்செய்"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'ta' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const localized = TRANSLATIONS[language][key];
    if (localized) return localized;
    return defaultText !== undefined ? defaultText : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
