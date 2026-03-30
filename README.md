# MentorLink - CybageKhushboo Charitable Trust

> A structured mentorship platform connecting **CybageKhushboo scholars** with **Cybage Software employee mentors**, providing guidance on career development, technical skills, soft skills, and professional growth.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)

---

## Features

### For Scholars (Mentees)
- Complete mentee dashboard with personal profile
- Need analysis form to identify learning goals and challenges
- Schedule and track mentorship sessions
- Access to curated learning modules
- Session feedback and mentor ratings
- Profile management with upload to Cloudinary

### For Mentors
- Mentor dashboard showing assigned scholars
- View and manage mentorship sessions
- Provide session summaries and feedback
- Track mentee progress and ratings
- Profile showcase with expertise and availability

### For Administrators
- User management (create, view, deactivate users)
- Automated mentor-mentee matching algorithm
- Session management and oversight
- Module creation and resource upload
- Analytics and reporting dashboard
- All user roles: Admin, Mentor, Mentee, Alumni, Volunteer

### Public Pages
- Homepage with platform overview
- Scholarship program information
- About and contact pages
- Testimonials from previous participants

---

## Tech Stack

### Frontend
- **React 18.2** — UI library
- **React Router v6** — Client-side routing
- **Tailwind CSS** — Utility-first CSS framework
- **Axios** — HTTP client for API calls
- **React Hot Toast** — Toast notifications
- **Heroicons** — Icon library

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — NoSQL database & ODM
- **JWT (jsonwebtoken)** — Authentication & authorization
- **bcryptjs** — Password hashing
- **Nodemailer** — Email notifications
- **Cloudinary** — Image storage & CDN
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Deployment
- **Render** — Backend hosting (Node.js)
- **Vercel** — Frontend hosting (React)
- **MongoDB Atlas** — Cloud database

---

## Project Structure

```text
mentorlink-cybage-khushboo/
|-- README.md
|-- package.json                        (root scripts)
|-- client/                             (React frontend - Port 3000)
|   |-- package.json
|   |-- tailwind.config.js
|   |-- vercel.json
|   |-- public/
|   |   `-- index.html
|   |-- src/
|   |   |-- App.js
|   |   |-- index.js
|   |   |-- index.css
|   |   |-- components/
|   |   |   |-- Navbar.js
|   |   |   |-- Footer.js
|   |   |   `-- DashboardLayout.js
|   |   |-- context/
|   |   |   `-- AuthContext.js          (Auth state management)
|   |   |-- pages/
|   |   |   |-- LoginPage.js
|   |   |   |-- RegisterPage.js
|   |   |   |-- ForgotPassword.js
|   |   |   |-- ResetPassword.js
|   |   |   |-- public/                 (Unauthenticated routes)
|   |   |   |-- mentee/                 (Mentee dashboard)
|   |   |   |-- mentor/                 (Mentor dashboard)
|   |   |   `-- admin/                  (Admin dashboard)
|   |   `-- utils/
|   |       `-- api.js                  (Axios instance and API config)
|   `-- build/                          (Production build)
`-- server/                             (Node.js backend - Port 5000)
  |-- package.json
  |-- index.js                        (Express app setup)
  |-- controllers/                    (Business logic)
  |-- middleware/
  |-- models/                         (MongoDB schemas)
  |-- routes/                         (API endpoints)
  `-- utils/
    `-- matching.js                 (Mentor-mentee matching logic)
```



---

## Quick Start

### Prerequisites
- **Node.js** v14+ (with npm or yarn)
- **MongoDB Atlas** account (free tier available)
- **Git** for version control

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/mentorlink-ck.git
cd mentorlink-ck
```

### Step 2: Install Dependencies
```bash
# Option A: Install all at once
npm run install-all

# Option B: Install separately
cd server && npm install
cd ../client && npm install
```

### Step 3: Setup MongoDB
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Add IP address `0.0.0.0/0` to network access whitelist
5. Click "Connect" and copy the **Connection String**
   - Format: `mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/mentorlink_cybage?retryWrites=true&w=majority`

### Step 4: Configure Environment Variables
```bash
cd server
cp .env.example .env
nano .env  # Edit with your values
```

### Step 5: Start Development Servers

**Option A: Run both servers simultaneously**
```bash
npm run dev
```

**Option B: Run servers in separate terminals**

Terminal 1 (Backend):
```bash
cd server
npm run dev
# Server running at http://localhost:5000
```

Terminal 2 (Frontend):
```bash
cd client
npm start
# Frontend running at http://localhost:3000
```

**Login with default admin credentials:**
- Email: `admin@cybage.com`
- Password: `admin123`

---

## Environment Variables

### Backend (`server/.env`)
```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/mentorlink_cybage?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Gmail SMTP)
# Use Gmail App Password, not your regular password
# How to create App Password: https://support.google.com/accounts/answer/185833
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=CybageKhushboo MentorLink <noreply@mentorlink.com>

