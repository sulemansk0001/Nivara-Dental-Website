import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ light = false, className = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Dental Tooth Symbol with Smile Curve */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform transition-transform duration-300 group-hover:scale-105">
          {/* Outer Container in Premium Sky Blue */}
          <rect
            width="44"
            height="44"
            rx="10"
            fill={light ? "#38BDF8" : "#38BDF8"}
            className="transition-colors duration-300 shadow-sm"
          />
          {/* Anatomical Tooth Form */}
          <path
            d="M22 9C15.9 9 12 13 12 19C12 23.5 13.8 28.5 15.6 34.5C16.5 37.2 19.2 37.2 20.1 32.8C20.6 30.1 21.3 26.5 22 26.5C22.7 26.5 23.4 30.1 23.9 32.8C24.8 37.2 27.5 37.2 28.4 34.5C30.2 28.5 32 23.5 32 19C32 13 28.1 9 22 9Z"
            fill="#FFFFFF"
            stroke="#E0F2FE"
            strokeWidth="1.2"
          />
          {/* Radiant Sky-Blue Smile Accent Arc */}
          <path
            d="M17.5 20.5C19.2 23.8 24.8 23.8 26.5 20.5"
            stroke="#0EA5E9"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Tiny Sky-Blue Sparkle Dot */}
          <circle cx="27" cy="13.5" r="1.5" fill="#0EA5E9" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold text-[1.28rem] tracking-tight transition-colors duration-200 ${
          light ? 'text-white group-hover:text-skyblue-light' : 'text-navy group-hover:text-skyblue'
        }`}>
          NIVARA
        </span>
        <span className={`text-[0.62rem] font-medium tracking-[0.22em] uppercase mt-0.5 ${
          light ? 'text-gray-300' : 'text-clinic-muted'
        }`}>
          DENTAL STUDIO
        </span>
      </div>
    </Link>
  );
};
