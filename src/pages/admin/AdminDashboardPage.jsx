import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Layers,
  Plus,
  Users,
} from 'lucide-react';
import { useStats } from '/src/hooks/useAdmin.js';

const StatCard = ({ icon, label, value, description }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value || 0}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
      <div className="rounded-md bg-primary/10 p-2 text-primary">
        {React.createElement(icon, { className: 'h-5 w-5' })}
      </div>
    </div>
  </div>
);

const ListPanel = ({ title, children, action }) => (
  <section className="rounded-lg border border-gray-200 bg-white">
    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      {action}
    </div>
    <div className="divide-y divide-gray-100">{children}</div>
  </section>
);

const EmptyRow = ({ label }) => (
  <p className="p-5 text-sm text-gray-500">{label}</p>
);

const AdminDashboardPage = () => {
  const { data: response, isLoading } = useStats();
  const stats = response?.data?.data || {};

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 text-gray-500">
        Memuat dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Admin workspace
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
              <p className="mt-2 text-gray-600">
                Pantau aktivitas platform dan akses workflow operasional utama.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/courses"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Kelola kursus
              </Link>
              <Link
                to="/admin/users"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                <Users className="h-4 w-4" />
                Kelola user
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Users}
            label="Total pengguna"
            value={stats.totalUsers}
            description="Semua role terdaftar"
          />
          <StatCard
            icon={BookOpen}
            label="Total kursus"
            value={stats.totalCourses}
            description="Kursus aktif di platform"
          />
          <StatCard
            icon={Layers}
            label="Enrollment"
            value={stats.totalEnrollments}
            description="Total pendaftaran kursus"
          />
          <StatCard
            icon={ClipboardCheck}
            label="Tugas menunggu nilai"
            value={stats.pendingSubmissions}
            description="Perlu review instructor/admin"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <ListPanel
            title="Pengguna terbaru"
            action={
              <Link
                to="/admin/users"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Lihat user
              </Link>
            }
          >
            {stats.recentUsers?.length ? (
              stats.recentUsers.map((user) => (
                <div key={user._id} className="px-5 py-4">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))
            ) : (
              <EmptyRow label="Belum ada pengguna." />
            )}
          </ListPanel>

          <ListPanel
            title="Kursus terbaru"
            action={
              <Link
                to="/admin/courses"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Lihat kursus
              </Link>
            }
          >
            {stats.recentCourses?.length ? (
              stats.recentCourses.map((course) => (
                <div key={course._id} className="px-5 py-4">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-500">
                    /courses/{course.slug || course._id}
                  </p>
                </div>
              ))
            ) : (
              <EmptyRow label="Belum ada kursus." />
            )}
          </ListPanel>

          <ListPanel
            title="Enrollment terbaru"
            action={
              <Link
                to="/admin/enrollments"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Lihat enrollment
              </Link>
            }
          >
            {stats.recentEnrollments?.length ? (
              stats.recentEnrollments.map((enrollment) => (
                <div key={enrollment._id} className="px-5 py-4">
                  <p className="font-medium text-gray-900">
                    {enrollment.userId?.name || 'User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {enrollment.courseId?.title || 'Kursus'}
                  </p>
                </div>
              ))
            ) : (
              <EmptyRow label="Belum ada enrollment." />
            )}
          </ListPanel>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
