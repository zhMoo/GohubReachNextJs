// storage.js: the app's LOCAL data store. No third-party API, no database.
//
// Everything lives in this file:
//   1. REGIONS and STATES: read-only data about Malaysia's 13 states and 3 federal territories.
//   2. messages: a small in-memory guestbook that the app can add to.
//
// The functions are `async` so pages use them exactly like real data fetching
// (await getStates(), etc.). If you later move to a database or an API,
// only this file needs to change.
//
// Note: guestbook messages are kept in server memory, so they reset when the
// server restarts. That's fine for an assignment demo.

export const REGIONS = [
  { slug: "northern", name: "Northern Region", nameBm: "Wilayah Utara" },
  { slug: "central", name: "Central Region", nameBm: "Wilayah Tengah" },
  { slug: "southern", name: "Southern Region", nameBm: "Wilayah Selatan" },
  { slug: "east-coast", name: "East Coast", nameBm: "Pantai Timur" },
  { slug: "east-malaysia", name: "East Malaysia", nameBm: "Malaysia Timur" },
];

const STATES = [
  {
    slug: "perlis",
    name: "Perlis",
    title: "Perlis Indera Kayangan",
    type: "State",
    capital: "Kangar",
    region: "northern",
    foods: ["Harumanis mango", "Laksa Perlis"],
    attractions: ["Gua Kelam", "Perlis State Park", "Padang Besar border market"],
    description:
      "Malaysia's smallest state, at the northern tip of the peninsula next to the Thai border, known for its paddy fields and sweet Harumanis mangoes.",
  },
  {
    slug: "kedah",
    name: "Kedah",
    title: "Kedah Darul Aman",
    type: "State",
    capital: "Alor Setar",
    region: "northern",
    foods: ["Laksa Kedah", "Nasi ulam"],
    attractions: ["Langkawi", "Gunung Jerai", "Menara Alor Setar"],
    description:
      "Called the 'rice bowl of Malaysia' for its vast paddy fields, and home to the island resort of Langkawi.",
  },
  {
    slug: "pulau-pinang",
    name: "Pulau Pinang",
    title: "Pulau Mutiara",
    type: "State",
    capital: "George Town",
    region: "northern",
    foods: ["Char kuey teow", "Asam laksa", "Nasi kandar"],
    attractions: ["George Town UNESCO heritage area", "Penang Hill", "Kek Lok Si Temple"],
    description:
      "An island and mainland state whose capital, George Town, is a UNESCO World Heritage Site famous for street art and street food.",
  },
  {
    slug: "perak",
    name: "Perak",
    title: "Perak Darul Ridzuan",
    type: "State",
    capital: "Ipoh",
    region: "northern",
    foods: ["Ipoh white coffee", "Tauge ayam (bean sprout chicken)"],
    attractions: ["Pangkor Island", "Kellie's Castle", "Royal Belum State Park"],
    description:
      "Once the centre of Malaysia's tin-mining industry, with limestone hills, cave temples and a lively food scene in Ipoh.",
  },
  {
    slug: "selangor",
    name: "Selangor",
    title: "Selangor Darul Ehsan",
    type: "State",
    capital: "Shah Alam",
    region: "central",
    foods: ["Bak kut teh (Klang)", "Satay Kajang"],
    attractions: ["Batu Caves", "Sky Mirror, Kuala Selangor", "Sultan Salahuddin Abdul Aziz Mosque"],
    description:
      "Malaysia's most developed state, surrounding Kuala Lumpur and Putrajaya, with the Hindu shrine of Batu Caves and fireflies at Kuala Selangor.",
  },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    title: null,
    type: "Federal Territory",
    capital: "Kuala Lumpur",
    region: "central",
    foods: ["Nasi lemak", "KL Hokkien mee"],
    attractions: ["Petronas Twin Towers", "Dataran Merdeka", "Petaling Street"],
    description:
      "Malaysia's capital city and largest city, home to the Petronas Twin Towers and Dataran Merdeka, where independence was declared in 1957.",
  },
  {
    slug: "putrajaya",
    name: "Putrajaya",
    title: null,
    type: "Federal Territory",
    capital: "Putrajaya",
    region: "central",
    foods: [],
    attractions: ["Putra Mosque", "Perdana Putra", "Putrajaya Lake"],
    description:
      "A planned city that serves as the federal government's administrative centre, built around a large man-made lake.",
  },
  {
    slug: "negeri-sembilan",
    name: "Negeri Sembilan",
    title: "Negeri Sembilan Darul Khusus",
    type: "State",
    capital: "Seremban",
    region: "southern",
    foods: ["Masak lemak cili api", "Siew pau Seremban"],
    attractions: ["Port Dickson", "Istana Lama Seri Menanti"],
    description:
      "Known for its Minangkabau heritage, including the distinctive curved 'buffalo horn' roofs, and the beaches of Port Dickson.",
  },
  {
    slug: "melaka",
    name: "Melaka",
    title: "Melaka Bandaraya Bersejarah",
    type: "State",
    capital: "Melaka City",
    region: "southern",
    foods: ["Chicken rice ball", "Cendol gula Melaka", "Satay celup"],
    attractions: ["A Famosa", "Jonker Street", "Stadthuys"],
    description:
      "A historic port city shaped by Malay, Portuguese, Dutch and British rule; its centre is a UNESCO World Heritage Site.",
  },
  {
    slug: "johor",
    name: "Johor",
    title: "Johor Darul Ta'zim",
    type: "State",
    capital: "Johor Bahru",
    region: "southern",
    foods: ["Laksa Johor", "Mee rebus"],
    attractions: ["Legoland Malaysia", "Desaru", "Endau-Rompin National Park"],
    description:
      "The southernmost state of Peninsular Malaysia, linked to Singapore by the Causeway and the Second Link.",
  },
  {
    slug: "pahang",
    name: "Pahang",
    title: "Pahang Darul Makmur",
    type: "State",
    capital: "Kuantan",
    region: "east-coast",
    foods: ["Ikan patin masak tempoyak"],
    attractions: ["Cameron Highlands", "Taman Negara", "Genting Highlands"],
    description:
      "The largest state in Peninsular Malaysia, home to the tea plantations of Cameron Highlands and the ancient rainforest of Taman Negara.",
  },
  {
    slug: "terengganu",
    name: "Terengganu",
    title: "Terengganu Darul Iman",
    type: "State",
    capital: "Kuala Terengganu",
    region: "east-coast",
    foods: ["Nasi dagang", "Keropok lekor"],
    attractions: ["Redang Island", "Perhentian Islands", "Crystal Mosque"],
    description:
      "An east coast state known for clear-water islands, turtle nesting beaches and traditional crafts like songket and batik.",
  },
  {
    slug: "kelantan",
    name: "Kelantan",
    title: "Kelantan Darul Naim",
    type: "State",
    capital: "Kota Bharu",
    region: "east-coast",
    foods: ["Nasi kerabu", "Ayam percik"],
    attractions: ["Pasar Siti Khadijah", "Istana Jahar"],
    description:
      "A centre of traditional Malay culture, from wau (kite) making and silat to its famous blue nasi kerabu.",
  },
  {
    slug: "sabah",
    name: "Sabah",
    title: "Negeri di Bawah Bayu",
    type: "State",
    capital: "Kota Kinabalu",
    region: "east-malaysia",
    foods: ["Hinava", "Tuaran mee"],
    attractions: ["Mount Kinabalu", "Sipadan Island", "Kinabatangan River"],
    description:
      "The 'Land Below the Wind' in northern Borneo, home to Mount Kinabalu, Malaysia's highest mountain, and world-class diving at Sipadan.",
  },
  {
    slug: "sarawak",
    name: "Sarawak",
    title: "Bumi Kenyalang",
    type: "State",
    capital: "Kuching",
    region: "east-malaysia",
    foods: ["Sarawak laksa", "Kolo mee"],
    attractions: ["Gunung Mulu National Park", "Kuching Waterfront", "Sarawak Cultural Village"],
    description:
      "Malaysia's largest state, the 'Land of the Hornbills', with the giant caves of Mulu and many indigenous communities.",
  },
  {
    slug: "labuan",
    name: "Labuan",
    title: null,
    type: "Federal Territory",
    capital: "Victoria",
    region: "east-malaysia",
    foods: [],
    attractions: ["Labuan Marine Park", "Labuan War Cemetery"],
    description:
      "An island federal territory off the coast of Sabah, known as an offshore financial centre and duty-free port.",
  },
];

