// Page content: services, imagery, FAQ. Business details live in config/business.js.
//
// Images live in public/<Folder>/ and are referenced by absolute path.
const IMG = {
  manicure: ['23449da1aef18148df58a26fe6584ac7.jpg', '69d41d299a8f33b1a5e9dd390af411b8.jpg', '8b16ce6e0c96ffe6d6a5b61f3124313e.jpg', '4d63fe3dcedaab699da29d0829e8eeb4.jpg', 'tải xuống.png'],
  pedicure: ['181681ca6e56b4ea8d8c5b454e0a7850.jpg', '1a278abef4457eb7c6eb3b303fe4731b.jpg', 'a717618386a40ad7810fd57da7c1d0a6.jpg', '8c31bb715615b60511ce408189630640.jpg', 'd8fe80d1b3c994594a8ca387c448f84b.jpg'],
  nailArt: ['4b1e56a94b0dcbc3512b76e35fc38d81.jpg', '69300abff7d71f6c6a58dc5b68db77e8.jpg', '6adbe6a1b27c949f416e8c15372320ca.jpg', '86008f2fb5edb527416d3b94a13b4894.jpg', '69c1495ed7233dfd16114a284a169cd6.jpg'],
  facial: ['0bdc1b13923be2b4686488a874f7b353.jpg', '2d3babd45c85707021ba484d6b560716.jpg', 'd6871c116de40f19f0b92c3871d1975c.jpg', 'fdc4051627ff930ccd716a523706449c.jpg', 'tải xuống.png'],
  waxing: ['5bdc293699845e72c1cc12e52b92022f.jpg', 'cb4a2feeaba355828b2d5b12e232405b.jpg', '10611232f5ef6b42fba74e87d79cea07.jpg', '75ac7de27e29842f20b8ee2887ef140d.jpg', 'ba4e0077ec828d78b882d904b321b0ec.jpg'],
  eyelash: ['026e0310c725eba38195681ce6227bc9.jpg', '8e1877642a1e163ca6a8965beef4d157.jpg', '91d2dbd741842339c7713f0f0cef31d8.jpg', 'a6c3737c3b44348b8ce7bd2b17b274e2.jpg', '21727c7f935d2d05b5708ac802c45c33.jpg'],
};
const FOLDER = { manicure: 'Manicure', pedicure: 'Pedicure', nailArt: 'Nails-Art', facial: 'Facial', waxing: 'Waxing', eyelash: 'Eyelashes' };
const ALT = {
  manicure: 'Manicured nails at Royal Nail Store',
  pedicure: 'Relaxing pedicure at Royal Nail Store',
  nailArt: 'Custom nail art design',
  facial: 'Relaxing facial treatment',
  waxing: 'Waxing and brow service',
  eyelash: 'Eyelash service',
};
const pic = (cat, i) => encodeURI(`/${FOLDER[cat]}/${IMG[cat][i]}`);
const photo = (cat, i) => ({ src: pic(cat, i), alt: ALT[cat] });

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', sub: true }, // dropdown lists SERVICES
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const IMAGES = {
  about: {
    main: photo('manicure', 0),
    small: [photo('nailArt', 0), photo('manicure', 1)],
  },
  why: photo('pedicure', 0),
  cta: photo('facial', 0),
};

// Each service shows `image`, then cycles through `more` (all related demo photos).
// Order matters: the scroll showcase steps through these one by one.
// `formValue` matches the booking form's service options.
export const SERVICES = [
  {
    id: 'manicure',
    title: 'Manicure',
    tagline: 'Beautifully groomed hands, polished to perfection.',
    cta: 'Explore Manicure',
    formValue: 'Manicure',
    image: pic('manicure', 0),
    alt: ALT.manicure,
    more: [
      photo('manicure', 1),
      photo('manicure', 2),
    ],
    position: '50% 55%',
  },
  {
    id: 'pedicure',
    title: 'Pedicure',
    tagline: 'Relax, refresh and let every detail shine.',
    cta: 'Explore Pedicure',
    formValue: 'Pedicure',
    image: pic('pedicure', 0),
    alt: ALT.pedicure,
    more: [
      photo('pedicure', 1),
      photo('pedicure', 2),
    ],
    position: '50% 50%',
  },
  {
    id: 'nail-art',
    title: 'Nail Art',
    tagline: 'Express your style through artful, one-of-a-kind nails.',
    cta: 'Discover Nail Art',
    formValue: 'Nail Art',
    image: pic('nailArt', 0),
    alt: ALT.nailArt,
    more: [
      photo('nailArt', 1),
      photo('nailArt', 2),
      photo('nailArt', 3),
    ],
    position: '50% 45%',
  },
  {
    id: 'facial',
    title: 'Facial',
    tagline: 'A gentle moment of care for your natural glow.',
    cta: 'Explore Facials',
    formValue: 'Facial Treatments',
    image: pic('facial', 0),
    alt: ALT.facial,
    more: [
      photo('facial', 1),
      photo('facial', 2),
      photo('facial', 3),
    ],
    position: '40% 50%',
  },
  {
    id: 'waxing',
    title: 'Waxing',
    tagline: 'Feel fresh, smooth and confidently yourself.',
    cta: 'Learn About Waxing',
    formValue: 'Waxing',
    image: pic('waxing', 0),
    alt: ALT.waxing,
    more: [
      photo('waxing', 1),
    ],
    position: '50% 50%',
  },
  {
    id: 'eyelash',
    title: 'Eyelashes',
    tagline: 'Enhance your natural beauty, one lash at a time.',
    cta: 'Explore Eyelash Services',
    formValue: 'Eyelash Services',
    image: pic('eyelash', 0),
    alt: ALT.eyelash,
    more: [
      photo('eyelash', 1),
      photo('eyelash', 2),
      photo('eyelash', 3),
    ],
    position: '50% 40%',
  },
];

