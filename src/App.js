import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, FileText, ExternalLink, ArrowRight,
  Eye, Heart, Star, Code, Palette, Database, Terminal,
  Award, Users, Target, ChevronDown, Menu, X
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';
import ReactAppImage1 from './assest/ReactApp.png';
import ReactAppImage2 from './assest/Enhanced Magical Sand Art Creator-1.png';
import ReactAppImage3 from './assest/1729408542692.png';
import ReactAppImage4 from './assest/image4.png';
import ReactApppdf from './assest/Anush_Gupta_Software_Engineering_Resume.pdf';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced Universe Animation Component
const UniverseAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let planets = [];
    let shootingStars = [];
    let nebulaClouds = [];
    let galaxySpiral = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeUniverse();
    };

    // Create enhanced stars with different types
    const createStars = () => {
      stars = [];
      for (let i = 0; i < 300; i++) {
        const starType = Math.random();
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.9 + 0.1,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          color: starType < 0.3 ? 
            `hsl(${Math.random() * 30 + 200}, 80%, ${80 + Math.random() * 20}%)` : // Blue-white stars
            starType < 0.6 ? 
            `hsl(${Math.random() * 40 + 45}, 90%, ${85 + Math.random() * 15}%)` : // Yellow-white stars
            `hsl(${Math.random() * 20 + 320}, 70%, ${75 + Math.random() * 25}%)`, // Pink-white stars
          pulsePhase: Math.random() * Math.PI * 2,
          type: starType < 0.1 ? 'pulsar' : 'normal'
        });
      }
    };

    // Create enhanced planets with rings and moons
    const createPlanets = () => {
      planets = [];
      for (let i = 0; i < 4; i++) {
        planets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 60 + 30,
          color: `hsl(${Math.random() * 360}, 60%, ${65 + Math.random() * 20}%)`,
          orbitRadius: Math.random() * 150 + 80,
          orbitSpeed: Math.random() * 0.008 + 0.003,
          angle: Math.random() * Math.PI * 2,
          centerX: Math.random() * canvas.width,
          centerY: Math.random() * canvas.height,
          hasRings: Math.random() < 0.4,
          ringColor: `hsl(${Math.random() * 360}, 40%, ${50 + Math.random() * 30}%)`,
          moons: Math.random() < 0.6 ? [{
            angle: Math.random() * Math.PI * 2,
            distance: Math.random() * 40 + 20,
            speed: Math.random() * 0.05 + 0.02,
            size: Math.random() * 8 + 4
          }] : []
        });
      }
    };

    // Create nebula clouds
    const createNebulaClouds = () => {
      nebulaClouds = [];
      for (let i = 0; i < 8; i++) {
        nebulaClouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 200 + 100,
          color: `hsl(${Math.random() * 60 + 280}, 60%, ${40 + Math.random() * 20}%)`,
          opacity: Math.random() * 0.3 + 0.1,
          drift: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          },
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Create galaxy spiral arms
    const createGalaxySpiral = () => {
      galaxySpiral = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let arm = 0; arm < 3; arm++) {
        for (let i = 0; i < 50; i++) {
          const angle = (arm * Math.PI * 2 / 3) + (i * 0.3);
          const radius = i * 8 + 50;
          galaxySpiral.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.2,
            color: `hsl(${Math.random() * 60 + 240}, 70%, ${70 + Math.random() * 20}%)`,
            rotationSpeed: 0.002
          });
        }
      }
    };

    // Enhanced shooting stars
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch(side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -10;
          vx = (Math.random() - 0.5) * 4;
          vy = Math.random() * 3 + 2;
          break;
        case 1: // Right
          x = canvas.width + 10;
          y = Math.random() * canvas.height;
          vx = -(Math.random() * 3 + 2);
          vy = (Math.random() - 0.5) * 4;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 10;
          vx = (Math.random() - 0.5) * 4;
          vy = -(Math.random() * 3 + 2);
          break;
        default: // Left
          x = -10;
          y = Math.random() * canvas.height;
          vx = Math.random() * 3 + 2;
          vy = (Math.random() - 0.5) * 4;
      }

      return {
        x, y, vx, vy,
        size: Math.random() * 3 + 1,
        life: 120,
        maxLife: 120,
        color: `hsl(${Math.random() * 60 + 45}, 90%, 85%)`,
        trail: []
      };
    };

    const initializeUniverse = () => {
      createStars();
      createPlanets();
      createNebulaClouds();
      createGalaxySpiral();
    };

    const animate = () => {
      // Clear with subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.05)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds first (background layer)
      nebulaClouds.forEach(cloud => {
        cloud.x += cloud.drift.x;
        cloud.y += cloud.drift.y;
        cloud.opacity += Math.sin(Date.now() * cloud.pulseSpeed) * 0.02;
        
        // Wrap around screen
        if (cloud.x > canvas.width + cloud.size) cloud.x = -cloud.size;
        if (cloud.x < -cloud.size) cloud.x = canvas.width + cloud.size;
        if (cloud.y > canvas.height + cloud.size) cloud.y = -cloud.size;
        if (cloud.y < -cloud.size) cloud.y = canvas.height + cloud.size;

        const nebulaGradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.size
        );
        nebulaGradient.addColorStop(0, cloud.color.replace(')', `, ${cloud.opacity})`).replace('hsl', 'hsla'));
        nebulaGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(cloud.x - cloud.size, cloud.y - cloud.size, cloud.size * 2, cloud.size * 2);
      });

      // Draw galaxy spiral
      galaxySpiral.forEach(star => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = Math.atan2(star.y - centerY, star.x - centerX) + star.rotationSpeed;
        const radius = Math.sqrt((star.x - centerX) ** 2 + (star.y - centerY) ** 2);
        
        star.x = centerX + Math.cos(angle) * radius;
        star.y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(')', `, ${star.opacity})`).replace('hsl', 'hsla');
        ctx.fill();
      });

      // Draw and animate enhanced stars
      stars.forEach(star => {
        if (star.type === 'pulsar') {
          star.opacity = 0.5 + Math.sin(Date.now() * star.twinkleSpeed * 3 + star.pulsePhase) * 0.4;
          star.size = 2 + Math.sin(Date.now() * star.twinkleSpeed * 2 + star.pulsePhase) * 1;
        } else {
          star.opacity += Math.sin(Date.now() * star.twinkleSpeed + star.pulsePhase) * 0.02;
          star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(')', `, ${star.opacity})`).replace('hsl', 'hsla');
        ctx.fill();

        // Enhanced star glow
        if (star.type === 'pulsar' || Math.random() < 0.1) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = star.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw and animate enhanced planets
      planets.forEach(planet => {
        planet.angle += planet.orbitSpeed;
        planet.x = planet.centerX + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = planet.centerY + Math.sin(planet.angle) * planet.orbitRadius;

        // Draw planet rings
        if (planet.hasRings) {
          ctx.beginPath();
          ctx.ellipse(planet.x, planet.y, planet.size * 1.5, planet.size * 0.3, planet.angle, 0, Math.PI * 2);
          ctx.strokeStyle = planet.ringColor.replace(')', ', 0.4)').replace('hsl', 'hsla');
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw planet
        const planetGradient = ctx.createRadialGradient(
          planet.x - planet.size * 0.3, planet.y - planet.size * 0.3, 0,
          planet.x, planet.y, planet.size
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, planet.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        // Draw moons
        planet.moons.forEach(moon => {
          moon.angle += moon.speed;
          const moonX = planet.x + Math.cos(moon.angle) * moon.distance;
          const moonY = planet.y + Math.sin(moon.angle) * moon.distance;

          ctx.beginPath();
          ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 200, 220, 0.8)';
          ctx.fill();
        });
      });

      // Create new shooting stars occasionally
      if (Math.random() < 0.005) {
        shootingStars.push(createShootingStar());
      }

      // Draw and animate enhanced shooting stars
      shootingStars.forEach((star, index) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life--;

        // Add to trail
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 15) star.trail.shift();

        if (star.life <= 0 || 
            star.x < -50 || star.x > canvas.width + 50 || 
            star.y < -50 || star.y > canvas.height + 50) {
          shootingStars.splice(index, 1);
          return;
        }

        const opacity = star.life / star.maxLife;
        
        // Draw enhanced trail
        ctx.beginPath();
        star.trail.forEach((point, i) => {
          const trailOpacity = (i / star.trail.length) * opacity * 0.6;
          const trailSize = (i / star.trail.length) * star.size;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace(')', `, ${trailOpacity})`).replace('hsl', 'hsla');
          ctx.fill();
        });

        // Draw shooting star head with glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4, zIndex: 1 }}
    />
  );
};

// Unique Loading Screen Component
const UniqueLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  const loadingSteps = [
    'Initializing...',
    'Loading Assets...',
    'Preparing Experience...',
    'Almost Ready...',
    'Welcome!'
  ];

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Animate particles
    const animateParticles = () => {
      const canvas = document.getElementById('loading-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    // Logo animation
    gsap.fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    return () => {
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 loading-gradient z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas id="loading-canvas" className="absolute inset-0" />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-900/50 to-blue-900/20" />

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-spin" />
              {/* Inner pulsing circle */}
              <div className="absolute inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-ping transform -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping transform -translate-x-1/2" style={{ animationDelay: '0.5s' }} />
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping transform -translate-y-1/2" style={{ animationDelay: '1s' }} />
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping transform -translate-y-1/2" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>

            <h1 className="text-4xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                ANUSH GUPTA
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Portfolio Loading...</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{loadingText}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Fun Loading Messages */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>✨ Crafting digital experiences...</p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-pink-500/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-500/50" />
    </div>
  );
};

// Smooth Cursor Component
const SmoothCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Faster dot follow
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }

      if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
      }

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

// Enhanced Hero Section with Universe Animation
const ModernHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    // Parallax effect
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  const scrollToSkills = () => {
    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-pink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-900/10 to-purple-900/20" />

      {/* Universe Animation Background */}
      <UniverseAnimation />

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20 h-full flex flex-col justify-center">
        <div ref={titleRef} className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
            <span className="block text-white drop-shadow-2xl">ANUSH</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              GUPTA
            </span>
          </h1>
        </div>

        <div ref={subtitleRef} className="mb-12">
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Strategic Product Manager transforming ideas into impactful solutions through 
            user research, data analytics, and cross-functional leadership
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToSkills}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            <span className="flex items-center">
              View My Experience
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href={ReactApppdf}
            download
            className="group px-8 py-4 border-2 border-slate-300/40 text-slate-200 font-semibold rounded-full hover:border-slate-200/60 hover:bg-slate-200/10 transition-all duration-300 backdrop-blur-sm shadow-lg"
          >
            Download Resume
          </a>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <ChevronDown className="w-6 h-6 text-slate-300/80 mb-2" />
            <div className="w-px h-8 bg-gradient-to-b from-slate-300/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-30" style={{animationDelay: '3s'}}></div>
    </section>
  );
};

