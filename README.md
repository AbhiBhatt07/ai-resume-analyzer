# Resumind - AI Resume Analyzer

🚀 An AI-powered web application that analyzes resumes and provides instant ATS (Applicant Tracking System) scores with detailed improvement suggestions tailored to specific job applications.

## ✨ Features

- 📄 **PDF Resume Upload** - Drag & drop or click to upload
- 🤖 **AI-Powered Analysis** - Powered by Multiple AI
- 📊 **ATS Score Calculation** - Get scored from 0-100
- 💡 **Detailed Feedback** - Tone & Style, Content, Structure, and Skills analysis
- 🎯 **Job Matching** - Personalized recommendations based on job description
- 📋 **Resume Dashboard** - Track all your uploaded resumes
- 🔐 **User Authentication** - Secure login via Puter.js

## 🛠️ Tech Stack

### Frontend Framework
| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.2.3 | UI Library (Latest) |
| React Router | 7.10.1 | Full-stack framework with SSR |
| TypeScript | 5.9.2 | Type-safe JavaScript |

### Build & Dev Tools
| Technology | Version | Description |
|------------|---------|-------------|
| Vite | 7.1.7 | Fast build tool |
| Node.js | 20 | Runtime (Alpine) |

### Styling
| Technology | Version | Description |
|------------|---------|-------------|
| Tailwind CSS | 4.1.13 | Utility-first CSS |
| tw-animate-css | 1.4.0 | CSS Animations |
| tailwind-merge | 3.4.0 | Class merging utility |
| clsx | 2.1.1 | Conditional classes |

### State Management
| Technology | Version | Description |
|------------|---------|-------------|
| Zustand | 5.0.9 | Lightweight state management |

### AI & Backend Services
| Technology | Description |
|------------|-------------|
| Puter.js | Cloud platform for AI, Storage, KV Database & Auth |
| Claude Opus 4.1 | AI model for resume analysis |

### PDF Processing
| Technology | Version | Description |
|------------|---------|-------------|
| pdfjs-dist | 5.4.449 | PDF parsing |
| canvas | 3.2.0 | PDF to image conversion |

### UI Components
| Technology | Version | Description |
|------------|---------|-------------|
| Lucide React | 0.562.0 | Modern icon library |
| react-dropzone | 14.3.8 | File upload component |

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-resume-analyzer.git

# Navigate to project directory
cd ai-resume-analyzer

# Install dependencies
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Type Checking

```bash
npm run typecheck
```

## 📦 Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 🐳 Docker Deployment

To build and run using Docker:

```bash
# Build the image
docker build -t resumind .

# Run the container
docker run -p 3000:3000 resumind
```

### Supported Platforms

The containerized application can be deployed to:

- ☁️ AWS ECS
- 🌐 Google Cloud Run
- 🔷 Azure Container Apps
- 🌊 Digital Ocean App Platform
- ✈️ Fly.io
- 🚂 Railway

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/      # React components
│   │   ├── Accordion.tsx
│   │   ├── ATS.tsx
│   │   ├── Details.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── ScoreBadge.tsx
│   │   ├── ScoreCircle.tsx
│   │   ├── ScoreGauge.tsx
│   │   └── Summary.tsx
│   ├── lib/             # Utility functions
│   │   ├── pdf2img.ts
│   │   ├── puter.ts
│   │   └── utils.ts
│   ├── routes/          # App routes
│   │   ├── auth.tsx
│   │   ├── home.tsx
│   │   ├── resume.tsx
│   │   ├── upload.tsx
│   │   └── wipe.tsx
│   ├── app.css
│   ├── root.tsx
│   └── routes.ts
├── constants/           # App constants
├── public/              # Static assets
├── types/               # TypeScript definitions
├── Dockerfile
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

## 🎯 How It Works

1. **Upload Resume** - Upload your PDF resume via drag & drop
2. **Add Job Details** - Enter company name, job title, and job description
3. **AI Analysis** - Claude Opus 4.1 analyzes your resume
4. **Get Feedback** - Receive detailed scores and improvement tips for:
   - ATS Compatibility
   - Tone & Style
   - Content Quality
   - Structure & Layout
   - Skills Presentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React Router, Puter.js & Claude AI
