import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);


const LoadingScreen = () => {
  const mainContainerRef = useRef(null);
  const carRef = useRef(null);
  const circlePathRef = useRef(null);

  useEffect(() => {
    if (!mainContainerRef.current || !carRef.current || !circlePathRef.current) {
      console.error("One or more refs are not attached.");
      return;
    }

    const mainCircleRadius = 130;
    const numDots = Math.floor(mainCircleRadius / 2);
    const step = 360 / numDots;

    gsap.set('svg', { visibility: 'visible' });
    gsap.set(carRef.current, { transformOrigin: '50% 50%' });
    gsap.set('#carRot', { transformOrigin: '0% 0%', rotation: 30 });

    const mainTl = gsap.timeline();

    const makeDots = () => {
      const puffPath = document.querySelector('#puff');
      if (!puffPath) {
        console.error("Path element with id 'puff' not found.");
        return;
      }

      for (let i = 0; i < numDots; i++) {
        const d = puffPath.cloneNode(true);
        mainContainerRef.current.appendChild(d);

        const angle = step * i;
        gsap.set(d, {
          x: Math.cos(angle * Math.PI / 180) * mainCircleRadius + 400,
          y: Math.sin(angle * Math.PI / 180) * mainCircleRadius + 300,
          rotation: Math.random() * 360,
          transformOrigin: '50% 50%',
        });

        const tl = gsap.timeline();
        tl.from(d, 0.2, { scale: 0, ease: "power4.in" })
          .to(d, 1.8, { scale: Math.random() + 2, opacity: 0, ease: "power4.out" });

        mainTl.add(tl, i / (numDots / tl.duration()));
      }

      const circlePath = circlePathRef.current.getAttribute('d');
const circleBezier = gsap.utils.toArray(
  MotionPathPlugin.getRawPath(circlePath)
)[0];


      const carTl = gsap.timeline();
      carTl.to(carRef.current, mainTl.duration(), {
        bezier: {
          type: "cubic",
          values: circleBezier,
          autoRotate: true,
        },
        ease: "none",
      });

      mainTl.add(carTl, 0.05);
    };

    makeDots();

    const finalTl = gsap.timeline()
      .fromTo(mainTl, { progress: 0 }, { progress: 0.9, duration: 6 })
      .to('#carRot', {
        transformOrigin: '50% 50%',
        rotation: 0,
        duration: 0.2,
      }, 1.6);

    return () => {
      finalTl.kill();
      mainTl.kill();
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="relative flex flex-col items-center">
        <svg className="mainSVG absolute" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="puff" d="M4.5,8.3C6,8.4,6.5,7,6.5,7s2,0.7,2.9-0.1C10,6.4,10.3,4.1,9.1,4c2-0.5,1.5-2.4-0.1-2.9c-1.1-0.3-1.8,0-1.8,0s-1.5-1.6-3.4-1C2.5,0.5,2.1,2.3,2.1,2.3S0,2.3,0,4.4c0,1.1,1,2.1,2.2,2.1C2.2,7.9,3.5,8.2,4.5,8.3z" fill="#fff" />
            <circle id="dot" cx="0" cy="0" r="5" fill="#fff" />
          </defs>
          <circle id="mainCircle" fill="none" cx="400" cy="300" r="130" />
          <path ref={circlePathRef} id="circlePath" d="M320,300a80,80 0 1,0 160,0a80,80 0 1,0 -160,0" />
          <g ref={mainContainerRef} id="mainContainer">
            <g ref={carRef} id="car">
              <path id="carRot" fill="#FFF" d="M45.6,16.9l0-11.4c0-3-1.5-5.5-4.5-5.5L3.5,0C0.5,0,0,1.5,0,4.5l0,13.4c0,3,0.5,4.5,3.5,4.5l37.6,0C44.1,22.4,45.6,19.9,45.6,16.9z" />
            </g>
          </g>
        </svg>

        <div className="loader mb-6"></div>
        <div className="text-2xl text-white font-bold animate-pulse">
          Loading Portfolio...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
