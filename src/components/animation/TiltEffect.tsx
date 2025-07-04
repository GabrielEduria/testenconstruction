'use client'
import { useState, MouseEvent, useCallback, ReactNode } from "react";

function throttle(
  func: (e: MouseEvent<HTMLDivElement>) => void,
  delay: number
): (e: MouseEvent<HTMLDivElement>) => void {
  let lastCall = 0;
  return (e: MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    func(e);
  };
}

interface TiltEffectProps {
  children: ReactNode;
  className?: string;
}

export default function TiltEffect({children, className = "" }: TiltEffectProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;
      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className={`${className} transition-transform will-change-transform`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
      }}
    >
      {children}
    </div>
  );
}
