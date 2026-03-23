import React from 'react';
import { PAINT_COLORS } from '../constants/colors';

export function ColorPalette() {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-8 bg-gray-100 rounded-3xl shadow-inner max-w-2xl mx-auto">
      {PAINT_COLORS.map((color, index) => (
        <div
          key={index}
          className="w-16 h-16 rounded-full shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform border-4 border-white"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
