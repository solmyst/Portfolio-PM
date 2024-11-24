import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Example of configuration object
const projectConfig = {
  title: "Your Project Name",
  description: "Your project description",
  image: "path/to/your/project-image.jpg",
  buttons: [
    {
      label: "Button Label",
      icon: null, // Replace with your imported IconComponent or other JSX
      link: "https://your-link.com"
    },
    // Add more button objects as needed
  ],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App config={projectConfig} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