// In-memory guestbook, seeded with a few messages.
const messages = [
  {
    id: 1,
    name: "Aisyah",
    state: "kelantan",
    text: "Nasi kerabu at Pasar Siti Khadijah is a must!",
    createdAt: "2026-10-01T09:00:00.000Z",
  },
  {
    id: 2,
    name: "Wei Jie",
    state: "pulau-pinang",
    text: "Best char kuey teow is in George Town. No debate. 😄",
    createdAt: "2026-10-02T11:30:00.000Z",
  },
  {
    id: 3,
    name: "Kavitha",
    state: "selangor",
    text: "Climbed all 272 steps at Batu Caves this weekend.",
    createdAt: "2026-10-03T15:45:00.000Z",
  },
];
let nextId = messages.length + 1;

// Simulates a short network delay so the loading UI (loading.js) can be seen.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- States & regions ----------

export async function getStates({ region } = {}) {
  await delay(300);
  return region ? STATES.filter((s) => s.region === region) : STATES;
}

export async function getState(slug) {
  await delay(300);
  return STATES.find((s) => s.slug === slug) ?? null;
}

export function getStateSlugs() {
  return STATES.map((s) => s.slug);
}

export function getRegion(slug) {
  return REGIONS.find((r) => r.slug === slug) ?? null;
}

// ---------- Guestbook ----------

export async function getMessages() {
  await delay(200);
  // Newest first. Return a copy so callers can't change the store by accident.
  return [...messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addMessage({ name, state, text }) {
  const message = { id: nextId++, name, state, text, createdAt: new Date().toISOString() };
  messages.push(message);
  return message;
}
