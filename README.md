# 🎬 Next Superhero Movie

[![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=for-the-badge&logo=vercel)](https://www.nextsuperheromovie.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

A dynamic web application that tracks upcoming superhero movies with real-time countdown timers, featuring Marvel, DC, and Sony franchises. Built with modern full-stack technologies and deployed on Vercel.

## 🚀 **Live Demo**

**🔗 [Visit nextsuperheromovie.com](https://www.nextsuperheromovie.com/)**

## ✨ **Project Overview**

Next Superhero Movie is a full-stack application that helps movie fans stay updated on upcoming superhero releases. The application features:

- **Real-time Countdown Timer** - Dynamic countdown to the next movie release
- **Multi-Franchise Support** - Track Marvel, DC, and Sony movies separately  
- **Responsive Design** - Optimized for all devices with Tailwind CSS
- **Movie Trailers** - Embedded YouTube trailers for upcoming releases
- **Phase-based Organization** - Movies organized by phases/eras
- **Theme Switching** - Franchise-specific visual themes

## 🛠 **Tech Stack**

### Frontend
- **React 18.2.0** - Modern React with hooks and context
- **React Router 6.22.3** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first styling with custom themes
- **React YouTube 10.1.0** - YouTube video integration

### Backend
- **Node.js with Express 4.19.2** - RESTful API server
- **MongoDB with Mongoose 8.3.0** - NoSQL database with ODM
- **CORS 2.8.5** - Cross-origin resource sharing

### Deployment & Tools
- **Vercel** - Frontend and backend hosting
- **dotenv** - Environment variable management
- **Nodemon** - Development hot reload

## 🏗 **Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                          VERCEL HOSTING                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                 ┌────────────────────┐     │
│  │   FRONTEND      │◄────────────────┤    BACKEND API     │     │
│  │   React App     │     HTTP/HTTPS  │    Express.js      │     │
│  │                 │                 │                    │     │
│  │ • React Router  │                 │ • /api/movies      │     │
│  │ • Context API   │                 │ • CORS enabled     │     │
│  │ • Tailwind CSS  │                 │ • Error handling   │     │
│  │ • YouTube API   │                 │                    │     │
│  └─────────────────┘                 └────────────────────┘     │
│                                               │                 │
│                                               ▼                 │
│                                    ┌─────────────────┐          │
│                                    │   MONGODB       │          │
│                                    │   DATABASE      │          │
│                                    │                 │          │
│                                    │ • Movies Collection        │
│                                    │ • Automated Queries        │
│                                    │ • Date-based Filtering     │
│                                    │ • Real-time Updates        │
│                                    └─────────────────┘          │
└─────────────────────────────────────────────────────────────────┘

Data Flow:
1. User visits nextsuperheromovie.com
2. React app fetches movie data from API
3. Express server queries MongoDB
4. Real-time countdown updates in browser
5. Theme switches based on franchise selection
```

## 📁 **Project Structure**

```
nextsuperheromovie/
├── frontend/                          # React frontend application
│   ├── public/                        # Static assets
│   │   ├── index.html                 # HTML template
│   │   └── manifest.json              # PWA manifest
│   ├── src/
│   │   ├── components/                # React components
│   │   │   ├── movie/                 # Movie-related components
│   │   │   │   ├── Countdown.js       # Real-time countdown timer
│   │   │   │   ├── NextMovieDisplay.js # Main movie display
│   │   │   │   ├── MovieTrailer.js    # YouTube trailer embed
│   │   │   │   └── PhaseSelector.js   # Phase filtering
│   │   │   ├── navigation/            # Navigation components
│   │   │   └── backgrounds/           # Visual effects
│   │   ├── context/                   # React Context providers
│   │   │   ├── MovieContext.js        # Movie state management
│   │   │   ├── ThemeContext.js        # Theme switching
│   │   │   └── LoadingContext.js      # Loading states
│   │   ├── pages/                     # Route components
│   │   └── utils/                     # Utility functions
│   ├── tailwind.config.js             # Tailwind configuration
│   └── package.json                   # Frontend dependencies
├── backend/                           # Express.js backend
│   ├── controllers/
│   │   └── movieController.js         # Business logic
│   ├── models/
│   │   └── movieModel.js              # MongoDB schema
│   ├── routes/
│   │   └── movies.js                  # API routes
│   ├── index.js                       # Server entry point
│   ├── vercel.json                    # Vercel deployment config
│   └── package.json                   # Backend dependencies
└── README.md                          # Project documentation
```

## 🌍 **Environment Variables**

### Backend (.env)
```bash
# MongoDB Configuration
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password  
DB_CLUSTER=your_cluster_url
DB_NAME=your_database_name

# Server Configuration
PORT=5000
FRONTEND=https://your-frontend-url.com
```

### Frontend (.env)
```bash
# API Configuration
REACT_APP_API_URL=https://your-backend-url.com/
```

## 🚀 **Installation & Setup**

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Step-by-step Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nextsuperheromovie.git
cd nextsuperheromovie
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env  # Create and configure environment variables
npm run dev
```

3. **Setup Frontend** 
```bash
cd ../frontend
npm install  
cp .env.example .env  # Configure API URL
npm start
```

4. **Configure MongoDB**
- Create MongoDB Atlas cluster
- Add connection string to backend `.env`
- Import sample movie data (optional)

5. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔌 **API Endpoints**

### Movies API

| Method | Endpoint | Description | Response |
|--------|----------|-------------|-----------|
| `GET` | `/api/movies` | Fetch all movies | Array of movie objects |
| `POST` | `/api/movies` | Create new movie | Created movie object |
| `GET` | `/` | Health check | Connection status |

### Example API Responses

**GET /api/movies**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Spider-Man: No Way Home",
    "releaseDate": "2024-07-26T00:00:00.000Z",
    "phase": "Phase 4",
    "trailerLink": "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    "createdAt": "2023-01-15T10:30:00.000Z",
    "updatedAt": "2023-01-15T10:30:00.000Z"
  }
]
```

**POST /api/movies**
```json
{
  "title": "Avengers: Secret Wars",
  "releaseDate": "2025-05-01T00:00:00.000Z", 
  "phase": "Phase 6",
  "trailerLink": "https://www.youtube.com/watch?v=example"
}
```

## 📊 **Database Schema**

### Movies Collection
```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true  
  },
  phase: {
    type: String,
    required: false
  },
  trailerLink: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Deadpool & Wolverine",
  "releaseDate": "2024-07-26T00:00:00.000Z",
  "phase": "Phase 5", 
  "trailerLink": "https://www.youtube.com/watch?v=73_1biulkYk",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## ⚡ **Key Features Implementation**

