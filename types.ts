
export enum ElementType {
  RECT = 'rect',
  CIRCLE = 'circle',
  TEXT = 'text',
}

export enum AnimationType {
  PULSE = 'pulse',
  WAVE = 'wave',
  NONE = 'none',
}

export enum ExportFormat {
    HTML = 'HTML',
    REACT = 'React',
    VUE = 'Vue',
    SVELTE = 'Svelte',
    ANGULAR = 'Angular',
}

export interface SkeletonElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  color: string;
  animation: AnimationType;
}
