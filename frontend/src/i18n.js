import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        openRoles: "Open Roles",
        about: "About",
        help: "Help",
        applyNow: "Apply Now"
      },
      hero: {
        badge: "Sidama Mesob HRMS Platform",
        title1: "Shape the Future of",
        title2: "Sidama Public Service",
        subtitle: "A purely merit-based, fully transparent recruitment portal built for the people.",
        viewRoles: "View Open Roles",
        verify: "Verify Application"
      },
      stats: {
        activeApps: "Active System Applicants",
        openJobs: "Open Job Positions",
        successRate: "Platform Success Rate"
      },
      about: {
        title: "About SMUC",
        mission: "Our Mission",
        vision: "Our Vision",
        coreValues: "Core Values"
      },
      footer: {
        desc: "Empowering communities through digital transformation, organized services, and modern regional development.",
        paperless: "Paperless Initiative",
        fastDigital: "Fast & Fully Digital",
        quickLinks: "Quick Links",
        help: "Help Center",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        contact: "Contact",
        location: "Hawassa, Ethiopia",
        building: "Building a Modern Sidama"
      },
      jobs: {
        vacancies: "Sidama Mesob Vacancies",
        subtitle: "Digital Recruitment Platform // HAWASSA, ETHIOPIA",
        searchPlaceholder: "Search by title, ID, or field of study...",
        allDepts: "All Departments",
        newest: "Newest Openings",
        latestDesc: "LATEST ANNOUNCEMENTS EXCLUDING EXPIRED REGISTRIES",
        loading: "Loading job vacancies...",
        noMatch: "No active vacancy matching your criteria found.",
        jobCode: "ID",
        closed: "Closed",
        priority: "High Priority",
        active: "Active",
        rank: "Rank Level",
        salary: "Monthly Salary",
        slots: "Open Slots",
        location: "Working Location",
        education: "Education Level",
        fields: "Eligible Fields",
        experience: "Experience Terms",
        notes: "Additional Directives",
        deadline: "Application Deadline",
        coc: "COC Required",
        registrationClosed: "Registration Closed",
        viewDetail: "View Detail",
        viewAll: "View All Vacancies"
      }
    }
  },
  am: {
    translation: {
      nav: {
        home: "ዋና ገጽ",
        openRoles: "ክፍት የስራ መደቦች",
        about: "ስለ እኛ",
        help: "እገዛ",
        applyNow: "አሁን ያመልክቱ"
      },
      hero: {
        badge: "የሲዳማ መሶብ HRMS መድረክ",
        title1: "የሲዳማ ህዝባዊ አገልግሎት",
        title2: "የወደፊት እጣ ፈንታዎን ይቅረፁ",
        subtitle: "በእውቀት ላይ የተመሰረተ፣ ሙሉ በሙሉ ግልጽ የሆነ የቅጥር መግቢያ ለህዝብ የተገነባ።",
        viewRoles: "ክፍት የስራ መደቦችን ይመልከቱ",
        verify: "ማመልከቻ ያረጋግጡ"
      },
      stats: {
        activeApps: "ንቁ አመልካቾች",
        openJobs: "ክፍት የስራ መደቦች",
        successRate: "የስኬት መጠን"
      },
      about: {
        title: "ስለ SMUC",
        mission: "ተልዕኳችን",
        vision: "ራዕያችን",
        coreValues: "ዋና እሴቶቻችን"
      },
      footer: {
        desc: "በዲጂታል ቴክኖሎጂ፣ በተደራጀ አገልግሎትና በዘመናዊ የክልል ልማት ማህበረሰቡን ማብቃት።",
        paperless: "ከወረቀት ነፃ",
        fastDigital: "ፈጣን እና ሙሉ ዲጂታል",
        quickLinks: "ፈጣን አገናኞች",
        help: "የእገዛ ማዕከል",
        privacy: "የግላዊነት ፖሊሲ",
        terms: "ደንቦች እና ሁኔታዎች",
        contact: "አድራሻ",
        location: "ሀዋሳ፣ ኢትዮጵያ",
        building: "ዘመናዊ ሲዳማን መገንባት"
      },
      jobs: {
        vacancies: "የሲዳማ መሶብ ክፍት የስራ ቦታዎች",
        subtitle: "የሰራተኞች ቅጥር ዲጂታል መድረክ // ሀዋሳ, ኢትዮጵያ",
        searchPlaceholder: "የስራ መደብ፣ መታወቂያ ቁጥር ወይም የተማሩበትን መስክ ይፈልጉ...",
        allDepts: "ሁሉንም የስራ ክፍሎች",
        newest: "አዳዲስ ክፍት የስራ መደቦች",
        latestDesc: "ጊዜያቸው ካለፈባቸው ውጪ ያሉ አዳዲስ ማስታወቂያዎች",
        loading: "የስራ ማስታወቂያዎች በመጫን ላይ ናቸው...",
        noMatch: "ያስገቡትን መስፈርት የሚያሟላ ንቁ የስራ መደብ አልተገኘም።",
        jobCode: "መለያ ቁጥር",
        closed: "ጊዜው አልፏል",
        priority: "አስቸኳይ",
        active: "ክፍት",
        rank: "የመደብ ደረጃ",
        salary: "ወርሃዊ ደመወዝ",
        slots: "የክፍት ቦታ ብዛት",
        location: "የስራ ቦታ",
        education: "የትምህርት ደረጃ",
        fields: "የሚያስፈልግ የትምህርት ዝግጅት",
        experience: "የስራ ልምድ እና መስፈርቶች",
        notes: "ማስታወሻ",
        deadline: "የማመልከቻ ማቅረቢያ ቀነ-ገደብ",
        coc: "ሲ.ኦ.ሲ (COC) ያስፈልጋል",
        registrationClosed: "ምዝገባው ተዘግቷል",
        viewDetail: "ሙሉውን ይመልከቱ",
        viewAll: "ሁሉንም የስራ ማስታወቂያዎች ይመልከቱ"
      }
    }
  },
  sid: {
    translation: {
      nav: {
        home: "Umo",
        openRoles: "Fano Looso",
        about: "Ninketa",
        help: "Kaa'lo",
        applyNow: "Xaawo Sokki"
      },
      hero: {
        badge: "Sidaamu Mesob HRMS Pilaatfoorme",
        title1: "Sidaamu Dagoomu Ooso",
        title2: "Albaanni Qara",
        subtitle: "Xallaho xawisa dandeessanno, halaale uyino looso hasi'raano uyino poortaale.",
        viewRoles: "Fano Looso La'i",
        verify: "Sokka Kakkali"
      },
      stats: {
        activeApps: "Hasi'raano",
        openJobs: "Fano Looso",
        successRate: "Kaa'lo Xawisa"
      },
      about: {
        title: "SMUC Ninketa",
        mission: "Halaale Ninketa",
        vision: "Albaanni Ninketa",
        coreValues: "Qara Hasiissanno"
      },
      footer: {
        desc: "Dijitaalu oosomanni, looso biddishshanni, Sidaama dagooma irkisa.",
        paperless: "Waraqata Hoogino",
        fastDigital: "Xaawo Dijitaala",
        quickLinks: "Xaadooshshe",
        help: "Kaa'lo Qara",
        privacy: "Baxilli Seera",
        terms: "Seera",
        contact: "Xaadooshshe",
        location: "Hawaasa, Itoophiya",
        building: "Haaro Sidaama Minanna"
      },
      jobs: {
        vacancies: "Sidaamu Mesob Fano Looso",
        subtitle: "Dijitaalu Loosu Hasi'raano Pilaatfoorme // HAWAASA, ITOOPHIYA",
        searchPlaceholder: "Looso, Koodde, woy rosu gari hasi'ri...",
        allDepts: "Baala Biddishsha",
        newest: "Haaro Fano Looso",
        latestDesc: "YANA SA'INOKKI HAARO XAWISHSHA",
        loading: "Fano looso la'anni...",
        noMatch: "Hasi'ritto garinni looso di afamino.",
        jobCode: "Koodde",
        closed: "Cufamino",
        priority: "Magawo",
        active: "Fanantino",
        rank: "Garri Deerra",
        salary: "Agantu Damooza",
        slots: "Fano Looso Kiiro",
        location: "Loosu Bayicho",
        education: "Rosu Deerra",
        fields: "Hasiissanno Rosi Gari",
        experience: "Loosu Yanna",
        notes: "Ledote Hasiisanno",
        deadline: "Yana",
        coc: "COC Hasiissanno",
        registrationClosed: "Borreessama Cufantino",
        viewDetail: "Baala La'i",
        viewAll: "Baala Fano Looso La'i"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
