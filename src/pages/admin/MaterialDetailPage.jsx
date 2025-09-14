import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useSubmissions,
  useTestResults,
  useForumPosts,
  useMaterialDetail,
} from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import ForumModal from '/src/components/ForumModal.jsx';
import { MessageSquare, CheckSquare, FileText } from 'lucide-react';

// Komponen-komponen list (SubmissionsList, TestResultsList, ForumPostsList) tidak perlu diubah.
// Cukup salin dan tempel seperti yang ada di file Anda saat ini.

const SubmissionsList = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <p className="text-center py-4 text-gray-600">Memuat daftar tugas...</p>
    );
  const submissions = data?.data || [];
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left p-3 font-semibold text-gray-700">
            Nama Siswa
          </th>
          <th className="text-left p-3 font-semibold text-gray-700">
            Waktu Submit
          </th>
          <th className="text-left p-3 font-semibold text-gray-700">File</th>
        </tr>
      </thead>
      <tbody>
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <tr
              key={sub._id}
              className="border-b last:border-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-3">{sub.userId?.name || 'N/A'}</td>
              <td className="p-3">
                {new Date(sub.submittedAt).toLocaleString()}
              </td>
              <td className="p-3">
                <a
                  href={sub.submissionFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Lihat File
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-4 text-gray-600">
              Belum ada tugas yang dikumpulkan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const TestResultsList = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <p className="text-center py-4 text-gray-600">Memuat hasil tes...</p>
    );
  const results = data?.data || [];
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left p-3 font-semibold text-gray-700">
            Nama Siswa
          </th>
          <th className="text-left p-3 font-semibold text-gray-700">Skor</th>
          <th className="text-left p-3 font-semibold text-gray-700">
            Waktu Selesai
          </th>
        </tr>
      </thead>
      <tbody>
        {results.length > 0 ? (
          results.map((res) => (
            <tr
              key={res._id}
              className="border-b last:border-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-3">{res.userId?.name || 'N/A'}</td>
              <td className="p-3 font-bold">{res.score}</td>
              <td className="p-3">
                {new Date(res.completeAt).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-4 text-gray-600">
              Belum ada hasil tes.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const ForumPostsList = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <p className="text-center py-4 text-gray-600">
        Memuat riwayat diskusi...
      </p>
    );
  const posts = data?.data?.data || [];
  return (
    <div className="space-y-4 p-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-100 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <p className="font-semibold text-gray-900">
              {post.userId?.name || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(post.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-800">{post.text}</p>
          </div>
        ))
      ) : (
        <p className="text-center p-4 text-gray-600">
          Belum ada riwayat diskusi.
        </p>
      )}
    </div>
  );
};

const MaterialDetailPage = () => {
  const { courseId, materialId } = useParams();
  const [activeTab, setActiveTab] = useState('submissions');
  const [isForumOpen, setForumOpen] = useState(false);
  const { user } = useAuthStore();
  const basePath = user?.role === 'admin' ? '/admin' : '/instructor';

  const { data: materialDetail, isLoading: isLoadingMaterial } =
    useMaterialDetail(courseId, materialId);
  const { data: submissionsData, isLoading: submissionsLoading } =
    useSubmissions(courseId, materialId);
  const { data: testResultsData, isLoading: testResultsLoading } =
    useTestResults(courseId, materialId);
  const { data: forumPostsData, isLoading: forumPostsLoading } = useForumPosts(
    courseId,
    materialId
  );

  const TABS = {
    submissions: (
      <SubmissionsList data={submissionsData} isLoading={submissionsLoading} />
    ),
    testResults: (
      <TestResultsList data={testResultsData} isLoading={testResultsLoading} />
    ),
    forumPosts: (
      <ForumPostsList data={forumPostsData} isLoading={forumPostsLoading} />
    ),
  };

  const isLoading = isLoadingMaterial;

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Memuat detail materi...
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <Link
              to={`${basePath}/courses/${courseId}/materials`}
              className="text-sm font-semibold text-indigo-600 hover:underline mb-2 inline-block"
            >
              &larr; Kembali ke Daftar Materi
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Detail Materi:{' '}
              <span className="font-normal">
                {materialDetail?.data?.title || '...'}
              </span>
            </h1>
          </div>
          {materialDetail && (
            <button
              onClick={() => setForumOpen(true)}
              className="group inline-flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 mt-4 sm:mt-0"
            >
              <MessageSquare size={18} />
              Buka Forum Diskusi
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6 px-4">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-3 px-1 border-b-2 font-medium inline-flex items-center gap-2 ${
                  activeTab === 'submissions'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300'
                }`}
              >
                <FileText size={16} /> Tugas Terkumpul
              </button>
              <button
                onClick={() => setActiveTab('testResults')}
                className={`py-3 px-1 border-b-2 font-medium inline-flex items-center gap-2 ${
                  activeTab === 'testResults'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300'
                }`}
              >
                <CheckSquare size={16} /> Hasil Tes
              </button>
              <button
                onClick={() => setActiveTab('forumPosts')}
                className={`py-3 px-1 border-b-2 font-medium inline-flex items-center gap-2 ${
                  activeTab === 'forumPosts'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300'
                }`}
              >
                <MessageSquare size={16} /> Riwayat Diskusi
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px] pt-4">{TABS[activeTab]}</div>
        </div>
      </div>

      {materialDetail && (
        <ForumModal
          isOpen={isForumOpen}
          onClose={() => setForumOpen(false)}
          courseId={courseId}
          material={materialDetail?.data}
        />
      )}
    </>
  );
};

export default MaterialDetailPage;
