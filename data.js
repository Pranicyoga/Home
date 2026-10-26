/* =====================================================================
   PRANIC YOGA – EDIT YOUR CONTENT HERE (no need to touch the HTML)
   Add a class / plan: copy one { ... } block, paste it, change the text.
   Delete a class / plan: remove its { ... } block.
   ===================================================================== */

const SITE = {
  name: "Pranic Yoga",
  tagline: "Return to the Breath, Return to Yourself",
  phone: "+91 70326 32374",
  email: "hello@pranicyoga.in",
  /* FORMS: paste your Google Apps Script Web App URL below (steps in apps-script.gs) */
  formsUrl: "https://script.google.com/macros/s/AKfycbylL_46SDlib409fsWxv5k0LpIXr2UKG-cdas-ocqjLL84Ts01o2fHGQ2bw6kSnCKty/exec",
  whatsapp: "https://wa.me/917032632374?text=Namaskaram!+May+I+know+more+about+Pranic+Yoga+classes&utm_source=chatgpt.com",
  waGreeting: "Namaste! Want to join a free yoga class? Tap here and chat with us on WhatsApp.", /* chat pop-up text */
  address: "Online & Offline classes, India",
  instagram: "#", youtube: "#", facebook: "#",
  hero: {
    // IMAGE: 640 x 780 px (portrait, shown inside an arch frame on the right). Optional – a gradient shows if missing
    image: "images/Hero_2.jpg",
    points: ["100% free classes", "Online and in-studio", "All levels welcome"],
    title: "Free Yoga Classes for Everyone",
    text: "Learn authentic pranic yoga with breath, movement and stillness. No fees, no pressure. Just breath",
    buttonText: "See Upcoming Classes",
    buttonLink: "#classes"
  }
};

/* ---------- FORMS (saved to your Google Sheet) ----------
   Thank-you messages. The Apps Script URL goes in SITE.formsUrl (top of this file). */
const FORM = {
  thanksTitle: "Thank you!",
  thanks: {
    class: "Your registration is received. We will confirm your seat on WhatsApp shortly.",
    membership: "We received your payment details. We will verify your UTR and welcome you on WhatsApp soon.",
    contact: "Your message has been sent. We will reply as soon as possible."
  }
};

/* ---------- UPCOMING CLASSES ----------
   type: "Free" or "Paid"  |  price: shown only when type is "Paid"
   thumb  IMAGE: 800 x 600 px (4:3)      banner IMAGE: 1600 x 600 px          */
const CLASSES = [
{
    id: "morning-pranayama-basics",
    title: "Correct Your Breathing Pattern ",
    date: "02 Nov 2026",
    time: "6:00 AM – 7:00 AM IST",
    mode: "Online (Zoom)",
    type: "Free",
    price: "",
    thumb: "images/class-1.jpg",
    banner: "images/class-1-banner.jpg",
    short: "Learn to recognise your breathing habits for more mindful breathing. No yoga experience needed.",
    about: "Are you aware of how you breathe throughout the day? Join this free, beginner-friendly live session to understand your breathing habits and learn how to practise breathing more comfortably. We'll guide you through natural breath awareness, diaphragmatic breathing, three-part breathing, alternate-nostril breathing, gentle humming, and relaxation. No difficult yoga poses or previous experience required. Take your first step towards a more mindful breathing routine, then follow a simple 41-day practice plan to observe your progress.",
    benefits: [
        "Understand your everyday breathing habits",
        "Learn to practise slow, gentle and comfortable breathing",
        "Discover simple breathing techniques for daily relaxation",
        "Build awareness of your breath and attention",
        "Follow a 41-day practice plan and observe your progress"
    ],
    bring: "A quiet space, comfortable clothing, a yoga mat or chair, and a water bottle.",
    instructor: "",
    tagline: "Understand your breath. Practise better. Build a healthier daily habit.",
    instructorImage: "",
    registerLink: "#"
},
];

/* ---------- SPECIAL CLASSES ----------
   Same fields as CLASSES. Opens the same detail page when tapped.
   thumb IMAGE: 800 x 600 px   banner IMAGE: 1600 x 600 px                    */
