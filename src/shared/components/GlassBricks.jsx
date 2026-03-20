import React, { useMemo } from 'react';

const GlassBricks = () => {
  // Generate a bunch of bricks, enough to fill the container height
  const count = 150; 
  
  const bricks = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
        const hash = Math.sin(i * 12.9898) * 43758.5453;
        const random = Math.abs(hash - Math.floor(hash));
        
        // Progress goes from 0 (top) to 1 (bottom) roughly 
        // assuming they flow left-to-right, top-to-bottom
        const progress = i / (count - 1); 
        
        // Make the top highly scattered, bottom fully dense
        const isVisible = progress > 0.6 || random < progress * 1.5;
        list.push({ id: i, isVisible });
    }
    return list;
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white/5 backdrop-blur-[24px]" 
      style={{ 
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)', 
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)' 
      }}
    >
      <div 
        className="w-[120vw] h-full grid gap-1 md:gap-[6px] opacity-80 place-content-start" 
        style={{ 
          gridTemplateColumns: `repeat(auto-fill, minmax(80px, 1fr))`,
          gridAutoRows: '80px',
          transform: 'translateX(-10vw)'
        }}
      >
        {bricks.map((brick) => {
          if (!brick.isVisible) return <div key={brick.id} className="w-full h-full" />;

          return (
            <div 
              key={brick.id} 
              className="w-full h-full bg-white/10 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.05),inset_0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center p-1.5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl"></div>
              <div className="w-full h-full relative rounded-xl shadow-[inset_0_4px_15px_rgba(255,255,255,0.6),inset_0_-4px_10px_rgba(0,0,0,0.05)] bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlassBricks;
