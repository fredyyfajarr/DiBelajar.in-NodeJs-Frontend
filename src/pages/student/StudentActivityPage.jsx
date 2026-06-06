import React, { useState } from 'react';
import { FileText, MessageCircle, Trophy } from 'lucide-react';
import {
  useMyAssignments,
  useMyForumPosts,
  useMyTestResults,
} from '/src/hooks/useStudent.js';
import useAuthStore from '/src/store/authStore.js';

const getResponseData = (response) =>
  response?.data?.data || response?.data || [];

const EmptyState = ({ label }) => (
  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
    {label}
  </div>
);

const StudentActivityPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('assignments');
  const { data: assignmentsResponse, isLoading: assignmentsLoading } =
    useMyAssignments(user?._id);
  const { data: testsResponse, isLoading: testsLoading } = useMyTestResults(
    user?._id
  );
  const { data: postsResponse, isLoading: postsLoading } = useMyForumPosts(
    user?._id
  );

  const assignments = getResponseData(assignmentsResponse);
  const tests = getResponseData(testsResponse);
  const posts = getResponseData(postsResponse);

  const tabs = [
    { id: 'assignments', label: 'Tugas', icon: FileText },
    { id: 'tests', label: 'Tes', icon: Trophy },
    { id: 'forum', label: 'Forum', icon: MessageCircle },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Aktivitas</h1>
        <p className="mt-2 text-gray-600">
          Pantau tugas, hasil tes, dan diskusi forum yang pernah Anda kerjakan.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'assignments' && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {assignmentsLoading ? (
            <p className="p-6 text-center text-gray-500">Memuat tugas...</p>
          ) : assignments.length === 0 ? (
            <EmptyState label="Belum ada tugas yang dikumpulkan." />
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="p-4">Materi</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Nilai</th>
                  <th className="p-4">Feedback</th>
                  <th className="p-4">File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="p-4 font-medium text-gray-900">
                      {assignment.materialId?.title || 'Materi'}
                    </td>
                    <td className="p-4 capitalize text-gray-700">
                      {assignment.status || 'submitted'}
                    </td>
                    <td className="p-4 text-gray-700">
                      {assignment.grade ?? '-'}
                    </td>
                    <td className="p-4 text-gray-700">
                      {assignment.feedback || '-'}
                    </td>
                    <td className="p-4">
                      <a
                        href={assignment.submissionFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Lihat
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="space-y-3">
          {testsLoading ? (
            <p className="p-6 text-center text-gray-500">Memuat hasil tes...</p>
          ) : tests.length === 0 ? (
            <EmptyState label="Belum ada hasil tes." />
          ) : (
            tests.map((test) => (
              <div
                key={test._id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <p className="font-semibold text-gray-900">
                  {test.materialId?.title || 'Materi'}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Skor: <span className="font-bold">{test.score}</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(test.completeAt).toLocaleString('id-ID')}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'forum' && (
        <div className="space-y-3">
          {postsLoading ? (
            <p className="p-6 text-center text-gray-500">Memuat forum...</p>
          ) : posts.length === 0 ? (
            <EmptyState label="Belum ada postingan forum." />
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <p className="text-gray-900">{post.text}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(post.timestamp).toLocaleString('id-ID')}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudentActivityPage;