const SPECIAL = [
  { id: "prenatal-yoga", title: "Prenatal Yoga", date: "Every Saturday", time: "8:00 AM – 9:00 AM IST", mode: "Online (Zoom)",
    type: "Free", price: "", thumb: "images/special-1.jpg", banner: "images/special-1-banner.jpg",
    short: "Safe, gentle practice for expecting mothers.",
    about: "Gentle postures, breathing and relaxation designed for each trimester. Please consult your doctor before joining.",
    benefits: ["Eases back pain", "Prepares breath for labour", "Better sleep and calm"], bring: "Mat, bolster or pillow, water.", instructor: "",       // leave "" to use the main instructor name, or type a guest teacher name
    tagline: "",          // leave "" to use the main tagline, or type a custom one
    instructorImage: "",  // leave "" to use images/instructor.jpg, or e.g. "images/guest-1.jpg"  IMAGE: 400 x 400 px (square, face centred)
    registerLink: "#" },
  { id: "yoga-for-seniors", title: "Yoga for Seniors", date: "Every Monday", time: "7:00 AM – 8:00 AM IST", mode: "Offline (Studio)",
    type: "Free", price: "", thumb: "images/special-2.jpg", banner: "images/special-2-banner.jpg",
    short: "Chair-supported movement for joints and balance.",
    about: "Slow, supported practice that keeps joints mobile and improves balance and confidence.",
    benefits: ["Better balance", "Joint mobility", "Calm mind"], bring: "Sturdy chair, comfortable clothes.", instructor: "",       // leave "" to use the main instructor name, or type a guest teacher name
    tagline: "",          // leave "" to use the main tagline, or type a custom one
    instructorImage: "",  // leave "" to use images/instructor.jpg, or e.g. "images/guest-1.jpg"  IMAGE: 400 x 400 px (square, face centred)
    registerLink: "#" },
  { id: "yoga-for-back-pain", title: "Yoga for Back Pain", date: "Every Wednesday", time: "6:30 PM – 7:30 PM IST", mode: "Online (Zoom)",
    type: "Paid", price: "₹299", thumb: "images/special-3.jpg", banner: "images/special-3-banner.jpg",
    short: "Targeted therapeutic sequences.",
    about: "Safe sequences to release the lower back, hips and shoulders and build core support.",
    benefits: ["Relieves stiffness", "Corrects posture", "Strengthens the core"], bring: "Mat, strap or belt.", instructor: "",       // leave "" to use the main instructor name, or type a guest teacher name
    tagline: "",          // leave "" to use the main tagline, or type a custom one
    instructorImage: "",  // leave "" to use images/instructor.jpg, or e.g. "images/guest-1.jpg"  IMAGE: 400 x 400 px (square, face centred)
    registerLink: "#" },
  { id: "kids-yoga", title: "Kids Yoga", date: "Every Sunday", time: "10:00 AM – 11:00 AM IST", mode: "Offline (Studio)",
    type: "Free", price: "", thumb: "images/special-4.jpg", banner: "images/special-4-banner.jpg",
    short: "Playful postures for ages 6–12.",
    about: "Stories, games and simple poses that build focus, flexibility and confidence in children.",
    benefits: ["Improves focus", "Builds flexibility", "Fun and confidence"], bring: "Mat and water bottle.", instructor: "",       // leave "" to use the main instructor name, or type a guest teacher name
    tagline: "",          // leave "" to use the main tagline, or type a custom one
    instructorImage: "",  // leave "" to use images/instructor.jpg, or e.g. "images/guest-1.jpg"  IMAGE: 400 x 400 px (square, face centred)
    registerLink: "#" }
];

/* ---------- MEMBERSHIPS ---------- featured:true highlights a plan.
   link = YOUR PAYMENT LINK, shown inside the Join Now form */
const MEMBERSHIPS = [
  { name: "41 Days Plan", price: "₹999", featured: false,
    features: ["Daily live sessions", "Beginner foundation", "Community group access"],
    link: "#" /* paste your payment / join link here */ },
  { name: "82 Days Plan", price: "₹1,799", featured: true,
    features: ["Daily live sessions", "Recordings for 6 months", "Monthly 1:1 check-in", "Community group access"],
    link: "#" },
  { name: "108 Days Plan", price: "₹2,499", featured: false,
    features: ["Daily live sessions", "Lifetime recordings", "Weekly 1:1 guidance", "Diet and lifestyle guide", "Completion certificate"],
    link: "#" }
];

/* ---------- INSTRUCTOR ----------  IMAGE: 700 x 900 px (portrait) */
const INSTRUCTOR = {
  name: "Saikumar",
  role: "Certified Yoga Instructor",
  tagline: "Helping you breathe better, move better and live calmer.", /* shown at the bottom of every class page */
  image: "images/instructor.jpg",
  bio: ["I have been practising yoga for the past six years, learning from different masters and exploring various paths, from Sivananda to Sadhguru, and from Kriya Yoga and Karma Yoga to Vedanta, Samkhya, Tantra, and Mantra.","Through my journey of learning and teaching, I realised that all these paths share a common goal: to help us become more aware of ourselves.","Today, we live surrounded by distractions, from the moment we wake up until we go to sleep. We often forget to connect with ourselves. I believe that our breath is one of the simplest ways to begin this journey. When we learn to understand and control our breath, we can develop better awareness of our minds.","This is why I started Pranic Yoga — to help people connect with their breath through breathing practices and other forms of yoga, bringing more awareness and balance into everyday life."],
  stats: [{n:"100+",l:"Students guided"},{n:"2+",l:"Years teaching"},{n:"200hr",l:"Certified"}],
  credentials: ["200-hr Yoga Teacher Training", "2+ years teaching experience", "100+ students guided"]
};

/* ---------- FAQ ---------- */
const FAQ = [
  { q: "Are the classes really free?", a: "Yes. Classes marked Free have no fee. Paid workshops and memberships show their price clearly." },
  { q: "I am a complete beginner. Can I join?", a: "Absolutely. Every class is open to all levels and the instructor shows easier options." },
  { q: "What do I need for online classes?", a: "A phone or laptop with internet, a yoga mat and a quiet space. The Zoom link is shared after you register." },
  { q: "Will I get recordings if I miss a class?", a: "Membership plans include recordings. Free classes are live only." },
  { q: "Can I practise if I have an injury or health condition?", a: "Please consult your doctor first and tell the instructor before class so they can suggest modifications." }
];
