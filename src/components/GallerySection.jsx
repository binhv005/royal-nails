import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Img, { imageUrl } from './Img';
import { LOGO_SRC, SectionHeading } from './ui';
import useCycle from '../hooks/useCycle';
import { BUSINESS } from '../config/business';
import { GALLERY } from '../data/content';

// One mosaic tile: its photos cross-fade every 2 seconds while it is on screen.
function GalleryTile({ tile, index, offset, onOpen }) {
  const [active, ref] = useCycle(tile.slides.length, index);
  const cur = tile.slides[active];
  const featured = tile.kind === 'feature';

  return (
    <li className={`gallery__tile gallery__tile--${tile.area} reveal reveal--zoom`}>
      <button
        ref={ref}
        type="button"
        onClick={(e) => onOpen(offset + active, e)}
        aria-label={`Open image: ${cur.alt}`}
      >
        {tile.slides.map((s, i) =>
          s.local ? (
            <img
              key={s.src}
              className={i === active ? 'is-active' : undefined}
              src={s.src}
              alt=""
              width="900"
              height="1547"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Img
              key={s.src}
              className={i === active ? 'is-active' : undefined}
              src={s.src}
              alt=""
              ratio={featured ? 1.4 : 1.1}
              widths={featured ? [480, 760, 1000] : [360, 560]}
              sizes={featured ? '(min-width: 1024px) 24vw, 92vw' : '(min-width: 1024px) 20vw, 46vw'}
            />
          )
        )}
        <span className="gallery__caption">
          {featured && <span className="gallery__badge">{BUSINESS.businessName}</span>}
          <strong>{tile.label}</strong>
          <small>{tile.caption}</small>
        </span>
      </button>
    </li>
  );
}

export default function GallerySection() {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  // Flat list for the lightbox, plus where each tile's photos start in it.
  const { flat, offsets } = useMemo(() => {
    const flatList = [];
    const starts = [];
    GALLERY.forEach((t) => {
      starts.push(flatList.length);
      t.slides.forEach((s) => flatList.push({ ...s, label: t.label, id: `${t.id}-${s.src}` }));
    });
    return { flat: flatList, offsets: starts };
  }, []);

  const open = (index, e) => {
    triggerRef.current = e.currentTarget;
    setActive(index);
  };
  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((dir) => setActive((i) => (i + dir + flat.length) % flat.length), [flat.length]);

  useEffect(() => {
    if (active === null) return undefined;
    closeRef.current?.focus();
    document.body.classList.add('lightbox-open');
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const items = dialogRef.current.querySelectorAll('button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('lightbox-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, step]);

  const item = active !== null ? flat[active] : null;

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="reveal">
          <SectionHeading
            id="gallery-title"
            title={['Find your next', 'beauty inspiration']}
            description="Explore nail styles and beauty details that inspire your next visit."
            align="center"
          />
        </div>

        <ul className="gallery__mosaic">
          {GALLERY.map((t, i) => (
            <GalleryTile key={t.id} tile={t} index={i} offset={offsets[i]} onOpen={open} />
          ))}

          <li className="gallery__tile gallery__tile--label reveal reveal--zoom">
            <img src={LOGO_SRC} alt="" width="1536" height="1024" loading="lazy" />
            <span>
              <strong>{BUSINESS.businessName}</strong>
              <small>
                {BUSINESS.city}, {BUSINESS.stateCode}
              </small>
            </span>
          </li>
        </ul>
      </div>

      {item && (
        <div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.label} — image ${active + 1} of ${flat.length}`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
            <X size={22} strokeWidth={1.5} />
          </button>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous image">
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <figure className="lightbox__figure" key={item.id}>
            <img src={item.local ? item.src : imageUrl(item.src, 1400)} alt={item.alt} />
            <figcaption>{item.label}</figcaption>
          </figure>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next image">
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
