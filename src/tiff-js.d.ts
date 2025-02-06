declare module 'tiff.js' {
    export default class Tiff {
      constructor(options: { buffer: Uint8Array });
  
      toCanvas(): HTMLCanvasElement;
      toDataURL(): string;
    }
  }
  