// Decorative photos flanking the FAQ list (desktop only).
export const FAQ_IMAGES = [pic('eyelash', 0), pic('nailArt', 1)];

// Intro copy for each service's detail page. Deliberately general: no prices, durations or
// availability are stated until the salon confirms them.
const DETAILS = {
  manicure:
    'A manicure is a gentle routine of shaping, cuticle care and polish, leaving your hands looking and feeling well kept. Get in touch with the salon to ask about the finishes and options available.',
  pedicure:
    'A pedicure is a relaxing treat for tired feet: soaking, shaping and polish for a fresh, tidy finish. Contact the salon to ask which pedicure options are on offer.',
  'nail-art':
    'Nail art is where your personality shows: colour, design and small details that make your nails one of a kind. Share your inspiration with the salon and ask what styles can be created.',
  facial:
    'A facial is a calm, restorative pause for your skin. Contact the salon to ask which facial treatments are offered and which one suits you best.',
  waxing:
    'Waxing helps you feel fresh and smooth. Ask the salon which waxing services are available and how to prepare for your visit.',
  eyelash:
    'Eyelash services are designed to enhance your natural look, one lash at a time. Get in touch with the salon to ask about the options available.',
};
SERVICES.forEach((sv) => {
  sv.description = DETAILS[sv.id];
});
// Each service uses every photo in its own public/<Folder>/ (first = cover, rest = `more`).
const SERVICE_CATEGORY = { manicure: 'manicure', pedicure: 'pedicure', 'nail-art': 'nailArt', facial: 'facial', waxing: 'waxing', eyelash: 'eyelash' };
SERVICES.forEach((sv) => {
  const cat = SERVICE_CATEGORY[sv.id];
  sv.image = pic(cat, 0);
  sv.more = IMG[cat].slice(1).map((_, i) => photo(cat, i + 1));
});

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.formValue), 'Multiple Services', 'Other'];

export const FEATURES = [
  {
    icon: 'Sparkles',
    title: 'A Variety of Beauty Services',
    description: 'Nails, facials, waxing and lashes.',
  },
  {
    icon: 'Palette',
    title: 'Styles That Reflect You',
    description: 'From soft neutrals to creative details.',
  },
  {
    icon: 'MapPin',
    title: 'Conveniently Located in Ventura',
    description: 'A welcoming beauty destination nearby.',
  },
];

// Mosaic tiles: each tile cross-fades through its own related photos every 2s.
// `area` names the grid cell in the desktop mosaic (see .gallery__tile--* in index.css).
export const GALLERY = [
  {
    id: 'feature',
    area: 'feature',
    kind: 'feature',
    label: 'Your Beauty Moment',
    caption: 'Nails, facials and more in one relaxing visit',
    slides: [
      photo('manicure', 2),
      photo('facial', 1),
      photo('nailArt', 1),
    ],
  },
  {
    id: 'nail-art',
    area: 't1',
    label: 'Nail Art',
    caption: 'Bold, playful designs',
    slides: [
      photo('nailArt', 2),
      photo('nailArt', 3),
      photo('nailArt', 0),
    ],
  },
  {
    id: 'manicure',
    area: 't2',
    label: 'Manicure',
    caption: 'Soft, polished neutrals',
    slides: [
      photo('manicure', 0),
      photo('manicure', 1),
      photo('manicure', 2),
    ],
  },
  {
    id: 'facial',
    area: 't4',
    label: 'Facial',
    caption: 'Glow from within',
    slides: [
      photo('facial', 2),
      photo('facial', 3),
      photo('facial', 0),
    ],
  },
  {
    id: 'pedicure',
    area: 't6',
    label: 'Pedicure',
    caption: 'Relax, refresh, shine',
    slides: [
      photo('pedicure', 0),
      photo('pedicure', 1),
      photo('pedicure', 2),
    ],
  },
  {
    id: 'nail-color',
    area: 't7',
    label: 'Nail Color',
    caption: 'A shade for every mood',
    slides: [
      photo('nailArt', 1),
      photo('manicure', 1),
      photo('nailArt', 3),
    ],
  },
  {
    id: 'lashes',
    area: 't8',
    label: 'Lashes',
    caption: 'Defined, effortless',
    slides: [
      photo('eyelash', 0),
      photo('eyelash', 1),
      photo('eyelash', 2),
    ],
  },
  {
    id: 'waxing',
    area: 't9',
    label: 'Waxing',
    caption: 'Smooth and confident',
    slides: [
      photo('waxing', 0),
      photo('waxing', 1),
      photo('eyelash', 3),
    ],
  },
  {
    id: 'spa',
    area: 't10',
    label: 'Spa Moments',
    caption: 'A quiet pause, just for you',
    slides: [
      photo('pedicure', 2),
      photo('facial', 1),
      photo('waxing', 1),
    ],
  },
];
