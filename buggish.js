'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

function fixSize() {
  const bounds = document.body.getBoundingClientRect();
  const w = bounds.width;
  const h = bounds.height;

  // Fix for HDPI display blur
  const ratio = window.devicePixelRatio;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.scale(ratio, ratio);

  return { w, h };
}

const speed = 10 * 1e3; // seconds

function interpolate(progress, v0, vN) {
  return v0 + (vN - v0) * Math.abs(progress - 0.5) * 2;
}

function runFrame(frameStart) {
  const { w, h } = fixSize();

  const progress = (frameStart % speed) / speed;

  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#f00';
  ctx.fillRect(50, 50, interpolate(progress, 10, w - 100), interpolate(progress, 10, h - 100));

  ctx.fillStyle = '#fff';
  ctx.font = '20px sans-serif';
  ctx.fillText(new Date().toString(), 10, 30);

  requestAnimationFrame(runFrame);
}
requestAnimationFrame(runFrame);
