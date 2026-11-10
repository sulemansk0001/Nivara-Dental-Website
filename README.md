# NIVARA DENTAL STUDIO
> **"Your Smile. Our Commitment."**  
> Premium Dental Clinic Web Application & Patient Management System  
> Location: Vishrantwadi, Pune, Maharashtra, India (PIN: 411015)  
> Currency: Indian Rupee (₹)

---

## 🌟 Overview

**Nivara Dental Studio** is a full-featured, production-ready web application built from scratch to deliver an authentic, human-designed digital presence for an Indian dental healthcare clinic. Inspired by modern boutique dental practices, the site combines refined editorial typography, high-performance micro-interactions, an interactive Before/After smile comparison slider, a live online appointment booking portal, a patient enquiry pipeline, and a password-protected administrative staff dashboard.

---

## 🎨 Brand Identity & Design System

- **Brand Personality**: Trustworthy, Professional, Modern, Patient-Friendly, Hygienic, Approachable.
- **Color Palette**:
  - Primary Navy: `#172A43`
  - Secondary Navy: `#233B58`
  - Dark Navy (Footer): `#14243A`
  - Deep Navy: `#0E1A29`
  - Primary Orange: `#F36B32` (Action CTAs, badges, active tabs, subtle accents)
  - Secondary Orange: `#E85A24` (Hover states)
  - Warm Background: `#FFF8F3`
  - Light Background: `#F8FAFC`
  - Border: `#E7EAF0`
- **Typography**:
  - Headings: `Manrope` (Extra-bold, bold, semi-bold)
  - Body & UI: `Inter` (Regular, Medium, Semi-bold)
- **Strict Design Guardrails**:
  - No purple/pink neon gradients.
  - No heavy glassmorphism or floating decorative 3D balls.
  - No cartoon teeth or generic AI dashboard templates.
  - Authentic Indian clinical imagery, natural whitespace, and 1px crisp borders.

---

## 🚀 Key Features

1. **Interactive Before/After Slider**: Mouse and touch-draggable vertical divider comparing before-and-after smile transformations.
2. **Online Appointment Booking Wizard**: Multi-step booking with Indian mobile phone validation, doctor selector, treatment picker, preferred date (minimum today), and time slots.
3. **Contact & Patient Enquiry System**: Validated forms connected to persistent storage with feedback and WhatsApp instant chat CTA.
4. **Subtle Custom Cursor**: Desktop-only follower that smoothly scales and surfaces interactive hints (`Drag`, `View`) on interactive elements (disabled on mobile/touch).
5. **Staff Administrative Dashboard**: Secure access via admin secret token (`/admin`), viewing real-time appointment metrics and updating status (`Pending` → `Confirmed` → `Completed` → `Cancelled`).
6. **Animated Numerical Counters**: Viewport-triggered count-up statistics for patients served and experience.
7. **Full Service Detail Pages**: 8 standalone routing pages with clinical overviews, indications, benefits, and treatment-specific FAQs.
8. **Blog & Patient Insights Engine**: Searchable articles on oral hygiene, preventive care, and dental implants.
9. **Responsive & Accessible**: Strict keyboard accessibility, ARIA attributes, semantic HTML5, and responsive layouts across 360px–1920px.

---

## 🏗️ Architecture & Project Structure

```
Dental and Healthcare Clinic Website/
├── frontend/                     # React + Vite + TypeScript Frontend
│   ├── public/
│   │   ├── favicon.svg           # Custom SVG tooth + smile logo
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Reusable UI elements (Navbar, Footer, Logo, Button,
│   │   │   │                     # CustomCursor, BeforeAfterSlider, Counter, Lightbox)
│   │   │   └── home/             # Homepage sections 1 through 16
│   │   ├── config/
│   │   │   ├── clinic.ts         # Central clinic metadata (phone, address, hours)
│   │   │   └── seedData.ts       # Clinical seed datasets
│   │   ├── layouts/
│   │   │   └── RootLayout.tsx
│   │   ├── pages/                # All 16 application routes
│   │   ├── services/
│   │   │   └── api.ts            # REST client with automatic offline fallback
│   │   ├── styles/
│   │   │   └── index.css         # Tailwind directives & typography
│   │   ├── types/
│   │   │   └── index.ts          # Strict TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                      # Node.js + Express.js REST API
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection with fallback
│   ├── controllers/              # Business logic for appointments, enquiries, doctors
│   ├── data/
│   │   ├── seedData.js
│   │   └── localStore.js         # Resilient JSON persistent store
│   ├── middleware/
│   │   └── authMiddleware.js     # Protected admin route token verification
│   ├── models/                   # Mongoose Schemas (Appointment, Enquiry, Doctor, Service, Blog)
│   ├── routes/                   # Express Routers
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Master Express server entry point
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended; v20.20.2 used)
- npm (v9 or higher)

### 2. Running Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Running Backend API
```bash
cd backend
npm start
```
The API server starts on [http://localhost:5000](http://localhost:5000).  
Check health status at [http://localhost:5000/api/health](http://localhost:5000/api/health).

---

## 🔑 Administrative Access

- **Portal URL**: `/admin`
- **Default Key**: `nivara_admin_secure_key_2026`
- **Capabilities**:
  - View total appointments, pending verifications, and completed patient treatments.
  - Change appointment status (`pending` → `confirmed` → `completed` → `cancelled`).
  - View incoming patient enquiries and change status (`new` → `contacted` → `resolved`).
  - View active specialist doctors and treatments.

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health status | No |
| `GET` | `/api/doctors` | List active doctor profiles | No |
| `GET` | `/api/services` | List dental services | No |
| `GET` | `/api/services/:slug` | Specific service details | No |
| `GET` | `/api/clinic/case-studies` | List clinical case studies | No |
| `GET` | `/api/clinic/testimonials` | List patient reviews | No |
| `GET` | `/api/clinic/pricing` | List treatment packages | No |
| `GET` | `/api/blogs` | List oral health articles | No |
| `POST` | `/api/appointments` | Book new patient appointment | No |
| `POST` | `/api/enquiries` | Submit contact enquiry | No |
| `POST` | `/api/admin/login` | Administrative authentication | No |
| `GET` | `/api/admin/overview` | Dashboard summary metrics | Yes (`x-admin-key`) |
| `GET` | `/api/appointments` | List all appointments | Yes (`x-admin-key`) |
| `PATCH` | `/api/appointments/:id/status` | Update appointment status | Yes (`x-admin-key`) |
| `GET` | `/api/enquiries` | List all enquiries | Yes (`x-admin-key`) |
| `PATCH` | `/api/enquiries/:id/status` | Update enquiry status | Yes (`x-admin-key`) |

---

## 🚢 Deployment Guidelines

### Frontend (Vercel)
1. Push project to GitHub/GitLab.
2. In Vercel, set **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://api.nivaradental.in/api`).
5. Deploy.

### Backend (Render / Railway / VPS)
1. Set **Root Directory** to `backend`.
2. Set **Build Command**: `npm install`.
3. Set **Start Command**: `node server.js`.
4. Configure Environment Variables in host dashboard:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/nivaradental?retryWrites=true&w=majority`
   - `ADMIN_SECRET_KEY`: A strong unique secret key
   - `FRONTEND_URL`: URL of your frontend deployment

---

## 🩺 Medical & Regulatory Notice

All clinical descriptions, case studies, doctor credentials, and customer reviews provided in this repository are illustrative demonstration datasets for Nivara Dental Studio. Before clinical deployment, replace placeholder registration numbers and credentials with verified Maharashtra Dental Council (MDC) registrations.
