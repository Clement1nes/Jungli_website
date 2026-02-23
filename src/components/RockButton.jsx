import { useState } from 'react';
import '../styles/RockButton.css';

export const RockButton = ({
  children,
  variant = 'cream',
  size = 'md',
  onClick,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`rock-button ${variant} ${size} ${isPressed ? 'pressed' : ''} ${className}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {/* THE BASE (The stone that stays fixed) */}
      <div className="rock-button-base rough-edge" />

      {/* THE INTERACTIVE FACE */}
      <div className="rock-button-face rough-edge">
        {/* Stone Surface Grain Texture (Below Text) */}
        <div className="rock-button-texture stone-texture" />

        {/* Random "Crack" Highlights */}
        <div className="rock-button-crack-1" />
        <div className="rock-button-crack-2" />

        {/* Top Edge Highlight for depth */}
        <div className="rock-button-highlight" />

        {/* Hover Shine Effect */}
        <div className="rock-button-shine" />
      </div>

      {/* Label - Outside filtered face for crisp text */}
      <span className="rock-button-text">
        {children}
      </span>

      {/* Ambient Floor Shadow */}
      <div className="rock-button-shadow" />
    </div>
  );
};
