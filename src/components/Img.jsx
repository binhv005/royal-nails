// Responsive Unsplash image: WebP/AVIF via auto=format, srcset, explicit
// width/height to prevent layout shift. `ratio` = height / width of the crop.
const isLocal = (src) => src.startsWith('/');
const url = (src, w, ratio) =>
  isLocal(src) ? src : `${src}?auto=format&fit=crop&q=72&w=${w}${ratio ? `&h=${Math.round(w * ratio)}` : ''}`;

export const imageUrl = url;

export default function Img({ src, alt, ratio, widths = [480, 800, 1200], sizes, eager = false, className }) {
  const largest = widths[widths.length - 1];
  return (
    <img
      className={className}
      src={url(src, largest, ratio)}
      srcSet={isLocal(src) ? undefined : widths.map((w) => `${url(src, w, ratio)} ${w}w`).join(', ')}
      sizes={isLocal(src) ? undefined : sizes}
      width={isLocal(src) ? undefined : largest}
      height={ratio && !isLocal(src) ? Math.round(largest * ratio) : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  );
}
