import React from 'react';

// Prado Screens
import prado1 from '../../../assets/prado-screen-1.png';
import prado2 from '../../../assets/prado-screen-2.png';
import prado3 from '../../../assets/prado-screen-3.png';
import prado4 from '../../../assets/prado-screen-4.png';

// Holoride Screens
import holo1 from '../../../assets/holoride-screen-1.png';
import holo2 from '../../../assets/holoride-screen-2.png';
import holo3 from '../../../assets/holoride-screen-3.png';
import holo4 from '../../../assets/holoride-screen-4.png';
import holo5 from '../../../assets/holoride-screen-5.png';

export default function AnimatedPhonesGrid({ slug = 'prado' }) {
  const screensData = {
    prado: [
      { src: prado1, baseDelay: 0, duration: 22 },
      { src: prado3, baseDelay: 8, duration: 26 },
      { src: prado2, baseDelay: 4, duration: 20 },
      { src: prado4, baseDelay: 14, duration: 24 },
    ],
    holoride: [
      { src: holo1, baseDelay: 0, duration: 21 },
      { src: holo3, baseDelay: 5, duration: 25 },
      { src: holo2, baseDelay: 10, duration: 23 },
      { src: holo5, baseDelay: 15, duration: 27 },
      { src: holo4, baseDelay: 20, duration: 24 },
    ]
  };

  const baseScreens = screensData[slug] || screensData.prado;

  // Patrón masivo de 48 pantallas miniatura (aprox 8 columnas x 6 filas)
  const screens = Array.from({ length: 48 }).map((_, i) => {
    const base = baseScreens[i % baseScreens.length];
    return {
      src: base.src,
      delay: `-${(base.baseDelay + i * 1.5)}s`,
      duration: `${base.duration + (i % 3) * 2}s`
    };
  });

  return (
    <div className="w-full h-[55vh] min-h-[400px] max-h-[600px] relative overflow-hidden flex justify-center items-center bg-gray-900/5 rounded-[2.5rem] my-4 shadow-inner pointer-events-none">
      <style>{`
        @keyframes autoScrollMicro {
          0% { transform: translateY(0); }
          45% { transform: translateY(calc(-100% + 150px)); }
          55% { transform: translateY(calc(-100% + 150px)); }
          100% { transform: translateY(0); }
        }
        
        @media (min-width: 768px) {
          @keyframes autoScrollMicro {
            0% { transform: translateY(0); }
            45% { transform: translateY(calc(-100% + 210px)); }
            55% { transform: translateY(calc(-100% + 210px)); }
            100% { transform: translateY(0); }
          }
        }
      `}</style>
      
      {/* Malla diagonal super densa */}
      <div className="grid grid-cols-6 md:grid-cols-8 gap-3 md:gap-5 transform -rotate-[15deg] scale-[1.4] md:scale-[1.1] opacity-70 hover:opacity-100 transition-opacity duration-1000 w-max">
        {screens.map((screen, idx) => {
          // Desplazar columnas salteadas para un encaje mampostería clásico
          const isShifted = (idx % 8) % 2 !== 0;
          
          return (
            <div 
              key={idx} 
              className={`
                relative w-[70px] h-[150px] md:w-[100px] md:h-[210px] 
                bg-gray-950 rounded-[0.8rem] md:rounded-[1.2rem] p-1 
                shadow-[0_10px_20px_rgba(0,0,0,0.3)] 
                border border-gray-800/80 
                flex-shrink-0
                ${isShifted ? 'translate-y-10 md:translate-y-16' : ''}
              `}
            >
              {/* Brillo del cristal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-[0.8rem] md:rounded-[1.2rem] pointer-events-none z-30" />
              
              {/* Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[35px] md:w-[45px] h-2 md:h-2.5 bg-gray-950 rounded-b-[0.4rem] z-20 flex justify-center items-center gap-1">
                 <div className="w-0.5 h-0.5 rounded-full bg-gray-600/50" />
                 <div className="w-2.5 h-[1px] rounded-full bg-gray-600/30" />
              </div>

              {/* Pantalla scrolleable */}
              <div className="relative w-full h-full bg-white rounded-[0.6rem] md:rounded-[1rem] overflow-hidden">
                <img 
                   src={screen.src} 
                   alt="App Mockup UI"
                   style={{ animation: `autoScrollMicro ${screen.duration} infinite ease-in-out ${screen.delay}` }}
                   className="w-full h-auto origin-top will-change-transform"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
