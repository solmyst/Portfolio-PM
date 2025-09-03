import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  Github, Linkedin, Mail, FileText, ArrowRight,
  Code, Palette, Database,
  Award, Users, Target, ChevronDown, Menu, X, TrendingUp
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';
import ReactApppdf from './assest/Anush_Gupta_Software_Engineering_Resume.pdf';

// Lazy load heavy components for better performance
const OptimizedBackground = lazy(() => import('./components/OptimizedBackground'));

// Optimized image loading (for future use)
// const optimizedImages = {
//   ReactAppImage1: './assest/ReactApp.png',
//   ReactAppImage2: './assest/Enhanced Magical Sand Art Creator-1.png',
//   ReactAppImage3: './assest/1729408542692.png',
//   ReactAppImage4: './assest/image4.png'
// };

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);



// Product-Focused Loading Screen Component
const ProductLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Analyzing market trends...');

  const loadingSteps = [
    'Analyzing market trends...',
    'Loading user insights...',
    'Optimizing conversion funnels...',
    'Preparing growth metrics...',
    'Ready to scale!'
  ];



  useEffect(() => {
    // Fast progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 25 + 15;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => clearInterval(progressInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
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
            <p className="text-gray-400 text-lg">Product Manager • Growth Driver</p>
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

        {/* Professional Loading Messages */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>� Loading portfolio...</p>
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

// Optimized Cursor Component (Desktop Only)
const SmoothCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 768) return;

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

  // Don't render on mobile
  if (window.innerWidth < 768) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
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

    // Remove parallax effect to prevent glitching during scroll
  }, []);

  const scrollToSkills = () => {
    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Gradient Background - No Black Parts */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900/40 to-slate-700" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/30 via-transparent to-purple-900/30" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-800/20 to-pink-800/20" />

      {/* Optimized Background Animation */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-600/20" />}>
        <OptimizedBackground />
      </Suspense>

      {/* Static Grid Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="static-grid-pattern" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20 h-full flex flex-col justify-center">
        <div ref={titleRef} className="mb-8">
          <div className="mb-4">
            <p className="text-lg md:text-xl text-blue-300 font-medium mb-2">Hi, I'm</p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
            <span className="block text-white drop-shadow-2xl">ANUSH</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              GUPTA
            </span>
          </h1>
          <div className="mt-4">
            <p className="text-xl md:text-2xl text-slate-300 font-semibold">Product Manager</p>
            <p className="text-lg text-slate-400 mt-2">Turning ideas into products that delight users and drive growth</p>
          </div>
        </div>

        <div ref={subtitleRef} className="mb-16">
          <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-6">
            <span className="text-blue-300 font-semibold">Product Manager</span> passionate about building user-centric digital experiences that drive growth and deliver real impact
          </p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            Recently scaled Motor Insurance at Park+ achieving significant user growth through strategic product decisions and cross-functional collaboration
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm max-w-2xl mx-auto px-4">
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-600/30 rounded-full border border-slate-500/30 backdrop-blur-sm hover:bg-slate-500/40 transition-colors">
              <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-slate-200 whitespace-nowrap">Product Strategy</span>
            </div>
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-600/30 rounded-full border border-slate-500/30 backdrop-blur-sm hover:bg-slate-500/40 transition-colors">
              <Users className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-slate-200 whitespace-nowrap">User Research</span>
            </div>
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-600/30 rounded-full border border-slate-500/30 backdrop-blur-sm hover:bg-slate-500/40 transition-colors">
              <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-slate-200 whitespace-nowrap">Growth Analytics</span>
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToSkills}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            <span className="flex items-center">
              View My Work
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
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <ChevronDown className="w-6 h-6 text-slate-300/80 mb-2" />
            <div className="w-px h-8 bg-gradient-to-b from-slate-300/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
    </section>
  );
};

// Modern Project Card - Currently unused, will be used when projects data is ready
// const ProjectCard = ({ project, index }) => {
//   const cardRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     gsap.fromTo(cardRef.current,
//       { y: 100, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         delay: index * 0.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: cardRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play none none reverse"
//         }
//       }
//     );
//   }, [index]);

//   return (
//     <div
//       ref={cardRef}
//       className="group relative bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-500 shadow-xl hover:shadow-cyan-500/10"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Container */}
//       <div className="relative h-64 md:h-80 overflow-hidden">
//         <img
//           ref={imageRef}
//           src={project.image}
//           alt={project.title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

//         {/* Hover Overlay */}
//         <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-500/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
//           }`} />
//       </div>

//       {/* Content */}
//       <div className="p-6 md:p-8">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
//             {project.title}
//           </h3>
//           <div className="flex space-x-2">
//             {project.link && (
//               <a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
//               >
//                 <ExternalLink className="w-4 h-4 text-white" />
//               </a>
//             )}
//             {project.github && (
//               <a
//                 href={project.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
//               >
//                 <Github className="w-4 h-4 text-white" />
//               </a>
//             )}
//           </div>
//         </div>

//         <p className="text-gray-300 text-lg leading-relaxed mb-6">
//           {project.description}
//         </p>

//         {/* Tech Stack */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {project.tech.map((tech, i) => (
//             <span
//               key={i}
//               className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 rounded-full text-sm font-medium border border-cyan-400/20 hover:border-cyan-400/40 transition-colors"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="flex items-center space-x-6 text-sm text-gray-400">
//           <div className="flex items-center space-x-1">
//             <Eye className="w-4 h-4" />
//             <span>{project.views}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Heart className="w-4 h-4" />
//             <span>{project.likes}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Star className="w-4 h-4" />
//             <span>{project.rating}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Projects Section - Currently unused, will be added when projects data is ready
// const ProjectsSection = () => {
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);

//   // TODO: Add real product management projects data
//   const projects = [
//     // Projects will be added here with real PM experience and case studies
//   ];

//   useEffect(() => {
//     gsap.fromTo(titleRef.current,
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: "top 80%"
//         }
//       }
//     );
//   }, []);

//   return (
//     <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <div className="container mx-auto px-6">
//         <div ref={titleRef} className="text-center mb-16">
//           <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
//             Featured
//             <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
//               Projects
//             </span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             A collection of projects that showcase my passion for creating
//             innovative digital experiences
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
//           {projects.map((project, index) => (
//             <ProjectCard key={index} project={project} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// Key Achievement Highlight Section
const KeyAchievementSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(statsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="-mt-16 pt-12 pb-8 bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={statsRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Recent Impact at <span className="text-cyan-400">Park+</span>
            </h2>
            <p className="text-lg text-gray-400">
              Scaling Motor Insurance product from early stage to rapid growth in just 8 weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-slate-700/60 via-slate-600/40 to-slate-700/60 rounded-2xl border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">180%</div>
              <div className="text-lg font-semibold text-white mb-1">User Growth</div>
              <div className="text-sm text-slate-300">DAU increase in 8 weeks</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-slate-700/60 via-slate-600/40 to-slate-700/60 rounded-2xl border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">8</div>
              <div className="text-lg font-semibold text-white mb-1">Weeks</div>
              <div className="text-sm text-slate-300">From early stage to scale</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 text-lg italic">
              "With the right ownership mindset, even 8 weeks can create outsized impact"
            </p>
          </div>
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
      skills: ["Product Roadmapping", "Go-to-Market Strategy", "Market Research", "Competitive Analysis", "Strategic Planning", "Product Vision"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "User Research & Insights",
      icon: <Users className="w-8 h-8" />,
      skills: ["User Research", "Behavioral Analysis", "Trust Factor Analysis", "Journey Mapping", "User Interviews", "Empathy Mapping"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Analytics & Data",
      icon: <Database className="w-8 h-8" />,
      skills: ["Data Analysis", "KPI Tracking", "A/B Testing", "User Analytics", "Performance Metrics", "SQL"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Product & Leadership",
      icon: <Palette className="w-8 h-8" />,
      skills: ["Cross-functional Leadership", "Stakeholder Management", "UI/UX Strategy", "WhatsApp Integration", "Agile/Scrum", "Team Collaboration"],
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
    <section id="skills" ref={sectionRef} className="py-12 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Core
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Competencies
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Product management skills that drive exceptional growth and user outcomes
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
      period: "June 9 - Aug 8, 2025",
      location: "Remote",
      description: "Drove rapid growth for the Motor Insurance product from early stage to scale, achieving exceptional user engagement and conversion improvements through strategic UI/UX enhancements and data-driven product decisions.",
      achievements: [
        "🚀 Achieved 180% User Growth in 8 weeks - DAUs jumped through strategic UI/UX upgrades and WhatsApp-driven engagement flows",
        "📈 Strengthened conversion funnel - Optimized Quotes → Proposals → Purchase journey to significantly improve buying rates",
        "🏗️ Built for Scale - Supported outbound calling team setup and integrated new insurance product features",
        "🔍 Led user research initiatives to understand insurance buying behavior and trust factors",
        "📊 Analyzed user metrics and feedback loops to drive continuous product improvements",
        "🤝 Facilitated cross-functional collaboration between engineering, design, and business teams"
      ],
      technologies: ["Product Strategy", "User Research", "Conversion Optimization", "WhatsApp Integration", "Insurance Domain", "Growth Analytics"],
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
    <section id="experience" ref={sectionRef} className="py-12 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Impact &
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Driving exceptional growth through strategic product management and user-centric innovation
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
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Ready to drive your next product success story</span>
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
    <section id="about" ref={sectionRef} className="py-12 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-800">
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
                scaling products from early stage to rapid growth. My approach combines domain expertise with
                user empathy to drive exceptional business outcomes.
              </p>

              <p>
                At Park+, I achieved 180% user growth in just 8 weeks by optimizing the Motor Insurance product
                through strategic UI/UX enhancements and WhatsApp-driven engagement flows. I excel at strengthening
                conversion funnels and building scalable product solutions that balance user trust with business growth.
              </p>

              <p>
                My expertise lies in insurance domain knowledge, conversion optimization, and cross-functional
                leadership. I believe exceptional products emerge from the intersection of deep user research,
                strategic vision, and the right ownership mindset to create outsized impact.
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
    <section id="contact" ref={sectionRef} className="py-12 bg-gradient-to-br from-slate-900 via-cyan-900/10 to-slate-900">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's Build
            <span className="block bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to drive exceptional product growth? Let's create the next success story.
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
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
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
    // Optimized loading time
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (loading) {
    return <ProductLoadingScreen />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-700 text-white overflow-x-hidden">
      <SmoothCursor />
      <Navigation />
      <ModernHero />
      <KeyAchievementSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />

      {/* Enhanced Footer */}
      <footer className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
                Anush Gupta
              </h3>
              <p className="text-slate-400">Product Manager • Strategic Leader • Growth Focused</p>
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
              © 2025 Anush Gupta. Driving product excellence with strategic vision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;