# Frontend URL (for CORS & email links)
CLIENT_URL=https://mentorlink-cybage.vercel.app
```

### Frontend (`client/.env`)
```env
REACT_APP_API_URL=https://mentorlink-cybage.onrender.com
```

**Note:** Email Service and Cloudinary are **optional** for local testing. The app will work with just `MONGO_URI` and `JWT_SECRET`.

---

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin | mentor | mentee | alumni | volunteer),
  
  // Profile
  phone: String,
  gender: String,
  profilePhoto: String (Cloudinary URL),
  linkedIn: String,
  city: String,
  
  // For Mentors
  employeeId: String,
  department: String,
  designation: String,
  yearsAtCybage: Number,
  languagesKnown: [String],
  expertise: [String],
  
  // For Mentees
  college: String,
  year: String,
  stream: String,
  scholarshipId: String,
  
  // Matching & Status
  assignedMentor: ObjectId (ref: User),
  assignedMentees: [ObjectId] (ref: User),
  isMatched: Boolean,
  isActive: Boolean,
  needAnalysisCompleted: Boolean,
  
  // Password Reset
  passwordResetToken: String,
  passwordResetExpire: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

### Session Model
```javascript
{
  mentor: ObjectId (ref: User),
  mentee: ObjectId (ref: User),
  topic: String (Introduction Call | Career Development | Communication Skills | Interview Preparation | Technical Skills | Soft Skills | Resume Building | Higher Education Guidance | Other),
  date: Date,
  startTime: String,
  endTime: String,
  duration: String,
  meetingLink: String,
  agenda: String,
  status: String (upcoming | completed | cancelled),
  summary: String,
  mentorFeedback: String,
  menteeFeedback: String,
  menteeRating: Number (1-5),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Module Model
```javascript
{
  title: String,
  description: String,
  order: Number,
  coverImage: String (Cloudinary URL),
  resources: [{
    fileName: String,
    fileUrl: String,
    fileType: String (pdf | ppt | pptx | doc | docx | video | other),
    uploadedAt: Date
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### NeedAnalysis Model
```javascript
{
  mentee: ObjectId (ref: User, unique),
  careerGoal: String,
  biggestChallenge: String,
  ratings: {
    careerClarity: Number (1-5),
    communicationSkills: Number (1-5),
    technicalSkills: Number (1-5),
    interviewReadiness: Number (1-5),
    softSkills: Number (1-5),
    resumeStrength: Number (1-5)
  },
  preferredMode: String,
  preferredLanguage: [String],
  willingToMeet: String,
  specificHelp: String,
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user profile | Yes |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password/:token` | Reset password with token | No |
| PUT | `/update-profile` | Update user profile | Yes |

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all users | Yes (Admin) |
| GET | `/:id` | Get user by ID | Yes |
| PUT | `/:id` | Update user | Yes (Admin/Owner) |
| PUT | `/:id/photo` | Upload profile photo | Yes |

### Session Routes (`/api/sessions`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new session | Yes (Mentor) |
| GET | `/` | Get sessions (filtered by role) | Yes |
| GET | `/:id` | Get session details | Yes |
| PUT | `/:id` | Update session | Yes (Mentor) |
| PUT | `/:id/feedback` | Add feedback to session | Yes |
| PUT | `/:id/status` | Update session status | Yes (Mentor/Admin) |

### Module Routes (`/api/modules`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all active modules | Yes |
| POST | `/` | Create new module | Yes (Admin) |
| GET | `/:id` | Get module details | Yes |
| PUT | `/:id` | Update module | Yes (Admin) |
| POST | `/:id/resources` | Upload resource to module | Yes (Admin) |
| DELETE | `/:id` | Delete module | Yes (Admin) |

### Need Analysis Routes (`/api/need-analysis`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Submit need analysis | Yes (Mentee) |
| GET | `/` | Get all need analyses | Yes (Admin) |
| GET | `/:id` | Get need analysis by mentee | Yes |
| PUT | `/:id` | Update need analysis | Yes (Mentee/Admin) |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/match` | Run mentor-mentee matching | Yes (Admin) |
| GET | `/dashboard` | Admin dashboard stats | Yes (Admin) |
| GET | `/users/stats` | User statistics | Yes (Admin) |
| PUT | `/users/:id/status` | Activate/deactivate user | Yes (Admin) |

---

## Deployment

### Backend - Render.com (Free)

1. Push your code to GitHub (public or private)
2. Go to [render.com](https://render.com) and sign up
3. Click **New** -> **Web Service**
4. Connect your GitHub repository
5. Configure:
  - **Name:** `mentorlink-cybage`
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables (Settings -> Environment):
   - Copy all variables from your `.env` file
   - Make sure `CLIENT_URL` points to your Vercel URL
7. Click **Create Web Service**
8. Wait for deployment (2-5 minutes)
9. Copy your Render URL: `https://mentorlink-cybage.onrender.com`

### Frontend - Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **Add New** -> **Project**
3. Import your GitHub repository
4. Configure:
    - **Project Name:** `mentorlink-cybage`
   - **Framework:** React
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Add environment variables:
    - `REACT_APP_API_URL` = `https://mentorlink-cybage.onrender.com`
6. Click **Deploy**
7. Wait for deployment (1-3 minutes)
8. Your frontend URL: `https://mentorlink-cybage.vercel.app`

### Post-Deployment Checklist
- [ ] Test login functionality
- [ ] Verify email notifications are sending
- [ ] Check image uploads to Cloudinary
- [ ] Test mentor-mentee matching
- [ ] Verify session scheduling
- [ ] Test password reset flow

---

## Initial Setup After Deployment

### Create First Admin User

**Option 1: Using curl**
```bash
curl -X POST https://mentorlink-cybage.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@cybage.com",
    "password": "ChangeMe123!",
    "role": "admin"
  }'
```

**Option 2: Using MongoDB Atlas UI**
1. Go to MongoDB Atlas → Your Cluster → Collections
2. Find `users` collection
3. Click **Insert Document**
4. Use the admin insertion form

### First Steps
1. Log in with admin credentials at `https://mentorlink-cybage.vercel.app/login`
2. Navigate to Admin Dashboard
3. Create mentor and mentee accounts
4. Create learning modules
5. Run the matching algorithm to pair mentors with mentees

---

## User Roles and Permissions

### Admin
- View and manage all users
- Create/edit/delete modules and resources
- Run mentor-mentee matching algorithm
- View all sessions and need analyses
- Access admin dashboard with analytics

### Mentor
- View assigned mentees
- Create and schedule sessions
- Provide session feedback and ratings
- Update profile and expertise
- View mentee need analysis

### Mentee
- Complete need analysis form
- Schedule sessions with assigned mentor
- Access learning modules
- Provide feedback on sessions
- Update profile information

### Alumni
- View-only access to platform
- Connect with current mentees for guidance

### Volunteer
- Assist with platform activities
- Limited access to resources



---

## Design System

### Color Palette
| Token | Color | Usage |
|-------|-------|-------|
| `ck-blue` | `#0055B3` | Primary buttons, links, active states |
| `ck-blue-dark` | `#003D82` | Hover states, dark mode |
| `ck-orange` | `#F97316` | Call-to-action buttons, tags, accents |
| `ck-dark` | `#050E1F` | Hero backgrounds, dark text |
| `ck-navy` | `#0A1A3A` | Dark panels, card backgrounds |
| `ck-gray-light` | `#F8FAFF` | Light backgrounds |
| `ck-gray-dark` | `#64748B` | Secondary text |

### Typography
- **Headings:** Sora (Bold, SemiBold)
- **Body Text:** Plus Jakarta Sans (Regular, Medium)
- **Monospace:** Monaco, Courier New (for code)

### Components
- Buttons: Primary (blue), Secondary (outlined), Danger (red)
- Cards: Rounded corners (8px), subtle shadows
- Forms: Clean inputs with labels, error states
- Modals: Centered, backdrop blur

---

## NPM Scripts

### Root Directory
```bash
npm run install-all          # Install dependencies for both client and server
npm run dev                  # Run both client and server concurrently
npm run build                # Build client for production
npm run server               # Run server only
npm run client               # Run client only
```

### Server (`cd server`)
```bash
npm run dev                  # Development mode with nodemon
npm start                    # Production mode
```

### Client (`cd client`)
```bash
npm start                    # Development server
npm run build                # Production build
```

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution:**
- Verify MongoDB Atlas credentials in `.env`
- Check if IP whitelist includes your current IP
- Confirm network connectivity to MongoDB cluster

**JWT Authentication Fails**
```
Error: jwt malformed
```
**Solution:**
- Ensure `JWT_SECRET` is set in `.env`
- Check if token is being sent in Authorization header
- Verify token hasn't expired (default: 7 days)

**CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify `CLIENT_URL` env var matches frontend URL
- Check CORS configuration in `server/index.js`
- Ensure credentials: true in axios requests

**Email Not Sending**
```
Error: connect ECONNREFUSED on port 587
```
**Solution:**
- Use Gmail App Password (not regular password)
- Enable "Less secure app access" if using regular Gmail
- Verify EMAIL_HOST, EMAIL_USER, EMAIL_PASS in `.env`

### Frontend Issues

**Blank Page / White Screen**
**Solution:**
- Check browser console for errors (F12)
- Verify API_URL in `.env` file
- Clear browser cache and reload
- Check if backend server is running

**Login Not Working**
**Solution:**
- Verify credentials exist in MongoDB
- Check network tab for API errors
- Ensure JWT token is stored in localStorage
- Try creating new user with register form

**Image Upload Fails**
**Solution:**
- Verify Cloudinary credentials in `.env`
- Check file size (max 10MB)
- Test Cloudinary API keys directly
- Check CORS settings on Cloudinary

### Deployment Issues

**Backend on Render Crashes After Deploy**
**Solution:**
- Check Render logs for error messages
- Verify all environment variables are set
- Ensure MongoDB URI is correct for production
- Check Node version compatibility

**Frontend Cannot Connect to Backend**
**Solution:**
- Verify `REACT_APP_API_URL` in Vercel env vars
- Check if backend server is running on Render
- Test API manually with curl or Postman
- Check CORS headers in backend logs

---

## Contributing

We welcome contributions! Here's how to help:

### Setting Up Development Environment
```bash
git clone https://github.com/yourusername/mentorlink-ck.git
cd mentorlink-ck
npm run install-all
npm run dev
```

### Making Changes
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -am 'Add new feature'`
3. Push to your fork: `git push origin feature/your-feature-name`
4. Create a Pull Request with a clear description

### Code Style
- Use consistent formatting (2 spaces for indentation)
- Follow existing code patterns
- Add meaningful commit messages
- Comment complex logic

### Reporting Issues
- Search existing issues first
- Provide clear description of the problem
- Include error logs/screenshots
- Specify environment (OS, browser, etc.)

---

## Dependencies

### Frontend Key Dependencies
- `react`: ^18.2.0
- `react-router-dom`: ^6.21.0
- `axios`: ^1.6.2
- `tailwindcss`: Latest
- `react-hot-toast`: ^2.4.1
- `@heroicons/react`: ^2.1.1

### Backend Key Dependencies
- `express`: ^4.18.2
- `mongodb`: Via mongoose ^8.0.3
- `jsonwebtoken`: ^9.0.2
- `bcryptjs`: ^2.4.3
- `nodemailer`: ^6.9.7
- `cloudinary`: ^1.41.3
- `cors`: ^2.8.5

---

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT Introduction](https://jwt.io/introduction)
- [Cloudinary Upload API](https://cloudinary.com/documentation/image_upload_api)
- [Nodemailer Setup](https://nodemailer.com/about/)

---

## Support and Contact

**CybageKhushboo Charitable Trust**
- Email: csr_team@cybage.com
- Phone: 020-66041700 Extn: 6619
- Address: Cybage Towers, Kalyani Nagar, Pune - 411014
- Website: [cybage.com](https://www.cybage.com)

### For Technical Support
- Create an issue on GitHub
- Contact: dev-team@cybage.com
- Check existing issues/FAQs

---

## License

This project is owned and maintained by **CybageKhushboo Charitable Trust**. All rights reserved.

For licensing inquiries, please contact: csr_team@cybage.com

---

## Acknowledgments

- CybageKhushboo Charitable Trust for the initiative
- Cybage Software employees (mentors) for their dedication
- All scholars and mentees for their participation
- Open-source community for amazing libraries

---

**Happy Mentoring.**

---

**Last Updated:** March 2026
**Version:** 1.0.0

