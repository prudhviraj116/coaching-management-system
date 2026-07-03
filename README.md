# EduPulse | Coaching Institute Student Management System

EduPulse is a high-performance, production-ready full-stack SaaS platform designed for coaching institutes to seamlessly coordinate administration, academic tracking, and student engagement. 

Built with a robust **Django REST Framework** backend, an interactive **React.js** frontend, and a persistent **MySQL** database ecosystem, the system enforces a strict multi-tenant workflow across three specialized, secure portal dashboards.

---

## 🚀 Key Architectural Features

*   **Triple-Portal Multi-Tenancy:** Isolated dashboard spaces custom-engineered for **Admins**, **Staff Members**, and **Students**.
*   **Secure Invitation-Only Onboarding:** A high-security enrollment pipeline where staff generate student accounts via backend verification tokens. Students receive a secure confirmation link via email to claim their account and set credentials, preventing unverified access.
*   **Academic Performance Engine:** Staff tools to log dynamic attendance records, issue real-time marks, and automatically calculate comparative student performance rankings.
*   **Virtual Resource Center:** Seamless cloud-ready distribution of daily lecture materials, document notes, and embedded video modules accessible straight from the student interface.
*   **Real-Time Broadcast Hub:** Global notification system allowing administrative and academic staff to instantly push schedule changes, webinar alerts, or institutional updates across portals.

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend UI/UX** | React.js (ES6+), TypeScript, Tailwind CSS, Bootstrap 5, Framer Motion |
| **Backend API Core** | Python, Django REST Framework, JWT Authentication Architecture |
| **Database Engine** | MySQL (Relational schema optimization, indexing, and cascade rules) |
| **Hosting & CI/CD** | Vercel (Frontend Client Deployment), Render (Backend API Service) |

---

## 📁 Repository Directory Layout

```text
coaching-management-system/
│
├── frontend/                  # React.js Client Application (Deploys to Vercel)
│   ├── src/
│   │   ├── components/        # Reusable dashboard UI, layout grids, notification hubs
│   │   ├── context/           # Global auth state and protected routing logic
│   │   └── pages/             # Distinct Admin, Staff, Student panel dashboards
│   ├── package.json
│   └── vercel.json
│
└── backend/                   # Django REST Framework Application (Deploys to Render)
    ├── core_institute/        # Main project orchestration & settings configuration
    ├── accounts/              # Customized multi-role user schemas & secure JWT authentication
    ├── management/            # Portals API (Attendance, Notes, Rankings, Webinars)
    ├── manage.py
    └── requirements.txt
🛠️ Local Environment Setup
Prerequisites
Python 3.10 or higher

Node.js v18 or higher

MySQL Server instance running locally

1. Backend Integration (Django)
Navigate to the backend directory, initialize your local virtual environment, and install dependencies:

Bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
Create a local configuration environment file named .env in the root of the backend folder using the following schema:
Bash
python manage.py migrate
python manage.py runserver
2. Frontend Integration (React)
Open a new terminal session, navigate to the frontend folder, install the required packages, and run the development pipeline:

Bash
cd frontend
npm install
npm run dev
The application will launch on your local environment (typically http://localhost:5173), seamlessly talking to the Django API proxy running concurrently.
