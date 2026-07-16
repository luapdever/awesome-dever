// Petits sons d'interface pour PaulBrain OS — entièrement synthétisés via la
// Web Audio API (aucun asset, rien à télécharger, pas de souci CSP).
//
// Politique autoplay : un navigateur bloque tout audio tant que l'utilisateur
// n'a pas interagi. On crée donc l'AudioContext paresseusement et on le
// (ré)active au tout premier geste (voir unlockOsAudio, appelé sur pointerdown).
// Tous nos sons étant déclenchés par des clics, ils passent naturellement.

let ctx = null;
let cfg = { volume: 70, muted: false };

// Le composant OS pousse ici l'état du contrôle de volume/mute de la barre.
export function setOsAudioConfig(next) {
  cfg = { ...cfg, ...next };
}

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch { return null; }
  }
  return ctx;
}

// À appeler sur le premier geste utilisateur (idempotent).
export function unlockOsAudio() {
  const c = ensureCtx();
  if (c && c.state === "suspended") c.resume().catch(() => {});
}

// Niveau global 0..1 issu du contrôle de volume de l'OS.
function level() {
  return cfg.muted ? 0 : Math.max(0, Math.min(1, cfg.volume / 100));
}

// Une note courte avec enveloppe douce (attaque rapide, extinction exponentielle).
function voice(c, { freq, dur = 0.08, type = "sine", when = 0, peak = 0.16, glideTo }) {
  const t0 = c.currentTime + when;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + dur);
  const g = Math.max(0.0001, peak * level());
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(g, t0 + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

// Recettes — volontairement très courtes et discrètes.
const RECIPES = {
  click: (c) => voice(c, { freq: 420, glideTo: 300, dur: 0.045, type: "triangle", peak: 0.09 }),
  open: (c) => {
    voice(c, { freq: 523, dur: 0.07, type: "sine", peak: 0.11 });
    voice(c, { freq: 784, dur: 0.09, when: 0.05, type: "sine", peak: 0.11 });
  },
  // Fermeture : petit arpège descendant consonant (G5→D5→G4) — court et joyeux.
  close: (c) => {
    voice(c, { freq: 784, dur: 0.07, type: "sine", peak: 0.10 });
    voice(c, { freq: 587, dur: 0.07, when: 0.045, type: "sine", peak: 0.10 });
    voice(c, { freq: 392, dur: 0.12, when: 0.09, type: "triangle", peak: 0.10 });
  },
  minimize: (c) => voice(c, { freq: 560, glideTo: 300, dur: 0.09, type: "sine", peak: 0.09 }),
  maximize: (c) => voice(c, { freq: 400, glideTo: 620, dur: 0.09, type: "sine", peak: 0.09 }),
  toggle: (c) => voice(c, { freq: 660, dur: 0.035, type: "square", peak: 0.045 }),
  pop: (c) => voice(c, { freq: 880, dur: 0.05, type: "sine", peak: 0.11 }),
  error: (c) => voice(c, { freq: 190, dur: 0.15, type: "sawtooth", peak: 0.09 }),
};

// Son de démarrage de l'OS : fichier mp3 dédié (plutôt qu'une synthèse).
// Respecte le volume/mute de la barre. Silencieux si l'autoplay est bloqué
// (aucun geste préalable, ex. hard reload) — comportement voulu.
const STARTUP_SRC = "/songs/startup-sound-variation.mp3";
let startupAudio = null;
export function playStartupSound() {
  try {
    if (cfg.muted) return;
    if (typeof Audio === "undefined") return;
    if (!startupAudio) {
      startupAudio = new Audio(STARTUP_SRC);
      startupAudio.preload = "auto";
    }
    startupAudio.volume = Math.max(0, Math.min(1, cfg.volume / 100));
    startupAudio.currentTime = 0;
    const p = startupAudio.play();
    if (p && p.catch) p.catch(() => {}); // autoplay bloqué → on ignore
  } catch {
    /* audio indisponible */
  }
}

// Son de démarrage joué À L'ENVERS (effet "mise en veille / extinction").
// On décode le mp3 via la Web Audio API et on inverse les échantillons de
// chaque canal, puis on lit le buffer. Le buffer inversé est mis en cache.
// Renvoie une promesse résolue à la fin de la lecture (ou tout de suite si
// l'audio est indisponible/coupé) — pratique pour enchaîner une action après.
let reversedBuffer = null;
async function getReversedBuffer(c) {
  if (reversedBuffer) return reversedBuffer;
  const res = await fetch(STARTUP_SRC);
  const decoded = await c.decodeAudioData(await res.arrayBuffer());
  const rev = c.createBuffer(decoded.numberOfChannels, decoded.length, decoded.sampleRate);
  for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
    const src = decoded.getChannelData(ch);
    const dst = rev.getChannelData(ch);
    for (let i = 0, n = src.length; i < n; i++) dst[i] = src[n - 1 - i];
  }
  reversedBuffer = rev;
  return reversedBuffer;
}
export async function playStartupReversed() {
  try {
    if (cfg.muted) return;
    const c = ensureCtx();
    if (!c) return;
    if (c.state === "suspended") await c.resume().catch(() => {});
    const buf = await getReversedBuffer(c);
    const node = c.createBufferSource();
    const gain = c.createGain();
    gain.gain.value = Math.max(0, Math.min(1, cfg.volume / 100));
    node.buffer = buf;
    node.connect(gain);
    gain.connect(c.destination);
    node.start();
    await new Promise((r) => {
      node.onended = r;
      setTimeout(r, (buf.duration + 0.3) * 1000); // filet de sécurité
    });
  } catch {
    /* audio indisponible — on ignore */
  }
}

// Joue un petit son. Sans effet si coupé, indisponible, ou avant tout geste.
export function playOsSound(type = "click") {
  try {
    if (cfg.muted) return;
    const c = ensureCtx();
    if (!c) return;
    if (c.state === "suspended") c.resume().catch(() => {});
    (RECIPES[type] || RECIPES.click)(c);
  } catch {
    /* audio indisponible — on ignore silencieusement */
  }
}
