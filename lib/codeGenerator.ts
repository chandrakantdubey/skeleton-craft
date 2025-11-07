
import { SkeletonElement, ExportFormat, AnimationType, ElementType } from '../types';

function getAnimationClass(animation: AnimationType): string {
  if (animation === AnimationType.PULSE) return 'animate-pulse';
  return '';
}

function getWaveDiv(id: string): string {
    return `<div id="${id}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;">
    <div style="position: absolute; top: 0; left: -150%; width: 150%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); animation: wave 1.5s infinite;"></div>
  </div>`;
}

function getWaveKeyframes(): string {
  return `@keyframes wave {
    0% { left: -150%; }
    100% { left: 150%; }
  }`;
}

const tailwindColorMap: { [key: string]: string } = {
    'bg-slate-700': '#334155',
    'bg-gray-700': '#374151',
    'bg-zinc-700': '#3f3f46',
    'bg-neutral-700': '#404040',
    'bg-stone-700': '#44403c',
};

// --- HTML/CSS Generator ---
function generateHtmlCss(elements: SkeletonElement[]): string {
  const hasWave = elements.some(el => el.animation === AnimationType.WAVE);

  const elementsHtml = elements.map(el => {
    const style = `position: absolute; left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; background-color: ${tailwindColorMap[el.color] || '#334155'}; border-radius: ${el.type === ElementType.CIRCLE ? '50%' : `${el.borderRadius}px`};`;
    return `    <div class="${getAnimationClass(el.animation)}" style="${style}">
${el.animation === AnimationType.WAVE ? `      <div class="wave"></div>\n` : ''}    </div>`;
  }).join('\n');

  const css = `<style>
  .skeleton-container {
    position: relative;
    width: 600px; /* Adjust to your container size */
    height: 400px; /* Adjust to your container size */
    overflow: hidden;
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    50% { opacity: .5; }
  }
  ${hasWave ? `.wave {
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: wave 1.5s infinite;
  }
  ${getWaveKeyframes()}` : ''}
</style>`;

  return `${css}\n\n<div class="skeleton-container">\n${elementsHtml}\n</div>`;
}


// --- React Generator ---
function generateReact(elements: SkeletonElement[]): string {
  const hasWave = elements.some(el => el.animation === AnimationType.WAVE);

  const elementsJsx = elements.map(el => {
    const style = `{ left: '${el.x}px', top: '${el.y}px', width: '${el.width}px', height: '${el.height}px', borderRadius: '${el.type === ElementType.CIRCLE ? '50%' : `${el.borderRadius}px`}' }`;
    const animationClass = el.animation === AnimationType.WAVE ? 'relative overflow-hidden' : getAnimationClass(el.animation);
    return `      <div
        className="${el.color} ${animationClass}"
        style={${style}}
      >${el.animation === AnimationType.WAVE ? '\n        <div className="wave-overlay" />' : ''}
      </div>`;
  }).join('\n');

  const waveCss = hasWave ? `
.wave-overlay {
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0% { left: -150%; }
  100% { left: 150%; }
}` : '';

  return `import React from 'react';

// Make sure you have Tailwind CSS configured in your project.
// If using the wave animation, add the following CSS to your global stylesheet:
/*
${waveCss}
*/

const SkeletonLoader = () => {
  return (
    <div className="relative w-[600px] h-[400px] bg-slate-800 rounded-lg overflow-hidden">
${elementsJsx}
    </div>
  );
};

export default SkeletonLoader;
`;
}


