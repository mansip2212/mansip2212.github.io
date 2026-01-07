# Portfolio - Mansi Patel

A modern, interactive portfolio website showcasing my projects, experience, and skills as a Full-Stack Engineer with expertise in AI/ML, DevSecOps, and Cloud Security.

**Live Site**: [https://mansip2212.github.io/](https://mansip2212.github.io/)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark, futuristic design** with smooth animations and transitions
- **Responsive layout** that works perfectly on all devices
- **Space-themed background** video for immersive experience
- **Modern card-based project showcase** with AI-generated images

### 🤖 AI-Powered Recruiter Assistant
- **Intelligent chatbot** powered by Google Gemini 2.5
- **Recruiter-focused responses** with full resume knowledge
- **Markdown-formatted responses** with proper formatting (bold, lists, headers)
- **Real-time conversation** with conversation history
- **Context-aware suggestions** for common recruiter questions

### 📱 Portfolio Sections
- **Landing Page** - Eye-catching introduction with space background
- **About** - Personal story and core skills
- **Experience** - Professional experience with detailed achievements
- **Projects** - Showcase of technical projects with metrics and impact
- **Hobbies** - Personal interests and passions
- **Contact** - Get in touch section

### 🎯 Technical Highlights
- Fast, optimized performance with Vite
- SEO-friendly routing with React Router
- Modern UI components with Tailwind CSS
- Type-safe development patterns

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Generative AI (Gemini 2.5)** - AI chatbot backend

### Deployment
- **GitHub Pages** - Frontend hosting
- **Vercel** - Backend API hosting with secure environment variables

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mansip2212/your-repo-name.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # For production API (optional - set during build)
   VITE_API_URL=https://your-api-url.vercel.app/api/chat
   ```

   For local development, the proxy in `vite.config.js` will handle API calls.

4. **Start development server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` to see the portfolio.

### Backend Setup (Optional for Local Development)

If you want to run the backend locally:

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file in server directory**
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001/api/chat`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and prepare for deployment

## 🌐 Deployment

This portfolio is configured for automatic deployment:

### Frontend (GitHub Pages)
- Automatic deployment via GitHub Actions on push to `main` branch
- Configured to deploy to `https://mansip2212.github.io/`

### Backend (Vercel)
- Deployed separately to keep API keys secure
- API key stored in Vercel environment variables (never exposed)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) or [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

## 🔒 Security

- ✅ API keys stored securely in Vercel environment variables
- ✅ `.env` files are gitignored and never committed
- ✅ All API calls go through secure backend
- ✅ No sensitive data exposed in frontend code

## 📁 Project Structure

```
my-portfolio/
├── public/              # Static assets
│   ├── me.JPG          # Profile image
│   ├── projects/       # Project images
│   └── videos/         # Background videos
├── src/
│   ├── components/     # React components
│   │   └── llm/       # AI chatbot components
│   ├── Pages/         # Page components
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── server/            # Backend API (deployed separately)
│   ├── index.js       # Express server
│   └── package.json   # Server dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions workflow
└── package.json       # Frontend dependencies
```

## 🎨 Customization

### Adding Projects
Edit `src/Pages/Projects.jsx` to add or modify projects. Each project supports:
- Title and subtitle
- AI-generated images (place in `public/projects/`)
- Impact metrics
- Technology tags
- Links (live demo, GitHub)

### Updating Resume Information
Edit the following files:
- **Experience**: `src/Pages/Experience.jsx`
- **About/Skills**: `src/Pages/About.jsx`
- **Chatbot Knowledge**: `src/components/llm/portfolioContext.js`

### Styling
- Tailwind CSS is used throughout
- Main styles in `src/index.css`
- Component-specific styles use Tailwind classes

## 🤝 Contributing

This is a personal portfolio project. If you'd like to use it as a template for your own portfolio:

1. Fork the repository
2. Customize the content for your profile
3. Update the deployment configuration
4. Deploy to your own domain

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Mansi Patel**
- Portfolio: [https://mansip2212.github.io/](https://mansip2212.github.io/)
- Email: mansip.220701@gmail.com
- Location: Tempe, AZ (Remote-friendly)

## 🙏 Acknowledgments

- Background video from Pexels
- Icons from Lucide React
- Built with React and Vite
- Powered by Google Gemini AI

---

⭐ If you find this portfolio inspiring, feel free to star the repository!
