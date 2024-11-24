import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink, Terminal, Code, Award, BookOpen } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      image: "/api/placeholder/400/300", // Replace with your project image
      buttons: [
        { label: "View Live", icon: <ExternalLink size={16} />, link: "https://your-ecommerce-site.com" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/yourusername/ecommerce" }
      ]
    },
    {
      title: "Weather Dashboard",
      description: "A real-time weather application that provides detailed forecasts, interactive maps, and weather alerts using OpenWeatherMap API.",
      image: "/api/placeholder/400/300", // Replace with your project image
      buttons: [
        { label: "Try It", icon: <ExternalLink size={16} />, link: "https://weather-dashboard-demo.com" },
        { label: "View Code", icon: <Github size={16} />, link: "https://github.com/yourusername/weather-app" }
      ]
    },
    {
      title: "Task Management App",
      description: "A Kanban-style project management tool built with React and Firebase. Features include drag-and-drop tasks, team collaboration, and real-time updates.",
      image: "/api/placeholder/400/300", // Replace with your project image
      buttons: [
        { label: "Documentation", icon: <FileText size={16} />, link: "https://docs.your-task-app.com" },
        { label: "GitHub", icon: <Github size={16} />, link: "https://github.com/yourusername/task-manager" }
      ]
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-4xl text-blue-500 font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer">
              Anush Gupta

            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`hover:text-blue-400 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-blue-500' : ''
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
      <section className="pt-32 pb-20 px-6">
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
      <section className="py-20 bg-gray-800">
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
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
      <section className="py-20 bg-gray-800">
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
      <section className="py-20">
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