import React from 'react';

interface StartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function StartButton({ onClick, className, children, ...props }: StartButtonProps) {
  return (
    <div className={`relative inline-block mt-10 ${className || ''}`}>
      {/* Gray Base */}
      <div className="absolute bg-[#989ca7] rounded-full w-[calc(100%+70px)] h-[calc(100%+40px)] -left-[35px] -top-[10px] shadow-[0_15px_0_#787c87] -z-10"></div>
      
      {/* Red Button */}
      <button 
        className="relative bg-[#eb3b47] text-white text-6xl py-8 px-24 rounded-full transition-all duration-100 uppercase tracking-widest select-none shadow-[0_15px_0_#c4212c] active:shadow-[0_5px_0_#c4212c] active:translate-y-[10px] cursor-pointer border-none outline-none whitespace-nowrap"
        style={{
          fontFamily: "'Russo One', 'Nanum Gothic', sans-serif",
          fontWeight: 700
        }}
        onClick={onClick}
        {...props}
      >
        {children || 'START'}
      </button>
    </div>
  );
}