// Modern Project Card
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-500 shadow-xl hover:shadow-cyan-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-500/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <div className="flex space-x-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 rounded-full text-sm font-medium border border-cyan-400/20 hover:border-cyan-400/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{project.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{project.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{project.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Section
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // TODO: Add real product management projects data
  const projects = [
    // Projects will be added here with real PM experience and case studies
  ];

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Featured
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my passion for creating
            innovative digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const skillCategories = [
    {
      title: "Product Strategy",
      icon: <Target className="w-8 h-8" />,
      skills: ["Product Roadmapping", "Market Research", "Competitive Analysis", "Go-to-Market Strategy", "Product Vision", "OKRs"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "User Experience & Research",
      icon: <Users className="w-8 h-8" />,
      skills: ["User Research", "User Interviews", "Persona Development", "Journey Mapping", "Usability Testing", "A/B Testing"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Analytics & Data",
      icon: <Database className="w-8 h-8" />,
      skills: ["Google Analytics", "Mixpanel", "SQL", "Data Analysis", "KPI Tracking", "Conversion Optimization"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Design & Collaboration",
      icon: <Palette className="w-8 h-8" />,
      skills: ["Figma", "Wireframing", "Prototyping", "Agile/Scrum", "Stakeholder Management", "Cross-functional Leadership"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      }
    );

    // Animate skill cards
    gsap.fromTo(".skill-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Skills &
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card group relative p-8 bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-500 shadow-xl hover:shadow-cyan-500/10"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-6`}>
                {category.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-slate-700/50 text-slate-200 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-200 transition-all duration-300 border border-slate-600/30 hover:border-cyan-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const experiences = [
    {
      title: "Product Management Intern",
      company: "Park+",
      period: "June 2024 - July 2024",
      location: "Remote",
      description: "Led product initiatives for the Phonebook product, focusing on user experience optimization and feature prioritization. Collaborated with engineering, design, and business teams to deliver user-centric solutions.",
      achievements: [
        "Conducted user research and interviews to identify pain points in contact management",
        "Defined product requirements and user stories for contact synchronization features",
        "Collaborated with engineering teams to ensure technical feasibility and optimal implementation",
        "Analyzed user feedback and metrics to drive product improvements affecting thousands of users",
        "Facilitated cross-functional meetings and maintained product documentation"
      ],
      technologies: ["Product Strategy", "User Research", "Agile/Scrum", "Analytics", "Stakeholder Management"],
      type: "internship"
    }
    // TODO: Add more real product management experiences here
    // {
    //   title: "Product Strategy & Innovation",
    //   company: "Personal Projects",
    //   period: "2022 - Present",
    //   location: "Remote",
    //   description: "Will add real product management experience data",
    //   achievements: [],
    //   technologies: [],
    //   type: "continuous"
    // },
    // {
    //   title: "Innovation & Leadership",
    //   company: "Hackathons & Competitions", 
    //   period: "2023 - 2024",
    //   location: "Multiple Venues",
    //   description: "Will add real leadership and innovation experience data",
    //   achievements: [],
    //   technologies: [],
    //   type: "achievement"
    // }
  ];

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      }
    );

    // Animate experience cards
    gsap.fromTo(".experience-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'internship':
        return <Code className="w-6 h-6" />;
      case 'continuous':
        return <Target className="w-6 h-6" />;
      case 'achievement':
        return <Award className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'from-blue-500 to-cyan-500';
      case 'continuous':
        return 'from-green-500 to-emerald-500';
      case 'achievement':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Professional
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My journey in product management, strategic thinking, and user-centered innovation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card group relative mb-12 last:mb-0"
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-purple-500 to-transparent opacity-30" />
              )}

              <div className="flex flex-col md:flex-row gap-8">
                {/* Icon and Timeline */}
                <div className="flex-shrink-0">
                  <div className={`timeline-icon inline-flex p-4 rounded-2xl bg-gradient-to-r ${getTypeColor(exp.type)} shadow-lg transition-all duration-300`}>
                    {getTypeIcon(exp.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {exp.title}
                      </h3>
                      <span className="text-purple-400 font-medium">{exp.period}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-400">
                      <span className="font-medium">{exp.company}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                    <ul className="achievement-list space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 cursor-default">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="tech-tag px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium hover:bg-purple-600/30 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Open to new opportunities and collaborations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(contentRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(imageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={contentRef}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              About
              <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                I'm a strategic Product Manager and Computer Science student at JECRC University, passionate about 
                transforming complex problems into user-centric solutions. My approach combines analytical thinking 
                with deep user empathy to drive meaningful product outcomes.
              </p>

              <p>
                As a Product Management Intern at Park+, I've led cross-functional initiatives, conducted comprehensive 
                user research, and delivered data-driven product improvements that impacted thousands of users. 
                I thrive on turning insights into actionable strategies that balance user needs with business objectives.
              </p>

              <p>
                My passion lies in understanding user behavior, identifying market opportunities, and building 
                products that solve real problems. I believe great products are born from the intersection of 
                user research, strategic vision, and collaborative execution.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 rounded-full">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">Strategic Thinker</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 rounded-full">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">User Advocate</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 rounded-full">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">Innovation Leader</span>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-10" />
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Code className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white text-xl font-semibold">Anush Gupta</p>
                  <p className="text-purple-300">Product Manager</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials/Visitor Feedback Section
// TODO: Add real testimonials data and re-enable this section later

// Contact Section
const ContactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(formRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-cyan-900/10 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate on something amazing? Let's build the future together.
          </p>
        </div>

        <div ref={formRef} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <a
              href="mailto:anushgupta105@gmail.com"
              className="group flex flex-col items-center p-8 bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500"
            >
              <Mail className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-center">anushgupta105@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/anush-gupta105/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500"
            >
              <Linkedin className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-center">Connect with me</p>
            </a>

            <a
              href="https://github.com/solmyst"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500"
            >
              <Github className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-400 text-center">View my code</p>
            </a>
          </div>

          <div className="text-center">
            <a
              href={ReactApppdf}
              download
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    // { name: 'Projects', href: '#projects' }, // TODO: Re-enable when real PM projects are added
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    // { name: 'Testimonials', href: '#testimonials' }, // TODO: Re-enable when real data is added
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            AG
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-cyan-300 transition-colors font-medium relative group"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <UniqueLoadingScreen />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <SmoothCursor />
      <Navigation />
      <ModernHero />
      {/* <ProjectsSection /> */}
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />

      {/* Enhanced Footer */}
      <footer className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
                Anush Gupta
              </h3>
              <p className="text-slate-400">Product Manager & Strategic Leader</p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-6">
              <a href="https://github.com/solmyst" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-cyan-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/anush-gupta105/" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-cyan-300 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:anushgupta105@gmail.com"
                 className="text-slate-400 hover:text-cyan-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6"></div>
            
            <p className="text-slate-500 text-sm">
              © 2024 Anush Gupta. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;