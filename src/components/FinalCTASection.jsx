import Img from './Img';
import { BookButton, CallButton, LotusMark, TitleParts } from './ui';
import { IMAGES } from '../data/content';

// Full-width torn-paper wine band; copy on the left, a portrait rising above
// the band on the right, and lotus accents breaking out of both ends.
export default function FinalCTASection() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__band reveal reveal--blur">
        <LotusMark className="final-cta__flower final-cta__flower--left" />

        <div className="container final-cta__inner">
          <div className="final-cta__content">
            <h2 id="final-cta-title">
              <TitleParts parts={['A little time for you.', 'a little more beauty.']} />
            </h2>
            <p>Explore our services and take the next step toward your next beauty visit.</p>
            <div className="final-cta__actions">
              <BookButton variant="light" className="btn--pill" location="final_cta">Request an Appointment</BookButton>
              <CallButton variant="outline-light" className="btn--pill" location="final_cta">Call Royal Nail Store</CallButton>
            </div>
          </div>

          <figure className="final-cta__photo">
            <Img src={IMAGES.cta.src} alt={IMAGES.cta.alt} ratio={1.25} widths={[360, 560, 760]} sizes="(min-width: 1024px) 26vw, 60vw" />
          </figure>
        </div>

        <LotusMark className="final-cta__flower final-cta__flower--right" />
      </div>
    </section>
  );
}
