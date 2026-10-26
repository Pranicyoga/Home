/* =====================================================================
   PRANIC YOGA – EDIT YOUR CONTENT HERE (no need to touch the HTML)
   Add a class / plan: copy one { ... } block, paste it, change the text.
   Delete a class / plan: remove its { ... } block.
   ===================================================================== */

const SITE = {
  name: "Pranic Yoga",
  tagline: "Free yoga classes for body, breath and mind",
  phone: "+91 00000 00000",
  email: "hello@pranicyoga.in",
  whatsapp: "https://wa.me/910000000000",
  address: "Online & Offline classes, Andhra Pradesh, India",
  instagram: "#", youtube: "#", facebook: "#",
  hero: {
    // IMAGE: 1920 x 800 px (desktop) – keep subject centred, text sits on the left
    image: "images/hero.jpg",
    title: "Free Yoga Classes for Everyone",
    text: "Learn authentic pranic yoga with breath, movement and stillness. No fees, no pressure. Just show up.",
    buttonText: "See Upcoming Classes",
    buttonLink: "#classes"
  }
};

/* ---------- UPCOMING CLASSES ----------
   type: "Free" or "Paid"  |  price: shown only when type is "Paid"
   thumb  IMAGE: 800 x 600 px (4:3)      banner IMAGE: 1600 x 600 px          */
const CLASSES = [
  {
    id: "morning-pranayama",
    title: "Morning Pranayama Basics",
    date: "02 Nov 2026", time: "6:00 AM – 7:00 AM IST", mode: "Online (Zoom)",
    type: "Free", price: "",
    thumb: "images/class-1.jpg", banner: "images/class-1-banner.jpg",
    short: "Gentle breathing practices to start your day calm and focused.",
    about: "A beginner-friendly hour of breath awareness, simple pranayama and short meditation. No experience needed.",
    benefits: ["Reduces stress and anxiety", "Improves lung capacity", "Better focus and sleep"],
    bring: "Yoga mat, loose clothing, water bottle.",
    registerLink: "#"
  },
  {
    id: "hatha-flow",
    title: "Hatha Yoga Flow",
    date: "05 Nov 2026", time: "7:00 AM – 8:00 AM IST", mode: "Offline (Studio)",
    type: "Free", price: "",
    thumb: "images/class-2.jpg", banner: "images/class-2-banner.jpg",
    short: "Slow, mindful asanas to build strength and flexibility.",
    about: "Traditional hatha postures held with steady breath, ending with deep relaxation.",
    benefits: ["Builds strength", "Improves flexibility", "Relieves back and neck tension"],
    bring: "Yoga mat, comfortable clothing.",
    registerLink: "#"
  },
  {
    id: "deep-relax-workshop",
    title: "Deep Relaxation Workshop",
    date: "09 Nov 2026", time: "5:00 PM – 7:00 PM IST", mode: "Online (Zoom)",
    type: "Paid", price: "₹499",
    thumb: "images/class-3.jpg", banner: "images/class-3-banner.jpg",
    short: "A two-hour guided session on yoga nidra and stress release.",
    about: "Learn yoga nidra, body scanning and guided relaxation you can practise at home.",
    benefits: ["Deep rest and better sleep", "Calms the nervous system", "Recorded practice audio included"],
    bring: "Mat, blanket, eye cover (optional).",
    registerLink: "#"
  }
];

/* ---------- SPECIAL CLASSES ----------  IMAGE: 800 x 600 px */
const SPECIAL = [
  { title: "Prenatal Yoga", text: "Safe, gentle practice for expecting mothers.", image: "images/special-1.jpg", link: "#" },
  { title: "Yoga for Seniors", text: "Chair-supported movement for joints and balance.", image: "images/special-2.jpg", link: "#" },
  { title: "Yoga for Back Pain", text: "Targeted therapeutic sequences.", image: "images/special-3.jpg", link: "#" },
  { title: "Kids Yoga", text: "Playful postures for ages 6–12.", image: "images/special-4.jpg", link: "#" }
];

/* ---------- MEMBERSHIPS ---------- set featured:true to highlight a plan */
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
  name: "Your Name",
  role: "Certified Yoga Instructor",
  image: "images/instructor.jpg",
  bio: ["Write a short story of your yoga journey here.", "Mention your teaching style and why you teach for free."],
  credentials: ["200-hr Yoga Teacher Training", "5+ years teaching experience", "1,000+ students guided"]
};
