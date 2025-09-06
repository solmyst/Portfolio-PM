import React, { useState, useEffect } from 'react';
import { Target, Users, Database, Award, Mail, Linkedin, Github, Download, ArrowRight, Rocket, TrendingUp, Users2 } from 'lucide-react';
import './App.css';
import './WizardLoader.css';

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
              {Math.round(progress)}% Complete
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

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Dynamic Header with Scroll Effects */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 100
        ? 'bg-white/70 backdrop-blur-xl border-b border-pink-300/70 shadow-lg py-2'
        : 'bg-white/80 backdrop-blur-md border-b border-pink-200/50 shadow-sm py-4'
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${scrollY > 100 ? 'w-8 h-8' : 'w-10 h-10'
                }`}>
                <span className={`text-white font-bold transition-all duration-500 ${scrollY > 100 ? 'text-base' : 'text-lg'
                  }`}>A</span>
              </div>
              <div>
                <h1 className={`font-bold text-gray-900 transition-all duration-500 ${scrollY > 100 ? 'text-lg' : 'text-xl'
                  }`}>Anush Gupta</h1>
                <p className={`text-gray-600 transition-all duration-500 ${scrollY > 100 ? 'text-xs' : 'text-sm'
                  }`}>Product Manager</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${activeSection === item.id
                    ? 'text-pink-600 bg-pink-50 px-3 py-1 rounded-full'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-full'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Animated background rings */}
                <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 animate-spin-slow opacity-30"></div>
                <div className="absolute inset-2 w-60 h-60 sm:w-76 sm:h-76 rounded-full bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 animate-pulse opacity-40"></div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 shadow-2xl border-4 border-white">
                  <img
                    src="/src/assest/my_image.jpg"
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

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-1/4 -left-4 sm:-left-8 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-60"></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
                Hello
              </h1>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Manager</h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-4">
                  Turning ideas into products that delight users and drive growth
                </p>
                <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                  Recently scaled Motor Insurance at Park+ achieving significant user growth through
                  strategic product decisions and cross-functional collaboration
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start items-center">
                <button
                  onClick={() => scrollToSection('experience')}
                  className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-center leading-tight">Experience</span>
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-center leading-tight">Skills</span>
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-center leading-tight">Contact</span>
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Product Manager passionate about building user-centric digital experiences
              that drive growth and deliver real impact
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">8</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Weeks</div>
              <div className="text-sm text-gray-600">From early stage to scale</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Park+</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Motor Insurance</div>
              <div className="text-sm text-gray-600">Product scaling success</div>
            </div>
          </div>

          {/* Key Traits */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full border border-pink-200/50 hover:shadow-md transition-all">
              <Target className="w-5 h-5 text-pink-600" />
              <span className="text-pink-800 font-medium">Strategic Thinker</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 hover:shadow-md transition-all">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-medium">User Advocate</span>
            </div>
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200/50 hover:shadow-md transition-all">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Innovation Leader</span>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">My Journey</h2>
            <p className="text-xl text-gray-600">Building impactful products that drive real growth</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✅</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Conversions</div>
                  <div className="text-xs text-gray-600">Quotes → Proposals → Purchase</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">🏗️</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">Scale Ready</div>
                  <div className="text-xs text-gray-600">Outbound calling & features</div>
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
      <section id="skills" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Skills</h2>
            <p className="text-xl text-gray-600">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Connect</h2>
            <p className="text-xl text-gray-600">
              Ready to discuss your next product challenge?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <a
              href="mailto:anushgupta105@gmail.com"
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200/50 hover:shadow-xl transition-all text-center hover:scale-105 duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">anushgupta105@gmail.com</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anush-gupta105/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all text-center hover:scale-105 duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600">Connect with me</p>
            </a>

            {/* Resume */}
            <button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all text-center w-full hover:scale-105 duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Resume</h3>
              <p className="text-gray-600">Download PDF</p>
            </button>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <span>Ready to drive your next product success story</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-t border-pink-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Anush Gupta</span>
            </div>
            <p className="text-gray-600 mb-6">
              Product Manager passionate about building impactful digital experiences
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:anushgupta105@gmail.com" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/anush-gupta105/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/solmyst" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                © 2025 Anush Gupta. reality without the escape.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;