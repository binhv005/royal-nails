import { BUSINESS } from '../config/business';

// Image hero with the brand line set in the soft, empty side of the photo.
export default function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            Beauty in Every <em>Little Detail</em>
          </h1>
          <p className="hero__text">
            Gentle, refined nail &amp; beauty care in {BUSINESS.city}, {BUSINESS.state} — a quiet moment made just for you.
          </p>
        </div>
      </div>
    </section>
  );
}
