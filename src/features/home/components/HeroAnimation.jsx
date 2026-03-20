import React, { useEffect, useRef } from 'react';

export default function HeroAnimation() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const current = useRef({
    orb1: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 },
    orb2: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 },
    orb3: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 },
  });
  const time = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('pointermove', handlePointerMove);

    let animationFrameId;

    const animate = () => {
      time.current += 0.005;
      
      const float1X = Math.sin(time.current * 1.5) * 40;
      const float1Y = Math.cos(time.current * 2) * 40;
      
      const float2X = Math.sin(time.current * 2 + Math.PI) * 60;
      const float2Y = Math.cos(time.current * 1.2 + Math.PI) * 60;
      
      const float3X = Math.sin(time.current * 0.8 + Math.PI/2) * 80;
      const float3Y = Math.cos(time.current * 1.5 + Math.PI/2) * 80;

      const lerp = (start, end, factor) => start + (end - start) * factor;

      // Make the trail much tighter to the mouse (0.08, 0.04, 0.02)
      current.current.orb1.x = lerp(current.current.orb1.x, mouse.current.x + float1X, 0.08);
      current.current.orb1.y = lerp(current.current.orb1.y, mouse.current.y + float1Y, 0.08);

      current.current.orb2.x = lerp(current.current.orb2.x, mouse.current.x + float2X, 0.04);
      current.current.orb2.y = lerp(current.current.orb2.y, mouse.current.y + float2Y, 0.04);

      current.current.orb3.x = lerp(current.current.orb3.x, mouse.current.x + float3X, 0.015);
      current.current.orb3.y = lerp(current.current.orb3.y, mouse.current.y + float3Y, 0.015);

      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${current.current.orb1.x}px, ${current.current.orb1.y}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${current.current.orb2.x}px, ${current.current.orb2.y}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${current.current.orb3.x}px, ${current.current.orb3.y}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#fafafa] pointer-events-none -z-10">
      <div className="absolute inset-0 blur-[60px] md:blur-[80px] saturate-150 transform-gpu opacity-90 transition-opacity duration-1000">
        
        {/* Líder de la estela: Rosa Claro */}
        <div 
          ref={orb1Ref}
          className="absolute w-[300px] h-[300px] bg-pink-200 rounded-full mix-blend-multiply opacity-80 -ml-[150px] -mt-[150px] will-change-transform"
        />
        
        {/* Segundo orb de la estela: Azul Claro */}
        <div 
          ref={orb2Ref}
          className="absolute w-[350px] h-[350px] bg-blue-300 rounded-full mix-blend-multiply opacity-70 -ml-[175px] -mt-[175px] will-change-transform"
        />
        
        {/* Cola de la estela: Fucsia */}
        <div 
          ref={orb3Ref}
          className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-overlay opacity-50 -ml-[200px] -mt-[200px] will-change-transform"
        />
      </div>
      
      {/* Noise filter */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
      ></div>
    </div>
  );
}
