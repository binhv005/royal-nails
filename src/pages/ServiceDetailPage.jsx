import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FinalCTASection from '../components/FinalCTASection';
import { BookButton, CallButton, SectionHeading } from '../components/ui';
import { SERVICES } from '../data/content';
import { selectService } from '../lib/serviceSelection';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const index = SERVICES.findIndex((s) => s.id === id);
  const service = SERVICES[index];

  useEffect(() => {
    if (service) document.title = `${service.title} | Royal Nail Store`;
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  const photos = [{ src: service.image, alt: service.alt }, ...(service.more || [])];
  const [lead, ...rest] = photos;
  const others = SERVICES.filter((s) => s.id !== service.id);

  return (
    <>
      <section className="svc-hero" aria-labelledby="svc-title">
        <div className="container svc-hero__grid">
          <div className="svc-hero__text reveal">
            <Link to="/services" className="svc-hero__back">
              <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" /> All services
            </Link>
            <h1 id="svc-title">{service.title}</h1>
            <p className="svc-hero__tagline">{service.tagline}</p>
            <p className="svc-hero__desc">{service.description}</p>
            <div className="svc-hero__actions">
              <BookButton variant="light" location={`service_${service.id}`} onClick={() => selectService(service.formValue)}>
                Request {service.title}
              </BookButton>
              <CallButton variant="outline-light" location={`service_${service.id}`}>Call the salon</CallButton>
            </div>
          </div>

          <div className="svc-hero__collage reveal reveal--zoom">
            {photos.slice(0, 4).map((p, i) => (
              <img
                key={p.src}
                className={`svc-hero__pic svc-hero__pic--${i + 1}`}
                src={p.src}
                alt={i === 0 ? p.alt : ''}
                style={i === 0 ? { objectPosition: service.position } : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="section svc-gallery" aria-labelledby="svc-gallery-title">
          <div className="container">
            <div className="reveal">
              <SectionHeading id="svc-gallery-title" title={[service.title, 'in pictures']} align="center" />
            </div>
            <ul className="svc-gallery__grid">
              {rest.map((p) => (
                <li key={p.src} className="reveal reveal--zoom">
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section svc-others" aria-labelledby="svc-others-title">
        <div className="container">
          <div className="reveal">
            <SectionHeading id="svc-others-title" title={['Explore more', 'of our services']} align="center" />
          </div>
          <ul className="svc-others__grid">
            {others.map((s) => (
              <li key={s.id} className="reveal reveal--zoom">
                <Link to={`/services/${s.id}`}>
                  <img src={s.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: s.position }} />
                  <span>
                    <strong>{s.title}</strong>
                    <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTASection />
    </>
  );
}
