```text
________  .____________       .__              __               .__         
\______ \ |__\______   \ ____ |  | _____      |__|____ _______  |__| ____   
 |    |  \|  ||    |  _// __ \|  | \__  \     |  \__  \\_  __ \ |  |/    \  
 |    `   \  ||    |   \  ___/|  |__/ __ \_   |  |/ __ \|  | \/ |  |   |  \ 
/_______  /__||______  /\___  >____(____  /\__|  (____  /__| /\ |__|___|  / 
        \/           \/     \/          \/\______|    \/     \/         \/  
 __      __      ___.                                                       
/  \    /  \ ____\_ |__                                                     
\   \/\/   // __ \| __ \                                                    
 \        /\  ___/| \_\ \                                                   
  \__/\  /  \___  >___  /                                                   
       \/       \/    \/                                                    
```

<div align="center">
  <p align="center">
    <a href="https://github.com/fredyyfajarr/DiBelajar.in-NodeJs-Frontend/issues">
      <img src="https://img.shields.io/github/issues/fredyyfajarr/DiBelajar.in-NodeJs-Frontend?style=for-the-badge&color=purple" alt="Issues" />
    </a>
    <a href="https://github.com/fredyyfajarr/DiBelajar.in-NodeJs-Frontend/pulls">
      <img src="https://img.shields.io/github/issues-pr/fredyyfajarr/DiBelajar.in-NodeJs-Frontend?style=for-the-badge&color=purple" alt="Pull Requests" />
    </a>
    <a href="https://github.com/fredyyfajarr/DiBelajar.in-NodeJs-Frontend/stargazers">
      <img src="https://img.shields.io/github/stars/fredyyfajarr/DiBelajar.in-NodeJs-Frontend?style=for-the-badge&color=purple" alt="Stars" />
    </a>
  </p>
</div>

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License / Copyright](#license--copyright)

## About The Project

DiBelajar.in Web is a sophisticated frontend interface for the DiBelajar.in e-learning ecosystem. Crafted with modern UI methodologies, this application delivers seamless experiences for multiple user roles: Students, Instructors, and Administrators.

By leveraging powerful client-side tools like React 19, Zustand for state management, and TanStack React Query for efficient data fetching, the platform ensures rapid load times and highly interactive course materials. Smooth animations via Framer Motion and an intuitive rich-text editor (TinyMCE) provide both instructors and learners with a premium educational workspace. Additionally, the real-time capabilities are enhanced with Socket.IO client integration for live updates and notifications.

## Key Features

- **Role-Based Access Control:** Distinct UI dashboards and specific functionalities separated cleanly for `student`, `instructor`, and `admin` roles.
- **Dynamic Content & Caching:** Heavy utilization of TanStack React Query to fetch, cache, and synchronize server state efficiently.
- **Interactive Rich-Text Editor:** Integration with TinyMCE allows instructors to create compelling course descriptions, materials, and test configurations.
- **State-of-the-Art Forms:** Highly performant, validated form submissions handled by `react-hook-form`.
- **Real-Time Capabilities:** Socket.IO handles live notifications, keeping users informed of updates immediately.
- **Fluid UI Transitions:** Beautiful animations powered by Framer Motion, supplemented by a comprehensive Tailwind CSS design system.

## Tech Stack

- **UI Library:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest) & Axios
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Forms & Validation:** `react-hook-form`
- **Real-time:** `socket.io-client`
- **Rich Text Editor:** `@tinymce/tinymce-react`

## Project Structure

```text
DiBelajar.in-NodeJs-Frontend/
├── src/
│   ├── api/                # API communication logic & axios instances
│   ├── assets/             # Static SVGs and branding images
│   ├── components/         # Global reusable components (Modals, Nav, Footer, Cards)
│   │   └── admin/          # Admin-specific partial components
│   ├── context/            # React context providers (e.g., ThemeContext)
│   ├── hooks/              # Custom React hooks (useAuth, useCourses, useTheme)
│   ├── layouts/            # Page shell layouts (MainLayout)
│   ├── pages/              # Route-level view components
│   │   ├── admin/          # Administrator views
│   │   ├── instructor/     # Instructor views
│   │   └── student/        # Student-focused views
│   ├── store/              # Zustand global state (authStore, toastStore)
│   ├── utils/              # Helper functions, error formatters, path generators
│   ├── App.jsx             # Top-level Component & Routing
│   └── main.jsx            # React root mount
├── tailwind.config.js      # Tailwind CSS schema configurations
├── vite.config.js          # Vite Bundler settings
└── package.json            # Application dependencies
```

## Getting Started

### Prerequisites
Make sure your system meets the following requirements:
- Node.js (v18.x or newer)
- Ensure the DiBelajar.in Node.js Backend is running locally or accessible via URL.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fredyyfajarr/DiBelajar.in-NodeJs-Frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DiBelajar.in-NodeJs-Frontend
   ```
3. Install the dependencies via npm:
   ```bash
   npm install
   ```
4. Set up your `.env` file based on your local configuration (defining the `VITE_API_BASE_URL`).

## Usage

1. Start the Vite development server:
   ```bash
   npm run dev
   ```
2. The site will typically be hosted at `http://localhost:5173`.
3. You can explore the user interface, register a new account, and immediately experience the role-based dashboard by assigning the correct roles through the backend.
4. To build the project for production, run:
   ```bash
   npm run build
   ```

## Contributing

Your contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License / Copyright

Copyright &copy; 2026 Fredy Fajar Adi Putra. All Rights Reserved.
