import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, Terminal, Code, Award, BookOpen, ArrowUp } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const projects = [
    {
      title: "Sand falling",
      description: "An interactive web-based sand art simulator that allows users to create beautiful, flowing sand patterns with various effects and controls. Built using p5.js, this project simulates particle physics to create a realistic sand-falling effect with customizable properties.",
      image: "/api/placeholder/400/300",
      buttons: [
        { label: "View Live", icon: <ExternalLink size={16} />, link: " https://solmyst.github.io/Sand-falling-project/" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/Sand-falling-project" }
      ]
    },
    {
      title: "Task Management App",
      description: "A Kanban-style project management tool built with React and Firebase. Features include drag-and-drop tasks, team collaboration, and real-time updates.",
      image: "\public\image.png",
      buttons: [
        { label: "View live", icon: <ExternalLink  size={16} />, link: " https://solmyst.github.io/task-managment/" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/solmyst/task-managment" }
      ]
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
            <div className="hidden md:flex space-x-8">
              {[ 'About', 'Experience', 'Skills', 'Projects','Achievements', 'Contact'].map((item) => (
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Hi, I'm Anush Gupta
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl animate-slide-up">
              A passionate Software Engineer focused on building innovative solutions and solving complex problems.
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
              <a href="https://solmyst.github.io/Anush-Gupta---Resume/" className="hover:text-blue-400 transition-colors">
                <FileText size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={sectionRefs.skills} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillCard
              icon={<Code size={32} />}
              title="Languages"
              skills={['C++', 'Java', 'Python', 'JavaScript', 'C']}
            />
            <SkillCard
              icon={<Terminal size={32} />}
              title="Development"
              skills={['Data Structures', 'Algorithms', 'OOP', 'Problem Solving']}
            />
            <SkillCard
              icon={<BookOpen size={32} />}
              title="Tools"
              skills={['Git', 'VS Code', 'Eclipse', 'Command Line']}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-300">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              title="Software Engineering Intern"
              company="Park Plus"
              date="Duration (Month Year - Month Year)"
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
              description="Secured second position in Hackathon , demonstrating innovation and technical expertise"
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
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="text-xl text-gray-400 mb-8">
            I'm always open to discussing new projects and opportunities.
          </p>
          <a
            href="mailto:anushgupta105@gmail.com"
            className="inline-block bg-blue-500 hover:bg-blue-600 transition-colors px-8 py-3 rounded-lg font-semibold"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

const ProjectCard = ({ title, description, image, buttons }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group rounded-lg overflow-hidden bg-gray-800 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Overlay with project info */}
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