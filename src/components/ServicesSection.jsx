import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Eye, Feather, Footprints, Hand, Paintbrush, Smile } from 'lucide-react';
import Img from './Img';
import Coverflow from './Coverflow';
import { SectionHeading } from './ui';
import { SERVICES } from '../data/content';

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
          ratio={1.45}
          widths={[400, 640, 900]}
          sizes="(min-width: 1024px) 320px, 62vw"
        />
      ))}
    </figure>
  );
}

export default function ServicesSection() {
  const [params] = useSearchParams();
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

        <div className="reveal reveal--rise">
          <Coverflow
            items={SERVICES}
            focusId={params.get('service')}
            ariaLabel="Our services"
            label={(s) => s.title}
            renderItem={(s, i) => {
              const Icon = ICONS[s.id] || Hand;
              return (
                <div id={`service-${s.id}`} className="svc-card">
                  <ServiceMedia service={s} index={i} />
                  <Link to={`/services/${s.id}`} className="svc-card__cover" tabIndex={-1} aria-hidden="true" draggable="false" />
                  <div className="svc-card__body">
                    <span className="svc-card__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.3} />
                    </span>
                    <h3>{s.title}</h3>
                    <p className="svc-card__tagline">{s.tagline}</p>
                    <Link to={`/services/${s.id}`} className="text-link" draggable="false">
                      {s.cta} <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
