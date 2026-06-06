import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  FileText,
  MessageCircle,
  Play,
} from 'lucide-react';
import ForumModal from '../../components/ForumModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useUpdateProgress } from '/src/hooks/useStudent.js';
import useToastStore from '/src/store/toastStore.js';
import {
  REQUIRED_FORUM_POSTS,
  getMaterialProgress,
  getMaterialProgressState,
} from '/src/utils/learningProgress.js';

const StepStatus = ({ icon, label, done, detail }) => (
  <div className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3">
    <div
      className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-md ${
        done ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {done
        ? <CheckCircle className="h-4 w-4" />
        : React.createElement(icon, { className: 'h-4 w-4' })}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
    </div>
  </div>
);

const LearningPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const { mutate: updateProgress } = useUpdateProgress();
  const { confirm, success, error } = useToastStore();

  const materials = useMemo(() => data?.materials || [], [data?.materials]);
  const course = data?.course;
  const enrollment = data?.enrollment;

  const selectedMaterial = useMemo(() => {
    if (!materials.length) return null;
    return (
      materials.find((material) => material._id === selectedMaterialId) ||
      materials[0]
    );
  }, [materials, selectedMaterialId]);

  const selectedProgress = getMaterialProgress(
    enrollment?.progress,
    selectedMaterial?._id
  );
  const selectedState = getMaterialProgressState(
    selectedMaterial,
    selectedProgress
  );
  const completedMaterials =
    enrollment?.progress?.filter((progress) => progress.isCompleted).length || 0;
  const courseProgress =
    materials.length > 0
      ? Math.round((completedMaterials / materials.length) * 100)
      : 0;
  const allMaterialsCompleted =
    materials.length > 0 && completedMaterials === materials.length;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Memuat ruang belajar...
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-600">
        Gagal memuat kursus.
      </div>
    );
  }

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCompleteMaterial = () => {
    if (!selectedMaterial) return;

    confirm('Apakah Anda yakin ingin menyelesaikan materi ini?', {
      title: 'Konfirmasi Penyelesaian',
      actions: [
        { label: 'Batal', handler: () => {}, primary: false },
        {
          label: 'Selesaikan',
          primary: true,
          handler: () => {
            updateProgress(
              {
                courseId: course._id,
                materialId: selectedMaterial._id,
                step: 'completion',
                courseSlug,
              },
              {
                onSuccess: () => success('Materi berhasil diselesaikan!'),
                onError: () => error('Gagal menyelesaikan materi'),
              }
            );
          },
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                to="/student-dashboard"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
                Dashboard
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {course.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {completedMaterials}/{materials.length} materi selesai
              </p>
            </div>
            <div className="min-w-64">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress kursus</span>
                <span className="font-semibold text-gray-900">
                  {courseProgress}%
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[280px_1fr_340px]">
        <aside className="rounded-lg border border-gray-200 bg-white p-4 xl:sticky xl:top-20 xl:h-[calc(100vh-7rem)] xl:overflow-y-auto">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Modul
          </h2>
          <div className="mt-4 space-y-2">
            {materials.map((material, index) => {
              const progress = getMaterialProgress(
                enrollment?.progress,
                material._id
              );
              const isActive = selectedMaterial?._id === material._id;
              const isCompleted = progress?.isCompleted || false;

              return (
                <button
                  key={material._id}
                  type="button"
                  onClick={() => setSelectedMaterialId(material._id)}
                  className={`w-full rounded-md border p-3 text-left transition ${
                    isActive
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                        {material.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {isCompleted ? 'Selesai' : 'Belum selesai'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Materi pembelajaran
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {selectedMaterial?.title}
            </h2>
          </div>
          <div className="p-6">
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: selectedMaterial?.description || '',
              }}
            />
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:h-fit">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Aktivitas materi</h2>
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                {selectedState.progressPercentage}%
              </span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${selectedState.progressPercentage}%` }}
              />
            </div>

            <div className="mt-5 space-y-3">
              {selectedState.hasTest && (
                <StepStatus
                  icon={Play}
                  label="Quiz"
                  done={selectedState.testCompleted}
                  detail={
                    selectedState.testCompleted
                      ? 'Quiz sudah dikerjakan'
                      : 'Kerjakan quiz sebelum submit tugas'
                  }
                />
              )}
              <StepStatus
                icon={FileText}
                label="Tugas"
                done={selectedState.assignmentSubmitted}
                detail={
                  selectedState.assignmentSubmitted
                    ? 'Tugas sudah dikumpulkan'
                    : 'Upload tugas untuk lanjut forum'
                }
              />
              <StepStatus
                icon={MessageCircle}
                label="Forum"
                done={selectedState.forumCompleted}
                detail={`${selectedState.forumPostCount}/${REQUIRED_FORUM_POSTS} posting diskusi`}
              />
            </div>

            <div className="mt-5 space-y-2">
              {selectedState.hasTest && !selectedState.testCompleted && (
                <button
                  type="button"
                  onClick={() => openModal('test')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  <Play className="h-4 w-4" />
                  Mulai quiz
                </button>
              )}
              {!selectedState.assignmentSubmitted && (
                <button
                  type="button"
                  onClick={() => openModal('assignment')}
                  disabled={
                    selectedState.hasTest && !selectedState.testCompleted
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FileText className="h-4 w-4" />
                  Kumpulkan tugas
                </button>
              )}
              {!selectedState.forumCompleted && (
                <button
                  type="button"
                  onClick={() => openModal('forum')}
                  disabled={!selectedState.assignmentSubmitted}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  Buka forum
                </button>
              )}
              {!selectedState.materialCompleted && (
                <button
                  type="button"
                  onClick={handleCompleteMaterial}
                  disabled={!selectedState.canCompleteMaterial}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4" />
                  Selesaikan materi
                </button>
              )}
            </div>
          </div>

          {allMaterialsCompleted && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
              <Award className="h-8 w-8 text-emerald-700" />
              <h3 className="mt-3 font-semibold text-emerald-950">
                Kursus selesai
              </h3>
              <p className="mt-1 text-sm text-emerald-800">
                Anda sudah memenuhi syarat untuk mencetak sertifikat.
              </p>
              <Link
                to={`/learn/${courseSlug}/certificate`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Lihat sertifikat
              </Link>
            </div>
          )}

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-gray-900">Tips belajar</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Baca materi, kerjakan aktivitas berurutan, lalu tandai materi
                  selesai setelah semua requirement terpenuhi.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {selectedMaterial && (
        <>
          <SubmissionModal
            isOpen={activeModal === 'assignment'}
            onClose={closeModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <TestModal
            isOpen={activeModal === 'test'}
            onClose={closeModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <ForumModal
            isOpen={activeModal === 'forum'}
            onClose={closeModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
        </>
      )}
    </div>
  );
};

export default LearningPage;
