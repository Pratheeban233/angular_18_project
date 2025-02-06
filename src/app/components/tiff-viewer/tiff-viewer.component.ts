import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Tiff from 'tiff.js';

@Component({
  selector: 'app-tiff-viewer',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './tiff-viewer.component.html',
  styleUrls: ['./tiff-viewer.component.css']
})
export class TiffViewerComponent {
  base64Input: string = '';
  imageSrc: string | null = null;

  convertTiffToPng() {
    if (!this.base64Input) alert('Please enter a Base64 string!');

    // Decode Base64 to Binary
    const binary = atob(this.base64Input);
    const len = binary.length;
    const buffer = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
    }

    try {
      // Load TIFF Image
      const tiff = new Tiff({ buffer });
      const canvas = tiff.toCanvas(); // Convert TIFF to Canvas

      // Convert Canvas to PNG Base64
      this.imageSrc = canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error converting TIFF:', error);
    }
  }
}
