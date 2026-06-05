/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseDetail } from '/src/hooks/useCourses.js';
import { useUpdateProgress } from '/src/hooks/useStudent.js';
import useToastStore from '/src/store/toastStore.js';
import SubmissionModal from '/src/components/SubmissionModal.jsx';
import TestModal from '../../components/TestModal.jsx';
import ForumModal from '../../components/ForumModal.jsx';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Play,
  FileText,
  MessageCircle,
  Award,
  Clock,
  Users,
  BookOpen,
  Menu,
  X,
  List,
  Activity,
} from 'lucide-react';

// Progress Step Component
const ProgressStep = ({
  icon: Icon,
  label,
  isCompleted,
  isDisabled,
  onClick,
  buttonText,
  count,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Icon className="w-4 h-4" />
          )}
        </div>
        <span
          className={`text-sm font-medium ${
            isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
          }`}
        >
          {label}
          {count && ` ${count}`}
        </span>
      </div>
      {!isCompleted && (
        <button
          onClick={onClick}
          disabled={isDisabled}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Slide Menu Component
const SlideMenu = ({ isOpen, onClose, children, title, side = 'left' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Slide Menu */}
          <motion.div
            initial={{ x: side === 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'left' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 ${
              side === 'left' ? 'left-0' : 'right-0'
            } h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 overflow-y-auto`}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Material Item Component
const MaterialItem = ({
  material,
  index,
  onButtonClick,
  progress,
  courseId,
  courseSlug,
  onToggleActivity,
}) => {
  const testCompleted = progress?.hasCompletedTest || false;
  const assignmentSubmitted = progress?.hasSubmittedAssignment || false;
  const forumPostCount = progress?.forumPostCount || 0;
  const materialCompleted = progress?.isCompleted || false;

  const hasTest = material.testContent && material.testContent.length > 0;

  const { mutate: updateProgress } = useUpdateProgress();
  const { confirm, success, error } = useToastStore();

  const handleCompleteMaterial = () => {
    confirm('Apakah Anda yakin ingin menyelesaikan materi ini?', {
      title: 'Konfirmasi Penyelesaian',
      actions: [
        {
          label: 'Batal',
          handler: () => {},
          primary: false,
        },
        {
          label: 'Selesaikan',
          handler: () => {
            updateProgress(
              {
                courseId: courseId,
                materialId: material._id,
                step: 'completion',
                courseSlug,
              },
              {
                onSuccess: () => {
                  success('Materi berhasil diselesaikan!');
                },
                onError: () => {
                  error('Gagal menyelesaikan materi');
                },
              }
            );
          },
          primary: true,
        },
      ],
    });
  };

  const canCompleteMaterial =
    (hasTest ? testCompleted : true) &&
    assignmentSubmitted &&
    forumPostCount >= 2 &&
    !materialCompleted;

  const completedSteps = [
    hasTest ? testCompleted : true,
    assignmentSubmitted,
    forumPostCount >= 2,
  ].filter(Boolean).length;

  const totalSteps = hasTest ? 3 : 2;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white rounded-xl border ${
        materialCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
      } overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                materialCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-100 text-blue-600'
              }`}
            >
              {materialCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                index + 1
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {material.title}
              </h3>
              <p className="text-sm text-gray-500">Modul {index + 1}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div
                className={`text-sm font-medium ${
                  materialCompleted ? 'text-green-600' : 'text-blue-600'
                }`}
              >
                {materialCompleted
                  ? 'Selesai'
                  : `${Math.round(progressPercentage)}%`}
              </div>
              <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className={`h-full rounded-full ${
                    materialCompleted ? 'bg-green-500' : 'bg-blue-500'
                  } transition-all duration-500`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => onToggleActivity(material)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Lihat Aktivitas Pembelajaran"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Aktivitas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content - Full Width */}
      <div className="p-6">
        <div
          className="text-gray-700 leading-relaxed prose prose-base max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: material.description }}
        />
      </div>
    </motion.div>
  );
};

// Komponen utama LearningPage
const LearningPage = () => {
  const { courseSlug } = useParams();
  const { data, isLoading, isError } = useCourseDetail(courseSlug);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const [isActivityMenuOpen, setIsActivityMenuOpen] = useState(false);
  const [selectedMaterialForActivity, setSelectedMaterialForActivity] =
    useState(null);

  const handleOpenModal = (modalType, material) => {
    setSelectedMaterial(material);
    setActiveModal(modalType);
  };

  const handleToggleActivity = (material) => {
    setSelectedMaterialForActivity(material);
    setIsActivityMenuOpen(true);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedMaterial(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Memuat kursus...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Gagal memuat kursus.
      </div>
    );
  }

  const { course, materials, enrollment } = data;
  const completedMaterials =
    enrollment?.progress.filter((p) => p.isCompleted).length || 0;
  const totalMaterials = materials.length;
  const courseProgress =
    totalMaterials > 0
      ? Math.round((completedMaterials / totalMaterials) * 100)
      : 0;
  const allMaterialsCompleted =
    materials.length > 0 && completedMaterials === totalMaterials;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Menu Buttons - Full Width */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-none">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-6">
              <Link
                to="/courses"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <div className="h-5 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900 truncate">
                {course.title}
              </h1>
            </div>

            {/* Menu Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModuleMenuOpen(true)}
                className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <List className="w-4 h-4 mr-2" />
                Daftar Modul
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width with better spacing */}
      <motion.div
        className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Course Header - Full Width */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Oleh {course.instructorId?.name}
              </p>
              <div className="flex items-center space-x-8 text-base text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{totalMaterials} modul</span>
                </div>
              </div>
            </div>
            <div className="text-right ml-8">
              <div className="text-sm text-gray-500 mb-1">Progress Anda</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {courseProgress}%
              </div>
              <div className="w-40 h-3 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${courseProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Materials List - Full Width with better spacing */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Materi Pembelajaran
          </h2>
          {materials.map((material, index) => {
            const materialProgress = enrollment?.progress.find(
              (p) => p.materialId.toString() === material._id.toString()
            );
            return (
              <MaterialItem
                key={material._id}
                material={material}
                index={index}
                onButtonClick={handleOpenModal}
                progress={materialProgress}
                courseId={course._id}
                courseSlug={courseSlug}
                onToggleActivity={handleToggleActivity}
              />
            );
          })}
        </div>

        {/* Completion Certificate */}
        {allMaterialsCompleted && (
          <motion.div
            className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-3">
              🎉 Selamat! Anda Telah Menyelesaikan Kursus
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Anda sekarang berhak untuk mengunduh sertifikat kelulusan
            </p>
            <Link
              to={`/learn/${courseSlug}/certificate`}
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Lihat & Cetak Sertifikat
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Slide Menu - Module List */}
      <SlideMenu
        isOpen={isModuleMenuOpen}
        onClose={() => setIsModuleMenuOpen(false)}
        title="Daftar Modul"
        side="left"
      >
        <div className="space-y-2">
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span>{courseProgress}% Selesai</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>
          {materials.map((material, index) => {
            const progress = enrollment?.progress.find(
              (p) => p.materialId.toString() === material._id.toString()
            );
            const isCompleted = progress?.isCompleted || false;
            return (
              <div
                key={material._id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  isCompleted
                    ? 'bg-green-50 border border-green-200'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {material.title}
                    </p>
                    <p className="text-xs text-gray-500">Modul {index + 1}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SlideMenu>

      {/* Slide Menu - Activity Details */}
      <SlideMenu
        isOpen={isActivityMenuOpen}
        onClose={() => {
          setIsActivityMenuOpen(false);
          setSelectedMaterialForActivity(null);
        }}
        title={
          selectedMaterialForActivity
            ? `Aktivitas: ${selectedMaterialForActivity.title}`
            : 'Aktivitas Pembelajaran'
        }
        side="right"
      >
        {selectedMaterialForActivity && (
          <div className="space-y-4">
            {/* Quiz Activity */}
            {selectedMaterialForActivity.testContent &&
              selectedMaterialForActivity.testContent.length > 0 && (
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          enrollment?.progress.find(
                            (p) =>
                              p.materialId.toString() ===
                              selectedMaterialForActivity._id.toString()
                          )?.hasCompletedTest
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {enrollment?.progress.find(
                          (p) =>
                            p.materialId.toString() ===
                            selectedMaterialForActivity._id.toString()
                        )?.hasCompletedTest ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        Kerjakan Kuis
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        enrollment?.progress.find(
                          (p) =>
                            p.materialId.toString() ===
                            selectedMaterialForActivity._id.toString()
                        )?.hasCompletedTest
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {enrollment?.progress.find(
                        (p) =>
                          p.materialId.toString() ===
                          selectedMaterialForActivity._id.toString()
                      )?.hasCompletedTest
                        ? 'Selesai'
                        : 'Belum'}
                    </span>
                  </div>
                  {!enrollment?.progress.find(
                    (p) =>
                      p.materialId.toString() ===
                      selectedMaterialForActivity._id.toString()
                  )?.hasCompletedTest && (
                    <button
                      onClick={() => {
                        handleOpenModal('test', selectedMaterialForActivity);
                        setIsActivityMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Mulai Kuis
                    </button>
                  )}
                </div>
              )}

            {/* Assignment Activity */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      enrollment?.progress.find(
                        (p) =>
                          p.materialId.toString() ===
                          selectedMaterialForActivity._id.toString()
                      )?.hasSubmittedAssignment
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.hasSubmittedAssignment ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">
                    Submit Tugas
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.hasSubmittedAssignment
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {enrollment?.progress.find(
                    (p) =>
                      p.materialId.toString() ===
                      selectedMaterialForActivity._id.toString()
                  )?.hasSubmittedAssignment
                    ? 'Selesai'
                    : 'Belum'}
                </span>
              </div>
              {!enrollment?.progress.find(
                (p) =>
                  p.materialId.toString() ===
                  selectedMaterialForActivity._id.toString()
              )?.hasSubmittedAssignment && (
                <button
                  onClick={() => {
                    handleOpenModal('assignment', selectedMaterialForActivity);
                    setIsActivityMenuOpen(false);
                  }}
                  disabled={
                    selectedMaterialForActivity.testContent &&
                    selectedMaterialForActivity.testContent.length > 0 &&
                    !enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.hasCompletedTest
                  }
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Kumpulkan Tugas
                </button>
              )}
            </div>

            {/* Forum Activity */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      (enrollment?.progress.find(
                        (p) =>
                          p.materialId.toString() ===
                          selectedMaterialForActivity._id.toString()
                      )?.forumPostCount || 0) >= 2
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {(enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.forumPostCount || 0) >= 2 ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <MessageCircle className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">
                    Forum Diskusi (
                    {enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.forumPostCount || 0}
                    /2)
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    (enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.forumPostCount || 0) >= 2
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {(enrollment?.progress.find(
                    (p) =>
                      p.materialId.toString() ===
                      selectedMaterialForActivity._id.toString()
                  )?.forumPostCount || 0) >= 2
                    ? 'Selesai'
                    : 'Belum'}
                </span>
              </div>
              {(enrollment?.progress.find(
                (p) =>
                  p.materialId.toString() ===
                  selectedMaterialForActivity._id.toString()
              )?.forumPostCount || 0) < 2 && (
                <button
                  onClick={() => {
                    handleOpenModal('forum', selectedMaterialForActivity);
                    setIsActivityMenuOpen(false);
                  }}
                  disabled={
                    !enrollment?.progress.find(
                      (p) =>
                        p.materialId.toString() ===
                        selectedMaterialForActivity._id.toString()
                    )?.hasSubmittedAssignment
                  }
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Mulai Diskusi
                </button>
              )}
            </div>
          </div>
        )}
      </SlideMenu>

      {selectedMaterial && (
        <>
          <SubmissionModal
            isOpen={activeModal === 'assignment'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <TestModal
            isOpen={activeModal === 'test'}
            onClose={handleCloseModal}
            courseId={course._id}
            material={selectedMaterial}
            courseSlug={courseSlug}
          />
          <ForumModal
            isOpen={activeModal === 'forum'}
            onClose={handleCloseModal}
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
