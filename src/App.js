import React, { useState, useEffect } from 'react';
import { Target, Users, Database, Award, Mail, Linkedin, Github, Download, ArrowRight, Rocket, TrendingUp, Users2, Sparkles, Zap, Star, Code, Palette, BarChart } from 'lucide-react';
import './App.css';
import './WizardLoader.css';
import profileImage from './assest/my_image.jpg';
import CountUp from './components/CountUp';
import CircularText from './components/CircularText';
import Carousel from './components/Carousel';
import LogoLoop from './components/LogoLoop';
import FloatingNav from './components/FloatingNav';
import TextType from './components/TextType';

// Wizard Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [nameReveal, setNameReveal] = useState('');
  const fullName = 'ANUSH';

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 6 + 1.5;

        // Reveal name letters progressively - each letter at 20% intervals
        const letterIndex = Math.floor((newProgress / 100) * fullName.length);
        if (letterIndex > 0 && letterIndex <= fullName.length) {
          setNameReveal(fullName.substring(0, letterIndex));
        }

        // Only complete when name is fully revealed AND progress is 100%
        if (newProgress >= 100 && nameReveal === fullName) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 2000); // Give more time to see the complete name
          return 100;
        }

        // Don't let progress complete until name is fully revealed
        if (newProgress >= 100 && nameReveal !== fullName) {
          setNameReveal(fullName);
          return 95; // Keep at 95% until name is complete
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, [onComplete, nameReveal, fullName]);

  const isComplete = progress >= 100;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center z-50 transition-all duration-1000 ${isComplete ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>

      {/* Noise overlay */}
      <div className="noise opacity-10"></div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

          {/* Left Side - Name Reveal */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <div className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wider font-mono">
                {nameReveal}
                <span className="animate-pulse">|</span>
              </div>
              <p className="text-lg text-purple-300">
                {progress < 20 ? 'Summoning magic...' :
                  progress < 40 ? 'Conjuring letters...' :
                    progress < 60 ? 'Weaving spells...' :
                      progress < 80 ? 'Revealing identity...' :
                        progress < 95 ? 'Almost complete...' :
                          'Welcome to my realm!'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="progress mx-auto lg:mx-0">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-sm text-purple-400 mt-4 font-mono">
              <CountUp end={Math.round(progress)} duration={300} suffix="%" /> Complete
            </p>
          </div>

          {/* Right Side - Wizard Animation */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="scene">
              <div className="wizard">
                <div className="body"></div>
                <div className="right-arm">
                  <div className="right-hand"></div>
                </div>
                <div className="left-arm">
                  <div className="left-hand"></div>
                </div>
                <div className="head">
                  <div className="beard"></div>
                  <div className="face">
                    <div className="adds"></div>
                  </div>
                  <div className="hat">
                    <div className="hat-of-the-hat"></div>
                    <div className="four-point-star --first"></div>
                    <div className="four-point-star --second"></div>
                    <div className="four-point-star --third"></div>
                  </div>
                </div>
              </div>

              {/* Floating magical letters instead of objects */}
              <div className="letters">
                <div className="letter letter-a" style={{ opacity: nameReveal.length >= 1 ? 1 : 0.3 }}>A</div>
                <div className="letter letter-n" style={{ opacity: nameReveal.length >= 2 ? 1 : 0.3 }}>N</div>
                <div className="letter letter-u" style={{ opacity: nameReveal.length >= 3 ? 1 : 0.3 }}>U</div>
                <div className="letter letter-s" style={{ opacity: nameReveal.length >= 4 ? 1 : 0.3 }}>S</div>
                <div className="letter letter-h" style={{ opacity: nameReveal.length >= 5 ? 1 : 0.3 }}>H</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  // Handle scroll effects and section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detect active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Loading complete handler
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements throughout */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-200"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-500"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="pt-12 sm:pt-16 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Decorative floating elements in background - Hidden on small mobile */}
        <div className="hidden sm:block absolute top-20 left-10 opacity-20">
          <Sparkles className="w-8 sm:w-12 h-8 sm:h-12 text-pink-500 animate-pulse" />
        </div>
        <div className="hidden sm:block absolute top-40 right-10 sm:right-20 opacity-20">
          <Zap className="w-12 sm:w-16 h-12 sm:h-16 text-purple-500 animate-bounce" />
        </div>
        <div className="hidden sm:block absolute bottom-20 left-1/4 opacity-20">
          <Star className="w-8 sm:w-10 h-8 sm:h-10 text-blue-500 animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh] sm:min-h-[80vh]">

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Circular Text - positioned outside the image - Hidden on mobile */}
                <div className="hidden md:block absolute -inset-16 flex items-center justify-center pointer-events-none">
                  <div className="animate-spin-slow" style={{ animationDuration: '30s' }}>
                    <CircularText
                      text="✦ PRODUCT MANAGER ✦ ANUSH GUPTA ✦ INNOVATION ✦ GROWTH ✦ "
                      radius={window.innerWidth < 768 ? 140 : window.innerWidth < 1024 ? 170 : 200}
                      fontSize={window.innerWidth < 768 ? 11 : 13}
                      className="text-pink-500 font-bold"
                    />
                  </div>
                </div>

                {/* Animated background rings */}
                <div className="absolute inset-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 animate-spin-slow opacity-30"></div>
                <div className="absolute inset-2 w-44 h-44 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-76 lg:h-76 rounded-full bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 animate-pulse opacity-40"></div>

                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 shadow-2xl border-4 border-white z-10">
                  <img
                    src={profileImage}
                    alt="Anush Gupta - Product Manager"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback content */}
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-gray-700 font-semibold">Anush Gupta</p>
                      <p className="text-gray-500 text-sm">Product Manager</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce opacity-80 shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-70 shadow-lg"></div>
                <div className="absolute top-1/4 -left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-1/4 -right-8 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-70 shadow-lg" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
                <TextType
                  words={['Welcome!!', 'Hello!', 'Namaste!', 'Hi There!']}
                  typingSpeed={150}
                  deletingSpeed={100}
                  delayBetweenWords={2000}
                />
              </h1>

              <div className="space-y-6 px-4 sm:px-0">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    A brief about me
                  </h2>
                </div>

                <div className="space-y-4 sm:space-y-5 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    I thrive in the <span className="font-semibold text-pink-600">productive chaos of an early-stage startup</span>. Give me a half-formed idea, a broken Figma flow, or a 3-bullet Notion doc—I excel at turning that ambiguity into a tangible product.
                  </p>

                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    I love <span className="font-semibold text-purple-600">building from scratch</span>. Whether it's new products, core features, landing pages, or backend APIs, I'm driven by <span className="font-semibold text-gray-900">"whatever moves the needle."</span>
                  </p>

                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    My ideal environment <span className="font-semibold text-blue-600">moves fast, ships fast, and learns fast</span>.
                  </p>

                  <div className="pt-2">
                    <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                      If you're building something ambitious and need someone who learns quickly, takes full ownership, and delivers—I'd love to be a part of your journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
        {/* Decorative elements matching hero */}
        <div className="absolute top-10 right-10 opacity-20">
          <Sparkles className="w-16 h-16 text-pink-600 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <Zap className="w-20 h-20 text-purple-600 animate-bounce" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-15">
          <Star className="w-12 h-12 text-blue-600 animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-fadeInScale">
              About Me
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed font-medium">
              Product Manager passionate about building user-centric digital experiences
              that drive growth and deliver real impact
            </p>
          </div>

          {/* Stats Carousel */}
          <div className="mb-16 max-w-3xl mx-auto">
            <Carousel
              items={[
                <div key="stat1" className="text-center p-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200/50 shadow-xl">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    <CountUp end={8} duration={2000} />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">Weeks</div>
                  <div className="text-base text-gray-600">From early stage to scale at Park+</div>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>,
                <div key="stat2" className="text-center p-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-200/50 shadow-xl">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    <CountUp end={180} duration={2500} suffix="%" />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">User Growth</div>
                  <div className="text-base text-gray-600">Achieved at Park+ Motor Insurance</div>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>,
                <div key="stat3" className="text-center p-12 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl border-2 border-pink-200/50 shadow-xl">
                  <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
                    <CountUp end={100} duration={2000} suffix="%" />
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 mb-2">Dedication</div>
                  <div className="text-base text-gray-600">Committed to product excellence</div>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ]}
              autoPlay={true}
              interval={4000}
            />
          </div>

          {/* Key Traits */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full border border-pink-200/50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
              <Target className="w-5 h-5 text-pink-600" />
              <span className="text-pink-800 font-medium">Strategic Thinker</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-medium">User Advocate</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200/50 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Innovation Leader</span>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-28 bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 relative overflow-hidden">
        {/* Decorative elements matching theme */}
        <div className="absolute top-20 left-20 opacity-20">
          <Rocket className="w-16 h-16 text-pink-600 animate-float" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <TrendingUp className="w-20 h-20 text-purple-600 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6 animate-fadeInScale">
              My Journey
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium">Building impactful products that drive real growth</p>
          </div>

          {/* Park+ Experience */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-pink-200/50 hover:shadow-2xl transition-all duration-500">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Product Intern</h3>
                      <p className="text-xl text-pink-600 font-semibold">Park+</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-medium rounded-full text-sm">
                    June 9 – Aug 8, 2025
                  </span>
                  <p className="text-sm text-gray-500 mt-1">8 Weeks of Impact</p>
                </div>
              </div>

              {/* Impact Statement */}
              <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200/50">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 text-pink-600 mr-2" />
                  180% User Growth in 8 Weeks 🚀
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Contributed to scaling the Motor Insurance product from its early stage to rapid growth,
                  working on UI/UX upgrades and WhatsApp-driven engagement flows that drove exceptional results.
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Key Achievements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✅</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Conversions</div>
                    <div className="text-xs text-gray-600">Quotes → Proposals → Purchase</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">�️</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Scale Ready</div>
                    <div className="text-xs text-gray-600">Outbound calling & features</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200/50 hover:shadow-lg transition-all">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">📱</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">WhatsApp Integration</div>
                    <div className="text-xs text-gray-600">Engagement & retention flows</div>
                  </div>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Users2 className="w-5 h-5 text-purple-600 mr-2" />
                  Key Takeaways:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Scaling in insurance demands a balance of domain depth + user trust</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Conversion is driven by empathy just as much as design</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">With the right ownership mindset, even 8 weeks can create outsized impact</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technologies & Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">WhatsApp Integration</span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">UI/UX Design</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Conversion Optimization</span>
                  <span className="px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium">Product Strategy</span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">Cross-functional Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 sm:py-28 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-1/4 opacity-20">
          <Code className="w-16 h-16 text-blue-600 animate-wiggle" />
        </div>
        <div className="absolute bottom-10 left-1/4 opacity-20">
          <Palette className="w-16 h-16 text-pink-600 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-20">
          <BarChart className="w-14 h-14 text-purple-600 animate-bounce" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fadeInScale">
              Core Skills
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium">
              A comprehensive toolkit for modern product management
            </p>
          </div>

          {/* Interactive Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Left Column - Strategy & User Research */}
            <div className="space-y-8">
              {/* Strategy Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl p-8 border border-pink-200/50 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors">Strategy</h3>
                      <p className="text-sm text-gray-600">Product Vision & Planning</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-100 transition-colors cursor-default">Product Roadmapping</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-rose-100 transition-colors cursor-default">Market Research</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-100 transition-colors cursor-default">Competitive Analysis</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-rose-100 transition-colors cursor-default">Strategic Planning</div>
                  </div>
                </div>
              </div>

              {/* User Research Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-3xl p-8 border border-purple-200/50 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform duration-500">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">User Research</h3>
                      <p className="text-sm text-gray-600">Understanding User Needs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors cursor-default">User Interviews</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-100 transition-colors cursor-default">Behavioral Analysis</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors cursor-default">Journey Mapping</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-pink-100 transition-colors cursor-default">Empathy Mapping</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Analytics & Leadership */}
            <div className="space-y-8">
              {/* Analytics Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 rounded-3xl p-8 border border-blue-200/50 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-14 -translate-x-14 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Analytics</h3>
                      <p className="text-sm text-gray-600">Data-Driven Decisions</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors cursor-default">Data Analysis</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors cursor-default">A/B Testing</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors cursor-default">KPI Tracking</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-100 transition-colors cursor-default">SQL</div>
                  </div>
                </div>
              </div>

              {/* Leadership Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 rounded-3xl p-8 border border-indigo-200/50 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-indigo-200/30 to-blue-200/30 rounded-full translate-y-18 translate-x-18 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform duration-500">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Leadership</h3>
                      <p className="text-sm text-gray-600">Team & Stakeholder Management</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-indigo-100 transition-colors cursor-default">Cross-functional Teams</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors cursor-default">Stakeholder Management</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-indigo-100 transition-colors cursor-default">Agile/Scrum</div>
                    <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors cursor-default">Team Collaboration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Logo Loop */}
      <section className="py-16 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tools & Technologies
          </h3>
        </div>
        <LogoLoop
          logos={[
            'Figma',
            'Jira',
            'SQL',
            'Python',
            'Analytics',
            'Notion',
            'Slack',
            'Miro',
            'Tableau',
            'Excel'
          ]}
          speed={25}
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Mail className="w-20 h-20 text-pink-600 animate-bounce" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fadeInScale">
              Let's Connect
            </h2>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium">
              Ready to discuss your next product challenge?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <a
              href="mailto:anushgupta105@gmail.com"
              className="group p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-pink-300/50 hover:shadow-pink-500/50 hover:shadow-2xl transition-all text-center hover:scale-105 duration-300 hover-lift"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-700 font-medium">anushgupta105@gmail.com</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anush-gupta105/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-300/50 hover:shadow-purple-500/50 hover:shadow-2xl transition-all text-center hover:scale-105 duration-300 hover-lift"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl">
                <Linkedin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">LinkedIn</h3>
              <p className="text-gray-700 font-medium">Connect with me</p>
            </a>

            {/* Resume */}
            <button
              onClick={() => window.open('https://drive.google.com/file/d/18zozP6xXi940m8i99zVl4RNjaY051mlD/view?usp=sharing', '_blank')}
              className="group p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-blue-300/50 hover:shadow-blue-500/50 hover:shadow-2xl transition-all text-center w-full hover:scale-105 duration-300 hover-lift"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl">
                <Download className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Resume</h3>
              <p className="text-gray-700 font-medium">View Resume</p>
            </button>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl animate-glow">
              <span>Ready to drive your next product success story</span>
              <ArrowRight className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Matching Website Gradient */}
      <footer className="py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden border-t border-pink-200/50">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl animate-scalePulse">
                <span className="text-3xl font-black text-white">A</span>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-black text-gray-900">Anush Gupta</h3>
                <p className="text-gray-700 text-lg font-medium">Product Manager</p>
              </div>
            </div>

            <p className="text-gray-700 text-xl mb-8 max-w-2xl mx-auto font-medium">
              Product Manager passionate about building impactful digital experiences
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-10">
              <a
                href="mailto:anushgupta105@gmail.com"
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-7 h-7 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/anush-gupta105/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-7 h-7 text-white" />
              </a>
              <a
                href="https://github.com/solmyst"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Github className="w-7 h-7 text-white" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors text-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-base font-medium">
                © 2025 Anush Gupta. Crafted with passion and purpose.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Navigation */}
      <FloatingNav activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
};

export default App;