import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Feather, Footprints, Hand, Paintbrush, Smile } from 'lucide-react';
import Img from './Img';
import { SectionHeading } from './ui';
import { SERVICES } from '../data/content';
import { selectService } from '../lib/serviceSelection';

const SLIDE_MS = 2000;

const ICONS = {
  manicure: Hand,
  pedicure: Footprints,
  'nail-art': Paintbrush,
  facial: Smile,
  waxing: Feather,
  eyelash: Eye,
};

// Cross-fading photo stack: swaps every 2s while the card is on screen.
function ServiceMedia({ service, index }) {
  const slides = [{ src: service.image, alt: service.alt }, ...(service.more || [])];
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || slides.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Small per-card offset so the grid doesn't flip in lockstep.
    let timer;
    const start = setTimeout(() => {
      setActive((a) => (a + 1) % slides.length);
      timer = setInterval(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS);
    }, SLIDE_MS + (index % 3) * 250);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [inView, slides.length, index]);

  return (
    <figure ref={ref} className="svc-card__media">
      {slides.map((sl, i) => (
        <Img
          key={sl.src}
          className={i === active ? 'is-active' : undefined}
          src={sl.src}
          alt={i === active ? sl.alt : ''}
          ratio={0.8}
          widths={[400, 640, 900]}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        />
      ))}
    </figure>
  );
}

export default function ServicesSection() {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.svc-card');
    const step = card ? card.getBoundingClientRect().width + 20 : 300;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  // Mouse drag-to-scroll (touch and trackpads already scroll natively).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = trackRef.current;
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) {
      d.moved = true;
      trackRef.current.classList.add('is-dragging');
    }
    if (d.moved) trackRef.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove('is-dragging');
  };
  // A drag must not trigger the card's link.
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="reveal">
          <SectionHeading
            id="services-title"
            title={['Beauty services', 'thoughtfully brought together']}
            align="center"
            className="heading--oneline"
            light
          />
        </div>

        <div className="services__slider">
          <ol
            ref={trackRef}
            className="services__grid"
            tabIndex={0}
            aria-label="Our services, scroll horizontally"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
          >
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.id] || Hand;
              return (
                <li key={s.id} id={`service-${s.id}`} className="svc-card reveal reveal--zoom">
                  <ServiceMedia service={s} index={i} />
                  <div className="svc-card__body">
                    <span className="svc-card__icon" aria-hidden="true">
                      <Icon size={26} strokeWidth={1.3} />
                    </span>
                    <h3>{s.title}</h3>
                    <p className="svc-card__tagline">{s.tagline}</p>
                    <a href="#booking" className="text-link" draggable="false" onClick={() => selectService(s.formValue)}>
                      {s.cta} <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>

        </div>

        <div className="services__controls">
          <button type="button" className="services__nav services__nav--prev" onClick={() => scrollByCard(-1)} aria-label="Previous services">
            <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button type="button" className="services__nav services__nav--next" onClick={() => scrollByCard(1)} aria-label="Next services">
            <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
