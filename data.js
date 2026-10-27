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
  whatsapp: "https://wa.me/917032632374?text=Namaskaram!+May+I+know+more+about+Pranic+Yoga+classes",
  waGreeting: "Namaste! Want to join a free yoga class? Tap here and chat with us on WhatsApp.", /* chat pop-up text */
  address: "Online Classes, India",
  instagram: "#", youtube: "#", facebook: "#",
  hero: {
    // IMAGE: 640 x 780 px (portrait, shown inside an arch frame on the right). Optional – a gradient shows if missing
    image: "images/Hero_2.jpg",
    points: ["100% free classes", "Online", "All levels welcome"],
    title: "Free Yoga Classes for Everyone",
    text: "Learn authentic pranic yoga with breath, movement and stillness. No fees, no pressure. Just breath",
    buttonText: "See Upcoming Classes",
    buttonLink: "#classes"
  }
};

/* ---------- NEW: WHAT YOU'LL GAIN (3 cards, above classes) ----------
   item image IMAGE: 900 x 620 px (illustration or photo). A colour gradient shows if missing */
const GAIN = {
  title: "What You’ll Gain",
  text: "Build a simple daily practice that supports your wellbeing. Start with live classes. No experience needed.",
  items: [
    { title: "Breathe Better, Feel Calmer", image: "images/gain-1.jpg",
      text: "Learn simple pranayama and breath awareness to ease stress and settle your mind." },
    { title: "Sleep & Relax Deeply", image: "images/gain-2.jpg",
      text: "Guided Yoga Nidra and relaxation practices help you unwind and rest better." },
    { title: "Focus & Inner Balance", image: "images/gain-3.jpg",
      text: "Mantra meditation and mindful practice build focus, clarity and steadiness in daily life." }
  ]
};

/* ---------- NEW: WHY CHOOSE US ----------
   image IMAGE: 800 x 700 px (transparent PNG/WebP illustration works best)
   icon options: "target", "clock", "users", "lotus"                          */
const WHY = {
  title: "Why Choose Pranic Yoga?",
  text: "We blend the wisdom of traditional yoga with a simple, guided approach that helps you stay consistent, one breath at a time.",
  image: "images/why.jpg",
  button: "Join Free Classes",
  items: [
    { icon: "lotus",  title: "Beginner friendly, always", text: "No difficult poses or previous experience. Every practice starts from your breath." },
    { icon: "target", title: "Start free", text: "Try our live classes before you commit to anything. No pressure." },
    { icon: "clock",  title: "Online, from anywhere", text: "Join live from your home on Zoom or Instagram Live. All you need is a quiet corner." },
    { icon: "users",  title: "Guided by an experienced teacher", text: "Learn from a teacher with six years of practice across several yoga traditions." }
  ]
};

/* ---------- NEW: TESTIMONIALS ----------
   Use REAL feedback only, with the student's permission.
   avatar IMAGE: 240 x 240 px (square, face centred). Entries with empty text are hidden. */
const TESTIMONIALS = {
  title: "Testimonials",
  subtitle: "Hear from our students",
  note: "Individual results vary. Yoga supports overall wellness but does not replace medical care. Please consult your doctor before starting any new practice.",
  items: [
    { name: "Arun Juneja", place: "Bangalore", tag: "35 Pranicdays", image: "images/t-1.jpg",
      text: "I never realised how unconsciously I was breathing until I started practising breath awareness. Now, I notice my breathing more often and make an effort to breathe consciously." },
    { name: "Tanuja Sharma", place: "Gujarat", tag: "62 Pranicdays", image: "images/t-2.jpg",
      text: "This practice has taught me that breathing is not just an automatic process; it is something I can become aware of. I’m gradually developing a deeper connection with my breath." },
    { name: "Vikash Kumar", place: "Indore", tag: "58 Pranicdays", image: "images/t-3.jpg",
      text: "The biggest change for me is that I’ve started paying attention to something I used to take for granted; My breath. I’m becoming more conscious of my breathing throughout the day" }
  ]
};

