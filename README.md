# Fullstack Authentication App with Discussion Forum

A complete fullstack authentication application with React frontend and Node.js/Express backend, featuring a Discussion Forum accessible after login.

## Features

### Authentication System
- User signup and login
- JWT-based authentication
- Protected routes
- MongoDB database
- Password hashing with bcrypt
- Modern React with hooks and context API
- Responsive UI design

### Discussion Forum
- View recent and all discussion topics
- Create new topics with categories
- Reply to topics
- Real-time updates
- User-specific topic creation (uses logged-in user's name)
- Beautiful red-themed UI matching original design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router
- Axios
- Context API for state management
- Vite for build tooling

## Project Structure

```
fullstack-auth-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Edit `.env` file
   - Update `MONGO_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure secret key

4. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - Register new user
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  
- `GET /api/auth/profile` - Get user profile (Protected)
  - Headers: `Authorization: Bearer <token>`

## Usage

1. Start MongoDB service
2. Run backend server: `cd backend && npm run dev`
3. Run frontend server: `cd frontend && npm run dev`
4. Open browser to http://localhost:3000
5. Sign up with a new account
6. Login with your credentials
7. Access the protected home page

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fullstack-auth
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected routes on both frontend and backend
- HTTP-only cookies support (can be enabled)
- CORS enabled for cross-origin requests

## Future Enhancements

- Email verification
- Password reset functionality
- Social authentication (Google, Facebook)
- User profile updates
- Role-based access control
- Refresh tokens

## License

ISC
