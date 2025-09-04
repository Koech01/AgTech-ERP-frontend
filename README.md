# AgTech ERP Setup Guide
AgTech ERP platform built with React + TypeScript. It provides Admin users with dashboards to manage farmers and their crops, while Farmers can manage their own profiles and crops. The frontend consumes a RESTful API from the backend and includes role-based views.


# Table of Contents 
 - Overview 
 - Prerequisites
 - Installation
 - Project Setup & Environment
 - Running the Project
 - Demo Credentials


# Overview
  - React 18.x + TypeScript
  - TailwindCSS
  - Material UI 
  - React Router DOM
  - MUI X Charts


# Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/current)
- [npm](https://www.npmjs.com/) 


# Installation
Clone the repository and set up your virtual environment:

1. Clone the repository:
```bash
git clone https://github.com/Koech01/AgTech-ERP-frontend
cd AgTech-ERP-frontend 
```

2. Install dependencies:
```bash
npm install
```

3. Install additional packages:
```bash
npm install tailwindcss @tailwindcss/vite
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @mui/x-charts
npm install react-router-dom
npm install --save-dev @types/react-router-dom
```

# Project Setup & Environment.
Configure the environment:

1. Configure TailwindCSS:
```bash
touch .env 
```

2. Update tailwind.config.js:
```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# Running the Project.

Start the development server::
```bash
npm run dev 
```

# Demo Credentials
  - Admin  : email-admin@agritech.com  | password-Admin@123
  - Farmer : koech@agritech.com  | Koech@123

# Notes
- The project is responsive and supports role-based dashboards: Admin vs Farmer.
- Charts visualize crops per farmer (Admin) or crops by type (Farmer).
- Sidebar navigation allows easy switching between modules. 