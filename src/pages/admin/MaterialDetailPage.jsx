import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckSquare,
  ChevronLeft,
  ExternalLink,
  FileText,
  MessageSquare,
  Save,
  Users,
} from 'lucide-react';
import {
  useForumPosts,
  useGradeSubmission,
  useMaterialDetail,
  useSubmissions,
  useTestResults,
} from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';
import ForumModal from '/src/components/ForumModal.jsx';

const getResponseItems = (response) => {
  const payload = response?.data?.data ?? response?.data ?? [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
};

const formatDateTime = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const StatCard = ({ icon: Icon, label, value, detail }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        {detail && <p className="mt-1 text-xs text-gray-500">{detail}</p>}
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        {React.createElement(Icon, { className: 'h-5 w-5' })}
      </div>
    </div>
  </div>
);

const EmptyState = ({ children }) => (
  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
    {children}
  </div>
);

const SubmissionRow = ({ submission, courseId, materialId }) => {
  const [grade, setGrade] = useState(submission.grade ?? '');
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const { mutate: gradeSubmission, isPending } = useGradeSubmission();
  const numericGrade = Number(grade);
  const isGradeValid =
    grade !== '' &&
    Number.isFinite(numericGrade) &&
    numericGrade >= 0 &&
    numericGrade <= 100;

  const handleSubmitGrade = (event) => {
    event.preventDefault();
    if (!isGradeValid) return;

    gradeSubmission({
      courseId,
      materialId,
      submissionId: submission._id,
      gradeData: {
        grade: numericGrade,
        feedback: feedback.trim(),
      },
    });
  };

  return (
    <tr className="align-top transition hover:bg-gray-50">
      <td className="p-4">
        <p className="font-semibold text-gray-900">
          {submission.userId?.name || 'Siswa'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {submission.userId?.email || '-'}
        </p>
      </td>
      <td className="p-4 text-sm text-gray-600">
        {formatDateTime(submission.submittedAt)}
      </td>
      <td className="p-4">
        <a
          href={submission.submissionFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Lihat file
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </td>
      <td className="p-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            submission.status === 'graded'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {submission.status === 'graded' ? 'Sudah dinilai' : 'Menunggu nilai'}
        </span>
        {submission.gradedBy?.name && (
          <p className="mt-1 text-xs text-gray-500">
            Oleh {submission.gradedBy.name}
          </p>
        )}
      </td>
      <td className="p-4">
        <form onSubmit={handleSubmitGrade} className="min-w-72 space-y-2">
          <div className="flex items-start gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
              className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="0-100"
              required
            />
            <button
              type="submit"
              disabled={isPending || !isGradeValid}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isPending ? 'Menyimpan' : 'Simpan'}
            </button>
          </div>
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            rows="2"
            maxLength="2000"
            placeholder="Feedback untuk siswa"
          />
          {!isGradeValid && grade !== '' && (
            <p className="text-xs font-semibold text-red-600">
              Nilai harus berada di rentang 0-100.
            </p>
          )}
        </form>
      </td>
    </tr>
  );
};

const SubmissionsPanel = ({ data, isLoading, courseId, materialId }) => {
  if (isLoading) {
    return <EmptyState>Memuat daftar tugas...</EmptyState>;
  }

  const submissions = getResponseItems(data);
  if (submissions.length === 0) {
    return <EmptyState>Belum ada tugas yang dikumpulkan.</EmptyState>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Siswa</th>
              <th className="p-4">Waktu submit</th>
              <th className="p-4">File</th>
              <th className="p-4">Status</th>
              <th className="p-4">Penilaian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {submissions.map((submission) => (
              <SubmissionRow
                key={submission._id}
                submission={submission}
                courseId={courseId}
                materialId={materialId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TestResultsPanel = ({ data, isLoading }) => {
  if (isLoading) {
    return <EmptyState>Memuat hasil tes...</EmptyState>;
  }

  const results = getResponseItems(data);
  if (results.length === 0) {
    return <EmptyState>Belum ada hasil tes.</EmptyState>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="p-4">Siswa</th>
              <th className="p-4">Skor</th>
              <th className="p-4">Waktu selesai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((result) => (
              <tr key={result._id} className="transition hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-semibold text-gray-900">
                    {result.userId?.name || 'Siswa'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {result.userId?.email || '-'}
                  </p>
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                    {result.score}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {formatDateTime(result.completeAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ForumPostsPanel = ({ data, isLoading }) => {
  if (isLoading) {
    return <EmptyState>Memuat riwayat diskusi...</EmptyState>;
  }

  const posts = getResponseItems(data);
  if (posts.length === 0) {
    return <EmptyState>Belum ada riwayat diskusi.</EmptyState>;
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <article
          key={post._id}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-gray-900">
              {post.userId?.name || 'Siswa'}
            </p>
            <p className="text-xs text-gray-500">
              {formatDateTime(post.timestamp)}
            </p>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {post.text}
          </p>
        </article>
      ))}
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

  const material = materialDetail?.data?.data || materialDetail?.data;
  const submissions = useMemo(
    () => getResponseItems(submissionsData),
    [submissionsData]
  );
  const testResults = useMemo(
    () => getResponseItems(testResultsData),
    [testResultsData]
  );
  const forumPosts = useMemo(
    () => getResponseItems(forumPostsData),
    [forumPostsData]
  );
  const gradedCount = submissions.filter(
    (submission) => submission.status === 'graded'
  ).length;
  const averageScore =
    testResults.length > 0
      ? Math.round(
          testResults.reduce((total, result) => total + (result.score || 0), 0) /
            testResults.length
        )
      : 0;

  const tabs = [
    {
      id: 'submissions',
      label: 'Tugas',
      icon: FileText,
      count: submissions.length,
      content: (
        <SubmissionsPanel
          data={submissionsData}
          isLoading={submissionsLoading}
          courseId={courseId}
          materialId={materialId}
        />
      ),
    },
    {
      id: 'testResults',
      label: 'Tes',
      icon: CheckSquare,
      count: testResults.length,
      content: (
        <TestResultsPanel
          data={testResultsData}
          isLoading={testResultsLoading}
        />
      ),
    },
    {
      id: 'forumPosts',
      label: 'Diskusi',
      icon: MessageSquare,
      count: forumPosts.length,
      content: (
        <ForumPostsPanel data={forumPostsData} isLoading={forumPostsLoading} />
      ),
    },
  ];

  if (isLoadingMaterial) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600">
        Memuat detail materi...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-8">
            <Link
              to={`${basePath}/courses/${courseId}/materials`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Daftar materi
            </Link>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Detail aktivitas materi
                </p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {material?.title || 'Materi'}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                  Pantau tugas, hasil tes, dan diskusi siswa untuk materi ini.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForumOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <MessageSquare className="h-4 w-4" />
                Buka forum
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Users}
              label="Submission"
              value={submissions.length}
              detail={`${gradedCount} sudah dinilai`}
            />
            <StatCard
              icon={CheckSquare}
              label="Rata-rata tes"
              value={testResults.length > 0 ? averageScore : '-'}
              detail={`${testResults.length} hasil tes masuk`}
            />
            <StatCard
              icon={MessageSquare}
              label="Diskusi"
              value={forumPosts.length}
              detail="Posting utama pada materi"
            />
            <StatCard
              icon={FileText}
              label="Status materi"
              value={material?.hasTest ? 'Quiz aktif' : 'Tanpa quiz'}
              detail={material?.assignmentInstructions ? 'Tugas aktif' : 'Cek instruksi tugas'}
            />
          </div>

          <section className="mt-6">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-t-md border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'border-gray-200 border-b-white bg-white text-gray-900'
                          : 'border-transparent text-gray-600 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="pt-5">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
          </section>
        </main>
      </div>

      {material && (
        <ForumModal
          isOpen={isForumOpen}
          onClose={() => setForumOpen(false)}
          courseId={courseId}
          material={material}
        />
      )}
    </>
  );
};

export default MaterialDetailPage;
