# Portfolio Website

A modern, responsive portfolio website built to showcase professional work, projects, and skills.

## 🚀 Features

- Responsive design that works seamlessly across desktop, tablet, and mobile devices
- Dark/light mode theme switching
- Dynamic project showcase with filterable categories
- Integrated blog section for technical writing and updates
- Contact form with form validation
- SEO optimized
- Fast loading performance with optimized assets
- Accessible following WCAG guidelines

## 🛠️ Technologies Used

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Form Handling:** React Hook Form
- **Deployment:** Vercel
- **Content Management:** Markdown
- **Version Control:** Git

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/solmyst/portfolio.git
```

2. Navigate to the project directory:
```bash
cd portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_PUBLIC_CONTACT_EMAIL=your-email
```

### Content Management

- Project data is stored in `data/projects.js`
- Blog posts are stored in `content/blog`
- Update personal information in `data/profile.js`

## 📝 Project Structure

```
portfolio-website/
├── components/        # Reusable React components
├── pages/            # Next.js pages and API routes
├── public/           # Static assets
├── styles/          # Global styles and Tailwind config
├── content/         # Markdown content
├── data/            # JSON/JS data files
├── lib/             # Utility functions
└── tests/           # Test files
```

## 🚀 Deployment

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy!

Alternatively, deploy manually:
```bash
npm run build
npm run start
```

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📱 Performance Optimization

- Images are automatically optimized using Next.js Image component
- Code splitting and lazy loading implemented for better performance
- Asset minification in production builds
- Caching strategies implemented for faster load times

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License 
## 👏 Acknowledgments

- Icons provided by [Heroicons](https://heroicons.com)

## 📞 Support

For support, email anushgupta105@gmail.com or open an issue in the repository.
