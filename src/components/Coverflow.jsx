import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 3D "cover flow" carousel: the focused card is flat and large, its neighbours tilt away
// in perspective. Click a side card, use the arrows / arrow keys, or swipe/drag to move.
// Cards wrap around. `renderItem(item, index, isActive)` draws a card's content; side
// cards are inert (not focusable) and covered by a button that brings them to the centre.
export default function Coverflow({ items, renderItem, label, ariaLabel, className = '', focusId }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const half = Math.floor(n / 2);
  const gesture = useRef({ x: null, applied: 0, moved: false });

  // Jump to a given card (e.g. from the Services dropdown).
  useEffect(() => {
    const i = items.findIndex((it) => it.id === focusId);
    if (i >= 0) setActive(i);
  }, [focusId, items]);

  const go = useCallback((d) => setActive((a) => (a + d + n) % n), [n]);

  // Drag by hand: the carousel follows the pointer, one card per ~half a card width dragged.
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    gesture.current = { x: e.clientX, applied: 0, moved: false };
  };
  const onPointerMove = (e) => {
    const g = gesture.current;
    if (g.x === null) return;
    const dx = e.clientX - g.x;
    if (!g.moved) {
      if (Math.abs(dx) < 8) return;
      g.moved = true;
      // Keep receiving moves even if the pointer leaves the stage (taps still reach the cards).
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    const card = e.currentTarget.querySelector('.cf__item');
    const stepPx = (card ? card.offsetWidth : 260) * 0.5;
    while (Math.abs(dx - g.applied) >= stepPx) {
      const dir = dx - g.applied < 0 ? 1 : -1;
      go(dir);
      g.applied += dir === 1 ? -stepPx : stepPx;
    }
  };
  const endDrag = (e) => {
    const g = gesture.current;
    g.x = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  // Horizontal trackpad / mouse-wheel swipe: one card per flick (vertical scrolling is left alone).
  const stageRef = useRef(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    let acc = 0;
    let lock = 0;
    let reset;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      clearTimeout(reset);
      reset = setTimeout(() => {
        acc = 0;
      }, 120);
      if (Date.now() < lock) return;
      acc += e.deltaX;
      if (Math.abs(acc) >= 50) {
        go(acc > 0 ? 1 : -1);
        acc = 0;
        lock = Date.now() + 380;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(reset);
    };
  }, [go]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <div className={`cf ${className}`}>
      <div
        ref={stageRef}
        className="cf__stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => {
          let o = (((i - active) % n) + n) % n;
          if (o > half) o -= n;
          const abs = Math.abs(o);
          const isActive = o === 0;
          // Cards pack tightly against their neighbour; the tilt grows slowly so far cards stay wide.
          const sign = Math.sign(o);
          const x = sign * (abs === 0 ? 0 : 0.96 + (abs - 1) * 0.7);
          const rot = sign * (abs === 0 ? 0 : 30 + (abs - 1) * 8);
          return (
            <div
              key={item.id}
              className={`cf__item${isActive ? ' is-active' : ''}${abs > 2 ? ' is-far' : ''}`}
              style={{ '--x': x, '--rot': `${rot}deg`, '--abs': Math.min(abs, 3) }}
            >
              <div className="cf__card" inert={isActive ? undefined : ''}>
                {renderItem(item, i, isActive)}
              </div>
              {!isActive && (
                <button
                  type="button"
                  className="cf__hit"
                  aria-label={`Show ${label(item)}`}
                  onClick={() => {
                    if (gesture.current.moved) {
                      gesture.current.moved = false;
                      return;
                    }
                    setActive(i);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="services__controls">
        <button type="button" className="services__nav" onClick={() => go(-1)} aria-label="Previous">
          <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button type="button" className="services__nav" onClick={() => go(1)} aria-label="Next">
          <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
