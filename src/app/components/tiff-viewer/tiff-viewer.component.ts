import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Tiff from 'tiff.js';

@Component({
  selector: 'app-tiff-viewer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tiff-viewer.component.html',
  styleUrls: ['./tiff-viewer.component.css'],
})
export class TiffViewerComponent {

  tiffEncodedString: string = ''; // To store TIFF string
  @ViewChild('canvasElement') canvasElement!: ElementRef; // Reference to the canvas element

  constructor() { }

  convertTiffToImage(): void {
    // Step 1: Decode the base64 string into binary data
    const tiffData = this.decodeBase64(this.tiffEncodedString);
    
    // Step 2: Create an image from the decoded TIFF data
    const img = new Image();
    img.onload = () => {
      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Set the canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
      }
    };
    
    // Create an object URL from the binary data
    const blob = new Blob([tiffData], { type: 'image/tiff' });
    img.src = URL.createObjectURL(blob);
  }

  // Helper function to decode base64 encoded string
  decodeBase64(encodedString: string): ArrayBuffer {
    const decodedString = atob(encodedString); // Decoding the base64 string
    const byteArray = new Uint8Array(decodedString.length);

    for (let i = 0; i < decodedString.length; i++) {
      byteArray[i] = decodedString.charCodeAt(i);
    }

    return byteArray.buffer;
  }




  // tiffEncodedString: string = ''; // To store TIFF string
  // convertedImageUrl: string | null = null; // To store converted PNG image URL

  // constructor() {}

  // convertTiffToPng(): void {
  //   if (!this.tiffEncodedString) alert('Please provide a valid TIFF string!');

  //   const tiffData = this.decodeBase64(this.tiffEncodedString);

  //   // Use the library to convert the TIFF data into PNG format.
  //   // Here we assume we are converting with canvas or using pdf.js
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');

  //   // Assuming `tiffData` is a valid TIFF file.
  //   const img = new Image();
  //   img.onload = () => {
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx?.drawImage(img, 0, 0);
  //     this.convertedImageUrl = canvas.toDataURL('image/png');
  //   };
  //   img.src = URL.createObjectURL(new Blob([tiffData], { type: 'image/tiff' }));
  // }

  // // Helper function to decode base64 encoded string
  // decodeBase64(encodedString: string): ArrayBuffer {

  //   const decodedString = atob(encodedString); // Decoding the base64 string
  //   const byteArray = new Uint8Array(decodedString.length);

  //   for (let i = 0; i < decodedString.length; i++) {
  //     byteArray[i] = decodedString.charCodeAt(i);
  //   }

  //   return byteArray.buffer;
  // }

  clear() {
    this.tiffEncodedString = '';
  }
}
