import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Layout dan komponen Rute
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleBasedRoute from './components/RoleBasedRoute.jsx';
import ToastContainer from './components/Toast.jsx';

// Halaman-halaman di-import menggunakan React.lazy
const LandingPage = React.lazy(() => import('./pages/LandingPage.jsx'));
const AllCoursesPage = React.lazy(() => import('./pages/AllCoursesPage.jsx'));
const CourseDetailPage = React.lazy(() =>
  import('./pages/CourseDetailPage.jsx')
);
const DashboardPage = React.lazy(() => import('./pages/DashboardPage.jsx'));

// Halaman baru untuk profil dan pengaturan
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.jsx'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfilePage.jsx'));
const EditProfilePage = React.lazy(() => import('./pages/EditProfilePage.jsx'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage.jsx'));

// Halaman About dan Contact
const AboutPage = React.lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx'));

// Halaman Admin
const AdminDashboardPage = React.lazy(() =>
  import('./pages/admin/AdminDashboardPage.jsx')
);
const UserManagementPage = React.lazy(() =>
  import('./pages/admin/UserManagementPage.jsx')
);
const CourseManagementPage = React.lazy(() =>
  import('./pages/admin/CourseManagementPage.jsx')
);
const MaterialManagementPage = React.lazy(() =>
  import('./pages/admin/MaterialManagementPage.jsx')
);
const MaterialDetailPage = React.lazy(() =>
  import('./pages/admin/MaterialDetailPage.jsx')
);
const EnrollmentManagementPage = React.lazy(() =>
  import('./pages/admin/EnrollmentManagementPage.jsx')
);
const CategoryManagementPage = React.lazy(() =>
  import('./pages/admin/CategoryManagementPage.jsx')
);

// Halaman Instruktur
const InstructorEnrollmentPage = React.lazy(() =>
  import('./pages/instructor/InstructorEnrollmentPage.jsx')
);
const StudentProgressPage = React.lazy(() =>
  import('./pages/instructor/StudentProgressPage.jsx')
);

// Halaman Siswa
const StudentDashboardPage = React.lazy(() =>
  import('./pages/student/StudentDashboardPage.jsx')
);
const LearningPage = React.lazy(() =>
  import('./pages/student/LearningPage.jsx')
);
const CertificatePage = React.lazy(() =>
  import('./pages/student/CertificatePage.jsx')
);
const CourseAnalyticsPage = React.lazy(() =>
  import('./pages/instructor/CourseAnalyticsPage.jsx')
);

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Rute Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<LandingPage />} />
          <Route path="/courses" element={<AllCoursesPage />} />
          <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile/:userSlug" element={<ProfilePage />} />

          {/* Rute Terproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/student-dashboard"
              element={<StudentDashboardPage />}
            />
            <Route path="/learn/:courseSlug" element={<LearningPage />} />
            <Route
              path="/learn/:courseSlug/certificate"
              element={<CertificatePage />}
            />

            {/* --- Rute Baru Ditambahkan --- */}
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ------------------------- */}

            {/* Rute Khusus Admin */}
            <Route
              path="/admin"
              element={<RoleBasedRoute allowedRoles={['admin']} />}
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route
                path="courses/:courseId/materials"
                element={<MaterialManagementPage />}
              />
              <Route
                path="courses/:courseId/materials/:materialId"
                element={<MaterialDetailPage />}
              />
              <Route
                path="enrollments"
                element={<EnrollmentManagementPage />}
              />
              <Route
                path="courses/:courseId/analytics"
                element={<CourseAnalyticsPage />}
              />
              <Route path="categories" element={<CategoryManagementPage />} />
            </Route>

            {/* Rute Khusus Instruktur */}
            <Route
              path="/instructor"
              element={
                <RoleBasedRoute allowedRoles={['instructor', 'admin']} />
              }
            >
              <Route index element={<Navigate to="courses" />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route
                path="courses/:courseId/materials"
                element={<MaterialManagementPage />}
              />
              <Route
                path="courses/:courseId/materials/:materialId"
                element={<MaterialDetailPage />}
              />
              <Route
                path="courses/:courseId/enrollments"
                element={<InstructorEnrollmentPage />}
              />
              <Route
                path="courses/:courseId/student-progress/:userId"
                element={<StudentProgressPage />}
              />
              <Route
                path="courses/:courseId/analytics"
                element={<CourseAnalyticsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
