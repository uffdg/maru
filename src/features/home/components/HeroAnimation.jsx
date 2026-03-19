import { useEffect, useRef, useMemo } from 'react';

const HeroAnimation = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const linesRef = useRef([]);
  const dotsRef = useRef([]);
  const centerDotRef = useRef(null);

  const numParticles = 150;

  // Pre-calcular semillas rando para evitar regenerarlas y aprovechar la cache del memo
  const initialParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2 + (Math.random() * 0.05);
      // Aumentamos drásticamente el largo posible para que crucen toda la pantalla,
      // usando una curva (Math.pow) para que haya densidad en el centro pero hilos que lleguen muy lejos.
      const length = 40 + Math.pow(Math.random(), 1.8) * 1800;
      list.push({
        angle,
        burstLength: length,
        currentLength: length,
        currentAngle: angle,
        curveStrength: (Math.random() - 0.5) * 1.5,
        currentCurve: (Math.random() - 0.5) * 1.5,
        dotSize: 0.8 + Math.random() * 1.5,
        speedOffset: Math.random() * 100,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let animationFrameId;
    let width = containerRef.current.offsetWidth;
    let height = containerRef.current.offsetHeight;

    const resize = () => {
      width = containerRef.current.offsetWidth;
      height = containerRef.current.offsetHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    
    // pointermove maneja tanto mouse como touch en navegadores modernos
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerout', onMouseLeave);

    const particles = JSON.parse(JSON.stringify(initialParticles)); // Clonamos estado base
    let time = 0;
    
    const render = () => {
      time++;
      const isMobile = width < 768;
      const centerX = isMobile ? width / 2 : width * 0.75;
      const centerY = isMobile ? height * 0.65 : height / 2;

      const targetRadius = Math.min(width, height) * 0.25; 
      
      // Chequear si el puntero está cerca del centro 
      const dxCenter = mouseRef.current.x - centerX;
      const dyCenter = mouseRef.current.y - centerY;
      const distToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      
      // Si estamos dentro o un poco más allá del radio del círculo invertimos el estado
      const isCircle = distToCenter < targetRadius * 1.5;
      
      particles.forEach((p, i) => {
        const wobble = Math.sin(time * 0.015 + p.speedOffset) * 15;
        const angleWobble = Math.cos(time * 0.01 + p.speedOffset) * 0.02;

        let targetL = p.burstLength + wobble;
        let targetA = p.angle + angleWobble;
        let targetCurve = p.curveStrength + Math.sin(time * 0.02 + i) * 0.2;
        
        let lineAlpha = 0.15; // Más sutil para que no quede muy pesado siendo tan grande
        
        if (isCircle) {
           targetL = targetRadius;
           targetA = p.angle;
           targetCurve = 0;
           lineAlpha = 0.08;
        }

        p.currentLength += (targetL - p.currentLength) * 0.04;
        p.currentAngle += (targetA - p.currentAngle) * 0.04;
        p.currentCurve += (targetCurve - p.currentCurve) * 0.04;

        let renderEndX = centerX + Math.cos(p.currentAngle) * p.currentLength;
        let renderEndY = centerY + Math.sin(p.currentAngle) * p.currentLength;

        const cpDistance = p.currentLength * 0.6;
        const cpAngle = p.currentAngle + p.currentCurve;
        let cpX = centerX + Math.cos(cpAngle) * cpDistance;
        let cpY = centerY + Math.sin(cpAngle) * cpDistance;

        // Atracción súper suave al cursor (tentáculos buscando la luz)
        const dxCursor = mouseRef.current.x - renderEndX;
        const dyCursor = mouseRef.current.y - renderEndY;
        const distToCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);
        const attractRadius = 500; // Radio de alcance enorme para que sea fluido
        
        if (distToCursor < attractRadius && !isCircle && mouseRef.current.x !== -1000) {
          const force = Math.pow((attractRadius - distToCursor) / attractRadius, 2);
          const pull = force * 80; // Tracción máxima en px
          renderEndX += (dxCursor / distToCursor) * pull;
          renderEndY += (dyCursor / distToCursor) * pull;
          
          // Curvamos el control point para que la línea se mangueree suavemente
          cpX += (dxCursor / distToCursor) * (pull * 0.5);
          cpY += (dyCursor / distToCursor) * (pull * 0.5);
        }

        // Modificamos directamente el DOM para rendimiento extremo en SVG
        if (linesRef.current[i]) {
          linesRef.current[i].setAttribute('d', `M ${centerX} ${centerY} Q ${cpX} ${cpY} ${renderEndX} ${renderEndY}`);
          linesRef.current[i].setAttribute('stroke', `rgba(0, 0, 0, ${lineAlpha})`);
        }
        
        if (dotsRef.current[i]) {
          dotsRef.current[i].setAttribute('cx', renderEndX);
          dotsRef.current[i].setAttribute('cy', renderEndY);
          // dotsRef.current[i].setAttribute('r', p.dotSize); // se setea al inicializar
        }
      });

      if (centerDotRef.current) {
         centerDotRef.current.setAttribute('cx', centerX);
         centerDotRef.current.setAttribute('cy', centerY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerout', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [initialParticles]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="block w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle ref={centerDotRef} cx="0" cy="0" r="3" fill="rgba(0,0,0,1)" />
        {initialParticles.map((p, i) => (
          <g key={i}>
            <path
              ref={(el) => (linesRef.current[i] = el)}
              fill="none"
              strokeWidth="0.2"
              stroke="rgba(0,0,0,0.3)"
            />
            <circle
              ref={(el) => (dotsRef.current[i] = el)}
              r={p.dotSize}
              fill="rgba(0,0,0,1)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default HeroAnimation;
