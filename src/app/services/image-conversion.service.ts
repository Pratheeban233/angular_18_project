import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageConversionService {
  private Tiff: any;

  constructor() {
    // Dynamically import tiff.js
    import('tiff.js').then((module) => {
      this.Tiff = module.default;
    });
  }

  async convertTiffToPng(tiffData: ArrayBuffer): Promise<string> {
    if (!this.Tiff) {
      throw new Error('tiff.js is not loaded yet');
    }

    // Decode the TIFF image
    const tiff = new this.Tiff({ buffer: tiffData });
    const canvas = tiff.toCanvas();

    // Convert the canvas to a PNG data URL
    const pngDataUrl = await this.canvasToPngDataUrl(canvas);
    return pngDataUrl;
  }

  private canvasToPngDataUrl(canvas: HTMLCanvasElement): Promise<string> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      }, 'image/png');
    });
  }
}