// --- Vue Generator ---
function generateVue(elements: SkeletonElement[]): string {
    const hasWave = elements.some(el => el.animation === AnimationType.WAVE);
    
    const elementsTemplate = elements.map(el => {
      const style = `left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; border-radius: ${el.type === ElementType.CIRCLE ? '50%' : `${el.borderRadius}px`};`;
      const animationClass = el.animation === AnimationType.WAVE ? 'relative overflow-hidden' : getAnimationClass(el.animation);
      return `    <div
      :class="['${el.color}', '${animationClass}']"
      :style="{ ${style.split('; ').filter(s=>s).map(s => `'${s.split(': ')[0]}': '${s.split(': ')[1]}'`).join(', ')} }"
    >
      ${el.animation === AnimationType.WAVE ? '<div class="wave-overlay"></div>' : ''}
    </div>`;
    }).join('\n');

    const waveCss = hasWave ? `
.wave-overlay {
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0% { left: -150%; }
  100% { left: 150%; }
}` : '';

    return `<template>
  <div class="relative w-[600px] h-[400px] bg-slate-800 rounded-lg overflow-hidden">
${elementsTemplate}
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
/* Make sure you have Tailwind CSS utility classes available. */
${waveCss}
</style>`;
}

// --- Svelte and Angular Generators (Simplified for brevity, following similar patterns) ---
function generateSvelte(elements: SkeletonElement[]): string {
    const hasWave = elements.some(el => el.animation === AnimationType.WAVE);
    
    const elementsHtml = elements.map(el => {
      const style = `left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; border-radius: ${el.type === ElementType.CIRCLE ? '50%' : `${el.borderRadius}px`};`;
      const animationClass = el.animation === AnimationType.WAVE ? 'relative overflow-hidden' : getAnimationClass(el.animation);
      return `  <div
    class="${el.color} ${animationClass}"
    style="${style}"
  >
    ${el.animation === AnimationType.WAVE ? '<div class="wave-overlay"></div>' : ''}
  </div>`;
    }).join('\n');

    const waveCss = hasWave ? `
  .wave-overlay {
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: wave 1.5s infinite;
  }

  @keyframes wave {
    0% { left: -150%; }
    100% { left: 150%; }
  }` : '';
    
    return `<div class="relative w-[600px] h-[400px] bg-slate-800 rounded-lg overflow-hidden">
${elementsHtml}
</div>

<style>
  /* Make sure you have Tailwind CSS utility classes available globally. */
  ${waveCss}
</style>`;
}

function generateAngular(elements: SkeletonElement[]): string {
    const hasWave = elements.some(el => el.animation === AnimationType.WAVE);

    const elementsHtml = elements.map(el => {
        const style = `left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; border-radius: ${el.type === ElementType.CIRCLE ? '50%' : `${el.borderRadius}px`};`;
        const animationClass = el.animation === AnimationType.WAVE ? 'relative overflow-hidden' : getAnimationClass(el.animation);
        return `    <div
      class="${el.color} ${animationClass}"
      [ngStyle]="{ ${style.split('; ').filter(s=>s).map(s => `'${s.split(': ')[0]}': '${s.split(': ')[1]}'`).join(', ')} }"
    >
      ${el.animation === AnimationType.WAVE ? '<div class="wave-overlay"></div>' : ''}
    </div>`;
    }).join('\n');

    const waveCss = hasWave ? `
.wave-overlay {
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0% { left: -150%; }
  100% { left: 150%; }
}` : '';

    const componentTs = `import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent {}
`;

    const componentHtml = `<div class="relative w-[600px] h-[400px] bg-slate-800 rounded-lg overflow-hidden">
${elementsHtml}
</div>`;

    const componentCss = `/* Ensure Tailwind is configured in your project (e.g., in styles.css) */
${waveCss}`;
    
    return `// skeleton-loader.component.ts
${componentTs}

// skeleton-loader.component.html
${componentHtml}

// skeleton-loader.component.css
${componentCss}`;
}


export function generateCode(format: ExportFormat, elements: SkeletonElement[]): string {
  switch (format) {
    case ExportFormat.HTML:
      return generateHtmlCss(elements);
    case ExportFormat.REACT:
      return generateReact(elements);
    case ExportFormat.VUE:
        return generateVue(elements);
    case ExportFormat.SVELTE:
        return generateSvelte(elements);
    case ExportFormat.ANGULAR:
        return generateAngular(elements);
    default:
      return 'Unsupported format';
  }
}
