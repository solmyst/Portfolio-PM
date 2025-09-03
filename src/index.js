import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Product Manager Portfolio Configuration
const projectConfig = {
  title: "Product Growth Portfolio",
  description: "Scaling products from early stage to 180% growth through strategic product management",
  image: "/public/React App-1.png",
  buttons: [
    {
      label: "View Growth Results",
      icon: null,
      link: "#skills"
    },
    {
      label: "Download Resume",
      icon: null,
      link: "./assest/Anush_Gupta_Software_Engineering_Resume.pdf"
    }
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