### 🕒 **Real-time Countdown Timer**
**Location:** `frontend/src/components/movie/Countdown.js:9-29`

```javascript
const calculateCountdown = () => {
  const difference = new Date(releaseDate) - new Date();
  const totalSeconds = Math.max(0, Math.floor(difference / 1000));
  const months = Math.floor(totalSeconds / (3600 * 24 * 30.44));
  const days = Math.floor((totalSeconds % (3600 * 24 * 30.44)) / (3600 * 24));
  // ... hours, minutes, seconds calculation
  return { months, days, hours, minutes, seconds };
};
```
- Updates every second using `setInterval`
- Calculates months, days, hours, minutes, seconds
- Handles movie release state automatically

### 🎭 **Dynamic Theme Switching**
**Location:** `frontend/src/index.css:27-50`

```css
[data-theme='marvel'] {
  --accent: #f00c13;
  --title-color: #1e1e24;
}

[data-theme='dc'] {
  --accent: #263f75;
  --title-color: #ffcf0f;
}
```
- CSS custom properties for theme variables
- React Context manages active theme
- Smooth transitions between themes

### 📱 **Movie Data Management**
**Location:** `frontend/src/context/MovieContext.js:89-98`

```javascript
const getNewestUpcomingMovie = useCallback((movieList) => {
  const today = new Date();
  const upcomingMovies = movieList
    .filter((movie) => new Date(movie.releaseDate) > today)
    .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  
  return upcomingMovies[0] || null;
}, []);
```
- Context API for global state management
- Automatic upcoming movie selection
- Phase-based filtering and organization

## 🎯 **Performance & Optimizations**

### Frontend Optimizations
- **React.memo** and **useCallback** for component optimization
- **Lazy loading** with dynamic imports
- **ResizeObserver** for smooth height transitions
- **Tailwind CSS** for minimal bundle size

### Backend Optimizations  
- **MongoDB indexing** on release dates
- **CORS configuration** for security
- **Error handling** middleware
- **Environment-based configuration**

### Deployment Optimizations
- **Vercel Edge Functions** for API routes
- **Static generation** for faster loading
- **CDN distribution** for global performance
- **Automatic HTTPS** and compression

## 🔧 **Development Scripts**

### Frontend
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
npm run dev        # Development with nodemon
```

### Backend
```bash
npm run dev        # Start with nodemon
node index.js      # Start production server
```

## 🚀 **Deployment**

This application is optimized for Vercel deployment:

1. **Backend Deployment**
   - Automatic deployment via `vercel.json`
   - Environment variables configured in Vercel dashboard
   - MongoDB Atlas for database hosting

2. **Frontend Deployment**
   - React build optimization
   - Environment variables for API endpoints
   - CDN distribution for static assets

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**⭐ Star this repository if you found it helpful!**

**🔗 Live Demo: [nextsuperheromovie.com](https://www.nextsuperheromovie.com/)**
