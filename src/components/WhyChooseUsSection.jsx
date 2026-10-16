import { MapPin, Palette, Sparkles } from 'lucide-react';
import { SectionHeading } from './ui';
import { FEATURES } from '../data/content';

const ICONS = { MapPin, Palette, Sparkles };

export default function WhyChooseUsSection() {
  return (
    <section className="section why" id="why" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__content reveal reveal--left">
          <SectionHeading
            id="why-title"
            title={['Your beauty routine', 'all in one place']}
            description="Nail and beauty care in Ventura."
            light
          />
          <ul className="why__list">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <li key={f.title} className="why__item">
                  <span className="why__icon"><Icon size={22} strokeWidth={1.3} aria-hidden="true" /></span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <figure className="why__media reveal reveal--zoom">
          <img
            src="/contact.jpg"
            alt="Woman in a cream suit surrounded by floating beauty products and pink petals"
            width="735"
            height="1105"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
