import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import studentService from '/src/api/studentService.js';
import toast from '/src/utils/toast.js';
import { getApiErrorMessage } from '/src/utils/apiError.js';

export const useEnrollInCourse = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: studentService.enrollInCourse,
    onSuccess: () => {
      toast.success('Selamat! Anda berhasil terdaftar di kursus ini.', {
        title: 'Pendaftaran Berhasil',
      });
      navigate('/student-dashboard');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal mendaftar ke kursus.'), {
        title: 'Pendaftaran Gagal',
      });
    },
  });
};

export const useMyEnrollments = (userId) => {
  return useQuery({
    queryKey: ['my-enrollments', userId],
    queryFn: () => studentService.getMyEnrollments(userId),
    enabled: !!userId,
  });
};

export const useSubmitAssignment = () => {
  return useMutation({
    mutationFn: studentService.submitAssignment,
    onSuccess: () => {
      toast.success('Tugas berhasil dikumpulkan!', {
        title: 'Pengumpulan Berhasil',
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal mengumpulkan tugas.'), {
        title: 'Pengumpulan Gagal',
      });
    },
  });
};

export const useSubmitTestResult = () => {
  return useMutation({
    mutationFn: studentService.submitTestResult,
    onSuccess: (data) => {
      const score = data.data.score;
      toast.success(`Tes selesai! Skor Anda: ${score}`, {
        title: 'Tes Berhasil Diselesaikan',
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal mengirimkan hasil tes.'), {
        title: 'Tes Gagal',
      });
    },
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateProgress,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['course', variables.courseSlug],
      });
      // Perbarui cache notifikasi
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal memperbarui progres.'), {
        title: 'Update Progres Gagal',
      });
    },
  });
};

export const useCertificateData = (courseSlug, isCourseCompleted) => {
  return useQuery({
    queryKey: ['certificateData', courseSlug],
    queryFn: () => studentService.getCertificateData(courseSlug),
    enabled: !!courseSlug && !!isCourseCompleted,
  });
};

export const useCourseReviews = (courseSlug) => {
  return useQuery({
    queryKey: ['reviews', courseSlug],
    queryFn: () => studentService.getReviewsByCourse(courseSlug),
    enabled: !!courseSlug,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.addReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', variables.courseSlug],
      });
      toast.success('Terima kasih atas ulasan Anda!', {
        title: 'Ulasan Berhasil',
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal mengirim ulasan.'), {
        title: 'Ulasan Gagal',
      });
    },
  });
};

export const useMyReview = (courseSlug) => {
  return useQuery({
    queryKey: ['my-review', courseSlug],
    queryFn: () => studentService.getMyReview(courseSlug),
    enabled: !!courseSlug,
    retry: false,
    select: (data) => data.data, // Ambil data dari lapisan dalam
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', variables.courseSlug],
      });
      toast.success('Ulasan berhasil diperbarui!', {
        title: 'Update Berhasil',
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal memperbarui ulasan.'), {
        title: 'Update Gagal',
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.deleteReview,
    onSuccess: (data, courseSlug) => {
      queryClient.removeQueries({
        queryKey: ['my-review', courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-review', courseSlug],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews', courseSlug],
      });
      toast.success('Ulasan berhasil dihapus.', {
        title: 'Hapus Berhasil',
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Gagal menghapus ulasan.'), {
        title: 'Hapus Gagal',
      });
    },
  });
};

export const useCompleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.markMaterialAsComplete,
    onSuccess: () => {
      // Invalidate query enrollment agar data progress di-refetch
      queryClient.invalidateQueries(['studentEnrollments']);
    },
  });
};