/* ---------- NEW: BIG CALL-TO-ACTION BAND (before FAQ) ---------- */
const CTA = {
  title: "Your first step is just one breath away",
  text: "Reserve your seat in the next live class and start feeling the difference.",
  button: "Reserve My Seat", link: "#classes"
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
   paymentLink: payment link shown to visitors for Paid classes
   thumb  IMAGE: 800 x 600 px (4:3)      banner IMAGE: 1600 x 600 px          */
const CLASSES = [
{
    id: "morning-pranayama-basics",
    title: "Correct Your Breathing Pattern ",
    date: "02 Nov 2026",
    time: "6:00 AM – 7:00 AM IST",
    mode: "Online (Zoom)",
    type: "Paid",
    price: "200",
    paymentLink: "https://rzp.io/rzp/Ndd15N1R",
    thumb: "images/class-1-1.jpg",
    banner: "images/class-1-1-banner.jpg",
    short: "Learn to recognise your breathing habits for more mindful breathing. No yoga experience needed.",
    about: "Are you aware of how you breathe throughout the day? Join this free, beginner-friendly live session to understand your breathing habits and learn how to practise breathing more comfortably. We'll guide you through natural breath awareness. No difficult yoga poses or previous experience required. Take your first step towards a more mindful breathing routine, then follow a simple 41-day practice plan to observe your progress.",
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
{
    id: "yoga-nidra",
    title: "Deep Relaxation & Yoga Nidra",
    date: "Every Day",
    time: "10:00 PM – 10:30 PM IST",
    mode: "Instagram Live",
    type: "Free",
    price: "",
    thumb: "images/special-2.jpg",
    banner: "images/special-2-banner.jpg",
    short: "Release tension, calm your mind and relax deeply.",
    about: "A guided relaxation practice combining body awareness, gentle breathing and Yoga Nidra to help you unwind from daily stress and reconnect with yourself. Suitable for beginners. Practise in a quiet, comfortable space where you can lie down without being disturbed.",
    benefits: [
        "Releases physical tension",
        "Promotes calm and relaxation",
        "Supports better sleep"
    ],
    bring: "Yoga mat, pillow or bolster, light blanket, and a quiet space.",
    instructor: "",
    tagline: "",
    instructorImage: "",
    registerLink: "#"
},
{
    id: "mantra-meditation",
    title: "Mantra Meditation",
    date: "Every Sunday",
    time: "5:00 AM – 5:30 AM IST",
    mode: "Instagram Live",
    type: "Free",
    price: "",
    thumb: "images/special-3.jpg",
    banner: "images/special-3-banner.jpg",
    short: "Calm your mind through the power of mantra and sound.",
    about: "Discover the practice of mantra meditation through simple chanting, sound awareness and silent repetition. Learn how focusing on a mantra can help settle distractions, improve concentration and bring greater awareness to the present moment. Suitable for beginners, with no prior meditation experience required.",
    benefits: [
        "Improves focus and awareness",
        "Encourages mental calmness",
        "Builds a regular meditation practice"
    ],
    bring: "A comfortable mat or cushion, water, and a quiet space.",
    instructor: "",
    tagline: "",
    instructorImage: "",
    registerLink: "#"
},

];

/* ---------- MEMBERSHIPS ---------- featured:true highlights a plan.
   link = YOUR PAYMENT LINK, shown inside the Join Now form */
const MEMBERSHIPS = [
  { name: "41 Days Plan", price: "₹999", featured: false,
    features: ["Daily live sessions", "Beginner foundation", "Community group access"],
    link: "https://rzp.io/rzp/8CyallW8" /* paste your payment / join link here */ },
  { name: "82 Days Plan", price: "₹1,799", featured: true,
    features: ["Daily live sessions", "Recordings for 6 months", "Monthly 1:1 check-in", "Community group access"],
    link: "https://rzp.io/rzp/Ndd15N1R" },
  { name: "108 Days Plan", price: "₹2,499", featured: false,
    features: ["Daily live sessions", "Lifetime recordings", "Weekly 1:1 guidance", "Diet and lifestyle guide", "Completion certificate"],
    link: "https://rzp.io/rzp/z8sDdVDQ" }
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
