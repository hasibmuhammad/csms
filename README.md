# CSMS - College Student Management System v0.1.0

A modern, responsive dashboard for managing college student records efficiently. Built with a focus on clean UI/UX and robust functionality.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hasibmuhammad/csms.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack
- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Persistence**: Browser `localStorage`

## ✨ Core Features
- **Student Management**: Full CRUD (Create, Read, Update, Delete) capability for student profiles.
- **Multi-Step Admission Form**: A structured 3-step form (Basic Info, Academic Info, Personal Info) with real-time validation.
- **Soft Delete Mechanism**: Ability to deactivate and reactivate students, preserving data integrity.
- **Advanced Search & Filtering**: Real-time search by name/course and multi-criteria filters for gender, course, and status.
- **Dynamic Sorting**: Sort student records by Name and Admission Date (Ascending/Descending).
- **Custom Pagination**: Robust pagination system that adapts to filtered results and preserves UI consistency even with zero results.
- **Polished UI/UX**: High-performance dashboard with smooth transitions, loading states, and responsive layouts.

## 📝 Assumptions Made
- **Client-Side Persistence**: For this project phase, `localStorage` is used as the primary data store, assuming no persistent backend or database is required.
- **Client-Side Processing**: Filtering, sorting, and pagination are handled on the client-side, assuming the student list size remains within reasonable limits for browser memory.
- **Soft Delete Preference**: A "status-based" delete approach was taken to allow users to recover deactivated students easily.
- **Single Role Access**: The current implementation assumes a single administrative user role (Registrar Office)
- **No Authentication**: The application does not implement any authentication or authorization mechanisms, assuming a single user role.
- **No Database**: The application does not implement any database, assuming a single user role.

