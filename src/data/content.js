// Page content: services, imagery, FAQ. Business details live in config/business.js.
//
// DEMO IMAGES: every photo below is a licensed Unsplash placeholder, NOT a photo of
// Royal Nail Store. Replace each `src` with the salon's own photography before launch.

const unsplash = (id) => `https://images.unsplash.com/photo-${id}`;

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
    main: {
      src: unsplash('1522337660859-02fbefca4702'), // demo
      alt: 'Hands with fresh pink polish as a manicure is finished',
    },
    small: [
      { src: unsplash('1632345031435-8727f6897d53'), alt: 'Nail technician shaping a guest’s nails beside an LED lamp' }, // demo
      { src: unsplash('1457972729786-0411a3b2b626'), alt: 'Nail technician carefully painting a guest’s nails' }, // demo
    ],
  },
  why: {
    src: unsplash('1599206676335-193c82b13c9e'), // demo
    alt: 'Manicure in progress on a white marble table',
  },
  cta: {
    src: unsplash('1509967419530-da38b4704bc6'), // demo
    alt: 'Woman with a sleek bob gently touching her neck against a soft lilac backdrop',
  },
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
    image: unsplash('1610992015732-2449b76344bc'), // demo
    alt: 'Soft nude manicure on a white faux-fur surface',
    more: [
      { src: unsplash('1522337660859-02fbefca4702'), alt: 'Pink polish being applied to a manicured hand' },
      { src: unsplash('1457972729786-0411a3b2b626'), alt: 'Nail technician painting a guest’s nails' },
      { src: unsplash('1604902396830-aca29e19b067'), alt: 'Mauve almond-shaped manicure on a blush pink background' },
      { src: unsplash('1515377905703-c4788e51af15'), alt: 'Cuticle oil dropped onto a hand during nail care' },
    ],
    position: '50% 55%',
  },
  {
    id: 'pedicure',
    title: 'Pedicure',
    tagline: 'Relax, refresh and let every detail shine.',
    cta: 'Explore Pedicure',
    formValue: 'Pedicure',
    image: unsplash('1519415510236-718bdfcd89c8'), // demo
    alt: 'Feet resting in a pedicure bowl with orchid petals',
    more: [
      { src: unsplash('1600334129128-685c5582fd35'), alt: 'Warm spa stones and white orchids for a relaxing treatment' },
      { src: unsplash('1507652313519-d4e9174996dd'), alt: 'Calm spa bathroom with a soft pink soaking tub' },
    ],
    position: '50% 50%',
  },
  {
    id: 'nail-art',
    title: 'Nail Art',
    tagline: 'Express your style through artful, one-of-a-kind nails.',
    cta: 'Discover Nail Art',
    formValue: 'Nail Art',
    image: unsplash('1607779097040-26e80aa78e66'), // demo
    alt: 'Milky white and lilac nails with a silver glitter accent on a cream knit sweater',
    more: [
      { src: unsplash('1519014816548-bf5fe059798b'), alt: 'Red almond nails with a hand-drawn heart design' },
      { src: unsplash('1604654894610-df63bc536371'), alt: 'Tortoiseshell and glossy black nail designs' },
      { src: unsplash('1571290274554-6a2eaa771e5f'), alt: 'Colorful abstract nail art on both hands' },
    ],
    position: '50% 45%',
  },
  {
    id: 'facial',
    title: 'Facial',
    tagline: 'A gentle moment of care for your natural glow.',
    cta: 'Explore Facials',
    formValue: 'Facial Treatments',
    image: unsplash('1616394584738-fc6e612e71b9'), // demo
    alt: 'Guest relaxing with a cream facial mask and soft headband at a spa',
    more: [
      { src: unsplash('1570172619644-dfd03ed5d881'), alt: 'Guest enjoying a facial mask treatment at a spa' },
      { src: unsplash('1596755389378-c31d21fd1273'), alt: 'Fresh face mask with an avocado for a natural glow' },
      { src: unsplash('1596178060671-7a80dc8059ea'), alt: 'Guest relaxing during a facial with a flower bowl nearby' },
      { src: unsplash('1552693673-1bf958298935'), alt: 'Esthetician in gloves performing a facial treatment' },
    ],
    position: '40% 50%',
  },
  {
    id: 'waxing',
    title: 'Waxing',
    tagline: 'Feel fresh, smooth and confidently yourself.',
    cta: 'Learn About Waxing',
    formValue: 'Waxing',
    image: unsplash('1540555700478-4be289fbecef'), // demo
    alt: 'Clean spa setting with a rolled towel, body care bottle, candle and pink tulips',
    more: [
      { src: unsplash('1519415387722-a1c3bbef716c'), alt: 'Eyebrow threading for a clean, defined shape' },
      { src: unsplash('1512290923902-8a9f81dc236c'), alt: 'Gentle hair removal treatment on the face' },
    ],
    position: '50% 50%',
  },
  {
    id: 'eyelash',
    title: 'Eyelashes',
    tagline: 'Enhance your natural beauty, one lash at a time.',
    cta: 'Explore Eyelash Services',
    formValue: 'Eyelash Services',
    image: unsplash('1589710751893-f9a6770ad71b'), // demo
    alt: 'Lash artist carefully applying eyelash extensions to a guest with closed eyes',
    more: [
      { src: unsplash('1487412947147-5cebf100ffc2'), alt: 'Defined lashes and winged eyeliner on a soft glam look' },
      { src: unsplash('1631214524020-7e18db9a8f92'), alt: 'Liquid eyeliner pen on a pink backdrop' },
    ],
    position: '50% 40%',
  },
];

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
      { src: '/form.jpg', local: true, alt: 'Guest relaxing in a towel wrap with candles, orchids and beauty tools' },
      { src: unsplash('1596755389378-c31d21fd1273'), alt: 'Fresh face mask with an avocado for a natural glow' },
      { src: unsplash('1604902396830-aca29e19b067'), alt: 'Mauve almond-shaped manicure on a blush pink background' },
    ],
  },
  {
    id: 'nail-art',
    area: 't1',
    label: 'Nail Art',
    caption: 'Bold, playful designs',
    slides: [
      { src: unsplash('1571290274554-6a2eaa771e5f'), alt: 'Colorful abstract nail art on both hands' },
      { src: unsplash('1519014816548-bf5fe059798b'), alt: 'Red almond nails with a hand-drawn heart design' },
      { src: unsplash('1604654894610-df63bc536371'), alt: 'Tortoiseshell and glossy black nail designs' },
    ],
  },
  {
    id: 'manicure',
    area: 't2',
    label: 'Manicure',
    caption: 'Soft, polished neutrals',
    slides: [
      { src: unsplash('1610992015732-2449b76344bc'), alt: 'Soft nude manicure on a white faux-fur surface' },
      { src: unsplash('1515377905703-c4788e51af15'), alt: 'Cuticle oil dropped onto a hand during nail care' },
      { src: unsplash('1522337660859-02fbefca4702'), alt: 'Pink polish being applied to a manicured hand' },
    ],
  },
  {
    id: 'facial',
    area: 't4',
    label: 'Facial',
    caption: 'Glow from within',
    slides: [
      { src: unsplash('1552693673-1bf958298935'), alt: 'Esthetician in gloves performing a facial treatment' },
      { src: unsplash('1596178060671-7a80dc8059ea'), alt: 'Guest relaxing during a facial with a flower bowl nearby' },
      { src: unsplash('1570172619644-dfd03ed5d881'), alt: 'Guest enjoying a facial mask treatment at a spa' },
    ],
  },
  {
    id: 'pedicure',
    area: 't6',
    label: 'Pedicure',
    caption: 'Relax, refresh, shine',
    slides: [
      { src: unsplash('1519415510236-718bdfcd89c8'), alt: 'Feet resting in a pedicure bowl with orchid petals' },
      { src: unsplash('1600334129128-685c5582fd35'), alt: 'Warm spa stones and white orchids for a relaxing treatment' },
      { src: unsplash('1507652313519-d4e9174996dd'), alt: 'Calm spa bathroom with a soft pink soaking tub' },
    ],
  },
  {
    id: 'nail-color',
    area: 't7',
    label: 'Nail Color',
    caption: 'A shade for every mood',
    slides: [
      { src: unsplash('1599948128020-9a44505b0d1b'), alt: 'Assorted nail polish bottles on a lilac background' },
      { src: unsplash('1457972729786-0411a3b2b626'), alt: 'Nail technician carefully painting a guest’s nails' },
      { src: unsplash('1632345031435-8727f6897d53'), alt: 'Nail technician shaping a guest’s nails beside an LED lamp' },
    ],
  },
  {
    id: 'lashes',
    area: 't8',
    label: 'Lashes',
    caption: 'Defined, effortless',
    slides: [
      { src: unsplash('1589710751893-f9a6770ad71b'), alt: 'Lash artist carefully applying eyelash extensions' },
      { src: unsplash('1487412947147-5cebf100ffc2'), alt: 'Defined lashes and winged eyeliner on a soft glam look' },
      { src: unsplash('1631214524020-7e18db9a8f92'), alt: 'Liquid eyeliner pen on a pink backdrop' },
    ],
  },
  {
    id: 'waxing',
    area: 't9',
    label: 'Waxing',
    caption: 'Smooth and confident',
    slides: [
      { src: unsplash('1519415387722-a1c3bbef716c'), alt: 'Eyebrow threading for a clean, defined shape' },
      { src: unsplash('1512290923902-8a9f81dc236c'), alt: 'Gentle hair removal treatment on the face' },
      { src: unsplash('1540555700478-4be289fbecef'), alt: 'Clean spa setting with towel, candle and pink tulips' },
    ],
  },
  {
    id: 'spa',
    area: 't10',
    label: 'Spa Moments',
    caption: 'A quiet pause, just for you',
    slides: [
      { src: unsplash('1560750588-73207b1ef5b8'), alt: 'Calm spa courtyard with a small plunge pool' },
      { src: unsplash('1519824145371-296894a0daa9'), alt: 'Relaxing back massage with hot stones' },
      { src: unsplash('1544161515-4ab6ce6db874'), alt: 'Warm oil being applied during a massage' },
    ],
  },
];
