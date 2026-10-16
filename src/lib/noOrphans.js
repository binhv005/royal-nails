// Keeps at least two words on the last line of every text block by gluing the
// final two words with a non-breaking space. Works in every browser (CSS
// text-wrap: pretty is only a partial, browser-dependent fix) and re-runs when
// React updates the DOM (FAQ answers, booking messages, etc.).

// Two-part titles are made of separate spans, so each span is its own text block.
const BLOCKS = 'h1, h2, h3, h4, p, li, dd, dt, label, figcaption, blockquote, summary, .btn, .title__main, .title__accent, .hero__title em';
const LAST_SPACE = /(\S) +(\S+\s*)$/;
// Leave very long word pairs breakable so narrow buttons never overflow.
const MAX_GLUED = 26;

function lastTextNode(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last = null;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeValue.trim()) last = n;
  }
  return last;
}

function fix(el) {
  glue(lastTextNode(el));
  // Hero title: "Beauty in Every" sits in a text node ahead of the <em>.
  if (el.classList?.contains('hero__title')) {
    el.childNodes.forEach((n) => n.nodeType === Node.TEXT_NODE && glue(n));
  }
}

function glue(node) {
  if (!node) return;
  const match = node.nodeValue.match(LAST_SPACE);
  if (!match) return;
  const tail = node.nodeValue.slice(match.index).trim();
  if (tail.length > MAX_GLUED) return;
  node.nodeValue = node.nodeValue.replace(LAST_SPACE, '$1 $2');
}

export function preventOrphans(root = document.body) {
  const run = () => root.querySelectorAll(BLOCKS).forEach(fix);
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      run();
    });
  };

  schedule();
  // Replacements are idempotent (no plain space left to match), so this can't loop.
  new MutationObserver(schedule).observe(root, { childList: true, subtree: true, characterData: true });
}
