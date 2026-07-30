// One shared wave definition so the glowing seam line and the wavy edges of
// the images above and below it move as a single shape. Both sides are driven
// by CSS keyframes generated from this same math with the same duration and
// no delay, which keeps them locked in phase — a JS animation on one side and
// CSS on the other would visibly drift apart.

const SEEDS = [0.8, -0.55, 0.95, -0.7, 0.45, -0.9, 0.65];
const STEPS = 6; // last keyframe repeats the first so the loop is seamless

export const AMPLITUDE_PX = 9;
export const DURATION_S = 5;

// The seam line lives in a 1000x100 viewBox rendered 36px tall, so one
// viewBox y unit is 0.36px. Converting through this keeps the line glued to
// the image seam instead of drifting off it at larger amplitudes.
const SVG_HEIGHT_PX = 36;
const UNITS_PER_PX = 100 / SVG_HEIGHT_PX;

const LAST = SEEDS.length + 1;

function offsetsAt(step) {
  const phase = (step / (STEPS - 1)) * Math.PI * 2;
  return SEEDS.map((s, i) => AMPLITUDE_PX * s * Math.sin(phase + i * 0.9));
}

// Endpoints stay flat at the seam so the wave never leaves a visible notch
// against the left/right edges of the viewport.
function offsetAt(offs, i) {
  return i === 0 || i === LAST ? 0 : offs[i - 1];
}

function linePath(step) {
  const offs = offsetsAt(step);
  const pts = [];
  for (let i = 0; i <= LAST; i++) {
    const x = (i / LAST) * 1000;
    const y = 50 - offsetAt(offs, i) * UNITS_PER_PX;
    pts.push(`${x.toFixed(1)},${y.toFixed(2)}`);
  }
  return `path("M ${pts.join(' L ')}")`;
}

// Clip for the section below the seam: its top edge carries the wave, and
// it's pulled up by 2x the amplitude so that edge lands centered on the seam.
// The section above stays unclipped and just extends far enough down to sit
// behind the wave's lowest dip, so no gap ever opens between them.
function clipTopEdge(step) {
  const offs = offsetsAt(step);
  const parts = [];
  for (let i = 0; i <= LAST; i++) {
    const xPct = (i / LAST) * 100;
    const y = AMPLITUDE_PX - offsetAt(offs, i);
    parts.push(`${xPct.toFixed(2)}% ${y.toFixed(2)}px`);
  }
  parts.push('100% 100%', '0% 100%');
  return `polygon(${parts.join(', ')})`;
}

function keyframes(name, prop, valueAt) {
  const frames = [];
  for (let s = 0; s < STEPS; s++) {
    const pct = ((s / (STEPS - 1)) * 100).toFixed(2);
    frames.push(`${pct}% { ${prop}: ${valueAt(s)}; }`);
  }
  return `@keyframes ${name} { ${frames.join(' ')} }`;
}

export const SEAM_LINE_ANIM = 'seamWaveLine';
export const SEAM_CLIP_ANIM = 'seamWaveClip';

export const seamLineKeyframes = keyframes(SEAM_LINE_ANIM, 'd', linePath);
export const seamClipKeyframes = keyframes(SEAM_CLIP_ANIM, 'clip-path', clipTopEdge);

// Static starting values, so the shape is already correct on first paint and
// in browsers that won't animate these properties.
export const seamLineInitialPath = linePath(0);
export const seamClipInitialPath = clipTopEdge(0);
