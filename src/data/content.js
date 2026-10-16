// Page content: services, imagery, FAQ. Business details live in config/business.js.
//
// Images live in public/<Folder>/ and are referenced by absolute path.
const IMG = {
  manicure: ['23449da1aef18148df58a26fe6584ac7', '69d41d299a8f33b1a5e9dd390af411b8', '8b16ce6e0c96ffe6d6a5b61f3124313e'],
  pedicure: ['181681ca6e56b4ea8d8c5b454e0a7850', '1a278abef4457eb7c6eb3b303fe4731b', 'a717618386a40ad7810fd57da7c1d0a6'],
  nailArt: ['4b1e56a94b0dcbc3512b76e35fc38d81', '69300abff7d71f6c6a58dc5b68db77e8', '6adbe6a1b27c949f416e8c15372320ca', '86008f2fb5edb527416d3b94a13b4894'],
  facial: ['0bdc1b13923be2b4686488a874f7b353', '2d3babd45c85707021ba484d6b560716', 'd6871c116de40f19f0b92c3871d1975c', 'fdc4051627ff930ccd716a523706449c'],
  waxing: ['5bdc293699845e72c1cc12e52b92022f', 'cb4a2feeaba355828b2d5b12e232405b'],
  eyelash: ['026e0310c725eba38195681ce6227bc9', '8e1877642a1e163ca6a8965beef4d157', '91d2dbd741842339c7713f0f0cef31d8', 'a6c3737c3b44348b8ce7bd2b17b274e2'],
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
const pic = (cat, i) => `/${FOLDER[cat]}/${IMG[cat][i]}.jpg`;
const photo = (cat, i) => ({ src: pic(cat, i), alt: ALT[cat] });

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
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
