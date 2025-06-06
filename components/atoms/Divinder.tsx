'use client';

import React from 'react';

interface DividerProps {
  orientation: 'v' | 'h'; // vertikální nebo horizontální
  className?: string; // další CSS třídy
  length?: string; // délka (výchozí hodnota je 100%)
  thickness?: number; // tlouštka (výchozí hodnota je 2px)
  color?: string; // barva (výchozí hodnota je rgba(0, 255, 255, 1))
  haloIntensity?: number; // intenzita halo efektu (výchozí hodnota je 1)
}

const Divider: React.FC<DividerProps> = ({
  orientation,
  className = '',
  length = '100%',
  thickness = 2,
  color = 'rgba(0, 255, 255, 1)',
  haloIntensity = 1
}) => {
  const getGradient = () => {
    const baseColor = color.replace(/[^,]+\)/, '0)');
    
    if (orientation === 'h') {
      return `linear-gradient(to right, 
        ${baseColor}, 
        ${color} 50%, 
        ${baseColor}
      )`;
    } else {
      return `linear-gradient(to bottom, 
        ${baseColor}, 
        ${color} 50%, 
        ${baseColor}
      )`;
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: orientation === 'h' ? '100%' : 'auto',
    height: orientation === 'v' ? '100%' : 'auto',
    flexGrow: 1 
  };

  // Styly pro divider
  const dividerStyle: React.CSSProperties = {
    position: 'relative',
    width: orientation === 'h' ? length : `${thickness}px`,
    height: orientation === 'v' ? length : `${thickness}px`,
    backgroundColor: color,
    borderRadius: `${thickness}px`,
    flexGrow: orientation === 'h' && length === '100%' ? 1 : 0
  };

  // Styly pro halo efekt
  const haloStyle: React.CSSProperties = {
    position: 'absolute',
    top: orientation === 'h' ? '50%' : '0',
    left: orientation === 'v' ? '50%' : '0',
    transform: orientation === 'h' 
      ? 'translateY(-50%)' 
      : 'translateX(-50%)',
    width: orientation === 'h' ? '100%' : `${thickness * 8 * haloIntensity}px`,
    height: orientation === 'v' ? '100%' : `${thickness * 8 * haloIntensity}px`,
    background: getGradient(),
    filter: 'blur(8px)',
    opacity: 0.7,
    zIndex: -1,
  };

  return (
    <div className={`${className}`} style={containerStyle}>
      <div style={dividerStyle}>
        <div style={haloStyle}></div>
      </div>
    </div>
  );
};

export default Divider;