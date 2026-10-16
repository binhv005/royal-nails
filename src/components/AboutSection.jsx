import { ArrowRight } from 'lucide-react';
import Img from './Img';
import { LotusMark, SectionHeading } from './ui';
import { BUSINESS } from '../config/business';
import { IMAGES } from '../data/content';

// Editorial layout: tall arched photo on the left, copy top-right, two small
// detail photos below it. No invented history, founders or years — see Prompt.md section 07.
export default function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <figure className="about__arch reveal reveal--zoom">
          <Img
            src={IMAGES.about.main.src}
            alt={IMAGES.about.main.alt}
            ratio={1.25}
            widths={[480, 760, 1000]}
            sizes="(min-width: 1024px) 45vw, 92vw"
          />
        </figure>

        <div className="about__side">
          <div className="about__copy reveal reveal--right">
            <SectionHeading id="about-title" title={['Beauty that', 'feels like you']} />
            <LotusMark className="about__lotus" />
            <p className="about__kicker">
              {BUSINESS.businessName} · {BUSINESS.city}, {BUSINESS.state}
            </p>
            <p className="about__text">
              Royal Nail Store brings together a selection of nail and beauty services for guests in Ventura, California.
              Whether you are exploring a new nail look or looking for beauty services to complement your routine, we
              invite you to discover the options available at our salon.
            </p>
            <a href="#booking" className="btn btn--secondary">
              Contact Our Team <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <div className="about__pair">
            {IMAGES.about.small.map((im, i) => (
              <figure key={im.src} className="about__small reveal reveal--rise" style={{ '--reveal-delay': `${i * 140}ms` }}>
                <Img src={im.src} alt={im.alt} ratio={1} widths={[320, 520]} sizes="(min-width: 1024px) 20vw, 44vw" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
