const SELECTOR = "main h1, main h2, main h3, main p, main figcaption, main summary, main a, main button, main [data-language-text]";

export function textBlocks() {
  return [...document.querySelectorAll(SELECTOR)].filter((node) =>
    !node.querySelector("h1, h2, h3, p, figcaption, summary, a, button, [data-language-text]")
  );
}

export function captureText() {
  return textBlocks().map((node) => ({
    id: node.id,
    text: node.textContent,
    top: node.getBoundingClientRect().top,
    height: node.getBoundingClientRect().height,
  }));
}

export async function recomposeText(before, direction, reduced) {
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const nodes = textBlocks();
  let hash = "";
  try { hash = decodeURIComponent(window.location.hash.slice(1)); } catch {}
  const explicit = before.findIndex((item) => hash && item.id === hash && item.top < innerHeight && item.top + item.height > 0);
  const anchor = window.scrollY > 0 ? explicit >= 0 ? explicit : before.findIndex((item) => item.top >= 80 && item.top < innerHeight && item.height > 0) : -1;
  const alignReadingPosition = () => {
    if (anchor < 0 || !nodes[anchor]) return;
    const delta = nodes[anchor].getBoundingClientRect().top - before[anchor].top;
    window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: "instant" });
  };
  alignReadingPosition();
  const alignedScroll = window.scrollY;
  if (reduced) return;
  const animations = nodes.flatMap((node, i) => {
    const old = before[i];
    const box = node.getBoundingClientRect();
    if (!old || old.text === node.textContent || box.bottom <= 72 || box.top >= innerHeight || !box.height) return [];
    return [node.animate([
      { opacity: 0.2, transform: `translate(${direction * 8}px, ${Math.max(-18, Math.min(18, old.top - box.top))}px)` },
      { opacity: 1, transform: "translate(0, 0)" },
    ], { duration: 280, easing: "cubic-bezier(.22,1,.36,1)" })];
  });
  await Promise.allSettled(animations.map((animation) => animation.finished));
  if (Math.abs(window.scrollY - alignedScroll) < 2) alignReadingPosition();
}
