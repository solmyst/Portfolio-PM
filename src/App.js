/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, Terminal, Code, Award, 
  BookOpen, ArrowUp, Download, Database, Palette, LineChart, GitBranch, Layout, Speech , Users ,Target 
} from 'lucide-react';
import './Portfolio.css';
import ReactAppImage1 from './assest/ReactApp.png';
import ReactAppImage2 from './assest/Enhanced Magical Sand Art Creator-1.png';
import ReactAppImage3 from './assest/1729408542692.png';
import ReactAppImage4 from './assest/image4.png';
import ReactApppdf from './assest/Anush_Gupta_Software_Engineering_Resume.pdf';
import MobileNav from './MobileNav';
// import ReactAppPdf from "/assest/Anush_Gupta_Software_Engineering_Resume.pdf";

const AnimatedTitle = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const titles = [
    { text: "I'm Anush Gupta", color: "text-white" },
    { text: "A Product Manager", color: "text-cyan-400" },
    { text: "A Full Stack Developer", color: "text-pink-400" },
    { text: "A Passionate Student", color: "text-yellow-400" }
  ];

  const getAnimationClasses = () => {
    const animations = [
      'opacity-0 -translate-y-10 scale-90',
      'opacity-0 translate-y-10 scale-90',
      'opacity-0 -translate-x-10 scale-90',
      'opacity-0 translate-x-10 scale-90'
    ];
    return animations[titleIndex];
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 800);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-baseline space-x-4 mb-8">
      <span className="text-5xl md:text-7xl font-bold text-white relative">
        Hi,
        <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-pulse ml-1" />
      </span>
      
      <div className="relative">
        <span 
          className={`text-3xl sm:text-5xl md:text-7xl font-bold inline-block transition-all duration-700 ease-out
            ${isAnimating ? getAnimationClasses() : 'opacity-100 translate-x-0 translate-y-0 scale-100'}
            ${titles[titleIndex].color}`}
          onMouseEnter={() => setTitleIndex((prev) => (prev + 1) % titles.length)}
        >
          {titles[titleIndex].text}
        </span>
        
        <div 
          className={`absolute -bottom-2 left-0 h-0.5 transition-all duration-700 ease-out
            ${titles[titleIndex].color} opacity-50
            ${isAnimating ? 'w-0' : 'w-full'}`}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Core Competencies",
      icon: <Target className="w-6 h-6" />,
      barColor: "from-purple-600 to-purple-800",
      skills: [
        { name: "Data Structures & Algorithms", level: "Experienced" },
        { name: "Object-Oriented Design", level: "Advanced" },
        { name: "Artificial Intelligence (AI)", level: "Intermediate" },
        { name: "Machine Learning", level: "Intermediate" },
        { name: "Problem Solving", level: "Intermediate" },
        { name: "Web development", level: "Intermediate" },
        { name: "Team Collaboration", level: "Intermediate" },
        { name: "Software Development Lifecycle", level: "Intermediate" }
      ]
    },
    {
      title: "Technical Skills",
      icon: <Code className="w-6 h-6" />,
      barColor: "from-cyan-500 to-blue-500",
      skills: [
        { name: "C++", level: "Experienced" },
        { name: "Java", level: "Advanced" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "Python", level: "Intermediate" },
        { name: "React", level: "Intermediate" }
      ]
    },
    {
      title: "Development Tools",
      icon: <Terminal className="w-6 h-6" />,
      barColor: "from-orange-500 to-yellow-600",
      skills: [
        { name: "Git", level: "Experienced" },
        { name: "VS Code", level: "Experienced" },
        { name: "Intellij", level: "Experienced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Postman", level: "Intermediate" },
        { name: "JIRA", level: "Intermediate" }
      ]
    },
    {
      title: "Database & Analytics",
      icon: <Database className="w-6 h-6" />,
      barColor: "from-green-500 to-lime-600",
      skills: [
        { name: "SQL", level: "Intermediate" },
        { name: "MySQL", level: "Intermediate" },
        { name: "Amplitude", level: "Intermediate" },
        { name: "MoEngage", level: "Intermediate" }
      ]
    },
    {
      title: "Design & Product",
      icon: <Palette className="w-6 h-6" />,
      barColor: "from-pink-500 to-red-600",
      skills: [
        { name: "Product Flows", level: "Experienced" },
        { name: "UI/UX & Wireframing", level: "Advanced" },
        { name: "Whimsical", level: "Advanced" },
        { name: "Figma", level: "Intermediate" },
        { name: "Visily", level: "Intermediate" }
      ]
    },
    {
      title: "Soft Skills",
      icon: <Users className="w-6 h-6" />,
      barColor: "from-teal-500 to-blue-500",
      skills: [
        { name: "Communication", level: "Experienced" },
        { name: "Leadership", level: "Experienced" },
        { name: "Adaptability", level: "Experienced" },
        { name: "Critical Thinking", level: "Experienced" },
        { name: "Time Management", level: "Experienced" }
      ]
    }
  ];

  const getSkillWidth = (level) => {
    switch (level) {
      case "Experienced":
        return "90%";
      case "Advanced":
        return "75%";
      case "Intermediate":
        return "50%";
      case "Beginner":
        return "25%";
      default:
        return "0%";
    }
  };

  return (
    <div className="py-24 bg-gray-900 bg-opacity-60 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center text-white relative">
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl border border-gray-700 hover:border-blue-500"
            >
              <div className="flex items-center mb-6 text-blue-400">
                {category.icon}
                <h3 className="text-xl font-bold ml-3">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.barColor} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: getSkillWidth(skill.level) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  // References for each section
  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    achievements: useRef(null),
    contact: useRef(null)
  };

  // Scrolling function
  const scrollToSection = (sectionName) => {
    const section = sectionRefs[sectionName].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionName);
    }
  };

  // Scroll effect and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Determine active section
      const scrollPosition = window.scrollY;
      Object.keys(sectionRefs).forEach(section => {
        const element = sectionRefs[section].current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  const BackToTopButton = () => (
    isScrolled && (
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50 animate-bounce"
      >
        <ArrowUp size={24} />
      </button>
    )
  );

  const CurrentPosition = () => (
    <div className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block mb-6">
      <span className="font-semibold">Current Position:</span> Software Engineer / Product Manager Intern @ Park+
    </div>
  );

  const ResumeModal = () => (
    showResumeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Resume Options</h3>
          <div className="flex space-x-4">
            <a
              href="https://solmyst.github.io/Anush-Gupta---Resume/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg"
            >
              <ExternalLink size={16} />
              <span>View Resume</span>
            </a>
            <a
              href = {ReactApppdf}
              download="Anush-Gupta-Resume.pdf"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-lg"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>
          <button
            onClick={() => setShowResumeModal(false)}
            className="mt-4 text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    )
  );

  const projects = [
    {
      title: "Sand falling",
      description: "An interactive sand art simulator built with p5.js, featuring realistic particle physics and customizable effects for creating flowing sand patterns.",
      image: ReactAppImage2,
      buttons: [
        { label: "View Live", icon: <ExternalLink size={16} />, link: "https://solmyst.github.io/Sand-falling-project/" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/Sand-falling-project" }
      ]
    },
    {
      title: "Task Management App",
      description: "A Kanban-style project management tool built with React and Firebase. Features include drag-and-drop tasks, team collaboration, and real-time updates.",
      image: ReactAppImage1,
      buttons: [
        { label: "View live", icon: <ExternalLink size={16} />, link: "https://solmyst.github.io/task-managment/" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/task-managment" }
      ]
    },
    {
      title: "Health I'd Management",
      description: "A digital healthcare documentation prototype designed to streamline medical record-keeping in India, built with Python, Django, JavaScript, HTML, CSS, and MySQL.",
      image: ReactAppImage3,
      buttons: [
        { label: "View WireFrame", icon: <ExternalLink size={16} />, link: "https://friendly-bluebell-79c.notion.site/Wireframe-for-the-Health-I-d-Management-125a0fe59adb80689094f33db1f7b11b?pvs=4" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/Health-I-d-Managment" }
      ]
    },
     {
      title: "Anime Dunia - Anime and Manga Streaming Platform",
      description: "Developed Anime Dunia, a full-stack anime and manga streaming platform with features like video playback, a community forum for active discussions, and real-time updates on trending content. The site was built using Vite for fast development, React for dynamic user interfaces, and Tailwind CSS for responsive and modern styling.",
      image: ReactAppImage4,
      // buttons: [
      //   { label: "View WireFrame", icon: <ExternalLink size={16} />, link: "https://friendly-bluebell-79c.notion.site/Wireframe-for-the-Health-I-d-Management-125a0fe59adb80689094f33db1f7b11b?pvs=4" },
      //   { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/Health-I-d-Managment" }
      // ]
    }
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        <div className="flex flex-col items-center">
          <div className="loader mb-6"></div>
          <div className="text-2xl text-white font-bold animate-pulse">
            Loading Portfolio...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-300 hover:text-blue-200 transition-colors cursor-pointer">
              Anush Gupta
            </div>
            <MobileNav activeSection={activeSection} scrollToSection={scrollToSection} />
      <div className="hidden md:flex space-x-8">
        {['About',  'Skills', 'Projects','Experience', 'Achievements', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`hover:text-blue-300 transition-colors ${
              activeSection === item.toLowerCase() ? 'text-blue-400 font-semibold' : 'text-gray-300'
            }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={sectionRefs.about} className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <CurrentPosition />
            <AnimatedTitle />
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl animate-slide-up">
              A Computer Science student at JECRC University with expertise in C++, Java, and JavaScript. Passionate about tech, creative fields like photo/video editing, and continuous learning. I aim to contribute my skills to impactful projects and grow professionally.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com/solmyst" className="hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/anush-gupta105/" className="hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:anushgupta105@gmail.com" className="hover:text-blue-400 transition-colors">
                <Mail size={24} />
              </a>
              <button 
                onClick={() => setShowResumeModal(true)} 
                className="hover:text-blue-400 transition-colors"
              >
                <FileText size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
<section ref={sectionRefs.skills} className="py-20 bg-gray-800">
  <div className="container mx-auto px-6">
    <SkillsSection />
  </div>
</section>


      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-300">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={sectionRefs.experience} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          <div className="max-w-3xl mx-auto">
            <ExperienceCard
              title="Software Engineering Intern / Product Manager"
              company="Park+"
              date="Duration (June 2024 - July 2024)"
              description={[
                'Developed key features for the Phonebook product',
                'Implemented contact synchronization functionality',
                'Collaborated with senior developers',
                'Utilized Java and related technologies'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={sectionRefs.achievements} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AchievementCard
              icon={<Award size={32} />}
              title="Hackathon Runner-up"
              description="Secured second position in Hackathon, demonstrating innovation and technical expertise"
            />
            <AchievementCard
              icon={<Code size={32} />}
              title="Competitive Programming"
              description="Active participant on LeetCode, CodeChef, and Codeforces with strong problem-solving skills"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="py-20">
  <div className="container mx-auto px-6 text-center">
    {/* Heading and Message */}
    <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
    <p className="text-xl text-gray-400 mb-8">
      I'm always open to discussing new projects and opportunities.
    </p>
    
    {/* Contact Button */}
    <a
      href="mailto:anushgupta105@gmail.com"
      className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-3 rounded-lg font-semibold mb-8"
    >
      Get In Touch
    </a>

    {/* Direct Contact Info */}
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
        
        {/* Email Contact */}
        <div className="flex items-center space-x-3">
          <Mail size={24} className="text-blue-400" />
          <a href="mailto:anushgupta105@gmail.com" className="hover:text-blue-400 transition-colors">
            anushgupta105@gmail.com
          </a>
        </div>

        {/* LinkedIn Contact */}
        <div className="flex items-center space-x-3">
          <Linkedin size={24} className="text-blue-400" />
          <a href="https://linkedin.com/in/anush-gupta105/" className="hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Copyright Section */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>Copyright © 2024 Anush Gupta. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Resume Modal */}
      <ResumeModal />
    </div>
  );
};

const ProjectCard = ({ title, description, image, buttons }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group rounded-lg overflow-hidden bg-gray-800 transition-all duration-300 flex flex-col h-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <img 
        src={image} 
        alt={title} 
        className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />

      
      <div className={`absolute inset-0 bg-gray-900 bg-opacity-90 transition-opacity duration-300 flex flex-col justify-center items-center p-6 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-center mb-6">{description}</p>
        
        {/* Action Buttons */}
        <div className="flex space-x-4">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg"
            >
              {button.icon}
              <span>{button.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ icon, title, skills }) => (
  <div className="p-6 bg-gray-700 rounded-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-4 text-blue-400">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <ul className="space-y-2">
      {skills.map((skill) => (
        <li key={skill} className="text-gray-300">{skill}</li>
      ))}
    </ul>
  </div>
);

const ExperienceCard = ({ title, company, date, description }) => (
  <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-blue-400 mb-2">{company}</p>
    <p className="text-gray-400 mb-4">{date}</p>
    <ul className="space-y-2">
      {description.map((item, index) => (
        <li key={index} className="text-gray-300 flex items-start">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const AchievementCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-700 rounded-lg hover:scale-105 transition-transform">
    <div className="flex items-center mb-4 text-blue-400">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Portfolio;
